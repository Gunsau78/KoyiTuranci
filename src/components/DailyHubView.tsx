import React, { useState } from 'react';
import { DAILY_WORDS_CYCLE, VocabWord } from '../data/learningData';
import { soundCtrl } from '../utils/audio';
import {
  Flame,
  Volume2,
  Snail,
  CheckCircle2,
  Sparkles,
  Gamepad2,
  Layers,
  Mic2,
  BookOpen,
  ArrowRight,
  Trophy,
} from 'lucide-react';

interface Props {
  streak: number;
  xp: number;
  levelTitleHa: string;
  levelTitleEn: string;
  dailyTasks: {
    wordOfDay: boolean;
    gamePlayed: boolean;
    pronunciationPracticed: boolean;
  };
  onCompleteTask: (task: 'wordOfDay' | 'gamePlayed' | 'pronunciationPracticed') => void;
  onNavigateTab: (tab: 'games' | 'pronounce' | 'vocab' | 'phrases') => void;
  onWatchRewardedAd?: () => void;
  lang: 'ha' | 'en';
}

export const DailyHubView: React.FC<Props> = ({
  streak,
  xp,
  levelTitleHa,
  levelTitleEn,
  dailyTasks,
  onCompleteTask,
  onNavigateTab,
  onWatchRewardedAd,
  lang,
}) => {
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);

  // Pick daily word based on day of week or date
  const dayIndex = new Date().getDay();
  const currentDailyItem = DAILY_WORDS_CYCLE[dayIndex % DAILY_WORDS_CYCLE.length];
  const word = currentDailyItem.word;

  const handlePlayAudio = (speed: number = 1.0) => {
    soundCtrl.playSfx('click');
    soundCtrl.speakEnglish(word.english, speed);
  };

  const handlePlaySentence = () => {
    soundCtrl.playSfx('click');
    soundCtrl.speakEnglish(word.exampleEn, 0.95);
  };

  const handleCheckWordQuiz = (idx: number, isCorrect: boolean) => {
    if (quizAnswered) return;
    setSelectedQuizIdx(idx);
    setQuizAnswered(true);
    if (isCorrect) {
      soundCtrl.playSfx('correct');
      onCompleteTask('wordOfDay');
    } else {
      soundCtrl.playSfx('wrong');
    }
  };

  // 3-step daily completion percentage
  const completedCount =
    (dailyTasks.wordOfDay ? 1 : 0) +
    (dailyTasks.gamePlayed ? 1 : 0) +
    (dailyTasks.pronunciationPracticed ? 1 : 0);
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 space-y-4 overflow-y-auto select-none">
      {/* Top Banner: Streak & Motivation */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-900/90 via-emerald-850 to-teal-900 border border-emerald-600/30 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>
                {streak} {lang === 'ha' ? 'Kwanaki a Jere' : 'Day Streak'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              {lang === 'ha' ? 'Barka da Zuwa!' : 'Welcome Back!'}
            </h1>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              {lang === 'ha' ? levelTitleHa : levelTitleEn} · <span className="font-mono font-bold text-amber-300">{xp} XP</span>
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-200">
              {lang === 'ha' ? 'Burin Yau' : 'Daily Goal'}
            </span>
            <span className="text-lg font-black text-amber-300 font-mono">
              {completedCount}/3
            </span>
          </div>
        </div>

        {/* Motivational Proverb */}
        <div className="mt-3 pt-3 border-t border-emerald-700/40 text-xs text-emerald-100/90 italic flex items-center gap-1.5">
          <span>💡</span>
          <span>"{lang === 'ha' ? currentDailyItem.proverbHa : currentDailyItem.proverbEn}"</span>
        </div>
      </div>

      {/* Kalmar Yau (Word of the Day Card) */}
      <div className="p-5 rounded-3xl bg-slate-850 border border-slate-700/80 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {lang === 'ha' ? 'Kalmar Yau (Word of the Day)' : 'Word of the Day'}
            </span>
          </div>
          {dailyTasks.wordOfDay && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'ha' ? 'An kammala' : 'Completed'}
            </span>
          )}
        </div>

        {/* The Word */}
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {word.english}
            </h2>
            <p className="text-xs font-mono text-emerald-400 font-medium mt-0.5">
              /{word.phonetic}/ · <span className="text-slate-400">{word.partOfSpeech}</span>
            </p>
          </div>

          {/* Audio Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handlePlayAudio(1.0)}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 cursor-pointer tap-active transition"
              title={lang === 'ha' ? 'Saurara' : 'Pronounce'}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => handlePlayAudio(0.7)}
              className="p-2.5 rounded-xl bg-slate-750 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer tap-active transition"
              title={lang === 'ha' ? 'Furuci a hankali' : 'Slow audio'}
            >
              <Snail className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hausa Translation */}
        <div className="mt-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
            {lang === 'ha' ? 'Ma\'ana a Hausa:' : 'Hausa Translation:'}
          </span>
          <p className="text-base font-bold text-emerald-300">
            {word.hausa}
          </p>
        </div>

        {/* Example Sentence */}
        <div className="mt-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              {lang === 'ha' ? 'Misali a Jimla:' : 'Example in Sentence:'}
            </span>
            <button
              onClick={handlePlaySentence}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{lang === 'ha' ? 'Saurara' : 'Listen'}</span>
            </button>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100">
            "{word.exampleEn}"
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            "{word.exampleHa}"
          </p>
        </div>

        {/* Hausa Learner Tip */}
        {word.hausaTip && (
          <p className="text-[11px] text-emerald-300/90 bg-emerald-950/30 border border-emerald-800/30 p-2.5 rounded-xl mt-2.5">
            <strong>{lang === 'ha' ? 'Shawara:' : 'Note:'}</strong> {word.hausaTip}
          </p>
        )}

        {/* Daily Quick Mini-Quiz to confirm mastery */}
        {!dailyTasks.wordOfDay && (
          <div className="mt-4 pt-3 border-t border-slate-750">
            <p className="text-xs font-semibold text-slate-200 mb-2">
              {lang === 'ha' ? 'Gwajin Fahimta: Wace ce ma\'anar wannan kalma?' : 'Quick check: What is the meaning?'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCheckWordQuiz(1, true)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-white text-left tap-active cursor-pointer transition"
              >
                1. {word.hausa}
              </button>
              <button
                onClick={() => handleCheckWordQuiz(2, false)}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-300 text-left tap-active cursor-pointer transition"
              >
                2. Motar haya
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Daily Quest Tracker */}
      <div className="p-4 rounded-3xl bg-slate-850 border border-slate-700/80 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ha' ? 'Ayyukan Koyo na Yau' : 'Daily Study Quests'}</span>
          </h3>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {progressPercent}%
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Task 1 */}
          <div
            onClick={() => onCompleteTask('wordOfDay')}
            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
              dailyTasks.wordOfDay
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : 'bg-slate-800/70 border-slate-750 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${dailyTasks.wordOfDay ? 'bg-emerald-500 text-white' : 'border border-slate-600 text-slate-500'}`}>
                {dailyTasks.wordOfDay ? '✓' : '1'}
              </div>
              <span className="font-medium">
                {lang === 'ha' ? 'Koyi Kalmar Yau da Furucinta' : 'Learn the Word of the Day'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-400">+25 XP</span>
          </div>

          {/* Task 2 */}
          <div
            onClick={() => onNavigateTab('games')}
            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
              dailyTasks.gamePlayed
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : 'bg-slate-800/70 border-slate-750 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${dailyTasks.gamePlayed ? 'bg-emerald-500 text-white' : 'border border-slate-600 text-slate-500'}`}>
                {dailyTasks.gamePlayed ? '✓' : '2'}
              </div>
              <span className="font-medium">
                {lang === 'ha' ? 'Kammala Wasan Haɗa Kalmomi ko Jimla' : 'Play a Word Match or Sentence Game'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-400">+25 XP</span>
          </div>

          {/* Task 3 */}
          <div
            onClick={() => onNavigateTab('pronounce')}
            className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
              dailyTasks.pronunciationPracticed
                ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                : 'bg-slate-800/70 border-slate-750 text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${dailyTasks.pronunciationPracticed ? 'bg-emerald-500 text-white' : 'border border-slate-600 text-slate-500'}`}>
                {dailyTasks.pronunciationPracticed ? '✓' : '3'}
              </div>
              <span className="font-medium">
                {lang === 'ha' ? 'Atisayen Furuci (Bambancin P da F)' : 'Pronunciation drill (P vs F sounds)'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-400">+25 XP</span>
          </div>
        </div>
      </div>

      {/* Rewarded AdMob Bonus Box */}
      {onWatchRewardedAd && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-850 to-slate-900 border border-amber-600/30 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white">
                  {lang === 'ha' ? 'Kyautar Maki (+50 XP)' : 'Bonus Reward (+50 XP)'}
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
                  AdMob
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {lang === 'ha'
                  ? 'Kalli gajeriyar talla ta daƙiƙa 5 don ƙara maki a zango'
                  : 'Watch a 5-second sponsored ad to boost your daily streak XP'}
              </p>
            </div>
          </div>
          <button
            onClick={onWatchRewardedAd}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-950/40 shrink-0 cursor-pointer tap-active transition"
          >
            {lang === 'ha' ? 'Kalla (+50 XP)' : 'Watch'}
          </button>
        </div>
      )}

      {/* Quick Launch Buttons */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
          {lang === 'ha' ? 'Wuraren Koyi Masu Sauri' : 'Quick Learning Hubs'}
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigateTab('games')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 hover:bg-slate-750 border border-slate-750 text-left transition cursor-pointer tap-active shadow-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {lang === 'ha' ? 'Wasannin Koyi' : 'Interactive Games'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'ha' ? 'Haɗa kalmomi & gina jimloli' : 'Word Match & Sentence Builder'}
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('vocab')}
            className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 hover:bg-slate-750 border border-slate-750 text-left transition cursor-pointer tap-active shadow-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-2">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {lang === 'ha' ? 'Katin Kalmomi' : 'Flashcards'}
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {lang === 'ha' ? 'Koyi sabbin kalmomi 150+' : 'Master 150+ categorized words'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
