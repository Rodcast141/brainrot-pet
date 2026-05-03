import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Pickaxe, Eye, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GameIntro({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center px-6 max-w-lg"
      >
        {/* Crystal icon */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-8"
        >
          <div className="w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
            <Gem className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-orbitron text-4xl md:text-5xl font-bold tracking-wider mb-3 bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          CRYSTAL MINER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-inter text-muted-foreground text-lg mb-10"
        >
          Explore the cave. Mine rare crystals. Build your fortune.
        </motion.p>

        {/* Controls guide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 backdrop-blur-sm">
            <MousePointer className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="font-inter text-xs text-muted-foreground">Click to mine</p>
          </div>
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 backdrop-blur-sm">
            <Eye className="w-5 h-5 text-accent mx-auto mb-2" />
            <p className="font-inter text-xs text-muted-foreground">Drag to look</p>
          </div>
          <div className="bg-card/60 border border-border/50 rounded-xl p-4 backdrop-blur-sm">
            <Pickaxe className="w-5 h-5 text-chart-4 mx-auto mb-2" />
            <p className="font-inter text-xs text-muted-foreground">WASD to move</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="font-orbitron text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 border-0 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
          >
            ENTER THE CAVE
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
