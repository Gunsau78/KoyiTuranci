import React, { useState, useEffect } from 'react';
import { VOCABULARY_LIST, VocabWord, CATEGORIES } from '../../data/learningData';
import { soundCtrl } from '../../utils/audio';
import { Volume2, RotateCcw, Check, Sparkles, Snail, ChevronRight, ChevronLeft, Bookmark } from 'lucide-react';

interface Props {
  onMasterWord: (id: string) => void;
  onReviewWord: (id: string) => void;
  masteredIds: string[];
  reviewIds: string[];
  lang: 'ha' | 'en';
}

export const FlashcardDeck: React.FC<Props> = ({
  onMasterWord,
  onReviewWord,
  masteredIds,
  reviewIds,
  lang,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'all' | 'review'>('all');
  const [deck, setDeck] = useState<VocabWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let list = [...VOCABULARY_LIST];
    if (filterMode === 'review') {
      list = list.filter((w) => reviewIds.includes(w.id));
      if (list.length === 0) {
        list = [...VOCABULARY_LIST]; // fallback if empty
      }
    } else if (selectedCategory !== 'all') {
      list = list.filter((w) => w.category === selectedCategory);
    }
    setDeck(list.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, filterMode, reviewIds.length]);

  const currentWord = deck[currentIndex];

  const handleFlip = () => {
    soundCtrl.playSfx('flip');
    setIsFlipped(!isFlipped);
  };

  const handleAudio = (e: React.MouseEvent, speed: number = 1.0) => {
    e.stopPropagation();
    if (!currentWord) return;
    soundCtrl.speakEnglish(currentWord.english, speed);
  };

  const handleSentenceAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentWord) return;
    soundCtrl.speakEnglish(currentWord.exampleEn, 0.95);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      setCurrentIndex(deck.length - 1);
    }
  };

  const handleKnown = () => {
    if (!currentWord) return;
    soundCtrl.playSfx('correct');
    onMasterWord(currentWord.id);
    handleNextCard();
  };

  const handleNeedPractice = () => {
    if (!currentWord) return;
    soundCtrl.playSfx('click');
    onReviewWord(currentWord.id);
    handleNextCard();
  };

  if (!currentWord) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>{lang === 'ha' ? 'Babu kalmomi a wannan rukuni.' : 'No words in this category.'}</p>
        <button
          onClick={() => {
            setSelectedCategory('all');
            setFilterMode('all');
          }}
          className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"
        >
          {lang === 'ha' ? 'Nuna Dukkan Kalmomi' : 'Show All Words'}
        </button>
      </div>
    );
  }

  const isMastered = masteredIds.includes(currentWord.id);
  const isReview = reviewIds.includes(currentWord.id);

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Category selector row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-xs">
        <button
          onClick={() => {
            setFilterMode('all');
            setSelectedCategory('all');
          }}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition cursor-pointer ${
            filterMode === 'all' && selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          {lang === 'ha' ? 'Duk Kalmomi' : 'All Words'} ({VOCABULARY_LIST.length})
        </button>

        {reviewIds.length > 0 && (
          <button
            onClick={() => setFilterMode('review')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition cursor-pointer ${
              filterMode === 'review'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
            }`}
          >
            {lang === 'ha' ? 'Don Bita' : 'Need Review'} ({reviewIds.length})
          </button>
        )}

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setFilterMode('all');
              setSelectedCategory(cat.id);
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition cursor-pointer ${
              filterMode === 'all' && selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'ha' ? cat.titleHa : cat.titleEn}
          </button>
        ))}
      </div>

      {/* Card count & status */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
        <span>
          {lang === 'ha' ? 'Kati' : 'Card'} {currentIndex + 1} / {deck.length}
        </span>
        <div className="flex items-center gap-2">
          {isMastered && (
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {lang === 'ha' ? 'An kware' : 'Mastered'}
            </span>
          )}
          {isReview && (
            <span className="text-amber-400 font-medium">
              {lang === 'ha' ? 'Ana bukatar bita' : 'Needs Review'}
            </span>
          )}
        </div>
      </div>

      {/* Flashcard container */}
      <div
        onClick={handleFlip}
        className="flex-1 min-h-[300px] sm:min-h-[340px] rounded-3xl p-6 bg-gradient-to-br from-slate-850 via-slate-800 to-slate-900 border border-slate-700/80 shadow-xl relative flex flex-col justify-between cursor-pointer tap-active transition-all group overflow-hidden"
      >
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top card bar */}
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {currentWord.partOfSpeech}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-700/60 text-slate-300">
            {isFlipped ? (lang === 'ha' ? 'Bayan Kati (Hausa)' : 'Back (Hausa)') : (lang === 'ha' ? 'Gaban Kati (Turanci)' : 'Front (English)')}
          </span>
        </div>

        {/* Center content */}
        {!isFlipped ? (
          <div className="text-center my-auto py-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              {currentWord.english}
            </h2>
            <p className="text-sm font-mono text-emerald-400 font-medium mb-4">
              /{currentWord.phonetic}/
            </p>

            {/* Audio action pills */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={(e) => handleAudio(e, 1.0)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950/40 transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>{lang === 'ha' ? 'Furuci' : 'Pronounce'}</span>
              </button>
              <button
                onClick={(e) => handleAudio(e, 0.7)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-700/70 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
                title={lang === 'ha' ? 'Furuci a hankali' : 'Slow pronunciation'}
              >
                <Snail className="w-3.5 h-3.5 text-amber-400" />
                <span>0.7x</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-6 italic">
              {lang === 'ha' ? 'Danna katin domin ganin ma\'anarsa da jimla...' : 'Tap card to flip and view Hausa meaning & sentence...'}
            </p>
          </div>
        ) : (
          <div className="text-center my-auto py-2 animate-in fade-in">
            <span className="text-xs text-amber-400 font-semibold block mb-1">
              {lang === 'ha' ? 'Ma\'ana a Hausa:' : 'Hausa Translation:'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {currentWord.hausa}
            </h3>

            {/* Example sentence */}
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-750 text-left my-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  {lang === 'ha' ? 'Misali a Jimla:' : 'Example in Sentence:'}
                </span>
                <button
                  onClick={handleSentenceAudio}
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Sauti</span>
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-100">
                "{currentWord.exampleEn}"
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                "{currentWord.exampleHa}"
              </p>
            </div>

            {/* Learner tip */}
            {currentWord.hausaTip && (
              <p className="text-xs text-emerald-300/90 text-left bg-emerald-950/40 border border-emerald-800/30 p-2.5 rounded-xl mt-2">
                <strong>{lang === 'ha' ? 'Shawara ga mai koyo:' : 'Learner Note:'}</strong> {currentWord.hausaTip}
              </p>
            )}
          </div>
        )}

        {/* Bottom card footer hint */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevCard();
            }}
            className="hover:text-slate-300 flex items-center gap-0.5 p-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'ha' ? 'Baya' : 'Prev'}</span>
          </button>
          <span>{lang === 'ha' ? 'Danna kowane wuri don juya kati' : 'Tap to flip'}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextCard();
            }}
            className="hover:text-slate-300 flex items-center gap-0.5 p-1"
          >
            <span>{lang === 'ha' ? 'Gaba' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumb Decision Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 mt-auto">
        <button
          onClick={handleNeedPractice}
          className="h-13 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-amber-600/40 text-amber-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm tap-active cursor-pointer transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{lang === 'ha' ? 'Ina Buƙatar Koyi' : 'Need Practice'}</span>
        </button>

        <button
          onClick={handleKnown}
          className="h-13 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 tap-active cursor-pointer transition"
        >
          <Check className="w-4 h-4" />
          <span>{lang === 'ha' ? 'Na Rike / Na Sani (+15 XP)' : 'Mastered (+15 XP)'}</span>
        </button>
      </div>
    </div>
  );
};
