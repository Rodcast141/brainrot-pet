import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Swords, Shield, Crown, X, Zap } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { BOSS_67 } from '../../lib/gameConstants';

export default function WorldBoss({ onClose }) {
  const { role, score, hatchEgg, setScore } = useGameStore();
  const [bossHp, setBossHp] = useState(BOSS_67.maxHp);
  const [phase, setPhase] = useState('idle'); // idle | fighting | dead | reward
  const [hits, setHits] = useState(0);
  const [rewardResult, setRewardResult] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [bossAttacking, setBossAttacking] = useState(false);
  const attackInterval = useRef(null);
  const isPrivileged = role === 'owner' || role === 'mod';

  const dropChance = isPrivileged ? 0.5 : 0.01;

  const startFight = () => {
    setPhase('fighting');
    setBossHp(BOSS_67.maxHp);
    setHits(0);
    // Boss periodically "attacks" (visual only)
    attackInterval.current = setInterval(() => {
      setBossAttacking(true);
      setTimeout(() => setBossAttacking(false), 400);
    }, 2500);
  };

  const attackBoss = () => {
    if (phase !== 'fighting') return;
    const dmg = 50 + Math.floor(Math.random() * 150);
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
    setHits(h => h + 1);
    setBossHp(prev => {
      const next = Math.max(0, prev - dmg);
      if (next === 0) {
        clearInterval(attackInterval.current);
        setTimeout(() => handleBossDead(), 500);
      }
      return next;
    });
  };

  const handleBossDead = () => {
    setPhase('dead');
    const roll = Math.random();
    const gotPet = roll < dropChance;
    const pet = gotPet ? { name: 'sixty_seven', label: 'SixtySeven', bonus: 'Legendary boss pet — +67% all gains', rarity: 'boss', color: '#ff6b35', emoji: '👹', bossOnly: true } : null;

    if (pet) hatchEgg(pet);
    setScore && setScore(s => s + BOSS_67.reward);

    setRewardResult({
      gotPet,
      chance: Math.round(dropChance * 100),
      roll: Math.round(roll * 100),
      boosted: isPrivileged,
    });
    setPhase('reward');
  };

  useEffect(() => {
    return () => clearInterval(attackInterval.current);
  }, []);

  const hpPercent = (bossHp / BOSS_67.maxHp) * 100;
  const hpColor = hpPercent > 60 ? '#ef4444' : hpPercent > 30 ? '#f97316' : '#fbbf24';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={phase === 'idle' || phase === 'reward' ? onClose : undefined}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-sm mx-4 rounded-3xl overflow-hidden border border-red-500/40 shadow-2xl shadow-red-500/20"
        style={{ background: 'linear-gradient(135deg, #0a0000, #1a0505)' }}
      >
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-red-500/20"
          style={{ background: 'linear-gradient(90deg, #ef444415, transparent)' }}>
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-400" />
            <span className="font-orbitron text-sm font-bold text-red-400 tracking-wider">WORLD BOSS</span>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6">
          {/* Boss display */}
          <motion.div
            animate={shaking ? { x: [-8, 8, -8, 8, 0] } : bossAttacking ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="text-center mb-6"
          >
            <div className="text-7xl mb-3 select-none">👹</div>
            <h2 className="font-orbitron text-xl font-bold text-red-400">{BOSS_67.name}</h2>
            <p className="font-inter text-xs text-white/40 mt-1">{BOSS_67.description}</p>
          </motion.div>

          {/* HP Bar */}
          {(phase === 'fighting' || phase === 'dead') && (
            <div className="mb-5">
              <div className="flex justify-between mb-1.5">
                <span className="font-orbitron text-xs text-white/50">HP</span>
                <span className="font-orbitron text-xs" style={{ color: hpColor }}>{bossHp.toLocaleString()} / {BOSS_67.maxHp.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${hpPercent}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${hpColor}, ${hpColor}99)`, boxShadow: `0 0 10px ${hpColor}60` }}
                />
              </div>
            </div>
          )}

          {/* Privilege warning */}
          {phase === 'idle' && (
            <div className={`mb-4 p-3 rounded-xl border text-center ${isPrivileged ? 'border-amber-500/30 bg-amber-500/10' : 'border-white/10 bg-white/5'}`}>
              {isPrivileged ? (
                <div className="flex items-center justify-center gap-2">
                  {role === 'owner' ? <Crown className="w-4 h-4 text-amber-400" /> : <Shield className="w-4 h-4 text-cyan-400" />}
                  <p className="font-orbitron text-xs text-amber-400">50% pet drop — {role.toUpperCase()} BONUS!</p>
                </div>
              ) : (
                <p className="font-inter text-xs text-white/40">No owner/mod present — 1% drop chance.<br /><span className="text-cyan-400/60">Owner/Mod presence = 50% drop!</span></p>
              )}
            </div>
          )}

          {/* IDLE */}
          {phase === 'idle' && (
            <button onClick={startFight}
              className="w-full py-3.5 rounded-2xl font-orbitron text-sm font-bold bg-gradient-to-r from-red-700 to-red-500 hover:from-red-600 hover:to-red-400 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
              <Swords className="w-4 h-4" />
              CHALLENGE BOSS
            </button>
          )}

          {/* FIGHTING */}
          {phase === 'fighting' && (
            <div className="space-y-3">
              {bossAttacking && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center font-orbitron text-xs text-red-400">💥 BOSS ATTACKS!</motion.p>
              )}
              <button onClick={attackBoss}
                className="w-full py-4 rounded-2xl font-orbitron text-base font-bold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all active:scale-95 shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                ATTACK! ({hits} hits)
              </button>
              <p className="text-center font-inter text-xs text-white/30">Keep clicking to deal damage!</p>
            </div>
          )}

          {/* REWARD */}
          {phase === 'reward' && rewardResult && (
            <AnimatePresence>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-2xl border text-center ${rewardResult.gotPet ? 'border-amber-500/50 bg-amber-500/10' : 'border-white/15 bg-white/5'}`}>
                {rewardResult.gotPet ? (
                  <>
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="font-orbitron text-sm font-bold text-amber-400">SIXTYSEVEN PET UNLOCKED!</p>
                    <p className="font-inter text-xs text-white/50 mt-1">+67% all gains forever</p>
                    <p className="font-inter text-xs text-white/30 mt-1">
                      {rewardResult.boosted ? '50% chance — Owner/Mod bonus!' : '1% chance — You got lucky!'}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-3xl mb-2">⚔️</div>
                    <p className="font-orbitron text-sm font-bold text-white/70">BOSS DEFEATED!</p>
                    <p className="font-inter text-xs text-white/40 mt-1">+{BOSS_67.reward.toLocaleString()} pts earned</p>
                    <p className="font-inter text-xs text-white/30 mt-2">
                      Pet drop: {rewardResult.chance}% chance — no luck this time.<br />
                      {!rewardResult.boosted && <span className="text-cyan-400/60">Get an Owner/Mod to boost to 50%!</span>}
                    </p>
                  </>
                )}
                <button onClick={onClose}
                  className="mt-4 w-full py-2.5 rounded-xl font-orbitron text-xs bg-white/10 hover:bg-white/15 text-white/70 transition-all">
                  CLOSE
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
