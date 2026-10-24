import React, { useState } from 'react';
import { UserStats } from '../hooks/useLearningStore';
import { PWAInstallButton } from './PWAInstallButton';
import { soundCtrl } from '../utils/audio';
import { AdMobConfig } from '../utils/admobConfig';
import {
  User,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  Gauge,
  Globe,
  Smartphone,
  RotateCcw,
  CheckCircle2,
  Bookmark,
  ShieldCheck,
  Zap,
  DollarSign,
} from 'lucide-react';

interface Props {
  stats: UserStats;
  adMobConfig: AdMobConfig;
  onOpenAdMobSettings: () => void;
  toggleSound: () => void;
  setSpeechSpeed: (speed: number) => void;
  toggleLanguage: () => void;
  lang: 'ha' | 'en';
  isPhoneFrame: boolean;
  togglePhoneFrame: () => void;
}

export const ProfileSettingsView: React.FC<Props> = ({
  stats,
  adMobConfig,
  onOpenAdMobSettings,
  toggleSound,
  setSpeechSpeed,
  toggleLanguage,
  lang,
  isPhoneFrame,
  togglePhoneFrame,
}) => {
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleTestAudio = () => {
    soundCtrl.speakEnglish('Welcome to Koyi Turanci English learning app!');
  };

  return (
    <div className="flex flex-col h-full max-w-xl mx-auto w-full p-4 select-none overflow-y-auto space-y-4">
      {/* Profile Header */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-850 to-slate-900 border border-slate-750 shadow-md flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-emerald-950/40 shrink-0">
          HA
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            {lang === 'ha' ? 'Matsayin Mai Koyo' : 'Learner Rank'}
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {lang === 'ha' ? stats.levelTitleHa : stats.levelTitleEn}
          </h2>
          <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
            <span className="flex items-center gap-1 text-amber-400 font-bold font-mono">
              <Trophy className="w-3.5 h-3.5" />
              {stats.xp} XP
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-rose-400 font-bold font-mono">
              <Flame className="w-3.5 h-3.5 fill-rose-400" />
              {stats.streak} {lang === 'ha' ? 'Kwanaki' : 'Days'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Metrics Strip */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-750 text-center">
          <span className="text-xl font-black text-emerald-400 font-mono block">
            {stats.masteredWords.length}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {lang === 'ha' ? 'Kalmomin da aka riƙe' : 'Mastered'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-750 text-center">
          <span className="text-xl font-black text-amber-400 font-mono block">
            {stats.reviewWords.length}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {lang === 'ha' ? 'Don Maimaitawa' : 'Need Review'}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-850 border border-slate-750 text-center">
          <span className="text-xl font-black text-blue-400 font-mono block">
            {stats.bookmarkedPhrases.length}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {lang === 'ha' ? 'Jimlolin da aka ajiye' : 'Saved'}
          </span>
        </div>
      </div>

      {/* App & Audio Preferences */}
      <div className="p-5 rounded-3xl bg-slate-850 border border-slate-750 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {lang === 'ha' ? 'Tsare-tsaren Sauti da Manhaja' : 'App & Sound Settings'}
        </h3>

        {/* Sound FX Toggle */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              {stats.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {lang === 'ha' ? 'Sautin Wasanni (Sound Effects)' : 'Sound Effects'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ha' ? 'Karar amsa daidai da kuskure' : 'Chimes and game feedback'}
              </div>
            </div>
          </div>
          <button
            onClick={toggleSound}
            className={`w-12 h-7 rounded-full transition-colors relative cursor-pointer ${
              stats.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${
                stats.soundEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Speech Speed Setting */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ha' ? 'Gudun Furucin Turanci' : 'Pronunciation Speed'}</span>
            </div>
            <button
              onClick={handleTestAudio}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              {lang === 'ha' ? 'Gwada Sauti' : 'Test Audio'}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 0.75, label: lang === 'ha' ? 'A Hankali (0.75x)' : 'Slow (0.75x)' },
              { val: 0.9, label: lang === 'ha' ? 'Daidai (0.9x)' : 'Natural (0.9x)' },
              { val: 1.0, label: lang === 'ha' ? 'Sauri (1.0x)' : 'Normal (1.0x)' },
            ].map((speed) => (
              <button
                key={speed.val}
                onClick={() => setSpeechSpeed(speed.val)}
                className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  stats.speechSpeed === speed.val
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language UI Switcher */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {lang === 'ha' ? 'Harshen Manhaja (Language)' : 'App Language'}
              </div>
              <div className="text-xs text-slate-400">
                {lang === 'ha' ? 'Hausa (Fassarar Asali)' : 'English Immersion'}
              </div>
            </div>
          </div>
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold text-white cursor-pointer"
          >
            {stats.appLanguage === 'ha' ? 'Hausa ⇄ English' : 'English ⇄ Hausa'}
          </button>
        </div>

        {/* Android Frame Device Simulation Mode Toggle */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {lang === 'ha' ? 'Yanayin Wayar Android' : 'Android Frame Preview'}
              </div>
              <div className="text-xs text-slate-400">
                {isPhoneFrame
                  ? (lang === 'ha' ? 'A cikin kwalin waya' : 'Framed as phone')
                  : (lang === 'ha' ? 'Faɗaɗa a kan kwamfuta' : 'Full width')}
              </div>
            </div>
          </div>
          <button
            onClick={togglePhoneFrame}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold text-slate-200 cursor-pointer"
          >
            {isPhoneFrame ? (lang === 'ha' ? 'Faɗaɗa' : 'Full Screen') : (lang === 'ha' ? 'Kwalin Waya' : 'Phone Frame')}
          </button>
        </div>
      </div>

      {/* Google AdMob Monetization Status Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/50 via-slate-850 to-slate-900 border border-amber-600/30 flex items-center justify-between gap-3 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">
              {lang === 'ha' ? 'Tsarin Google AdMob & Samun Kuɗi' : 'Google AdMob Monetization'}
            </h4>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold uppercase">
              {adMobConfig.testMode ? 'Test Mode' : 'Live'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'ha'
              ? `Kimanin Kuɗi: $${adMobConfig.stats.estimatedRevenueUsd.toFixed(2)} · Nunin Talla: ${adMobConfig.stats.impressions}`
              : `Est. Revenue: $${adMobConfig.stats.estimatedRevenueUsd.toFixed(2)} · Impressions: ${adMobConfig.stats.impressions}`}
          </p>
        </div>
        <button
          onClick={onOpenAdMobSettings}
          className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-950/40 shrink-0 cursor-pointer tap-active transition whitespace-nowrap"
        >
          {lang === 'ha' ? 'Saita AdMob' : 'Configure'}
        </button>
      </div>

      {/* Android PWA Install Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-600/30 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ha' ? 'Sauke Manhajar Android' : 'Install Android App'}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === 'ha' ? 'Aiki ba tare da internet ba (Offline PWA)' : 'Full offline capability & home screen launch'}
          </p>
        </div>
        <PWAInstallButton lang={lang} />
      </div>
    </div>
  );
};
