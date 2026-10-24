/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLearningStore } from './hooks/useLearningStore';
import { DailyHubView } from './components/DailyHubView';
import { GamesHubView } from './components/GamesHubView';
import { PronunciationCoach } from './components/PronunciationCoach';
import { PhrasebookView } from './components/PhrasebookView';
import { FlashcardDeck } from './components/games/FlashcardDeck';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { AdMobBanner } from './components/ads/AdMobBanner';
import { RewardedAdModal } from './components/ads/RewardedAdModal';
import { AdMobSettingsModal } from './components/ads/AdMobSettingsModal';
import { loadAdMobConfig, saveAdMobConfig, AdMobConfig } from './utils/admobConfig';
import { soundCtrl } from './utils/audio';
import {
  Sparkles,
  Gamepad2,
  Mic2,
  BookOpen,
  Layers,
  User,
  Flame,
  Globe,
  WifiOff,
  Smartphone,
  Trophy,
  DollarSign,
} from 'lucide-react';

type Tab = 'daily' | 'games' | 'pronounce' | 'phrases' | 'vocab' | 'profile';

export default function App() {
  const {
    stats,
    addXP,
    markWordMastered,
    markWordNeedsReview,
    toggleBookmarkPhrase,
    completeDailyTask,
    recordHighScore,
    toggleSound,
    setSpeechSpeed,
    toggleLanguage,
  } = useLearningStore();

  const [activeTab, setActiveTab] = useState<Tab>('daily');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // AdMob State
  const [adMobConfig, setAdMobConfig] = useState<AdMobConfig>(loadAdMobConfig);
  const [isRewardedOpen, setIsRewardedOpen] = useState(false);
  const [isAdMobSettingsOpen, setIsAdMobSettingsOpen] = useState(false);

  // Monitor online/offline state
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const lang = stats.appLanguage;

  const handleGameFinished = (gameType: 'wordMatch' | 'sentenceBuilder' | 'listeningQuiz', score: number) => {
    addXP(score);
    recordHighScore(gameType, score);
    completeDailyTask('gamePlayed');

    // Increment AdMob impression stats gently
    setAdMobConfig((prev) => {
      const updated = {
        ...prev,
        stats: {
          ...prev.stats,
          impressions: prev.stats.impressions + 1,
          estimatedRevenueUsd: prev.stats.estimatedRevenueUsd + 0.015,
        },
      };
      saveAdMobConfig(updated);
      return updated;
    });
  };

  const handleRewardedGranted = (rewardAmount: number) => {
    addXP(rewardAmount);
    setAdMobConfig((prev) => {
      const updated = {
        ...prev,
        stats: {
          ...prev.stats,
          impressions: prev.stats.impressions + 1,
          rewardedEarned: prev.stats.rewardedEarned + 1,
          estimatedRevenueUsd: prev.stats.estimatedRevenueUsd + 0.05,
        },
      };
      saveAdMobConfig(updated);
      return updated;
    });
  };

  const navItems = [
    { id: 'daily' as Tab, labelHa: 'Yau', labelEn: 'Today', icon: Sparkles },
    { id: 'games' as Tab, labelHa: 'Wasanni', labelEn: 'Games', icon: Gamepad2 },
    { id: 'pronounce' as Tab, labelHa: 'Furuci', labelEn: 'Phonetics', icon: Mic2 },
    { id: 'vocab' as Tab, labelHa: 'Kalmomi', labelEn: 'Flashcards', icon: Layers },
    { id: 'phrases' as Tab, labelHa: 'Jimloli', labelEn: 'Phrases', icon: BookOpen },
    { id: 'profile' as Tab, labelHa: 'Bayani', labelEn: 'Profile', icon: User },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'daily':
        return (
          <DailyHubView
            streak={stats.streak}
            xp={stats.xp}
            levelTitleHa={stats.levelTitleHa}
            levelTitleEn={stats.levelTitleEn}
            dailyTasks={stats.dailyTasksCompleted}
            onCompleteTask={completeDailyTask}
            onNavigateTab={(tab) => {
              if (tab === 'games') setActiveTab('games');
              else if (tab === 'pronounce') setActiveTab('pronounce');
              else if (tab === 'vocab') setActiveTab('vocab');
              else if (tab === 'phrases') setActiveTab('phrases');
            }}
            onWatchRewardedAd={() => setIsRewardedOpen(true)}
            lang={lang}
          />
        );
      case 'games':
        return (
          <GamesHubView
            highScores={stats.gameHighScores}
            onGameFinished={handleGameFinished}
            lang={lang}
          />
        );
      case 'pronounce':
        return (
          <PronunciationCoach
            onPracticeDone={() => {
              addXP(20);
              completeDailyTask('pronunciationPracticed');
            }}
            lang={lang}
          />
        );
      case 'vocab':
        return (
          <FlashcardDeck
            masteredIds={stats.masteredWords}
            reviewIds={stats.reviewWords}
            onMasterWord={markWordMastered}
            onReviewWord={markWordNeedsReview}
            lang={lang}
          />
        );
      case 'phrases':
        return (
          <PhrasebookView
            bookmarkedIds={stats.bookmarkedPhrases}
            onToggleBookmark={toggleBookmarkPhrase}
            lang={lang}
          />
        );
      case 'profile':
        return (
          <ProfileSettingsView
            stats={stats}
            adMobConfig={adMobConfig}
            onOpenAdMobSettings={() => setIsAdMobSettingsOpen(true)}
            toggleSound={toggleSound}
            setSpeechSpeed={setSpeechSpeed}
            toggleLanguage={toggleLanguage}
            lang={lang}
            isPhoneFrame={isPhoneFrame}
            togglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start font-sans">
      {/* Offline Status Toast */}
      {!isOnline && (
        <div className="fixed top-2 z-50 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold shadow-lg flex items-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>{lang === 'ha' ? 'Yanayin Ba tare da Intanet ba (Offline)' : 'Offline Mode — Cached data active'}</span>
        </div>
      )}

      {/* Main Top Header Bar (Complies with Top Bar Contract: Zone 1 Wordmark, Zone 2 Nav Links, Zone 3 Primary Action) */}
      <header className="w-full max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-8 border-b border-slate-800 shrink-0">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-950/40">
            KT
          </div>
          <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight">
            Koyi Turanci
          </span>
        </div>

        {/* Zone 2: Navigation Links (single line, clean unboxed hover states) */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-400">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundCtrl.playSfx('click');
                setActiveTab(item.id);
              }}
              className={`hover:text-white transition whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === item.id ? 'text-emerald-400 font-bold border-b-2 border-emerald-400 pb-0.5' : ''
              }`}
            >
              {lang === 'ha' ? item.labelHa : item.labelEn}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action (Language immersion toggle & XP badge) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAdMobSettingsOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 hover:bg-amber-900/40 text-xs font-bold transition cursor-pointer"
            title={lang === 'ha' ? 'Tsarin AdMob & Samun Kuɗi' : 'AdMob Monetization'}
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>${adMobConfig.stats.estimatedRevenueUsd.toFixed(2)}</span>
          </button>

          <button
            onClick={() => {
              soundCtrl.playSfx('click');
              toggleLanguage();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-750 text-xs font-bold text-slate-200 transition cursor-pointer whitespace-nowrap"
            title={lang === 'ha' ? 'Canza harshe' : 'Switch language'}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'ha' ? 'Hausa' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className={`flex-1 w-full flex justify-center py-2 sm:py-4 px-0 sm:px-4 ${isPhoneFrame ? 'items-center' : ''}`}>
        {isPhoneFrame ? (
          // Sleek Android Device Frame Container (Simulating Android phone)
          <div className="relative w-full max-w-[420px] h-[820px] max-h-[92vh] bg-slate-900 border-[10px] border-slate-800 rounded-[44px] shadow-2xl flex flex-col overflow-hidden ring-1 ring-slate-700/60">
            {/* Android Speaker & Camera Notch */}
            <div className="h-6 w-full bg-slate-900 flex items-center justify-center shrink-0 pt-1">
              <div className="w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 px-2">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto pb-20 bg-slate-950 flex flex-col">
              <div className="flex-1">
                {renderActiveView()}
              </div>
              {/* AdMob Banner at bottom of content */}
              <AdMobBanner config={adMobConfig} lang={lang} />
            </div>

            {/* Android Bottom Navigation Bar */}
            <nav className="absolute bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 grid grid-cols-6 items-center px-1 z-30">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundCtrl.playSfx('click');
                      setActiveTab(item.id);
                    }}
                    className={`flex flex-col items-center justify-center py-1 rounded-xl transition cursor-pointer tap-active ${
                      isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                    <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[50px]">
                      {lang === 'ha' ? item.labelHa : item.labelEn}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        ) : (
          // Responsive Full-Screen / Mobile-friendly canvas
          <div className="w-full max-w-2xl flex flex-col flex-1 pb-20 sm:pb-8">
            <div className="flex-1 flex flex-col">
              {renderActiveView()}
            </div>

            {/* In-feed AdMob Banner */}
            <AdMobBanner config={adMobConfig} lang={lang} />

            {/* Mobile Fixed Bottom Tab Bar (Visible on mobile screens) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 grid grid-cols-6 items-center px-1 z-30 shadow-lg">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundCtrl.playSfx('click');
                      setActiveTab(item.id);
                    }}
                    className={`flex flex-col items-center justify-center h-full py-1 rounded-xl transition cursor-pointer tap-active ${
                      isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                    <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[50px]">
                      {lang === 'ha' ? item.labelHa : item.labelEn}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </main>

      {/* Rewarded Video Ad Modal */}
      <RewardedAdModal
        isOpen={isRewardedOpen}
        onClose={() => setIsRewardedOpen(false)}
        onRewardGranted={handleRewardedGranted}
        config={adMobConfig}
        lang={lang}
      />

      {/* AdMob Settings & Revenue Configuration Modal */}
      <AdMobSettingsModal
        isOpen={isAdMobSettingsOpen}
        onClose={() => setIsAdMobSettingsOpen(false)}
        config={adMobConfig}
        onUpdateConfig={(newCfg) => setAdMobConfig(newCfg)}
        lang={lang}
      />
    </div>
  );
}
