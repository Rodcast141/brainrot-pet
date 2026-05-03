import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Clock, Gift } from 'lucide-react';
import { useGameStore } from '../../lib/gameStore.jsx';
import { QUEST_DIFFICULTIES } from '../../lib/gameConstants';

export default function QuestBoard({ onClose }) {
  const { quests, gems, claimQuestReward } = useGameStore();

  const getDiff = (key) => QUEST_DIFFICULTIES.find(d => d.key === key);

  const completedCount = quests.filter(q => q.completed).length;
  const claimedCount = quests.filter(q => q.claimed).length;

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
        className="w-full max-w-lg rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0a0a1a, #001a08)' }}
      >
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-emerald-500/20"
          style={{ background: 'linear-gradient(90deg, #10b98115, transparent)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-orbitron text-sm font-bold text-emerald-400 tracking-wider">DAILY QUESTS</h2>
              <p className="font-inter text-xs text-white/40">{completedCount}/10 complete · Resets at midnight</p>
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

        {/* Gem rewards legend */}
        <div className="flex gap-2 px-6 pt-4 overflow-x-auto pb-1">
          {QUEST_DIFFICULTIES.map(d => (
            <div key={d.key} className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-xl ${d.bgColor} border ${d.borderColor}`}>
              <span className="font-orbitron text-xs font-bold" style={{ color: d.color }}>{d.label}</span>
              <span className="font-inter text-xs text-white/50">= 💎{d.gemReward}</span>
            </div>
          ))}
        </div>

        <div className="p-4 max-h-[65vh] overflow-y-auto space-y-2">
          {quests.map(q => {
            const diff = getDiff(q.difficulty);
            const pct = Math.min((q.progress / q.target) * 100, 100);
            return (
              <div key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  q.claimed ? 'border-white/5 bg-white/3 opacity-50' :
                  q.completed ? `${diff?.borderColor || 'border-white/15'} ${diff?.bgColor || 'bg-white/5'}` :
                  'border-white/10 bg-white/5'
                }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-orbitron text-xs font-bold text-white/80">{q.title}</span>
                      <span className="font-inter text-xs px-1.5 py-0.5 rounded-md" style={{ background: (diff?.color || '#fff') + '20', color: diff?.color || '#fff' }}>
                        {diff?.label}
                      </span>
                    </div>
                    <p className="font-inter text-xs text-white/40 mb-2">{q.desc}</p>
                    {/* Progress bar */}
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: diff?.color || '#fff' }} />
                    </div>
                    <p className="font-inter text-xs text-white/30 mt-1">{q.progress.toLocaleString()} / {q.target.toLocaleString()}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1 font-orbitron text-xs" style={{ color: diff?.color }}>
                      💎 {diff?.gemReward}
                    </div>
                    {q.completed && !q.claimed ? (
                      <button onClick={() => claimQuestReward(q.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-black font-orbitron text-xs hover:bg-emerald-400 transition-all">
                        <Gift className="w-3 h-3" /> Claim
                      </button>
                    ) : q.claimed ? (
                      <span className="font-orbitron text-xs text-white/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Done</span>
                    ) : (
                      <span className="text-white/20"><Clock className="w-4 h-4" /></span>
                    )}
                  </div>
                </div>
              </div>
 
