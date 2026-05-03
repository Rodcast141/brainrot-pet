import React, { useState } from 'react';
import { GameProvider } from '../lib/gameStore.jsx';
import GameIntro from '../components/game/GameIntro';
import GameHUD from '../components/game/GameHUD';
import CrystalScene from '../components/game/CrystalScene';

function GameInner() {
  const [gameStarted, setGameStarted] = useState(false);
  const [spawnSignal, setSpawnSignal] = useState(0);
  const [worldSignal, setWorldSignal] = useState(null);

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {!gameStarted ? (
        <GameIntro onStart={() => setGameStarted(true)} />
      ) : (
        <>
          <CrystalScene spawnSignal={spawnSignal} worldSignal={worldSignal} />
          <GameHUD
            onSpawnCrystals={() => setSpawnSignal(s => s + 1)}
            onChangeWorld={(w) => setWorldSignal(w)}
          />
        </>
      )}
    </div>
  );
}

export default function CrystalMiner() {
  return (
    <GameProvider>
      <GameInner />
    </GameProvider>
  );
}
