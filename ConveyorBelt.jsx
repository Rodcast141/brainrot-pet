import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Egg, Sparkles, ChevronRight, Globe } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { PET_TYPES } from '../../lib/gameConstants';

const rarityColors = {
  common: '#6b7280',
  uncommon: '#22c55e',
  rare: '#3b82f6',
  epic: '#8b5cf6',
  legendary: '#f59e0b',
};

const EGG_ITEMS = PET_TYPES.map((pet, i) => ({
  id: i,
  pet,
  cost: { common: 50, uncommon: 150, rare: 400, epic: 1000, legendary: 3000 }[pet.rarity],
  hatching: false,
}));

export default function ConveyorBelt({ onClose }) {
  const { score, hatchEgg, pets } = useGameStore();
  const [hatchingId, setHatchingId] = useState(null);
  const [hatchedPet, setHatchedPet] = useState(null);

  const handleHatch = (item) => {
    if (score < item.cost) return;
    if (hatchingId !== null) return;
    setHatchingId(item.id);
    setTimeout(() => {
      setHatchingId(null);
      setHatchedPet(item.pet);
      hatchEgg(item.pet);
    }, 2000);
  };

  const alreadyOwned = (petName) => pets.some(p => p.name === petName);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full max-w-2xl rounded-t-3xl border-t border-x border-purple-500/30 bg-background/95 backdrop-blur-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Egg className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm font-bold text-white tracking-wider">EGG CONVEYOR</h2>
              <p className="font-inter text-xs text-white/40">Hatch eggs to unlock pets & worlds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-orbitron text-xs text-amber-400">{score.toLocaleString()} pts</span>
            <button onClick={onClose} className="text-white/40 hover:text-white/70 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hatched pet reveal */}
        <AnimatePresence>
          {hatchedPet && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-6 mt-4 p-4 rounded-2xl border border-white/20 bg-white/5 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: hatchedPet.color + '30' }}>
                🐾
              </div>
              <div>
                <p className="font-orbitron text-sm font-bold" style={{ color: rarityColors[hatchedPet.rarity] }}>
                  {hatchedPet.label} hatched!
                </p>
                <p className="font-inter text-xs text-white/50">{hatchedPet.bonus}</p>
              </div>
              <Sparkles className="w-5 h-5 ml-auto" style={{ color: rarityColors[hatchedPet.rarity] }} />
              <button onClick={() => setHatchedPet(null)} className="text-white/30 hover:text-white/60">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conveyor belt - scrollable */}
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3 px-6 py-5 min-w-max">
            {EGG_ITEMS.map((item) => {
              const owned = alreadyOwned(item.pet.name);
              const isHatching = hatchingId === item.id;
              const canAfford = score >= item.cost;

              return (
                <motion.div
                  key={item.id}
                  animate={isHatching ? { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
                  transition={isHatching ? { duration: 0.3, repeat: 6 } : {}}
                  className={`w-32 flex-shrink-0 rounded-2xl border p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    owned
                      ? 'border-green-500/40 bg-green-500/10'
                      : canAfford
                        ? 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                        : 'border-white/10 bg-white/3 opacity-60'
                  }`}
                  onClick={() => !owned && handleHatch(item)}
                >
                  <div className="text-3xl">{isHatching ? '✨' : owned ? '🐾' : '🥚'}</div>
                  <div
                    className="text-xs font-orbitron font-bold px-2 py-0.5 rounded-full"
                    style={{ color: rarityColors[item.pet.rarity], background: rarityColors[item.pet.rarity] + '20' }}
                  >
                    {item.pet.rarity.toUpperCase()}
                  </div>
                  <p className="font-orbitron text-xs text-white/70 text-center leading-tight">{item.pet.label}</p>
                  <p className="font-inter text-xs text-white/40 text-center leading-tight">{item.pet.bonus}</p>
                  {owned ? (
                    <span className="font-orbitron text-xs text-green-400">OWNED</span>
                  ) : (
                    <div className={`flex items-center gap-1 font-orbitron text-xs ${canAfford ? 'text-amber-400' : 'text-white/30'}`}>
                      <span>{item.cost}</span>
                      <span className="text-white/30">pts</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Belt visual */}
        <div className="h-2 mx-6 mb-4 rounded-full bg-gradient-to-r from-purple-900 via-purple-600 to-purple-900 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="h-full w-16 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"
          />
        </div>
      </motion.div>
 
