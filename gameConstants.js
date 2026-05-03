export const OWNERS = ['rusty.gamer32', 'drelly', 'lars vr'];
export const MODS = ['mattsamp', 'lucasinopunchini'];

export const CRYSTAL_TYPES = [
  { name: 'amethyst',    color: 0x9b59b6, emissive: 0x8e44ad, value: 10,   rarity: 0.18, label: 'Amethyst',     hexColor: '#a855f7', coins: 2  },
  { name: 'sapphire',   color: 0x3498db, emissive: 0x2980b9, value: 25,   rarity: 0.15, label: 'Sapphire',    hexColor: '#60a5fa', coins: 4  },
  { name: 'emerald',    color: 0x2ecc71, emissive: 0x27ae60, value: 40,   rarity: 0.14, label: 'Emerald',     hexColor: '#4ade80', coins: 6  },
  { name: 'topaz',      color: 0xf39c12, emissive: 0xe67e22, value: 60,   rarity: 0.12, label: 'Topaz',       hexColor: '#fbbf24', coins: 8  },
  { name: 'ruby',       color: 0xe74c3c, emissive: 0xc0392b, value: 100,  rarity: 0.08, label: 'Ruby',        hexColor: '#f87171', coins: 12 },
  { name: 'diamond',    color: 0xecf0f1, emissive: 0x89CFF0, value: 250,  rarity: 0.06, label: 'Diamond',     hexColor: '#a5f3fc', coins: 20 },
  { name: 'obsidian',   color: 0x2d3436, emissive: 0x6c5ce7, value: 75,   rarity: 0.09, label: 'Obsidian',    hexColor: '#7c3aed', coins: 10 },
  { name: 'sunstone',   color: 0xff6b35, emissive: 0xff4500, value: 130,  rarity: 0.05, label: 'Sunstone',    hexColor: '#fb923c', coins: 15 },
  { name: 'moonstone',  color: 0xe8e8ff, emissive: 0xb0b0ff, value: 180,  rarity: 0.04, label: 'Moonstone',   hexColor: '#c7d2fe', coins: 18 },
  { name: 'voidcrystal',color: 0x1a0030, emissive: 0xff00ff, value: 400,  rarity: 0.03, label: 'Void Crystal', hexColor: '#e879f9', coins: 35 },
  { name: 'stardust',   color: 0xffffff, emissive: 0xffee00, value: 500,  rarity: 0.02, label: 'Stardust',    hexColor: '#fef08a', coins: 50 },
  { name: 'lava',       color: 0xff3300, emissive: 0xff6600, value: 90,   rarity: 0.04, label: 'Lava Crystal', hexColor: '#ef4444', coins: 11 },
];

// Potions — bought with COINS
export const POTION_TYPES = [
  { name: 'speed',   color: '#22d3ee', label: 'Speed Potion',    effect: 'Move 2x faster for 15s',    duration: 15000, coinCost: 30  },
  { name: 'magnet',  color: '#a78bfa', label: 'Magnet Potion',   effect: 'Auto-mine nearby crystals',  duration: 10000, coinCost: 50  },
  { name: 'double',  color: '#fbbf24', label: 'Double Potion',   effect: '2x crystal value for 20s',   duration: 20000, coinCost: 60  },
  { name: 'glow',    color: '#4ade80', label: 'Glow Potion',     effect: 'See rare crystals for 30s',  duration: 30000, coinCost: 40  },
  { name: 'combo',   color: '#f87171', label: 'Combo Elixir',    effect: 'Combo never resets for 15s', duration: 15000, coinCost: 70  },
  { name: 'luck',    color: '#fb923c', label: 'Luck Potion',     effect: '+50% rare crystal chance',   duration: 25000, coinCost: 80  },
  { name: 'hyper',   color: '#e879f9', label: 'Hyper Potion',    effect: '3x mining speed for 10s',    duration: 10000, coinCost: 100 },
];

export const PET_TYPES = [
  { name: 'crystal_fox',  label: 'Crystal Fox',   bonus: '+5% crystal value',   rarity: 'common',    color: '#f97316', og: false },
  { name: 'lava_lizard',  label: 'Lava Lizard',   bonus: '+10% speed',          rarity: 'uncommon',  color: '#ef4444', og: false },
  { name: 'gem_dragon',   label: 'Gem Dragon',    bonus: '+15% crystal value',  rarity: 'rare',      color: '#8b5cf6', og: false },
  { name: 'moon_owl',     label: 'Moon Owl',      bonus: '2x combo multiplier', rarity: 'rare',      color: '#c7d2fe', og: false },
  { name: 'star_bunny',   label: 'Star Bunny',    bonus: 'Auto collects gems',  rarity: 'epic',      color: '#06b6d4', og: false },
  { name: 'void_cat',     label: 'Void Cat',      bonus: 'Finds secret caves',  rarity: 'legendary', color: '#ec4899', og: false },
  // OG Pets
  { name: 'og_phoenix',   label: 'OG Phoenix',    bonus: 'Revive once per run', rarity: 'og',        color: '#f59e0b', og: true,  emoji: '🔥' },
  { name: 'og_serpent',   label: 'OG Serpent',    bonus: '3x all crystal value',rarity: 'og',        color: '#22c55e', og: true,  emoji: '🐍' },
  { name: 'og_titan',     label: 'OG Titan',      bonus: 'Infinite combo timer',rarity: 'og',        color: '#6366f1', og: true,  emoji: '⚡' },
  // BOSS PET
  { name: 'sixty_seven',  label: 'SixtySeven',    bonus: 'Legendary boss pet — +67% all gains', rarity: 'boss', color: '#ff6b35', og: false, emoji: '👹', bossOnly: true },
];

export const WORLD_TYPES = [
  { name: 'crystal_cave', label: 'Crystal Cave',  description: 'Classic cave with amethysts', color: '#8b5cf6' },
  { name: 'lava_depths',  label: 'Lava Depths',   description: 'Hot zone with lava crystals', color: '#ef4444' },
  { name: 'moon_quarry',  label: 'Moon Quarry',   description: 'Low gravity moon mining',     color: '#c7d2fe' },
  { name: 'void_realm',   label: 'Void Realm',    description: 'Rare void crystals await',    color: '#ec4899' },
];

// Pickaxes — bought with COINS
export const PICKAXE_TYPES = [
  { name: 'wood',       label: 'Wood Pickaxe',       multiplier: 1,    color: '#92400e', coinCost: 0,     emoji: '🪵' },
  { name: 'stone',      label: 'Stone Pickaxe',      multiplier: 1.5,  color: '#6b7280', coinCost: 50,    emoji: '🪨' },
  { name: 'iron',       label: 'Iron Pickaxe',       multiplier: 2,    color: '#9ca3af', coinCost: 120,   emoji: '⚙️' },
  { name: 'gold',       label: 'Gold Pickaxe',       multiplier: 2.5,  color: '#f59e0b', coinCost: 200,   emoji: '🥇' },
  { name: 'crystal',    label: 'Crystal Pickaxe',    multiplier: 3,    color: '#818cf8', coinCost: 350,   emoji: '💠' },
  { name: 'obsidian',   label: 'Obsidian Pickaxe',   multiplier: 4,    color: '#7c3aed', coinCost: 550,   emoji: '🟣' },
  { name: 'diamond',    label: 'Diamond Pickaxe',    multiplier: 5,    color: '#67e8f9', coinCost: 800,   emoji: '💎' },
  { name: 'ruby',       label: 'Ruby Pickaxe',       multiplier: 6,    color: '#f87171', coinCost: 1100,  emoji: '🔴' },
  { name: 'emerald',    label: 'Emerald Pickaxe',    multiplier: 7,    color: '#4ade80', coinCost: 1500,  emoji: '💚' },
  { name: 'dragon',     label: 'Dragon Pickaxe',     multiplier: 8,    color: '#fb923c', coinCost: 2000,  emoji: '🐉' },
  { name: 'void',       label: 'Void Pickaxe',       multiplier: 10,   color: '#c084fc', coinCost: 3000,  emoji: '🌑' },
  { name: 'cosmic',     label: 'Cosmic Pickaxe',     multiplier: 15,   color: '#fef08a', coinCost: 5000,  emoji: '🌟' },
  { name: 'god',        label: "God's Pickaxe",      multiplier: 25,   color: '#ff6b35', coinCost: 10000, emoji: '⚡' },
];

// QUEST DEFINITIONS
export const QUEST_DIFFICULTIES = [
  { key: 'easy',         label: 'Easy',         gemReward: 5,  color: '#4ade80',  bgColor: 'bg-green-500/10',  borderColor: 'border-green-500/30'  },
  { key: 'medium_easy',  label: 'Med-Easy',     gemReward: 10, color: '#a3e635',  bgColor: 'bg-lime-500/10',   borderColor: 'border-lime-500/30'   },
  { key: 'medium',       label: 'Medium',       gemReward: 25, color: '#fbbf24',  bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
  { key: 'medium_hard',  label: 'Med-Hard',     gemReward: 30, color: '#fb923c',  bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' },
  { key: 'hard',         label: 'Hard',         gemReward: 50, color: '#f87171',  bgColor: 'bg-red-500/10',    borderColor: 'border-red-500/30'    },
];

export const QUEST_POOL = [
  // EASY (5 gems)
  { id: 'q_mine_10',       difficulty: 'easy',        title: 'First Steps',         desc: 'Mine 10 crystals',                  target: 10,  type: 'mine_count'   },
  { id: 'q_mine_25',       difficulty: 'easy',        title: 'Getting Warmed Up',   desc: 'Mine 25 crystals',                  target: 25,  type: 'mine_count'   },
  { id: 'q_score_500',     difficulty: 'easy',        title: 'Pocket Change',       desc: 'Reach 500 score',                   target: 500, type: 'score'        },
  { id: 'q_combo_3',       difficulty: 'easy',        title: 'On a Roll',           desc: 'Get a 3x combo',                    target: 3,   type: 'combo'        },
  // MEDIUM-EASY (10 gems)
  { id: 'q_mine_50',       difficulty: 'medium_easy', title: 'Steady Miner',        desc: 'Mine 50 crystals',                  target: 50,  type: 'mine_count'   },
  { id: 'q_score_2000',    difficulty: 'medium_easy', title: 'Building Wealth',     desc: 'Reach 2,000 score',                 target: 2000,type: 'score'        },
  { id: 'q_coins_50',      difficulty: 'medium_easy', title: 'Coin Collector',      desc: 'Earn 50 coins',                     target: 50,  type: 'coins'        },
  { id: 'q_mine_ruby',     difficulty: 'medium_easy', title: 'Red Eye',             desc: 'Mine 5 Ruby crystals',              target: 5,   type: 'mine_type', crystalType: 'ruby' },
  // MEDIUM (25 gems)
  { id: 'q_mine_100',      difficulty: 'medium',      title: 'Century Miner',       desc: 'Mine 100 crystals',                 target: 100, type: 'mine_count'   },
  { id: 'q_score_10000',   difficulty: 'medium',      title: 'Getting Rich',        desc: 'Reach 10,000 score',                target: 10000,type:'score'        },
  { id: 'q_combo_6',       difficulty: 'medium',      title: 'Combo King',          desc: 'Get a 6x combo',                    target: 6,   type: 'combo'        },
  { id: 'q_coins_200',     difficulty: 'medium',      title: 'Coin Hoarder',        desc: 'Earn 200 coins',                    target: 200, type: 'coins'        },
  { id: 'q_mine_void',     difficulty: 'medium',      title: 'Void Walker',         desc: 'Mine 3 Void Crystals',              target: 3,   type: 'mine_type', crystalType: 'voidcrystal' },
  { id: 'q_buy_potion',    difficulty: 'medium',      title: 'Alchemist',           desc: 'Buy 3 potions',                     target: 3,   type: 'buy_potions'  },
  // MEDIUM-HARD (30 gems)
  { id: 'q_mine_250',      difficulty: 'medium_hard', title: 'Hardcore Miner',      desc: 'Mine 250 crystals',                 target: 250, type: 'mine_count'   },
  { id: 'q_score_50000',   difficulty: 'medium_hard', title: 'Fortune Builder',     desc: 'Reach 50,000 score',                target: 50000,type:'score'        },
  { id: 'q_combo_8',       difficulty: 'medium_hard', title: 'Max Combo',           desc: 'Hit max 8x combo',                  target: 8,   type: 'combo'        },
  { id: 'q_coins_500',     difficulty: 'medium_hard', title: 'Coin Baron',          desc: 'Earn 500 coins',                    target: 500, type: 'coins'        },
  { id: 'q_mine_star',     difficulty: 'medium_hard', title: 'Star Chaser',         desc: 'Mine 5 Stardust crystals',          target: 5,   type: 'mine_type', crystalType: 'stardust' },
  // HARD (50 gems)
  { id: 'q_mine_500',      difficulty: 'hard',        title: 'Legend Miner',        desc: 'Mine 500 crystals',                 target: 500, type: 'mine_count'   },
  { id: 'q_score_200000',  difficulty: 'hard',        title: 'Crystal Millionaire', desc: 'Reach 200,000 score',               target: 200000,type:'score'       },
  { id: 'q_coins_1000',    difficulty: 'hard',        title: 'Coin Lord',           desc: 'Earn 1,000 coins',                  target: 1000, type: 'coins'       },
  { id: 'q_upgrade_pick',  difficulty: 'hard',        title: 'Upgrade Freak',       desc: 'Own 5 different pickaxes',          target: 5,   type: 'pickaxes'     },
  { id: 'q_mine_10_void',  difficulty: 'hard',        title: 'Void Master',         desc: 'Mine 10 Void Crystals',             target: 10,  type: 'mine_type', crystalType: 'voidcrystal' },
];

// GEM COSMETICS SHOP (bought with GEMS)
export const GEM_COSMETICS = [
  // Common (5-15 gems)
  { id: 'gc_01', name: 'Miner Hat',       emoji: '⛏️', color: '#92400e', gemCost: 5,   rarity: 'common'   },
  { id: 'gc_02', name: 'Rock Badge',      emoji: '🪨', color: '#6b7280', gemCost: 5,   rarity: 'common'   },
  { id: 'gc_03', name: 'Gem Necklace',    emoji: '📿', color: '#a78bfa', gemCost: 8,   rarity: 'common'   },
  { id: 'gc_04', name: 'Cave Boots',      emoji: '👢', color: '#78716c', gemCost: 10,  rarity: 'common'   },
  { id: 'gc_05', name: 'Torch Aura',      emoji: '🔦', color: '#fbbf24', gemCost: 12,  rarity: 'common'   },
  { id: 'gc_06', name: 'Dust Trail',      emoji: '💨', color: '#d1d5db', gemCost: 15,  rarity: 'common'   },
  // Uncommon (20-35 gems)
  { id: 'gc_07', name: 'Crystal Crown',   emoji: '👑', color: '#818cf8', gemCost: 20,  rarity: 'uncommon' },
  { id: 'gc_08', name: 'Amethyst Aura',   emoji: '💜', color: '#a855f7', gemCost: 22,  rarity: 'uncommon' },
  { id: 'gc_09', name: 'Sapphire Wings',  emoji: '🪽', color: '#3b82f6', gemCost: 25,  rarity: 'uncommon' },
  { id: 'gc_10', name: 'Emerald Cloak',   emoji: '🧥', color: '#22c55e', gemCost: 28,  rarity: 'uncommon' },
  { id: 'gc_11', name: 'Topaz Ring',      emoji: '💍', color: '#f59e0b', gemCost: 30,  rarity: 'uncommon' },
  { id: 'gc_12', name: 'Ruby Mask',       emoji: '🎭', color: '#ef4444', gemCost: 35,  rarity: 'uncommon' },
  // Rare (40-75 gems)
  { id: 'gc_13', name: 'Diamond Halo',    emoji: '😇', color: '#a5f3fc', gemCost: 40,  rarity: 'rare'     },
  { id: 'gc_14', name: 'Void Cape',       emoji: '🌑', color: '#7c3aed', gemCost: 50,  rarity: 'rare'     },
  { id: 'gc_15', name: 'Star Trail',      emoji: '🌟', color: '#fef08a', gemCost: 55,  rarity: 'rare'     },
  { id: 'gc_16', name: 'Lava Skin',       emoji: '🌋', color: '#ef4444', gemCost: 60,  rarity: 'rare'     },
  { id: 'gc_17', name: 'Moon Shroud',     emoji: '🌙', color: '#c7d2fe', gemCost: 65,  rarity: 'rare'     },
  { id: 'gc_18', name: 'Dragon Spine',    emoji: '🐉', color: '#fb923c', gemCost: 75,  rarity: 'rare'     },
  // Epic (80-150 gems)
  { id: 'gc_19', name: 'Cosmic Aura',     emoji: '🌌', color: '#6366f1', gemCost: 80,  rarity: 'epic'     },
  { id: 'gc_20', name: 'Phoenix Wings',   emoji: '🔥', color: '#f59e0b', gemCost: 90,  rarity: 'epic'     },
  { id: 'gc_21', name: 'Thunder Mark',    emoji: '⚡', color: '#fbbf24', gemCost: 100, rarity: 'epic'     },
  { id: 'gc_22', name: 'Chaos Sigil',     emoji: '☠️', color: '#f87171', gemCost: 120, rarity: 'epic'     },
  { id: 'gc_23', name: 'Prism Cloak',     emoji: '🌈', color: '#a855f7', gemCost: 130, rarity: 'epic'     },
  { id: 'gc_24', name: 'Titan Pauldrons', emoji: '🏋️', color: '#64748b', gemCost: 150, rarity: 'epic'     },
  // Legendary (200+ gems)
  { id: 'gc_25', name: 'Void God Aura',   emoji: '🔮', color: '#e879f9', gemCost: 200, rarity: 'legendary'},
  { id: 'gc_26', name: 'Crystal Deity',   emoji: '💎', color: '#67e8f9', gemCost: 250, rarity: 'legendary'},
  { id: 'gc_27', name: 'Omega Crown',     emoji: '🔱', color: '#ff6b35', gemCost: 300, rarity: 'legendary'},
  { id: 'gc_28', name: 'Star God Wings',  emoji: '⭐', color: '#fef08a', gemCost: 400, rarity: 'legendary'},
];

// 67 Cosmetics
export const COSMETICS_67 = [
  { id: 'c67_01', name: '67 Crown',        emoji: '👑', color: '#ff6b35', price: 670 },
  { id: 'c67_02', name: '67 Aura',         emoji: '✨', color: '#fb923c', price: 670 },
  { id: 'c67_03', name: '67 Trail',        emoji: '🌟', color: '#fbbf24', price: 670 },
  { id: 'c67_04', name: '67 Cape',         emoji: '🧣', color: '#f97316', price: 670 },
  { id: 'c67_05', name: '67 Helmet',       emoji: '⛑️', color: '#ef4444', price: 670 },
  { id: 'c67_06', name: '67 Wings',        emoji: '🪽', color: '#ff6b35', price: 670 },
  { id: 'c67_07', name: '67 Glow Ring',    emoji: '💫', color: '#fb923c', price: 670 },
  { id: 'c67_08', name: '67 Horns',        emoji: '😈', color: '#fbbf24', price: 670 },
  { id: 'c67_09', name: '67 Tail',         emoji: '🦎', color: '#f97316', price: 670 },
  { id: 'c67_10', name: '67 Eye Glow',     emoji: '👁️', color: '#ef4444', price: 670 },
  { id: 'c67_11', name: '67 Skin',         emoji: '🔸', color: '#ff6b35', price: 670 },
  { id: 'c67_12', name: '67 Cloak',        emoji: '🧥', color: '#fb923c', price: 670 },
  { id: 'c67_13', name: '67 Gauntlets',    emoji: '🥊', color: '#fbbf24', price: 670 },
  { id: 'c67_14', name: '67 Boots',        emoji: '👢', color: '#f97316', price: 670 },
  { id: 'c67_15', name: '67 Mask',         emoji: '🎭', color: '#ef4444', price: 670 },
  { id: 'c67_16', name: '67 Backpack',     emoji: '🎒', color: '#ff6b35', price: 670 },
  { id: 'c67_17', name: '67 Necklace',     emoji: '📿', color: '#fb923c', price: 670 },
  { id: 'c67_18', name: '67 Belt',         emoji: '⚙️', color: '#fbbf24', price: 670 },
  { id: 'c67_19', name: '67 Bracers',      emoji: '🛡️', color: '#f97316', price: 670 },
  { id: 'c67_20', name: '67 Shoulder Pad', emoji: '🦾', color: '#ef4444', price: 670 },
  { id: 'c67_21', name: '67 Face Paint',   emoji: '🎨', color: '#ff6b35', price: 670 },
  { id: 'c67_22', name: '67 Visor',        emoji: '🥽', color: '#fb923c', price: 670 },
  { id: 'c67_23', name: '67 Crystal Arm',  emoji: '💎', color: '#fbbf24', price: 670 },
  { id: 'c67_24', name: '67 Void Shroud',  emoji: '🌑', color: '#f97316', price: 670 },
  { id: 'c67_25', name: '67 Flame Halo',   emoji: '🔥', color: '#ef4444', price: 670 },
  { id: 'c67_26', name: '67 Star Cloak',   emoji: '🌠', color: '#ff6b35', price: 670 },
  { id: 'c67_27', name: '67 Thunder Mark', emoji: '⚡', color: '#fb923c', price: 670 },
  { id: 'c67_28', name: '67 Dragon Spine', emoji: '🐉', color: '#fbbf24', price: 670 },
  { id: 'c67_29', name: '67 Moon Brand',   emoji: '🌙', color: '#f97316', price: 670 },
  { id: 'c67_30', name: '67 Ghost Veil',   emoji: '👻', color: '#ef4444', price: 670 },
  { id: 'c67_31', name: '67 Lava Skin',    emoji: '🌋', color: '#ff6b35', price: 670 },
  { id: 'c67_32', name: '67 Ice Crown',    emoji: '❄️', color: '#fb923c', price: 670 },
  { id: 'c67_33', name: '67 Poison Cloud', emoji: '☁️', color: '#fbbf24', price: 670 },
  { id: 'c67_34', name: '67 Blood Mark',   emoji: '🩸', color: '#f97316', price: 670 },
  { id: 'c67_35', name: '67 Spirit Cape',  emoji: '🪄', color: '#ef4444', price: 670 },
  { id: 'c67_36', name: '67 Rock Shell',   emoji: '🪨', color: '#ff6b35', price: 670 },
  { id: 'c67_37', name: '67 Wind Trails',  emoji: '💨', color: '#fb923c', price: 670 },
  { id: 'c67_38', name: '67 Thorns',       emoji: '🌵', color: '#fbbf24', price: 670 },
  { id: 'c67_39', name: '67 Spark Aura',   emoji: '⚡', color: '#f97316', price: 670 },
  { id: 'c67_40', name: '67 Rune Cape',    emoji: '🔮', color: '#ef4444', price: 670 },
  { id: 'c67_41', name: '67 Crystal Eyes', emoji: '💠', color: '#ff6b35', price: 670 },
  { id: 'c67_42', name: '67 Shadow Form',  emoji: '🌑', color: '#fb923c', price: 670 },
  { id: 'c67_43', name: '67 Void Steps',   emoji: '👣', color: '#fbbf24', price: 670 },
  { id: 'c67_44', name: '67 Bone Armor',   emoji: '🦴', color: '#f97316', price: 670 },
  { id: 'c67_45', name: '67 Magma Hands',  emoji: '🤲', color: '#ef4444', price: 670 },
  { id: 'c67_46', name: '67 Cyber Visor',  emoji: '🤖', color: '#ff6b35', price: 670 },
  { id: 'c67_47', name: '67 Neon Trim',    emoji: '🔆', color: '#fb923c', price: 670 },
  { id: 'c67_48', name: '67 Prism Shards', emoji: '🌈', color: '#fbbf24', price: 670 },
  { id: 'c67_49', name: '67 Storm Veil',   emoji: '🌩️', color: '#f97316', price: 670 },
  { id: 'c67_50', name: '67 Soul Flame',   emoji: '👁️', color: '#ef4444', price: 670 },
  { id: 'c67_51', name: '67 Gem Spine',    emoji: '💎', color: '#ff6b35', price: 670 },
  { id: 'c67_52', name: '67 Chaos Mark',   emoji: '☠️', color: '#fb923c', price: 670 },
  { id: 'c67_53', name: '67 Radiance',     emoji: '🌟', color: '#fbbf24', price: 670 },
  { id: 'c67_54', name: '67 Void Ring',    emoji: '💜', color: '#f97316', price: 670 },
  { id: 'c67_55', name: '67 Terra Shell',  emoji: '🐢', color: '#ef4444', price: 670 },
  { id: 'c67_56', name: '67 Grim Hood',    emoji: '💀', color: '#ff6b35', price: 670 },
  { id: 'c67_57', name: '67 Halo',         emoji: '😇', color: '#fb923c', price: 670 },
  { id: 'c67_58', name: '67 Rift Aura',    emoji: '🌀', color: '#fbbf24', price: 670 },
  { id: 'c67_59', name: '67 Phoenix Crest',emoji: '🦅', color: '#f97316', price: 670 },
  { id: 'c67_60', name: '67 Titan Pauldrons',emoji:'🏋️', color: '#ef4444', price: 670 },
  { id: 'c67_61', name: '67 Warp Trail',   emoji: '🚀', color: '#ff6b35', price: 670 },
  { id: 'c67_62', name: '67 Ember Skin',   emoji: '🔥', color: '#fb923c', price: 670 },
  { id: 'c67_63', name: '67 Nebula Cape',  emoji: '🌌', color: '#fbbf24', price: 670 },
  { id: 'c67_64', name: '67 Atom Ring',    emoji: '⚛️', color: '#f97316', price: 670 },
  { id: 'c67_65', name: '67 Crystal Spine',emoji: '💠', color: '#ef4444', price: 670 },
  { id: 'c67_66', name: '67 Omega Crest',  emoji: '🔱', color: '#ff6b35', price: 670 },
  { id: 'c67_67', name: '67 BOSS Sigil',   emoji: '👹', color: '#fb923c', price: 670 },
];

// OG Cosmetics (exclusive to OG Bundle)
export const OG_COSMETICS = [
  { id: 'og_c01', name: 'OG Crown',       emoji: '👑', color: '#f59e0b', og: true },
  { id: 'og_c02', name: 'OG Aura',        emoji: '🌟', color: '#fbbf24', og: true },
  { id: 'og_c03', name: 'OG Trail',       emoji: '✨', color: '#f59e0b', og: true },
  { id: 'og_c04', name: 'OG Flame Wings', emoji: '🔥', color: '#fbbf24', og: true },
  { id: 'og_c05', name: 'OG Tag',         emoji: '🏆', color: '#f59e0b', og: true },
];

export const OG_BUNDLE = {
  name: 'OG Bundle',
  price: 9999,
  description: 'The original bundle. Exclusive OG pets, OG cosmetics, and OG status forever.',
  pets: ['og_phoenix', 'og_serpent', 'og_titan'],
  cosmetics: OG_COSMETICS.map(c => c.id),
  color: '#f59e0b',
};

export const BOSS_67 = {
  name: 'SixtySeven Boss',
  emoji: '👹',
  maxHp: 6700,
  color: '#ff6b35',
  reward: 6700,
  description: 'The legendary 67 Boss. Defeat it for a chance at the SixtySeven pet!',
};

// Daily login gem reward
export const DAILY_LOGIN_GEMS = 3;
