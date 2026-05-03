import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Sparkles, Globe, RefreshCw, Zap, X, ChevronRight } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { POTION_TYPES, WORLD_TYPES, PICKAXE_TYPES } from '../../lib/gameConstants';

export default function ModMenu({ onClose, onSpawnCrystals, onChangeWorld }) {
  const { username, role, score, resetScore, spawnPotion, setEquippedPickaxe, equippedPickaxe, setCurrentWorld, currentWorld } = useGameStore();
  const isOwner = role === 'owner';
  const [tab, setTab] = useState('tools');

  const roleColor = isOwner ? 'text-amber-400' : 'text-cyan-400';
  const borderColor = isOwner ? 'border-amber-500/40' : 'border-cyan-500/40';
  const bgAccent = isOwner ? 'bg-amber-500/15' : 'bg-cyan-500/15';
  const icon = isOwner ? <Crown className="w-5 h-5 text-amber-400" /> : <Shield className="w-5 h-5 text-cyan-400" />;

  const tabs = isOwner ? ['tools', 'world', 'pickaxe', 'admin'] : ['tools'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        className={`w-full max-w-sm mx-4 rounded-2xl overflow-hidden border ${borderColor} shadow-2xl`}
        style={{ background: 'linear-gradient(135deg, #0a0a1a, #0d0a1a)' }}
      >
        {/* Header */}
        <div className={`px-5 py-3 flex items-center justify-between border-b ${borderColor}`}>
          <div className="flex items-center gap-2">
            {icon}
            <span className={`font-orbitron text-sm font-bold ${roleColor} tracking-widest`}>
              {isOwner ? 'OWNER' : 'MOD'} MENU
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-inter text-xs text-white/40">{username}</span>
            <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* Tabs */}
          {tabs.length > 1 && (
            <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
              {tabs.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg font-orbitron text-xs tracking-wider transition-all ${
                    tab === t ? `${bgAccent} border ${borderColor} ${roleColor}` : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* TOOLS TAB */}
          {tab === 'tools' && (
            <div className="space-y-3">
              <p className="font-orbitron text-xs text-white/30 tracking-wider mb-3">&gt; POTIONS</p>
              {POTION_TYPES.map(p => (
                <button
                  key={p.name}
                  onClick={() => spawnPotion(p)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: p.color, background: p.color + '20' }}>
                    <Zap className="w-3.5 h-3.5" style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-orbitron text-xs" style={{ color: p.color }}>{p.label}</p>
                    <p className="font-inter text-xs text-white/40 truncate">{p.effect}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
                </button>
              ))}

              <button
                onClick={onSpawnCrystals}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-orbitron text-xs text-primary">Spawn Crystal Rain</span>
              </button>
            </div>
          )}

          {/* WORLD TAB (owner only) */}
          {tab === 'world' && (
            <div className="space-y-3">
              <p className="font-orbitron text-xs text-white/30 tracking-wider mb-3">&gt; TELEPORT WORLD</p>
              {WORLD_TYPES.map(w => (
                <button
                  key={w.name}
                  onClick={() => { setCurrentWorld(w.name); onChangeWorld && onChangeWorld(w.name); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
 
