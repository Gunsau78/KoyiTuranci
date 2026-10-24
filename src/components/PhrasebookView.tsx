import React, { useState, useMemo } from 'react';
import { PRACTICAL_PHRASES, PracticalPhrase } from '../data/learningData';
import { soundCtrl } from '../utils/audio';
import { Search, Volume2, Bookmark, BookmarkCheck, Copy, Check, Filter } from 'lucide-react';

interface Props {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  lang: 'ha' | 'en';
}

export const PhrasebookView: React.FC<Props> = ({
  bookmarkedIds,
  onToggleBookmark,
  lang,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set(PRACTICAL_PHRASES.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredPhrases = useMemo(() => {
    return PRACTICAL_PHRASES.filter((p) => {
      const matchesSearch =
        p.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.hausa.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat =
        selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const handlePlayAudio = (phrase: PracticalPhrase) => {
    soundCtrl.playSfx('click');
    soundCtrl.speakEnglish(phrase.english, 0.95);
  };

  const handleCopy = (phrase: PracticalPhrase) => {
    navigator.clipboard?.writeText(phrase.english);
    setCopiedId(phrase.id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Header and Search */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">
          {lang === 'ha' ? 'Kundin Jimloli Masu Amfani' : 'Practical Phrases'}
        </h2>
        <p className="text-xs text-slate-400 mb-3">
          {lang === 'ha'
            ? 'Jimlolin yau da kullum don kasuwa, asibiti, ofis, da tafiye-tafiye.'
            : 'Everyday survival phrases for business, dining, health, and transit.'}
        </p>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'ha'
                ? 'Nemi jimla a Turanci ko Hausa (misali: kudi, ATM, likita)...'
                : 'Search in English or Hausa...'
            }
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat === 'all' ? (lang === 'ha' ? 'Dukkan Jimloli' : 'All Phrases') : cat}
          </button>
        ))}
      </div>

      {/* Phrase List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-0.5">
        {filteredPhrases.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            {lang === 'ha' ? 'Ba a sami wata jimla ba. Gwada wata kalmar.' : 'No phrases found. Try another search.'}
          </div>
        ) : (
          filteredPhrases.map((phrase) => {
            const isBookmarked = bookmarkedIds.includes(phrase.id);
            return (
              <div
                key={phrase.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-750 hover:bg-slate-800 transition-all shadow-sm"
              >
                {/* Category & Actions */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    {phrase.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(phrase)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                      title={lang === 'ha' ? 'Kwafi jimla' : 'Copy'}
                    >
                      {copiedId === phrase.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onToggleBookmark(phrase.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isBookmarked
                          ? 'text-amber-400 hover:text-amber-300'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={lang === 'ha' ? 'Ajiye a zaba' : 'Bookmark'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* English phrase with audio button */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-bold text-white tracking-wide leading-snug">
                    "{phrase.english}"
                  </h3>
                  <button
                    onClick={() => handlePlayAudio(phrase)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shrink-0 tap-active transition cursor-pointer"
                    title={lang === 'ha' ? 'Saurara' : 'Listen'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Hausa translation */}
                <p className="text-xs font-medium text-emerald-300/90 mt-1">
                  "{phrase.hausa}"
                </p>

                {/* Usage Context note */}
                <p className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-750">
                  <strong>{lang === 'ha' ? 'Lokacin amfani:' : 'Usage context:'}</strong> {phrase.contextHa}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
