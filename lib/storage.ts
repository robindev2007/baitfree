import type { FacebookSettings } from '@/features/facebook/types';
import { DEFAULT_FACEBOOK_SETTINGS } from '@/features/facebook/constants';

import type { YouTubeSettings } from '@/features/youtube/types';
import { DEFAULT_YOUTUBE_SETTINGS } from '@/features/youtube/constants';

import type { TwitterSettings } from '@/features/twitter/types';
import { DEFAULT_TWITTER_SETTINGS } from '@/features/twitter/constants';

import type { RedditSettings } from '@/features/reddit/types';
import { DEFAULT_REDDIT_SETTINGS } from '@/features/reddit/constants';

import type { NetflixSettings } from '@/features/netflix/types';
import { DEFAULT_NETFLIX_SETTINGS } from '@/features/netflix/constants';

import type { LinkedInSettings } from '@/features/linkedin/types';
import { DEFAULT_LINKEDIN_SETTINGS } from '@/features/linkedin/constants';

import type { InstagramSettings } from '@/features/instagram/types';
import { DEFAULT_INSTAGRAM_SETTINGS } from '@/features/instagram/constants';

import type { PinterestSettings } from '@/features/pinterest/types';
import { DEFAULT_PINTEREST_SETTINGS } from '@/features/pinterest/constants';

import type { GeneralSettings } from '@/features/settings/types';
import { DEFAULT_GENERAL_SETTINGS } from '@/features/settings/constants';

export interface AppAllSettings {
  facebookSettings: FacebookSettings;
  youtubeSettings: YouTubeSettings;
  twitterSettings: TwitterSettings;
  redditSettings: RedditSettings;
  netflixSettings: NetflixSettings;
  linkedinSettings: LinkedInSettings;
  instagramSettings: InstagramSettings;
  pinterestSettings: PinterestSettings;
  generalSettings: GeneralSettings;
}

export const DEFAULT_ALL_SETTINGS: AppAllSettings = {
  facebookSettings: DEFAULT_FACEBOOK_SETTINGS,
  youtubeSettings: DEFAULT_YOUTUBE_SETTINGS,
  twitterSettings: DEFAULT_TWITTER_SETTINGS,
  redditSettings: DEFAULT_REDDIT_SETTINGS,
  netflixSettings: DEFAULT_NETFLIX_SETTINGS,
  linkedinSettings: DEFAULT_LINKEDIN_SETTINGS,
  instagramSettings: DEFAULT_INSTAGRAM_SETTINGS,
  pinterestSettings: DEFAULT_PINTEREST_SETTINGS,
  generalSettings: DEFAULT_GENERAL_SETTINGS,
};

// Check if chrome/browser storage is available
function getStorageArea() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    return chrome.storage.sync;
  }
  if (typeof browser !== 'undefined' && browser.storage && browser.storage.sync) {
    return browser.storage.sync;
  }
  return null;
}

/**
 * Normalizes legacy objects with `.value` format into a flat key-value object
 */
function normalizeSettings<T extends Record<string, any>>(raw: any, defaults: T): T {
  if (!raw || typeof raw !== 'object') return { ...defaults };
  const result: any = { ...defaults };

  for (const key of Object.keys(defaults)) {
    if (key in raw) {
      const val = raw[key];
      if (val !== null && typeof val === 'object' && 'value' in val && !('active' in val)) {
        result[key] = val.value;
      } else {
        result[key] = val;
      }
    }
  }

  return result as T;
}

/**
 * Retrieve all settings from storage
 */
export async function getAllSettings(): Promise<AppAllSettings> {
  const storage = getStorageArea();

  if (!storage) {
    try {
      const stored = localStorage.getItem('undistracted_all_settings');
      return stored ? JSON.parse(stored) : DEFAULT_ALL_SETTINGS;
    } catch {
      return DEFAULT_ALL_SETTINGS;
    }
  }

  return new Promise((resolve) => {
    storage.get(null, (items: Record<string, any>) => {
      resolve({
        facebookSettings: normalizeSettings(items.facebookSettings, DEFAULT_FACEBOOK_SETTINGS),
        youtubeSettings: normalizeSettings(items.youtubeSettings, DEFAULT_YOUTUBE_SETTINGS),
        twitterSettings: normalizeSettings(items.twitterSettings, DEFAULT_TWITTER_SETTINGS),
        redditSettings: normalizeSettings(items.redditSettings, DEFAULT_REDDIT_SETTINGS),
        netflixSettings: normalizeSettings(items.netflixSettings, DEFAULT_NETFLIX_SETTINGS),
        linkedinSettings: normalizeSettings(items.linkedinSettings, DEFAULT_LINKEDIN_SETTINGS),
        instagramSettings: normalizeSettings(items.instagramSettings, DEFAULT_INSTAGRAM_SETTINGS),
        pinterestSettings: normalizeSettings(items.pinterestSettings, DEFAULT_PINTEREST_SETTINGS),
        generalSettings: normalizeSettings(items.generalSettings, DEFAULT_GENERAL_SETTINGS),
      });
    });
  });
}

/**
 * Save settings for a specific category
 */
export async function saveCategorySettings<K extends keyof AppAllSettings>(
  category: K,
  value: AppAllSettings[K]
): Promise<void> {
  const storage = getStorageArea();

  if (!storage) {
    try {
      const current = await getAllSettings();
      current[category] = value;
      localStorage.setItem('undistracted_all_settings', JSON.stringify(current));
    } catch {
      // ignore in SSR/restricted environments
    }
    return;
  }

  return new Promise((resolve) => {
    storage.set({ [category]: value }, () => {
      broadcastRefresh();
      resolve();
    });
  });
}

/**
 * Broadcasts a refresh message to all open tabs so content scripts re-evaluate instantly
 */
export function broadcastRefresh() {
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { action: 'refresh' }).catch(() => {
            // tab might not be a target page, ignore error
          });
        }
      }
    });
  }
}

/**
 * Checks if filtering is currently paused due to master toggle, snooze, schedule hours, or days
 */
export function isFilterPaused(generalSettings: GeneralSettings): boolean {
  if (!generalSettings) return false;

  // Master switch
  if (generalSettings.disableFilters) return true;

  // Temporary Snooze
  if (generalSettings.disableFiltersTemporary?.active) {
    const end = generalSettings.disableFiltersTemporary.endTimestamp;
    if (end && Date.now() < end) {
      return true;
    }
  }

  const now = new Date();
  const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
  // In DAYS_OF_WEEK: [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  // Map JS getDay(): 0 (Sun) -> index 6, 1 (Mon) -> index 0, etc.
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;

  // Day filter
  if (generalSettings.disableDuringDays?.active) {
    if (generalSettings.disableDuringDays.days?.[dayIndex]) {
      return true;
    }
  }

  // Hours filter
  if (generalSettings.disableDuringHours?.active) {
    const from = generalSettings.disableDuringHours.fromTime;
    const to = generalSettings.disableDuringHours.toTime;
    if (from && to) {
      const currentHHMM =
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0');

      if (from < to) {
        if (currentHHMM >= from && currentHHMM < to) return true;
      } else {
        // Spans midnight, e.g. 22:00 to 06:00
        if (currentHHMM >= from || currentHHMM < to) return true;
      }
    }
  }

  return false;
}

