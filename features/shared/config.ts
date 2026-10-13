import type { TabId } from '@/features/layout/types';

export interface PlatformFeatureFlag {
  enabled: boolean;
  label: string;
  description: string;
}

/**
 * Master platform feature flags.
 * Set any platform's `enabled` to `true` or `false` to enable or disable it across the entire extension
 * (UI sidebar, content script rules, and background navigation blockers).
 */
export const PLATFORM_FLAGS: Record<TabId, PlatformFeatureFlag> = {
  facebook: {
    enabled: true,
    label: 'Facebook',
    description: 'Hides feed, reels, stories, likes/comments on facebook.com',
  },
  youtube: {
    enabled: false,
    label: 'YouTube',
    description: 'Hides recommendations, comments, shorts, thumbnails on youtube.com',
  },
  twitter: {
    enabled: false,
    label: 'Twitter / X',
    description: 'Hides timeline, for-you algorithm, trends, media on x.com',
  },
  reddit: {
    enabled: false,
    label: 'Reddit',
    description: 'Hides front page feed, comments, r/popular on reddit.com',
  },
  netflix: {
    enabled: false,
    label: 'Netflix',
    description: 'Hides billboard trailers, continue watching on netflix.com',
  },
  linkedin: {
    enabled: false,
    label: 'LinkedIn',
    description: 'Hides social feed, news tickers, messaging on linkedin.com',
  },
  instagram: {
    enabled: false,
    label: 'Instagram',
    description: 'Hides main feed, reels, explore grid, stories on instagram.com',
  },
  pinterest: {
    enabled: false,
    label: 'Pinterest',
    description: 'Hides main pins feed, search recommendations on pinterest.com',
  },
  settings: {
    enabled: true,
    label: 'Settings',
    description: 'General settings, schedule, and blocklist',
  },
};

/**
 * Helper to check if a platform is currently enabled in the codebase
 */
export function isPlatformEnabled(platform: TabId): boolean {
  return Boolean(PLATFORM_FLAGS[platform]?.enabled);
}

