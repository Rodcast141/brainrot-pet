import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingCart, Check } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { PICKAXE_TYPES, POTION_TYPES } from '../../lib/gameConstants';

export default function CoinShop({ onClose }) {
  const { coins, ownedPickaxes, equippedPickaxe, setEquippedPickaxe, buyPickaxe, buyPotion, activePotions } = useGameStore();
  const [tab, setTab] = useState('pickaxes');

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
        className="w-full max-w-lg rounded-3xl overflow-hidden border border-yellow-500/30 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0a0a1a, #1a1500)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-yellow-500/20"
          style={{ background: 'linear-gradient(90deg, #eab30815, transparent)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm font-bold text-yellow-400 tracking-wider">COIN SHOP</h2>
              <p className="font-inter text-xs text-white/40">Pickaxes · Potions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full">
              <span className="text-sm">🪙</span>
              <span className="font-orbitron text-sm font-bold text-yellow-400">{coins.toLocaleString()}</span>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white/70"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-6 pt-4">
          {[{ key: 'pickaxes', label: '⛏ Pickaxes' }, { key: 'potions', label: '🧪 Potions' }].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-xl font-orbitron text-xs tracking-wider transition-all border ${
                tab === t.key ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400' : 'text-white/30 hover:text-white/60 border-white/5'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-2">
          {/* PICKAXES */}
          {tab === 'pickaxes' && PICKAXE_TYPES.map(pk => {
            const owned = ownedPickaxes.includes(pk.name);
            const equipped = equippedPickaxe === pk.name;
            const canAfford = coins >= pk.coinCost;
            return (
              <div key={pk.name}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  equipped ? 'border-green-500/50 bg-green-500/10' : owned ? 'border-white/15 bg-white/5' : 'border-white/8 bg-white/3'
                }`}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: pk.color + '20', border: `1px solid ${pk.color}40` }}>
                  {pk.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-orbitron text-xs font-bold" style={{ color: pk.color }}>{pk.label}</p>
                  <p className="font-inter text-xs text-white/40">x{pk.multiplier} multiplier</p>
                </div>
                <div className="shrink-0">
                  {pk.coinCost === 0 ? (
                    equipped
                      ? <span className="font-orbitron text-xs text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Equipped</span>
                      : <button onClick={() => setEquippedPickaxe(pk.name)} className="font-orbitron text-xs text-white/50 border border-white/15 px-2 py-1 rounded-lg hover:bg-white/10 transition-all">Equip</button>
                  ) : owned ? (
                    equipped
                      ? <span className="font-orbitron text-xs text-green-400 flex items-center gap-1"><Check className="w-3 h-3" /> Equipped</span>
                      : <button onClick={() => setEquippedPickaxe(pk.name)} className="font-orbitron text-xs text-white/50 border border-white/15 px-2 py-1 rounded-lg hover:bg-white/10 transition-all">Equip</button>
                  ) : (
                    <button
                      onClick={() => canAfford && buyPickaxe(pk)}
                      disabled={!canAfford}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-orbitron text-xs transition-all ${
                        canAfford ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white/5 text-white/25 cursor-not-allowed border border-white/10'
                      }`}>
                      🪙 {pk.coinCost.toLocaleString()}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* POTIONS */}
          {tab === 'potions' && POTION_TYPES.map(p => {
            const active = activePotions.some(ap => ap.name === p.name);
            const canAfford = coins >= p.coinCost;
            return (
              <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 text-lg"
                  style={{ borderColor: p.color, background: p.color + '15' }}>
                  🧪
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-orbitron text-xs font-bold" style={{ color: p.color }}>{p.label}</p>
                  <p className="font-inter text-xs text-white/40">{p.effect}</p>
                </div>
                {active ? (
                  <span className="font-orbitron text-xs text-green-400 shrink-0">Active!</span>
                ) : (
                  <button
                    onClick={() => canAfford && buyPotion(p)}
                    disabled={!canAfford}
                    className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl font-orbitron text-xs transition-all ${
                      canAfford ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white/5 text-white/25 cursor-not-allowed border border-white/10'
                    }`}>
                    🪙 {p.coinCost}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
