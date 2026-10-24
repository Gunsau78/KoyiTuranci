/**
 * AdMob Configuration & Service Helper for Koyi Turanci.
 * Uses official Google AdMob Test Ad Unit IDs for safe development,
 * and allows the developer to insert their production AdMob IDs.
 */

export interface AdMobConfig {
  enabled: boolean;
  testMode: boolean;
  appId: string;
  bannerUnitId: string;
  rewardedUnitId: string;
  interstitialUnitId: string;
  stats: {
    impressions: number;
    rewardedEarned: number;
    estimatedRevenueUsd: number;
  };
}

const STORAGE_KEY = 'koyi_turanci_admob_config_v1';

// Official Google AdMob sample test unit IDs (safe from ad fraud during testing)
export const DEFAULT_ADMOB_CONFIG: AdMobConfig = {
  enabled: true,
  testMode: true,
  appId: 'ca-app-pub-3940256099942544~3347511713',
  bannerUnitId: 'ca-app-pub-3940256099942544/6300978111',
  rewardedUnitId: 'ca-app-pub-3940256099942544/5224354917',
  interstitialUnitId: 'ca-app-pub-3940256099942544/1033173712',
  stats: {
    impressions: 12,
    rewardedEarned: 3,
    estimatedRevenueUsd: 0.28,
  },
};

export function loadAdMobConfig(): AdMobConfig {
  if (typeof window === 'undefined') return DEFAULT_ADMOB_CONFIG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_ADMOB_CONFIG, ...JSON.parse(saved) };
    }
  } catch {
    // fallback
  }
  return DEFAULT_ADMOB_CONFIG;
}

export function saveAdMobConfig(config: AdMobConfig) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // ignore
  }
}
