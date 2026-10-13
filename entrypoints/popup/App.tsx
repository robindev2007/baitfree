import * as React from 'react';
import { Header } from '@/features/layout/components/Header';
import { SidebarNav } from '@/features/layout/components/SidebarNav';
import type { TabId } from '@/features/layout/types';
import {
  getAllSettings,
  saveCategorySettings,
  broadcastRefresh,
} from '@/lib/storage';

// Per-platform views
import { FacebookView } from '@/features/facebook/components/FacebookView';
import { DEFAULT_FACEBOOK_SETTINGS } from '@/features/facebook/constants';
import type { FacebookSettings, FacebookSettingKey } from '@/features/facebook/types';

import { YouTubeView } from '@/features/youtube/components/YouTubeView';
import { DEFAULT_YOUTUBE_SETTINGS } from '@/features/youtube/constants';
import type { YouTubeSettings, YouTubeSettingKey } from '@/features/youtube/types';

import { TwitterView } from '@/features/twitter/components/TwitterView';
import { DEFAULT_TWITTER_SETTINGS } from '@/features/twitter/constants';
import type { TwitterSettings, TwitterSettingKey } from '@/features/twitter/types';

import { RedditView } from '@/features/reddit/components/RedditView';
import { DEFAULT_REDDIT_SETTINGS } from '@/features/reddit/constants';
import type { RedditSettings, RedditSettingKey } from '@/features/reddit/types';

import { NetflixView } from '@/features/netflix/components/NetflixView';
import { DEFAULT_NETFLIX_SETTINGS } from '@/features/netflix/constants';
import type { NetflixSettings, NetflixSettingKey } from '@/features/netflix/types';

import { LinkedInView } from '@/features/linkedin/components/LinkedInView';
import { DEFAULT_LINKEDIN_SETTINGS } from '@/features/linkedin/constants';
import type { LinkedInSettings, LinkedInSettingKey } from '@/features/linkedin/types';

import { InstagramView } from '@/features/instagram/components/InstagramView';
import { DEFAULT_INSTAGRAM_SETTINGS } from '@/features/instagram/constants';
import type { InstagramSettings, InstagramSettingKey } from '@/features/instagram/types';

import { PinterestView } from '@/features/pinterest/components/PinterestView';
import { DEFAULT_PINTEREST_SETTINGS } from '@/features/pinterest/constants';
import type { PinterestSettings, PinterestSettingKey } from '@/features/pinterest/types';

import { SettingsView } from '@/features/settings/components/SettingsView';
import { DEFAULT_GENERAL_SETTINGS } from '@/features/settings/constants';
import type { GeneralSettings } from '@/features/settings/types';
import { NAV_TABS } from '@/features/layout/constants';
import { isPlatformEnabled } from '@/features/shared/config';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<TabId>(() => {
    const saved = localStorage.getItem('baitfree_active_tab') as TabId;
    if (saved && isPlatformEnabled(saved)) return saved;
    return NAV_TABS[0]?.id || 'facebook';
  });
  const [isDark, setIsDark] = React.useState<boolean>(() => {
    const saved = localStorage.getItem('baitfree_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  });
  const [isPro, setIsPro] = React.useState<boolean>(() => {
    return localStorage.getItem('baitfree_has_paid') === 'true';
  });
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Per-platform filter states
  const [fbSettings, setFbSettings] = React.useState<FacebookSettings>(DEFAULT_FACEBOOK_SETTINGS);
  const [ytSettings, setYtSettings] = React.useState<YouTubeSettings>(DEFAULT_YOUTUBE_SETTINGS);
  const [twSettings, setTwSettings] = React.useState<TwitterSettings>(DEFAULT_TWITTER_SETTINGS);
  const [rdSettings, setRdSettings] = React.useState<RedditSettings>(DEFAULT_REDDIT_SETTINGS);
  const [nfSettings, setNfSettings] = React.useState<NetflixSettings>(DEFAULT_NETFLIX_SETTINGS);
  const [liSettings, setLiSettings] = React.useState<LinkedInSettings>(DEFAULT_LINKEDIN_SETTINGS);
  const [igSettings, setIgSettings] = React.useState<InstagramSettings>(DEFAULT_INSTAGRAM_SETTINGS);
  const [pinSettings, setPinSettings] = React.useState<PinterestSettings>(DEFAULT_PINTEREST_SETTINGS);
  const [generalSettings, setGeneralSettings] = React.useState<GeneralSettings>(DEFAULT_GENERAL_SETTINGS);

  // Permissions state
  const [permissions, setPermissions] = React.useState({
    twitter: true,
    instagram: true,
    pinterest: true,
  });

  // Load real settings on mount
  React.useEffect(() => {
    async function load() {
      const all = await getAllSettings();
      setFbSettings(all.facebookSettings);
      setYtSettings(all.youtubeSettings);
      setTwSettings(all.twitterSettings);
      setRdSettings(all.redditSettings);
      setNfSettings(all.netflixSettings);
      setLiSettings(all.linkedinSettings);
      setIgSettings(all.instagramSettings);
      setPinSettings(all.pinterestSettings);
      setGeneralSettings(all.generalSettings);
      setIsLoaded(true);
    }
    load();
    checkPermissions();
  }, []);

  // Save active tab
  React.useEffect(() => {
    localStorage.setItem('baitfree_active_tab', activeTab);
  }, [activeTab]);

  // Sync dark class on document element
  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('baitfree_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('baitfree_theme', 'light');
    }
  }, [isDark]);

  // Check optional browser permissions
  async function checkPermissions() {
    if (typeof chrome !== 'undefined' && chrome.permissions?.contains) {
      const ig = await chrome.permissions.contains({
        origins: ['*://*.instagram.com/*'],
      });
      const pin = await chrome.permissions.contains({
        origins: ['*://*.pinterest.com/*'],
      });
      setPermissions({
        twitter: true,
        instagram: ig,
        pinterest: pin,
      });
    }
  }

  // Request browser permission
  async function requestOriginPermission(origin: string, key: 'instagram' | 'pinterest') {
    if (typeof chrome !== 'undefined' && chrome.permissions?.request) {
      try {
        const granted = await chrome.permissions.request({
          origins: [origin],
        });
        if (granted) {
          setPermissions((p) => ({ ...p, [key]: true }));
        }
      } catch (err) {
        console.error('Permission request failed:', err);
      }
    } else {
      // Mock grant in dev/preview
      setPermissions((p) => ({ ...p, [key]: true }));
    }
  }

  // Update handlers with real persistence to chrome.storage.sync
  const updateFacebook = async (key: FacebookSettingKey, val: boolean) => {
    const next = { ...fbSettings, [key]: val };
    setFbSettings(next);
    await saveCategorySettings('facebookSettings', next);
  };

  const updateYouTube = async (key: YouTubeSettingKey, val: any) => {
    const next = { ...ytSettings, [key]: val };
    setYtSettings(next);
    await saveCategorySettings('youtubeSettings', next);
  };

  const updateTwitter = async (key: TwitterSettingKey, val: boolean) => {
    const next = { ...twSettings, [key]: val };
    setTwSettings(next);
    await saveCategorySettings('twitterSettings', next);
  };

  const updateReddit = async (key: RedditSettingKey, val: any) => {
    const next = { ...rdSettings, [key]: val };
    setRdSettings(next);
    await saveCategorySettings('redditSettings', next);
  };

  const updateNetflix = async (key: NetflixSettingKey, val: boolean) => {
    const next = { ...nfSettings, [key]: val };
    setNfSettings(next);
    await saveCategorySettings('netflixSettings', next);
  };

  const updateLinkedIn = async (key: LinkedInSettingKey, val: boolean) => {
    const next = { ...liSettings, [key]: val };
    setLiSettings(next);
    await saveCategorySettings('linkedinSettings', next);
  };

  const updateInstagram = async (key: InstagramSettingKey, val: boolean) => {
    const next = { ...igSettings, [key]: val };
    setIgSettings(next);
    await saveCategorySettings('instagramSettings', next);
  };

  const updatePinterest = async (key: PinterestSettingKey, val: boolean) => {
    const next = { ...pinSettings, [key]: val };
    setPinSettings(next);
    await saveCategorySettings('pinterestSettings', next);
  };

  const updateGeneral = async <K extends keyof GeneralSettings>(
    key: K,
    val: GeneralSettings[K]
  ) => {
    let nextVal = val;

    // Handle Snooze timestamps
    if (key === 'disableFiltersTemporary') {
      const snooze = val as GeneralSettings['disableFiltersTemporary'];
      if (snooze.active) {
        nextVal = {
          ...snooze,
          endTimestamp: Date.now() + snooze.pauseTime * 60 * 1000,
        } as GeneralSettings[K];
      } else {
        nextVal = {
          ...snooze,
          endTimestamp: undefined,
        } as GeneralSettings[K];
      }
    }

    const next = { ...generalSettings, [key]: nextVal };
    setGeneralSettings(next);
    await saveCategorySettings('generalSettings', next);
  };

  // Toggle Pro status (can be clicked in header for testing/upgrading)
  const togglePro = () => {
    const next = !isPro;
    setIsPro(next);
    localStorage.setItem('baitfree_has_paid', String(next));
  };

  // Count active filters per platform
  const filterCounts: Record<TabId, number> = {
    facebook: Object.values(fbSettings).filter(Boolean).length,
    youtube: Object.entries(ytSettings).filter(([k, v]) => (k === 'thumbnail' ? v !== 0 : Boolean(v))).length,
    twitter: Object.values(twSettings).filter(Boolean).length,
    reddit: Object.entries(rdSettings).filter(([k, v]) => (k === 'allowed' ? v !== 0 : Boolean(v))).length,
    netflix: Object.values(nfSettings).filter(Boolean).length,
    linkedin: Object.values(liSettings).filter(Boolean).length,
    instagram: Object.values(igSettings).filter(Boolean).length,
    pinterest: Object.values(pinSettings).filter(Boolean).length,
    settings: 0,
  };

  if (!isLoaded) {
    return (
      <div className="flex h-[520px] w-[600px] items-center justify-center bg-background text-xs text-muted-foreground">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="flex h-[520px] w-[600px] flex-col overflow-hidden bg-background text-foreground antialiased selection:bg-primary/20">
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        isPro={isPro}
      />

      <div className="flex flex-1 overflow-hidden">
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          filterCounts={filterCounts}
        />

        <main className="flex-1 overflow-hidden p-3.5 min-w-0 bg-background/50">
          {activeTab === 'facebook' && (
            <FacebookView
              settings={fbSettings}
              onUpdate={updateFacebook}
              isPro={isPro}
            />
          )}

          {activeTab === 'youtube' && (
            <YouTubeView
              settings={ytSettings}
              onUpdate={updateYouTube}
              isPro={isPro}
            />
          )}

          {activeTab === 'twitter' && (
            <TwitterView
              settings={twSettings}
              onUpdate={updateTwitter}
              isPro={isPro}
              hasPermission={permissions.twitter}
              onRequestPermission={() =>
                requestOriginPermission('*://*.twitter.com/*', 'twitter' as any)
              }
            />
          )}

          {activeTab === 'reddit' && (
            <RedditView
              settings={rdSettings}
              onUpdate={updateReddit}
              isPro={isPro}
            />
          )}

          {activeTab === 'netflix' && (
            <NetflixView
              settings={nfSettings}
              onUpdate={updateNetflix}
              isPro={isPro}
            />
          )}

          {activeTab === 'linkedin' && (
            <LinkedInView
              settings={liSettings}
              onUpdate={updateLinkedIn}
              isPro={isPro}
            />
          )}

          {activeTab === 'instagram' && (
            <InstagramView
              settings={igSettings}
              onUpdate={updateInstagram}
              isPro={isPro}
              hasPermission={permissions.instagram}
              onRequestPermission={() =>
                requestOriginPermission('*://*.instagram.com/*', 'instagram')
              }
            />
          )}

          {activeTab === 'pinterest' && (
            <PinterestView
              settings={pinSettings}
              onUpdate={updatePinterest}
              isPro={isPro}
              hasPermission={permissions.pinterest}
              onRequestPermission={() =>
                requestOriginPermission('*://*.pinterest.com/*', 'pinterest')
              }
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={generalSettings}
              onUpdate={updateGeneral}
              isPro={isPro}
            />
          )}
        </main>
      </div>
    </div>
  );
}
