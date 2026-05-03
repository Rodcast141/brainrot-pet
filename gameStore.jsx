import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { OWNERS, MODS, OG_BUNDLE, PET_TYPES, OG_COSMETICS, CRYSTAL_TYPES, DAILY_LOGIN_GEMS, QUEST_DIFFICULTIES } from './gameConstants';
import { getDailyQuests, saveQuests, checkDailyLogin, applyQuestProgress } from './questUtils';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [username, setUsernameRaw] = useState('Player');
  const [role, setRole] = useState('player');
  const [turnMode, setTurnMode] = useState('smooth');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gems, setGems] = useState(0);
  const [inventory, setInventory] = useState({});
  const [combo, setCombo] = useState(0);
  const [activePotions, setActivePotions] = useState([]);
  const [equippedPet, setEquippedPet] = useState(null);
  const [equippedPickaxe, setEquippedPickaxe] = useState('wood');
  const [ownedPickaxes, setOwnedPickaxes] = useState(['wood']);
  const [currentWorld, setCurrentWorld] = useState('crystal_cave');
  const [pets, setPets] = useState([]);
  const [cosmetics, setCosmetics] = useState([]);
  const [gemCosmetics, setGemCosmetics] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [modMenuOpen, setModMenuOpen] = useState(false);
  const [computerOpen, setComputerOpen] = useState(false);
  const [quests, setQuests] = useState([]);
  const [dailyLoginGems, setDailyLoginGems] = useState(0);
  // Track quest stats
  const [totalMined, setTotalMined] = useState(0);
  const [totalCoinsEarned, setTotalCoinsEarned] = useState(0);
  const [potionsBought, setPotionsBought] = useState(0);
  const floatingIdRef = useRef(0);
  const comboTimerRef = useRef(null);

  // Load quests and check daily login on mount
  useEffect(() => {
    setQuests(getDailyQuests());
    if (checkDailyLogin()) {
      setGems(g => g + DAILY_LOGIN_GEMS);
      setDailyLoginGems(DAILY_LOGIN_GEMS);
      setTimeout(() => setDailyLoginGems(0), 5000);
    }
  }, []);

  const updateQuestProgress = useCallback((type, amount, extra = {}) => {
    setQuests(prev => {
      const updated = applyQuestProgress(prev, type, amount, extra);
      saveQuests(updated);
      return updated;
    });
  }, []);

  const setUsername = useCallback((name) => {
    const lower = name.toLowerCase().trim();
    let r = 'player';
    if (OWNERS.map(o => o.toLowerCase()).includes(lower)) r = 'owner';
    else if (MODS.map(m => m.toLowerCase()).includes(lower)) r = 'mod';
    setUsernameRaw(name);
    setRole(r);
  }, []);

  const spawnPotion = useCallback((potion) => {
    setActivePotions(prev => [...prev.filter(p => p.name !== potion.name), { ...potion, expiresAt: Date.now() + potion.duration }]);
    setTimeout(() => setActivePotions(prev => prev.filter(p => p.name !== potion.name)), potion.duration);
  }, []);

  const buyPotion = useCallback((potion) => {
    setCoins(c => c - potion.coinCost);
    spawnPotion(potion);
    setPotionsBought(n => {
      const next = n + 1;
      updateQuestProgress('buy_potions', 1);
      return next;
    });
  }, [spawnPotion, updateQuestProgress]);

  const buyPickaxe = useCallback((pickaxe) => {
    setCoins(c => c - pickaxe.coinCost);
    setOwnedPickaxes(prev => [...new Set([...prev, pickaxe.name])]);
    setEquippedPickaxe(pickaxe.name);
    setQuests(prev => {
      const pickCount = [...new Set([...[], pickaxe.name])].length; // will be evaluated after state update
      const updated = prev.map(q => {
        if (q.type === 'pickaxes' && !q.completed) {
          return { ...q, progress: Math.min(q.progress + 1, q.target), completed: q.progress + 1 >= q.target };
        }
        return q;
      });
      saveQuests(updated);
      return updated;
    });
  }, []);

  const buyGemCosmetic = useCallback((id, cost) => {
    setGems(g => g - cost);
    setGemCosmetics(prev => [...new Set([...prev, id])]);
  }, []);

  const claimQuestReward = useCallback((questId) => {
    setQuests(prev => {
      const updated = prev.map(q => {
        if (q.id === questId && q.completed && !q.claimed) {
          const diff = QUEST_DIFFICULTIES.find(d => d.key === q.difficulty);
          setGems(g => g + (diff ? diff.gemReward : 0));
          return { ...q, claimed: true };
        }
        return q;
      });
      saveQuests(updated);
      return updated;
    });
  }, []);

  const hatchEgg = useCallback((pet) => {
    setPets(prev => [...prev.filter(p => p.name !== pet.name), pet]);
  }, []);

  const buyOGBundle = useCallback(() => {
    setScore(s => s - OG_BUNDLE.price);
    const ogPets = PET_TYPES.filter(p => p.og);
    setPets(prev => {
      const existing = prev.map(p => p.name);
      const newPets = ogPets.filter(p => !existing.includes(p.name));
      return [...prev, ...newPets];
    });
    setCosmetics(prev => [...new Set([...prev, ...OG_COSMETICS.map(c => c.id)])]);
  }, []);

  const buyCosmeticItem = useCallback((id, price) => {
    setScore(s => s - price);
    setCosmetics(prev => [...new Set([...prev, id])]);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
    setInventory({});
    setCombo(0);
  }, []);

  const mineCrystal = useCallback((type, baseValue, screenX, screenY, currentActivePotions, currentEquippedPickaxe, currentCombo) => {
    const pickaxeMultipliers = { wood: 1, stone: 1.5, iron: 2, gold: 2.5, crystal: 3, obsidian: 4, diamond: 5, ruby: 6, emerald: 7, dragon: 8, void: 10, cosmic: 15, god: 25 };
    const pickMult = pickaxeMultipliers[currentEquippedPickaxe] || 1;
    const doubleActive = currentActivePotions.some(p => p.name === 'double');
    const newCombo = currentCombo + 1;
    const comboMult = Math.min(newCombo, 8);
    const points = Math.floor(baseValue * pickMult * (doubleActive ? 2 : 1) * comboMult);

    // Coins: base coins from crystal type * pickaxe multiplier (smaller scale)
    const crystalDef = CRYSTAL_TYPES.find(c => c.name === type);
    const baseCoins = crystalDef ? crystalDef.coins : 1;
    const coinsEarned = Math.floor(baseCoins * pickMult);

    setScore(s => s + points);
    setCoins(c => c + coinsEarned);
    setCombo(newCombo);
    setInventory(inv => ({ ...inv, [type]: (inv[type] || 0) + 1 }));

    // Quest tracking
  
