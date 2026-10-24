import React, { useState, useEffect } from 'react';
import { VOCABULARY_LIST, VocabWord } from '../../data/learningData';
import { soundCtrl } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Volume2, Play, CheckCircle2, XCircle, ArrowRight, Snail, Trophy } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  lang: 'ha' | 'en';
}

interface QuizItem {
  targetWord: VocabWord;
  options: VocabWord[];
}

export const ListeningQuizGame: React.FC<Props> = ({ onComplete, lang }) => {
  const [questions, setQuestions] = useState<QuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Generate 6 random listening quiz questions
  useEffect(() => {
    const shuffled = [...VOCABULARY_LIST].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 6);

    const generated: QuizItem[] = selected.map((word) => {
      // Pick 3 distractors from the rest of the list
      const distractors = VOCABULARY_LIST.filter((w) => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const opts = [word, ...distractors].sort(() => Math.random() - 0.5);
      return { targetWord: word, options: opts };
    });

    setQuestions(generated);
    setCurrentIndex(0);
    setScore(0);
    setIsAnswered(false);
    setSelectedWordId(null);
  }, []);

  const currentQ = questions[currentIndex];

  const playAudio = async (speed: number = 1.0) => {
    if (!currentQ) return;
    setIsPlayingAudio(true);
    await soundCtrl.speakEnglish(currentQ.targetWord.english, speed);
    setIsPlayingAudio(false);
  };

  // Auto-play audio when question loads
  useEffect(() => {
    if (currentQ) {
      setIsAnswered(false);
      setSelectedWordId(null);
      const timer = setTimeout(() => {
        playAudio(1.0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, questions]);

  const handleSelectOption = (option: VocabWord) => {
    if (isAnswered) return;
    setSelectedWordId(option.id);
    setIsAnswered(true);

    if (option.id === currentQ.targetWord.id) {
      soundCtrl.playSfx('correct');
      setScore((s) => s + 20);
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 },
        });
      } catch {
        // ignore
      }
    } else {
      soundCtrl.playSfx('wrong');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete(score + 30);
    }
  };

  if (!currentQ) return null;

  const isCorrect = selectedWordId === currentQ.targetWord.id;

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-3">
        <span>
          {lang === 'ha' ? 'Tambaya' : 'Question'} {currentIndex + 1} / {questions.length}
        </span>
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono-num">
          <Trophy className="w-3.5 h-3.5" />
          <span>{score} XP</span>
        </div>
      </div>

      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-5">
        <div
          className="bg-emerald-500 h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Audio Listening Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700/80 mb-5 text-center flex flex-col items-center shadow-lg">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-3">
          {lang === 'ha' ? 'Saurara sannan ka zaɓi ma\'anar Hausa' : 'Listen and choose the correct Hausa meaning'}
        </span>

        {/* Big Audio Play Button */}
        <div className="relative my-2">
          {isPlayingAudio && (
            <span className="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping" />
          )}
          <button
            onClick={() => playAudio(1.0)}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 cursor-pointer tap-active transition relative z-10"
            aria-label="Play pronunciation"
          >
            <Volume2 className="w-9 h-9" />
          </button>
        </div>

        {/* Slow playback option */}
        <button
          onClick={() => playAudio(0.7)}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 cursor-pointer"
        >
          <Snail className="w-3.5 h-3.5 text-amber-400" />
          <span>{lang === 'ha' ? 'Saurara a Hankali (Slow 0.7x)' : 'Listen Slowly (0.7x)'}</span>
        </button>

        {/* Revealed target word after answering */}
        {isAnswered && (
          <div className="mt-4 pt-4 border-t border-slate-750 w-full animate-in fade-in">
            <div className="text-xl font-bold text-white tracking-wide">
              {currentQ.targetWord.english}
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-0.5">
              /{currentQ.targetWord.phonetic}/
            </div>
          </div>
        )}
      </div>

      {/* Multiple Choice Options */}
      <div className="grid grid-cols-1 gap-2.5 flex-1">
        {currentQ.options.map((opt) => {
          const isSelected = selectedWordId === opt.id;
          const isThisCorrect = opt.id === currentQ.targetWord.id;

          let btnClass = 'bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-750';
          if (isAnswered) {
            if (isThisCorrect) {
              btnClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
            } else if (isSelected) {
              btnClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnClass = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`p-4 rounded-xl border text-left font-semibold text-sm transition flex items-center justify-between cursor-pointer tap-active ${btnClass}`}
            >
              <span>{opt.hausa}</span>
              {isAnswered && isThisCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              )}
              {isAnswered && isSelected && !isThisCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer feedback & tip */}
      {isAnswered && (
        <div className={`p-3.5 rounded-xl border text-xs my-3 animate-in fade-in ${
          isCorrect
            ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
            : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
        }`}>
          <div className="font-bold mb-1">
            {isCorrect
              ? (lang === 'ha' ? 'Madalla! Amsarka daidai ce!' : 'Great job! Correct answer!')
              : (lang === 'ha' ? `Amsar da ta dace ita ce: "${currentQ.targetWord.hausa}"` : `Correct answer was: "${currentQ.targetWord.hausa}"`)}
          </div>
          {currentQ.targetWord.hausaTip && (
            <p className="text-slate-300 mt-1">
              <strong>{lang === 'ha' ? 'Kula da Wannan:' : 'Helpful Tip:'}</strong> {currentQ.targetWord.hausaTip}
            </p>
          )}
        </div>
      )}

      {/* Bottom Continue button */}
      {isAnswered && (
        <div className="pt-2 mt-auto">
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer tap-active transition"
          >
            <span>{currentIndex < questions.length - 1 ? (lang === 'ha' ? 'Tambaya ta Gaba' : 'Next Question') : (lang === 'ha' ? 'Kammala (+30 XP)' : 'Complete (+30 XP)')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
