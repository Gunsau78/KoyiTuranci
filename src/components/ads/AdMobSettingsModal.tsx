import React, { useState } from 'react';
import { AdMobConfig, saveAdMobConfig } from '../../utils/admobConfig';
import { soundCtrl } from '../../utils/audio';
import {
  DollarSign,
  X,
  Check,
  Shield,
  HelpCircle,
  Copy,
  ExternalLink,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: AdMobConfig;
  onUpdateConfig: (newConfig: AdMobConfig) => void;
  lang: 'ha' | 'en';
}

export const AdMobSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  lang,
}) => {
  const [form, setForm] = useState<AdMobConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    soundCtrl.playSfx('correct');
    saveAdMobConfig(form);
    onUpdateConfig(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 p-6 shadow-2xl relative text-left my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {lang === 'ha' ? 'Tsarin Google AdMob & Samun Kuɗi' : 'Google AdMob Monetization Settings'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'ha'
                ? 'Sanya bayanan AdMob dinka don fara samun kuɗi daga tallace-tallace'
                : 'Configure your AdMob ad unit IDs to monetize your Android application'}
            </p>
          </div>
        </div>

        {/* Revenue Snapshot Card */}
        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-850 border border-slate-750 mb-5 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {lang === 'ha' ? 'Nunin Talla' : 'Impressions'}
            </span>
            <span className="text-base font-bold text-white font-mono">
              {form.stats.impressions}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {lang === 'ha' ? 'Bidiyon Lada' : 'Rewarded Ads'}
            </span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {form.stats.rewardedEarned}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {lang === 'ha' ? 'Kimanin Kuɗi' : 'Est. Revenue'}
            </span>
            <span className="text-base font-bold text-amber-400 font-mono">
              ${form.stats.estimatedRevenueUsd.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3.5 text-xs">
          {/* Enable AdMob Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-750">
            <div>
              <span className="font-bold text-white block">
                {lang === 'ha' ? 'Kunna Tallan AdMob (Enable Ads)' : 'Enable AdMob Ads'}
              </span>
              <span className="text-slate-400 text-[11px]">
                {lang === 'ha' ? 'Nuna banners da bidiyo a manhaja' : 'Display banner and rewarded video ad units'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Test Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-750">
            <div>
              <span className="font-bold text-white flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ha' ? 'Yanayin Gwaji (Test Mode)' : 'Test Mode (Recommended for testing)'}</span>
              </span>
              <span className="text-slate-400 text-[11px]">
                {lang === 'ha' ? 'Kada ka danna tallan kanka don gudun toshe asusu' : 'Uses official Google test ad unit IDs to prevent account suspension'}
              </span>
            </div>
            <input
              type="checkbox"
              checked={form.testMode}
              onChange={(e) => setForm({ ...form, testMode: e.target.checked })}
              className="w-5 h-5 accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* AdMob App ID */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              Google AdMob App ID
            </label>
            <input
              type="text"
              value={form.appId}
              onChange={(e) => setForm({ ...form, appId: e.target.value })}
              placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Banner Ad Unit ID */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              Banner Ad Unit ID
            </label>
            <input
              type="text"
              value={form.bannerUnitId}
              onChange={(e) => setForm({ ...form, bannerUnitId: e.target.value })}
              placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Rewarded Video Unit ID */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              Rewarded Video Ad Unit ID (Highest Earning)
            </label>
            <input
              type="text"
              value={form.rewardedUnitId}
              onChange={(e) => setForm({ ...form, rewardedUnitId: e.target.value })}
              placeholder="ca-app-pub-XXXXXXXXXXXXXXXX/WWWWWWWWWW"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Android Publishing & AdMob Setup Guide Accordion */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-xs">
          <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ha' ? 'Yadda Zaka Fara Samun Kuɗi a Google Play' : 'How to Monetize & Publish on Google Play'}</span>
          </h4>
          <ol className="list-decimal pl-4 space-y-1.5 text-slate-300">
            <li>
              <strong>{lang === 'ha' ? 'Bude Asusun AdMob:' : 'Create AdMob Account:'}</strong>{' '}
              {lang === 'ha'
                ? 'Shiga admob.google.com da asusunka na Google don kirkirar App ID.'
                : 'Sign in to admob.google.com and click "Add App" (Android).'}
            </li>
            <li>
              <strong>{lang === 'ha' ? 'Kirkiri Rukunin Talla:' : 'Create Ad Units:'}</strong>{' '}
              {lang === 'ha'
                ? 'Kirkiri Banner Ad da Rewarded Video Ad Unit sannan ka liƙa IDs a sama.'
                : 'Generate a Banner Ad Unit and a Rewarded Video Ad Unit, then paste the IDs above.'}
            </li>
            <li>
              <strong>{lang === 'ha' ? 'Gina Android APK / AAB:' : 'Export Android APK / AAB:'}</strong>{' '}
              {lang === 'ha'
                ? 'Manhajar tana da cikakken PWA da manifest. Zaka iya amfani da Bubblewrap (TWA) ko Capacitor don mayar da ita APK na Play Store a minti 5!'
                : 'This app is a compliant PWA. Use Google Bubblewrap or Capacitor to build your signed Play Store APK/AAB in minutes.'}
            </li>
          </ol>
        </div>

        {/* Save button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer transition tap-active"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>{lang === 'ha' ? 'An Ajiye Tsarin AdMob!' : 'AdMob Settings Saved!'}</span>
              </>
            ) : (
              <span>{lang === 'ha' ? 'Ajiye Bayanan AdMob' : 'Save AdMob Settings'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
