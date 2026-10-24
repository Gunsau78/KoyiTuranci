import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { soundCtrl } from '../../utils/audio';
import { WORD_MATCH_PAIRS } from '../../data/learningData';
import { Volume2, RotateCcw, Sparkles, CheckCircle2, Trophy, Flame } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
  lang: 'ha' | 'en';
}

interface CardItem {
  id: string; // unique card id
  pairId: string;
  text: string;
  type: 'en' | 'ha';
  isMatched: boolean;
}

export const WordMatchGame: React.FC<Props> = ({ onComplete, lang }) => {
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [wrongPairIds, setWrongPairIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Initialize a round with 5 pairs
  const initRound = (roundNum: number) => {
    // Pick 5 random pairs
    const shuffledPairs = [...WORD_MATCH_PAIRS].sort(() => Math.random() - 0.5);
    const selectedPairs = shuffledPairs.slice(0, 5);

    const cardList: CardItem[] = [];
    selectedPairs.forEach((p, idx) => {
      cardList.push({
        id: `en-${p.id}-${idx}`,
        pairId: p.id,
        text: p.en,
        type: 'en',
        isMatched: false,
      });
      cardList.push({
        id: `ha-${p.id}-${idx}`,
        pairId: p.id,
        text: p.ha,
        type: 'ha',
        isMatched: false,
      });
    });

    // Shuffle cards
    setCards(cardList.sort(() => Math.random() - 0.5));
    setSelectedCard(null);
    setWrongPairIds([]);
    setMatchedCount(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    initRound(round);
  }, [round]);

  // Timer
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isGameOver]);

  const totalPairs = 5;

  const handleCardClick = (card: CardItem) => {
    if (card.isMatched || isGameOver) return;
    if (wrongPairIds.length > 0) return; // wait for error reset
    if (selectedCard?.id === card.id) return; // already selected

    soundCtrl.playSfx('flip');

    // If card is in English, optionally speak it
    if (card.type === 'en') {
      soundCtrl.speakEnglish(card.text);
    }

    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }

    // Check if they match
    if (selectedCard.pairId === card.pairId && selectedCard.type !== card.type) {
      // Match found!
      soundCtrl.playSfx('match');
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 20 + newCombo * 5;
      setScore((s) => s + points);

      setCards((prev) =>
        prev.map((c) => (c.pairId === card.pairId ? { ...c, isMatched: true } : c))
      );
      setSelectedCard(null);
      const newMatched = matchedCount + 1;
      setMatchedCount(newMatched);

      // Check if all pairs matched
      if (newMatched >= totalPairs) {
        setIsGameOver(true);
        soundCtrl.playSfx('correct');
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
        onComplete(score + points + 50);
      }
    } else {
      // Wrong match
      soundCtrl.playSfx('wrong');
      setCombo(0);
      setWrongPairIds([selectedCard.id, card.id]);
      setTimeout(() => {
        setWrongPairIds([]);
        setSelectedCard(null);
      }, 700);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Header bar: score, timer, combo */}
      <div className="flex items-center justify-between py-2 border-b border-slate-800 mb-4 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">
            {lang === 'ha' ? 'Zagaye' : 'Round'} {round}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-semibold font-mono-num flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            {score} XP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {combo > 1 && (
            <div className="flex items-center gap-1 text-amber-400 font-bold animate-pulse">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{combo}x Combo!</span>
            </div>
          )}
          <span className="text-slate-400 font-mono-num">
            ⏱️ {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Instruction banner */}
      <div className="mb-4 text-center">
        <p className="text-sm font-semibold text-white">
          {lang === 'ha' ? 'Haɗa kalmar Turanci da ma\'anarta a Hausa' : 'Match the English word with its Hausa meaning'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {lang === 'ha' ? 'Danna katin Turanci don jin yadda ake furta shi' : 'Tap English cards to hear real audio pronunciation'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 items-center">
        {cards.map((card) => {
          const isSelected = selectedCard?.id === card.id;
          const isWrong = wrongPairIds.includes(card.id);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isGameOver}
              className={`
                relative h-20 sm:h-24 rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all cursor-pointer tap-active
                ${card.isMatched
                  ? 'bg-emerald-950/40 border border-emerald-600/30 text-emerald-400/60 opacity-60'
                  : isWrong
                  ? 'bg-rose-950/60 border-2 border-rose-500 text-rose-200 animate-shake'
                  : isSelected
                  ? 'bg-emerald-600 border-2 border-emerald-400 text-white shadow-lg shadow-emerald-900/40 scale-102 ring-2 ring-emerald-400/50'
                  : 'bg-slate-800/90 border border-slate-700/80 hover:bg-slate-750 text-slate-100 shadow-sm'
                }
              `}
            >
              {/* Type indicator watermark */}
              <span className={`text-[10px] font-bold uppercase tracking-wider absolute top-2 right-2.5 ${card.type === 'en' ? 'text-blue-400' : 'text-amber-400'}`}>
                {card.type === 'en' ? 'English' : 'Hausa'}
              </span>

              {/* Word text */}
              <span className="text-base sm:text-lg font-bold leading-tight px-1">
                {card.text}
              </span>

              {/* Audio button for English words */}
              {card.type === 'en' && !card.isMatched && (
                <div className="absolute bottom-2 left-2.5 text-slate-400 flex items-center gap-1 text-[11px]">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] opacity-75">Sauti</span>
                </div>
              )}

              {card.isMatched && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute bottom-2 right-2.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Completion Modal / State */}
      {isGameOver && (
        <div className="p-4 rounded-2xl bg-slate-800/95 border border-emerald-500/40 shadow-xl my-4 text-center animate-in fade-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {lang === 'ha' ? 'Madalla! Ka kammala wannan zagayen!' : 'Awesome! Round Completed!'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {lang === 'ha'
              ? `Ka samu maki +${score} XP a cikin daƙiƙa ${timer}!`
              : `You scored +${score} XP in ${timer} seconds!`}
          </p>

          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => {
                setRound((r) => r + 1);
                initRound(round + 1);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-md shadow-emerald-950/40 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{lang === 'ha' ? 'Zagaye na Gaba (+50 XP)' : 'Next Round (+50 XP)'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
