import React, { useState } from 'react';
import { PRONUNCIATION_TOPICS, PronunciationTopic } from '../data/learningData';
import { soundCtrl } from '../utils/audio';
import { Volume2, Snail, CheckCircle2, Mic, Play, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  onPracticeDone: () => void;
  lang: 'ha' | 'en';
}

export const PronunciationCoach: React.FC<Props> = ({ onPracticeDone, lang }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(PRONUNCIATION_TOPICS[0].id);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [isPracticingVoice, setIsPracticingVoice] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const topic = PRONUNCIATION_TOPICS.find((t) => t.id === selectedTopicId) || PRONUNCIATION_TOPICS[0];

  const handlePlayWord = (word: string, speed: number = 1.0) => {
    soundCtrl.playSfx('click');
    setActiveWord(word);
    soundCtrl.speakEnglish(word, speed);
  };

  const handlePlayFullSample = () => {
    soundCtrl.playSfx('click');
    soundCtrl.speakEnglish(topic.audioSample, 0.9);
    onPracticeDone();
  };

  const handleSimulateSpeechPractice = (word: string) => {
    setIsPracticingVoice(true);
    setVoiceFeedback(null);
    soundCtrl.playSfx('click');

    setTimeout(() => {
      setIsPracticingVoice(false);
      setVoiceFeedback(
        lang === 'ha'
          ? `Madalla! An saurari furucinka na "${word}". Ci gaba da atisaye!`
          : `Great attempt! Pronunciation for "${word}" recorded. Keep practicing!`
      );
      soundCtrl.playSfx('correct');
      onPracticeDone();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none">
      {/* Topic Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
        {PRONUNCIATION_TOPICS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setSelectedTopicId(t.id);
              setVoiceFeedback(null);
            }}
            className={`px-3 py-2 rounded-xl whitespace-nowrap shrink-0 font-bold transition cursor-pointer ${
              selectedTopicId === t.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {lang === 'ha' ? t.titleHa : t.titleEn}
          </button>
        ))}
      </div>

      {/* Main Lesson Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-700/80 shadow-lg mb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              {lang === 'ha' ? 'Hanyar Furuci & Nahawu' : 'Phonetics & Grammar Rule'}
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
              {lang === 'ha' ? topic.titleHa : topic.titleEn}
            </h2>
          </div>
          <button
            onClick={handlePlayFullSample}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition cursor-pointer tap-active shrink-0"
            title={lang === 'ha' ? 'Saurara gaba daya' : 'Listen to audio sample'}
          >
            <Play className="w-4 h-4 fill-white" />
          </button>
        </div>

        <p className="text-xs text-amber-200/90 bg-amber-950/40 border border-amber-800/30 p-2.5 rounded-xl mb-3">
          <strong>{lang === 'ha' ? 'Matsalar da aka fi samu:' : 'Common hurdle:'}</strong> {topic.summaryHa}
        </p>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800">
          {topic.descriptionHa}
        </p>
      </div>

      {/* Interactive Word Practice List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
          <span>{lang === 'ha' ? 'Kalmomin Atisaye:' : 'Practice words:'}</span>
          <span>{topic.practiceWords.length} {lang === 'ha' ? 'kalmomi' : 'words'}</span>
        </div>

        {topic.practiceWords.map((item, idx) => {
          const isActive = activeWord === item.en;
          return (
            <div
              key={`${item.en}-${idx}`}
              className={`p-3.5 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md'
                  : 'bg-slate-800/70 border-slate-750 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white tracking-wide">
                      {item.en}
                    </span>
                    <span className="text-xs text-emerald-400">·</span>
                    <span className="text-xs text-slate-300 font-medium">
                      {item.ha}
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-300/80 mt-1">
                    🎯 {item.soundFocus}
                  </p>
                </div>

                {/* Audio controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handlePlayWord(item.en, 1.0)}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer tap-active transition shadow-sm"
                    aria-label={`Listen to ${item.en}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePlayWord(item.en, 0.7)}
                    className="p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-amber-300 cursor-pointer tap-active transition"
                    title={lang === 'ha' ? 'A hankali (0.7x)' : 'Slow audio'}
                  >
                    <Snail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSimulateSpeechPractice(item.en)}
                    className="p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-blue-300 cursor-pointer tap-active transition"
                    title={lang === 'ha' ? 'Gwadawa da kanka' : 'Practice speaking'}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice Simulation Feedback Banner */}
      {isPracticingVoice && (
        <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-500/50 text-blue-200 text-xs flex items-center gap-2 my-2 animate-pulse">
          <Mic className="w-4 h-4 text-blue-400 animate-bounce" />
          <span>{lang === 'ha' ? 'Ina saurarenka... fadi kalmar a fili!' : 'Listening... pronounce the word now!'}</span>
        </div>
      )}

      {voiceFeedback && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 my-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{voiceFeedback}</span>
        </div>
      )}
    </div>
  );
};
