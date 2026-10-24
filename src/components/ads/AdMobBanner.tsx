import React, { useState } from 'react';
import { AdMobConfig } from '../../utils/admobConfig';
import { ExternalLink, Info, X } from 'lucide-react';

interface Props {
  config: AdMobConfig;
  onAdClicked?: () => void;
  lang: 'ha' | 'en';
}

export const AdMobBanner: React.FC<Props> = ({ config, onAdClicked, lang }) => {
  const [dismissed, setDismissed] = useState(false);

  if (!config.enabled || dismissed) return null;

  return (
    <div className="w-full max-w-xl mx-auto my-2 px-2">
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-750/90 p-3 shadow-md flex items-center justify-between gap-3 overflow-hidden">
        {/* Ad Tag Indicator */}
        <div className="absolute top-1 right-2 flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
          <span>{config.testMode ? 'Google AdMob Test' : 'Ad · Talla'}</span>
        </div>

        {/* Ad Content */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
            4G
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white tracking-wide">
                Fast Data for Learning
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-semibold">
                Sponsored
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
              {lang === 'ha'
                ? 'Sauke bayanai & bidiyo cikin sauri ba tare da jinkiri ba.'
                : 'High-speed mobile data for streaming lessons and audio.'}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-1 shrink-0 pt-2">
          <button
            onClick={() => {
              if (onAdClicked) onAdClicked();
              window.open('https://play.google.com', '_blank', 'noopener,noreferrer');
            }}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition shadow-sm tap-active cursor-pointer"
          >
            {lang === 'ha' ? 'Duba' : 'Install'}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-500 hover:text-slate-300 rounded"
            title={lang === 'ha' ? 'Rufe talla' : 'Dismiss'}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
