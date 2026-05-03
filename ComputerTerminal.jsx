import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, User, RotateCcw, Zap, ChevronRight, Shield, Crown, X } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';

export default function ComputerTerminal({ onClose }) {
  const { username, role, setUsername, turnMode, setTurnMode } = useGameStore();
  const [inputName, setInputName] = useState(username);
  const [tab, setTab] = useState('profile'); // 'profile' | 'settings'
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setUsername(inputName);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const roleColor = role === 'owner' ? 'text-amber-400' : role === 'mod' ? 'text-cyan-400' : 'text-green-400';
  const roleIcon = role === 'owner' ? <Crown className="w-4 h-4" /> : role === 'mod' ? <Shield className="w-4 h-4" /> : null;
  const roleLabel = role === 'owner' ? 'OWNER' : role === 'mod' ? 'MOD' : 'PLAYER';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm mx-4 rounded-2xl overflow-hidden border border-green-500/40 shadow-2xl shadow-green-500/20"
        style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1a0d 100%)' }}
      >
        {/* Monitor header */}
        <div className="bg-green-950/80 border-b border-green-500/30 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-green-400" />
            <span className="font-orbitron text-green-400 text-sm font-bold tracking-widest">CRYSTAL OS v1.0</span>
          </div>
          <button onClick={onClose} className="text-green-600 hover:text-green-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scanlines effect */}
        <div className="relative p-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,70,0.02) 2px, rgba(0,255,70,0.02) 4px)'
        }}>
          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {['profile', 'settings'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg font-orbitron text-xs tracking-wider transition-all ${
                  tab === t
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'border border-green-900/50 text-green-800 hover:text-green-600'
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Current status */}
                <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-black/40 border border-green-900/40`}>
                  {roleIcon && <span className={roleColor}>{roleIcon}</span>}
                  <span className={`font-orbitron text-xs font-bold ${roleColor}`}>{roleLabel}</span>
                  <span className="font-inter text-green-600 text-xs ml-auto">{username}</span>
                </div>

                <label className="block font-orbitron text-xs text-green-600 mb-2 tracking-wider">
                  &gt; ENTER USERNAME
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-green-600" />
                    <input
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                      className="w-full bg-black/60 border border-green-700/50 rounded-lg pl-8 pr-3 py-2.5 font-orbitron text-sm text-green-300 focus:outline-none focus:border-green-400 placeholder:text-green-900"
                      placeholder="your_username"
                      maxLength={30}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-900 text-xs font-orbitron animate-pulse">_</span>
                  </div>
                  <button
                    onClick={handleSave}
                    className="px-3 rounded-lg bg-green-700/30 border border-green-600/40 text-green-400 hover:bg-green-600/40 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {saved && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-green-400 font-orbitron text-xs">
                    &gt; IDENTITY CONFIRMED
                  </motion.p>
                )}

                <p className="mt-4 text-green-900 font-inter text-xs leading-relaxed">
                  Type your special username to unlock owner or mod privileges.
                </p>
              </motion.div>
            )}

            {tab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <label className="block font-orbitron text-xs text-green-600 mb-3 tracking-wider">
                  &gt; TURN MODE
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTurnMode('smooth')}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      turnMode === 'smooth'
                        ? 'border-green-500/60 bg-green-500/15 text-green-300'
                        : 'border-green-900/40 text-green-800 hover:border-green-700/40'
                    }`}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="font-orbitron text-xs">SMOOTH</span>
                    <span className="font-inter text-xs opacity-60">Gradual rotation</span>
                  </button>
                  <button
                    onClick={() => setTurnMode('snap')}
                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                      turnMode === 'snap'
                        ? 'border-green-500/60 bg-green-500/15 text-green-300'
                        : 'border-green-900/40 text-green-800 hover:border-green-700/40'
                    }`}
                  >
                    <Zap className="w-5 h-5" />
                    <span className="font-orbitron text-xs">SNAP</span>
                    <span className="font-inter text-xs opacity-60">45° jumps</span>
                  </button>
                </div>
                <p className="mt-4 text-green-700 font-inter text-xs">
                  Active: <span className="text-green-400 font-orbitron">{turnMode.toUpperCase()} TURN</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
