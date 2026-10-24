import { useState, useEffect, useCallback } from 'react';
import { soundCtrl } from '../utils/audio';

export interface UserStats {
  streak: number;
  lastActiveDate: string;
  xp: number;
  level: number;
  levelTitleHa: string;
  levelTitleEn: string;
  masteredWords: string[];
  reviewWords: string[];
  bookmarkedPhrases: string[];
  dailyTasksCompleted: {
    wordOfDay: boolean;
    gamePlayed: boolean;
    pronunciationPracticed: boolean;
    date: string;
  };
  gameHighScores: {
    wordMatch: number;
    sentenceBuilder: number;
    listeningQuiz: number;
  };
  soundEnabled: boolean;
  speechSpeed: number;
  appLanguage: 'ha' | 'en';
}

const STORAGE_KEY = 'koyi_turanci_user_state_v1';

function getTodayString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function calculateLevel(xp: number): { level: number; titleHa: string; titleEn: string } {
  if (xp >= 1500) return { level: 5, titleHa: 'Gwani / Masani', titleEn: 'Fluent Master' };
  if (xp >= 800) return { level: 4, titleHa: 'Mai Kwarewa', titleEn: 'Advanced Learner' };
  if (xp >= 350) return { level: 3, titleHa: 'Matsakaici', titleEn: 'Intermediate' };
  if (xp >= 100) return { level: 2, titleHa: 'Mai Koyo', titleEn: 'Active Learner' };
  return { level: 1, titleHa: 'Fari / Sabon Shiga', titleEn: 'Beginner' };
}

const defaultStats: UserStats = {
  streak: 1,
  lastActiveDate: getTodayString(),
  xp: 35,
  level: 1,
  levelTitleHa: 'Fari / Sabon Shiga',
  levelTitleEn: 'Beginner',
  masteredWords: ['v1', 'v2'],
  reviewWords: [],
  bookmarkedPhrases: ['ph1', 'ph4'],
  dailyTasksCompleted: {
    wordOfDay: false,
    gamePlayed: false,
    pronunciationPracticed: false,
    date: getTodayString(),
  },
  gameHighScores: {
    wordMatch: 0,
    sentenceBuilder: 0,
    listeningQuiz: 0,
  },
  soundEnabled: true,
  speechSpeed: 0.9,
  appLanguage: 'ha',
};

export function useLearningStore() {
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window === 'undefined') return defaultStats;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify daily task reset if date changed
        const today = getTodayString();
        if (parsed.dailyTasksCompleted?.date !== today) {
          parsed.dailyTasksCompleted = {
            wordOfDay: false,
            gamePlayed: false,
            pronunciationPracticed: false,
            date: today,
          };
        }
        return parsed;
      }
    } catch {
      // Fallback
    }
    return defaultStats;
  });

  // Sync sound controller
  useEffect(() => {
    soundCtrl.soundEnabled = stats.soundEnabled;
    soundCtrl.speechRate = stats.speechSpeed;
  }, [stats.soundEnabled, stats.speechSpeed]);

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  const addXP = useCallback((amount: number) => {
    setStats((prev) => {
      const newXP = prev.xp + amount;
      const { level, titleHa, titleEn } = calculateLevel(newXP);
      if (level > prev.level) {
        soundCtrl.playSfx('levelUp');
      }
      return {
        ...prev,
        xp: newXP,
        level,
        levelTitleHa: titleHa,
        levelTitleEn: titleEn,
      };
    });
  }, []);

  const markWordMastered = useCallback((id: string) => {
    setStats((prev) => {
      const newMastered = Array.from(new Set([...prev.masteredWords, id]));
      const newReview = prev.reviewWords.filter((w) => w !== id);
      return {
        ...prev,
        masteredWords: newMastered,
        reviewWords: newReview,
      };
    });
    addXP(15);
  }, [addXP]);

  const markWordNeedsReview = useCallback((id: string) => {
    setStats((prev) => {
      const newReview = Array.from(new Set([...prev.reviewWords, id]));
      return {
        ...prev,
        reviewWords: newReview,
      };
    });
  }, []);

  const toggleBookmarkPhrase = useCallback((id: string) => {
    setStats((prev) => {
      const exists = prev.bookmarkedPhrases.includes(id);
      const newPhrases = exists
        ? prev.bookmarkedPhrases.filter((p) => p !== id)
        : [...prev.bookmarkedPhrases, id];
      return {
        ...prev,
        bookmarkedPhrases: newPhrases,
      };
    });
    soundCtrl.playSfx('click');
  }, []);

  const completeDailyTask = useCallback((task: 'wordOfDay' | 'gamePlayed' | 'pronunciationPracticed') => {
    setStats((prev) => {
      const today = getTodayString();
      const currentTasks = prev.dailyTasksCompleted.date === today
        ? prev.dailyTasksCompleted
        : { wordOfDay: false, gamePlayed: false, pronunciationPracticed: false, date: today };

      if (currentTasks[task]) return prev;

      const updatedTasks = {
        ...currentTasks,
        [task]: true,
        date: today,
      };

      // Check streak update
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        newStreak = prev.streak + 1;
      }

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
        dailyTasksCompleted: updatedTasks,
      };
    });
    addXP(25);
  }, [addXP]);

  const recordHighScore = useCallback((game: 'wordMatch' | 'sentenceBuilder' | 'listeningQuiz', score: number) => {
    setStats((prev) => ({
      ...prev,
      gameHighScores: {
        ...prev.gameHighScores,
        [game]: Math.max(prev.gameHighScores[game] || 0, score),
      },
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  }, []);

  const setSpeechSpeed = useCallback((speed: number) => {
    setStats((prev) => ({
      ...prev,
      speechSpeed: speed,
    }));
  }, []);

  const toggleLanguage = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      appLanguage: prev.appLanguage === 'ha' ? 'en' : 'ha',
    }));
  }, []);

  return {
    stats,
    addXP,
    markWordMastered,
    markWordNeedsReview,
    toggleBookmarkPhrase,
    completeDailyTask,
    recordHighScore,
    toggleSound,
    setSpeechSpeed,
    toggleLanguage,
  };
}
