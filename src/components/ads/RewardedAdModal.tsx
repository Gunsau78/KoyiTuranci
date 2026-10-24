import React, { useState, useEffect } from 'react';
import { AdMobConfig } from '../../utils/admobConfig';
import { soundCtrl } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Play, Sparkles, CheckCircle2, X, Award, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRewardGranted: (rewardAmount: number) => void;
  config: AdMobConfig;
  lang: 'ha' | 'en';
}

export const RewardedAdModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRewardGranted,
  config,
  lang,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(5);
      setIsCompleted(false);
      return;
    }

    const interval = setInterval(() => {
      setSecondsRemaining((sec) => {
        if (sec <= 1) {
          clearInterval(interval);
          setIsCompleted(true);
          soundCtrl.playSfx('correct');
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    soundCtrl.playSfx('levelUp');
    onRewardGranted(50);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-5 shadow-2xl relative text-center">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Award className="w-4 h-4" />
            <span>{config.testMode ? 'Google AdMob Rewarded (Test Mode)' : 'Google AdMob Rewarded Video'}</span>
          </div>
          {isCompleted ? (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="font-mono text-xs text-slate-400">
              {secondsRemaining}s
            </span>
          )}
        </div>

        {/* Video simulation box */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
          {/* Animated playback progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - secondsRemaining) / 5) * 100}%` }}
            />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-950/50 mb-3 animate-pulse">
            <Sparkles className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-white tracking-tight">
            Learn English with Mobile Apps
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-[240px]">
            {lang === 'ha'
              ? 'Talla ta musamman daga abokan huldar Google AdMob'
              : 'Sponsored message delivered via Google AdMob Network'}
          </p>

          <div className="mt-4 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400">
            Unit: {config.rewardedUnitId.slice(0, 16)}...
          </div>
        </div>

        {/* Status action */}
        <div className="mt-4">
          {isCompleted ? (
            <button
              onClick={handleClaim}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer tap-active transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === 'ha' ? 'Karɓi Maki +50 XP Yanzu!' : 'Claim +50 XP Reward!'}</span>
            </button>
          ) : (
            <div className="py-3 text-xs text-slate-400">
              {lang === 'ha'
                ? `Kalli na daƙiƙa ${secondsRemaining} don samun ladan maki...`
                : `Reward unlocks in ${secondsRemaining} seconds...`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
