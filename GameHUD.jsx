import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gem, Pickaxe, Trophy, Sparkles, Monitor, Shield, Crown, Egg, Zap, Star, Skull, ShoppingCart, ScrollText } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import ComputerTerminal from './ComputerTerminal';
import ModMenu from './ModMenu';
import ConveyorBelt from './ConveyorBelt';
import OGBundleShop from './OGBundleShop';
import WorldBoss from './WorldBoss';
import CoinShop from './CoinShop';
import GemShop from './GemShop';
import QuestBoard from './QuestBoard';

export default function GameHUD({ onSpawnCrystals, onChangeWorld }) {
  const { score, coins, gems, inventory, combo, floatingTexts, role, username, activePotions, equippedPickaxe, equippedPet, currentWorld, quests, dailyLoginGems } = useGameStore();
  const [showComputer, setShowComputer] = useState(false);
  const [showModMenu, setShowModMenu] = useState(false);
  const [showConveyor, setShowConveyor] = useState(false);
  const [showOGShop, setShowOGShop] = useState(false);
  const [showBoss, setShowBoss] = useState(false);
  const [showCoinShop, setShowCoinShop] = useState(false);
  const [showGemShop, setShowGemShop] = useState(false);
  const [showQuests, setShowQuests] = useState(false);

  const totalCrystals = Object.values(inventory).reduce((a, b) => a + b, 0);
  const isPrivileged = role === 'owner' || role === 'mod';
  const roleColor = role === 'owner' ? 'text-amber-400' : role === 'mod' ? 'text-cyan-400' : 'text-green-400';
  const pendingQuestClaims = quests.filter(q => q.completed && !q.claimed).length;

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 border-2 border-white/40 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-white/60 rounded-full" />
        </div>
      </div>

      {/* Top Score Bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-2.5 flex items-center gap-4"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="font-orbitron text-lg font-bold text-white">{score.toLocaleString()}</span>
          {combo > 1 && (
            <motion.div key={combo} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 bg-primary/30 rounded-full px-2 py-0.5">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="font-orbitron text-xs text-primary font-bold">x{combo}</span>
            </motion.div>
          )}
          {/* Coins */}
          <div className="flex items-center gap-1 border-l border-white/10 pl-3">
            <span className="text-sm">🪙</span>
            <span className="font-orbitron text-sm font-bold text-yellow-400">{coins.toLocaleString()}</span>
          </div>
          {/* Gems */}
          <div className="flex items-center gap-1 border-l border-white/10 pl-3">
            <span className="text-sm">💎</span>
            <span className="font-orbitron text-sm font-bold text-cyan-400">{gems}</span>
          </div>
          <span className="font-inter text-xs text-white/30 border-l border-white/10 pl-3 hidden sm:block">{currentWorld.replace(/_/g,' ')}</span>
        </motion.div>
      </div>

      {/* Daily login gems notification */}
      <AnimatePresence>
        {dailyLoginGems > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-cyan-950/90 border border-cyan-500/40 rounded-2xl px-5 py-2.5 font-orbitron text-sm text-cyan-400"
          >
            💎 +{dailyLoginGems} Daily Login Gems!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Panel - Crystals */}
      <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
        className="absolute top-20 left-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-3 w-44">
        <div className="flex items-center gap-2 mb-2">
          <Gem className="w-3.5 h-3.5 text-primary" />
          <span className="font-orbitron text-xs text-white/50 tracking-wider">CRYSTALS</span>
          <span className="font-orbitron text-xs text-white/30 ml-auto">{totalCrystals}</span>
        </div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {Object.entries(inventory).filter(([,v]) => v > 0).map(([type, count]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary/60" />
              <span className="font-inter text-xs text-white/50 flex-1 capitalize truncate">{type}</span>
              <span className="font-orbitron text-xs text-white/70">{count}</span>
            </div>
          ))}
          {totalCrystals === 0 && <p className="font-inter text-xs text-white/20 text-center py-1">Mine some!</p>}
        </div>
        {activePotions.length > 0 && (
          <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
            {activePotions.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <Zap className="w-2.5 h-2.5" style={{ color: p.color }} />
                <span className="font-inter text-xs truncate" style={{ color: p.color }}>{p.label}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Right panel - Gear */}
      <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        className="absolute top-20 right-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-3 min-w-[120px]">
        <div className="flex items-center gap-2 mb-2">
          <Pickaxe className="w-3.5 h-3.5 text-white/50" />
          <span className="font-orbitron text-xs text-white/50">GEAR</span>
        </div>
        <p className="font-inter text-xs text-white/70 capitalize">⛏ {equippedPickaxe}</p>
        {equippedPet && <p className="font-inter text-xs text-white/50 mt-1">🐾 {equippedPet.label}</p>}
        <div className={`mt-2 flex items-center gap-1.5 ${roleColor}`}>
          {role === 'owner' ? <Crown className="w-3 h-3" /> : role === 'mod' ? <Shield className="w-3 h-3" /> : null}
          <span className="font-orbitron text-xs">{username}</span>
        </div>
      </motion.div>

      {/* Bottom action buttons */}
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-auto flex-wrap justify-center max-w-[95vw]">

        <button onClick={() => setShowComputer(true)}
          className="flex items-center gap-2 bg-green-950/70 border border-green-700/40 backdrop-blur-md rounded-xl px-3 py-2 hover:bg-green-900/70 transition-all">
          <Monitor className="w-4 h-4 text-green-400" />
          <span className="font-orbitron text-xs text-green-400 hidden sm:block">COMPUTER</span>
        </button>

        <button onClick={() => setShowConveyor(true)}
          className="flex items-center gap-2 bg-purple-950/70 border border-purple-700/40 backdrop-blur-md rounded-xl px-3 py-2 hover:bg-purple-900/70 transition-all">
          <Egg className="w-4 h-4 text-purple-400" />
          <span className="font-orbitron text-xs text-purple-400 hidden sm:block">EGGS</span>
        </button>

        {/* Coin Shop */}
        <button onClick={() => setShowCoinShop(true)}
          className="flex items-center gap-2 bg-yellow-950/70 border border-yellow-700/40 backdrop-blur-md rounded-xl px-3 py-2 hover:bg-yellow-900/70 transition-all">
          <ShoppingCart className="w-4 h-4 text-yellow-400" />
          <span className="font-orbitron text-xs text-yellow-400 hidden sm:block">SHOP</span>
        </button>

        {/* Gem Shop */}
        <button onClick={() => setShowGemShop(true)}
          className="flex items-center gap-2 bg-cyan-950/70 border border-cyan-700/40 backdrop-blur-md rounded-xl px-3 py-2 hover:bg-cyan-900/70 transition-all">
