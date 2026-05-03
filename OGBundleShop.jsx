import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Crown, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { OG_BUNDLE, OG_COSMETICS, PET_TYPES, COSMETICS_67 } from '../../lib/gameConstants';

export default function OGBundleShop({ onClose }) {
  const { score, pets, cosmetics = [], buyOGBundle, buyCosmeticItem } = useGameStore();
  const [tab, setTab] = useState('bundle');
  const [bought, setBought] = useState(false);

  const hasOGBundle = pets.some(p => p.og);
  const canAffordBundle = score >= OG_BUNDLE.price;

  const handleBuyBundle = () => {
    if (!canAffordBundle || hasOGBundle) return;
    buyOGBundle();
    setBought(true);
  };

  const ownedCosmetics = cosmetics || [];

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
        className="w-full max-w-lg rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl shadow-amber-500/10"
        style={{ background: 'linear-gradient(135deg, #0a0a1a, #1a0f00)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-amber-500/20"
          style={{ background: 'linear-gradient(90deg, #f59e0b15, transparent)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm font-bold text-amber-400 tracking-wider">CRYSTAL SHOP</h2>
              <p className="font-inter text-xs text-white/40">OG Bundle · 67 Cosmetics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">{score.toLocaleString()} pts</span>
            <button onClick={onClose} className="text-white/40 hover:text-white/70"><X className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4">
          {['bundle', 'og_cosmetics', '67_cosmetics'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl font-orbitron text-xs tracking-wider transition-all ${
                tab === t ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400' : 'text-white/30 hover:text-white/60'
              }`}>
              {t === 'bundle' ? 'OG BUNDLE' : t === 'og_cosmetics' ? 'OG COSMETICS' : '67 COSMETICS'}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* OG BUNDLE TAB */}
          {tab === 'bundle' && (
            <div>
              <div className="rounded-2xl border border-amber-500/30 p-5 mb-4"
                style={{ background: 'linear-gradient(135deg, #f59e0b10, #f97316_08)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">⭐</span>
                  <div>
                    <h3 className="font-orbitron text-base font-bold text-amber-400">OG BUNDLE</h3>
                    <p className="font-inter text-xs text-white/50">{OG_BUNDLE.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="font-orbitron text-xs text-white/40 tracking-wider">INCLUDES:</p>
                  {['🔥 OG Phoenix Pet', '🐍 OG Serpent Pet', '⚡ OG Titan Pet', '👑 OG Crown', '🌟 OG Aura', '✨ OG Trail', '🔥 OG Flame Wings', '🏆 OG Tag', '⭐ OG Status Badge'].map(item => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="font-inter text-xs text-white/70">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-orbitron text-xl font-bold text-amber-400">{OG_BUNDLE.price.toLocaleString()} pts</span>
                  {hasOGBundle ? (
                    <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/40 px-4 py-2 rounded-xl">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="font-orbitron text-xs text-green-400">OWNED</span>
                    </div>
                  ) : (
                    <button onClick={handleBuyBundle}
                      disabled={!canAffordBundle}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron text-xs font-bold transition-all ${
                        canAffordBundle
                          ? 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/30'
 
