import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Gem } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { GEM_COSMETICS } from '../../lib/gameConstants';

const RARITIES = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
const RARITY_COLORS = {
  common:    '#9ca3af',
  uncommon:  '#4ade80',
  rare:      '#60a5fa',
  epic:      '#a855f7',
  legendary: '#f59e0b',
};

export default function GemShop({ onClose }) {
  const { gems, gemCosmetics, buyGemCosmetic } = useGameStore();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? GEM_COSMETICS : GEM_COSMETICS.filter(c => c.rarity === filter);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.85, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 30 }}
        className="w-full max-w-lg rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0a0a1a, #001515)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-cyan-500/20"
          style={{ background: 'linear-gradient(90deg, #06b6d415, transparent)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center">
              <Gem className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm font-bold text-cyan-400 tracking-wider">GEM SHOP</h2>
              <p className="font-inter text-xs text-white/40">Cosmetics · Earn gems from quests & daily login</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              <span className="text-sm">💎</span>
              <span className="font-orbitron text-sm font-bold text-cyan-400">{gems}</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white/70"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Rarity filter */}
        <div className="flex gap-1.5 px-6 pt-4 overflow-x-auto pb-1">
          {['all', ...RARITIES].map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`shrink-0 px-3 py-1.5 rounded-xl font-orbitron text-xs tracking-wider transition-all capitalize ${
                filter === r
                  ? 'border text-white'
                  : 'text-white/30 hover:text-white/60 border border-white/5'
              }`}
              style={filter === r ? { borderColor: r === 'all' ? '#06b6d4' : RARITY_COLORS[r], background: (r === 'all' ? '#06b6d4' : RARITY_COLORS[r]) + '20', color: r === 'all' ? '#06b6d4' : RARITY_COLORS[r] } : {}}>
              {r === 'all' ? 'All' : r}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {filtered.map(c => {
              const owned = gemCosmetics.includes(c.id);
              const canAfford = gems >= c.gemCost;
              const rarityColor = RARITY_COLORS[c.rarity];
              return (
                <button
                  key={c.id}
                  onClick={() => !owned && canAfford && buyGemCosmetic(c.id, c.gemCost)}
                  disabled={owned || !canAfford}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
                    owned ? 'border-green-500/40 bg-green-500/10' :
                    canAfford ? 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/25' :
                    'border-white/5 bg-white/3 opacity-40'
                  }`}>
                  <span className="text-3xl">{c.emoji}</span>
                  <div>
                    <p className="font-orbitron text-xs font-bold truncate w-full" style={{ color: rarityColor }}>{c.name}</p>
                    <p className="font-inter text-xs capitalize" style={{ color: rarityColor + 'aa' }}>{c.rarity}</p>
                  </div>
                  {owned ? (
                    <span className="font-orbitron text-xs text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Owned</span>
                  ) : (
                    <span className="font-orbitron text-xs text-cyan-400">💎 {c.gemCost}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
 
