import React, { useState } from 'react';
import { WordMatchGame } from './games/WordMatchGame';
import { SentenceBuilderGame } from './games/SentenceBuilderGame';
import { ListeningQuizGame } from './games/ListeningQuizGame';
import { Gamepad2, Puzzle, Ear, Trophy, ArrowLeft, Play, Flame } from 'lucide-react';

interface Props {
  onGameFinished: (gameType: 'wordMatch' | 'sentenceBuilder' | 'listeningQuiz', score: number) => void;
  highScores: {
    wordMatch: number;
    sentenceBuilder: number;
    listeningQuiz: number;
  };
  lang: 'ha' | 'en';
}

type ActiveGame = null | 'match' | 'sentence' | 'listening';

export const GamesHubView: React.FC<Props> = ({
  onGameFinished,
  highScores,
  lang,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  if (activeGame === 'match') {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveGame(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ha' ? 'Koma Wasanni' : 'Back to Games'}</span>
          </button>
        </div>
        <WordMatchGame
          lang={lang}
          onComplete={(score) => {
            onGameFinished('wordMatch', score);
          }}
        />
      </div>
    );
  }

  if (activeGame === 'sentence') {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveGame(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ha' ? 'Koma Wasanni' : 'Back to Games'}</span>
          </button>
        </div>
        <SentenceBuilderGame
          lang={lang}
          onComplete={(score) => {
            onGameFinished('sentenceBuilder', score);
          }}
        />
      </div>
    );
  }

  if (activeGame === 'listening') {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2">
          <button
            onClick={() => setActiveGame(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 text-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ha' ? 'Koma Wasanni' : 'Back to Games'}</span>
          </button>
        </div>
        <ListeningQuizGame
          lang={lang}
          onComplete={(score) => {
            onGameFinished('listeningQuiz', score);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none overflow-y-auto space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          {lang === 'ha' ? 'Wasannin Koyi & Atisaye' : 'Interactive Learning Games'}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'ha'
            ? 'Koyi Turanci cikin nishadi tare da kwarewa a kalmomi da jimloli.'
            : 'Master English words and syntax through fun interactive challenges.'}
        </p>
      </div>

      {/* Game 1: Word Match */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-850 to-slate-900 border border-emerald-600/30 shadow-md">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Puzzle className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
            <Trophy className="w-3.5 h-3.5" />
            <span>{highScores.wordMatch} XP High</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white">
          {lang === 'ha' ? '1. Haɗa Kalmomi (Word Match)' : '1. Word Match'}
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {lang === 'ha'
            ? 'Haɗa kalmar Turanci da takwararta a Hausa da sauri. Samun maki da combos!'
            : 'Match English cards with Hausa meanings. Build combos and test your reaction time.'}
        </p>

        <button
          onClick={() => setActiveGame('match')}
          className="mt-4 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 cursor-pointer tap-active transition"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{lang === 'ha' ? 'Fara Haɗa Kalmomi' : 'Play Word Match'}</span>
        </button>
      </div>

      {/* Game 2: Sentence Builder */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-950/40 via-slate-850 to-slate-900 border border-blue-600/30 shadow-md">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
            <Trophy className="w-3.5 h-3.5" />
            <span>{highScores.sentenceBuilder} XP High</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white">
          {lang === 'ha' ? '2. Gina Jimla (Sentence Builder)' : '2. Sentence Builder'}
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {lang === 'ha'
            ? 'Gina cikakkiyar jimlar Turanci daga fassarar Hausa. Koyi tsarin nahawu!'
            : 'Unscramble words to construct grammatically sound English sentences from Hausa prompts.'}
        </p>

        <button
          onClick={() => setActiveGame('sentence')}
          className="mt-4 w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950/40 cursor-pointer tap-active transition"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{lang === 'ha' ? 'Fara Gina Jimla' : 'Play Sentence Builder'}</span>
        </button>
      </div>

      {/* Game 3: Listening Quiz */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950/40 via-slate-850 to-slate-900 border border-purple-600/30 shadow-md">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Ear className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-800/40">
            <Trophy className="w-3.5 h-3.5" />
            <span>{highScores.listeningQuiz} XP High</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white">
          {lang === 'ha' ? '3. Saurara & Amsa (Listening Quiz)' : '3. Audio Listening Quiz'}
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {lang === 'ha'
            ? 'Saurari furucin Turanci na asali sannan ka zaɓi amsar da ta dace da Hausa.'
            : 'Train your ear to authentic English pronunciation and identify the correct meaning.'}
        </p>

        <button
          onClick={() => setActiveGame('listening')}
          className="mt-4 w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 cursor-pointer tap-active transition"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{lang === 'ha' ? 'Fara Wasan Saurare' : 'Play Listening Quiz'}</span>
        </button>
      </div>
    </div>
  );
};
