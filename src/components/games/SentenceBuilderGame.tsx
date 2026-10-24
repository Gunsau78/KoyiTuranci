import React, { useState, useEffect } from 'react';
import { SENTENCE_CHALLENGES } from '../../data/learningData';
import { soundCtrl } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Lightbulb, Trophy } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  lang: 'ha' | 'en';
}

export const SentenceBuilderGame: React.FC<Props> = ({ onComplete, lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const currentChallenge = SENTENCE_CHALLENGES[currentIndex];

  useEffect(() => {
    if (!currentChallenge) return;
    // Shuffle options
    const shuffled = [...currentChallenge.options].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setStatus('idle');
    setShowHint(false);
  }, [currentIndex]);

  const handleSelectWord = (word: string, index: number) => {
    if (status === 'correct') return;
    soundCtrl.playSfx('click');
    soundCtrl.speakEnglish(word, 1.1);

    setSelectedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
    setStatus('idle');
  };

  const handleDeselectWord = (word: string, index: number) => {
    if (status === 'correct') return;
    soundCtrl.playSfx('click');
    setSelectedWords((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
    setStatus('idle');
  };

  const handleCheckAnswer = () => {
    const isMatch =
      selectedWords.length === currentChallenge.englishAnswer.length &&
      selectedWords.every((w, i) => w.toLowerCase() === currentChallenge.englishAnswer[i].toLowerCase());

    if (isMatch) {
      soundCtrl.playSfx('correct');
      // Speak the completed English sentence
      soundCtrl.speakEnglish(currentChallenge.englishAnswer.join(' '));
      setStatus('correct');
      setTotalScore((s) => s + 25);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.65 },
        });
      } catch {
        // ignore
      }
    } else {
      soundCtrl.playSfx('wrong');
      setStatus('wrong');
    }
  };

  const handleNext = () => {
    if (currentIndex < SENTENCE_CHALLENGES.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Completed all
      onComplete(totalScore + 50);
    }
  };

  const handleResetCurrent = () => {
    soundCtrl.playSfx('click');
    const shuffled = [...currentChallenge.options].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
    setStatus('idle');
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Top progress bar & counter */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-3">
        <span>
          {lang === 'ha' ? 'Tambaya' : 'Question'} {currentIndex + 1} / {SENTENCE_CHALLENGES.length}
        </span>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono-num">
          <Trophy className="w-3.5 h-3.5" />
          <span>{totalScore} XP</span>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / SENTENCE_CHALLENGES.length) * 100}%` }}
        />
      </div>

      {/* Hausa Target Sentence Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/80 mb-5 text-center relative shadow-sm">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 block">
          {lang === 'ha' ? 'Gina wannan jimlar a Turanci' : 'Translate to English'}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          "{currentChallenge.hausaPrompt}"
        </h2>

        {/* Hint button */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{showHint ? (lang === 'ha' ? 'Boye shawara' : 'Hide Hint') : (lang === 'ha' ? 'Nuna shawara' : 'Show Hint')}</span>
        </button>

        {showHint && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/30 text-amber-200 text-xs text-left animate-in fade-in">
            {currentChallenge.hintHa}
          </div>
        )}
      </div>

      {/* Constructed Sentence Slots */}
      <div className="min-h-[72px] p-3 rounded-2xl bg-slate-950/60 border-2 border-dashed border-slate-700 flex flex-wrap items-center gap-2 mb-5">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-slate-500 italic mx-auto">
            {lang === 'ha' ? 'Danna kalmomin da ke kasa domin gina jimla...' : 'Tap the words below to build the sentence...'}
          </span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              onClick={() => handleDeselectWord(word, idx)}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md tap-active flex items-center gap-1.5 cursor-pointer animate-in zoom-in-95"
            >
              <span>{word}</span>
            </button>
          ))
        )}
      </div>

      {/* Available Word Tiles */}
      <div className="flex-1">
        <div className="text-xs text-slate-400 mb-2 font-medium">
          {lang === 'ha' ? 'Kalmomin da za ka zaɓa:' : 'Available words:'}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {availableWords.map((word, idx) => (
            <button
              key={`avail-${word}-${idx}`}
              onClick={() => handleSelectWord(word, idx)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm shadow-sm tap-active cursor-pointer transition"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Status Feedback & Grammar Insight */}
      {status === 'correct' && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 my-4 animate-in fade-in">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ha' ? 'Daidai ne! Madalla!' : 'Correct! Well Done!'}</span>
            </div>
            <button
              onClick={() => soundCtrl.speakEnglish(currentChallenge.englishAnswer.join(' '))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-white text-xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{lang === 'ha' ? 'Saurara' : 'Listen'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-1.5">
            <strong>{lang === 'ha' ? 'Koyi Nahawu:' : 'Grammar Note:'}</strong> {currentChallenge.grammarNoteHa}
          </p>
        </div>
      )}

      {status === 'wrong' && (
        <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 my-4 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <p className="text-xs">
            {lang === 'ha'
              ? 'Ba daidai ba ne tukuna. Kula da tsarin kalmomin ka sake gwadawa.'
              : 'Not quite right yet. Check word order and try again!'}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-800 mt-auto">
        <button
          onClick={handleResetCurrent}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          title={lang === 'ha' ? 'Sake farawa' : 'Reset'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {status === 'correct' ? (
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer transition tap-active"
          >
            <span>{currentIndex < SENTENCE_CHALLENGES.length - 1 ? (lang === 'ha' ? 'Jimla ta Gaba' : 'Next Sentence') : (lang === 'ha' ? 'Kammala (+50 XP)' : 'Finish (+50 XP)')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            disabled={selectedWords.length === 0}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer tap-active ${
              selectedWords.length === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
            }`}
          >
            <span>{lang === 'ha' ? 'Duba Amsa' : 'Check Answer'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
