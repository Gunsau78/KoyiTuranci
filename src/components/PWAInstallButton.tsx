import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';

interface Props {
  lang: 'ha' | 'en';
}

export const PWAInstallButton: React.FC<Props> = ({ lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [installing, setInstalling] = useState(false);

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-medium">
        <Check className="w-3.5 h-3.5" />
        <span>{lang === 'ha' ? 'An riga an sauke manhajar' : 'App Installed on Device'}</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setInstalling(true);
      await install();
      setInstalling(false);
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={installing}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/30 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
      >
        <Smartphone className="w-4 h-4" />
        <span>
          {isInstallable
            ? (lang === 'ha' ? 'Sauke Manhajar Android' : 'Install Android App')
            : (lang === 'ha' ? 'Sauke a Wayarka' : 'Add to Phone Home Screen')}
        </span>
        <Download className="w-3.5 h-3.5 opacity-80" />
      </button>

      {/* Modal Guide for manual installation (Chrome Android menu / iOS Safari) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {lang === 'ha' ? 'Yadda Zaka Sauke a Android' : 'How to Install on Android'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'ha' ? 'Koyi Turanci a wayarka ba tare da bata lokaci ba' : 'Instant offline access on your phone'}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              {isIOS ? (
                <>
                  <p className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <strong>1.</strong> {lang === 'ha' ? 'Danna alamar raba abu (Share button) a kasan Safari.' : 'Tap the Share icon at the bottom of Safari.'}
                  </p>
                  <p className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <strong>2.</strong> {lang === 'ha' ? 'Zaɓi "Add to Home Screen" (Ƙara a Fuskar Waya).' : 'Scroll down and select "Add to Home Screen".'}
                  </p>
                </>
              ) : (
                <>
                  <p className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <strong>1.</strong> {lang === 'ha' ? 'Danna dige-dige guda uku (⋮) a saman Chrome browser ɗinka.' : 'Tap the 3 dots (⋮) menu in Chrome.'}
                  </p>
                  <p className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <strong>2.</strong> {lang === 'ha' ? 'Zaɓi "Install app" ko "Add to Home screen" (Ƙara a Fuskar Wayar Android).' : 'Select "Install app" or "Add to Home Screen".'}
                  </p>
                  <p className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60">
                    <strong>3.</strong> {lang === 'ha' ? 'Manhajar za ta sauka kamar asalin app na Android tare da sauti da atisaye!' : 'The app will launch like a native Android APK with zero lag!'}
                  </p>
                </>
              )}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition"
            >
              {lang === 'ha' ? 'Na Fahimta' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
