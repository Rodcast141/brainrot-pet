import { QUEST_POOL, QUEST_DIFFICULTIES } from './gameConstants';

const QUESTS_PER_DAY = 10;

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function getDailyQuests() {
  const key = `cm_quests_${getTodayKey()}`;
  const cached = localStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  // Pick 10 quests: 2 easy, 2 med-easy, 2 medium, 2 med-hard, 2 hard
  const byDiff = {};
  QUEST_DIFFICULTIES.forEach(d => { byDiff[d.key] = QUEST_POOL.filter(q => q.difficulty === d.key); });

  const selected = [];
  for (const d of QUEST_DIFFICULTIES) {
    const pool = byDiff[d.key];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, 2));
  }

  const quests = selected.map(q => ({ ...q, progress: 0, completed: false, claimed: false }));
  localStorage.setItem(key, JSON.stringify(quests));
  return quests;
}

export function applyQuestProgress(quests, type, amount, extra = {}) {
  return quests.map(q => {
    if (q.completed) return q;

    // Combo quests: track max combo reached
    if (q.type === 'combo' && type === 'combo_max') {
      const newProgress = Math.max(q.progress, amount);
      return { ...q, progress: newProgress, completed: newProgress >= q.target };
    }

    let matches = false;
    if (q.type === type) {
      if (type === 'mine_type' && q.crystalType === extra.crystalType) matches = true;
      else if (type !== 'mine_type') matches = true;
    }
    if (!matches) return q;

    // Score quests: track max score reached
    const newProgress = q.type === 'score'
      ? Math.max(q.progress, amount)
      : Math.min(q.progress + amount, q.target);
    return { ...q, progress: newProgress, completed: newProgress >= q.target };
  });
}

export function saveQuests(quests) {
  const key = `cm_quests_${getTodayKey()}`;
  localStorage.setItem(key, JSON.stringify(quests));
}

export function checkDailyLogin() {
  const key = 'cm_last_login';
  const todayKey = getTodayKey();
  const last = localStorage.getItem(key);
  if (last === todayKey) return false; // already logged in today
  localStorage.setItem(key, todayKey);
  return true; // first login today
}
