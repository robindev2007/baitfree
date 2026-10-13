import { getAllSettings, isFilterPaused } from '@/lib/storage';
import { getFacebookCSS } from '@/features/facebook/css';
import { getYouTubeCSS } from '@/features/youtube/css';
import { getTwitterCSS } from '@/features/twitter/css';
import { getRedditCSS } from '@/features/reddit/css';
import { getNetflixCSS } from '@/features/netflix/css';
import { getLinkedInCSS } from '@/features/linkedin/css';
import { getInstagramCSS } from '@/features/instagram/css';
import { getPinterestCSS } from '@/features/pinterest/css';

const STYLE_ID = 'undistracted-style';

function applyStyles(css: string) {
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.type = 'text/css';
    (document.head || document.documentElement).appendChild(styleEl);
  }
  styleEl.textContent = css;
}

function removeStyles() {
  const styleEl = document.getElementById(STYLE_ID);
  if (styleEl) {
    styleEl.remove();
  }
}

async function runFilter() {
  try {
    const hostname = window.location.hostname;
    const settings = await getAllSettings();

    if (isFilterPaused(settings.generalSettings)) {
      removeStyles();
      return;
    }

    let css = '';
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      css = getYouTubeCSS(settings.youtubeSettings);
    } else if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      css = getFacebookCSS(settings.facebookSettings);
    } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      css = getTwitterCSS(settings.twitterSettings);
    } else if (hostname.includes('reddit.com')) {
      css = getRedditCSS(settings.redditSettings);
    } else if (hostname.includes('netflix.com')) {
      css = getNetflixCSS(settings.netflixSettings);
    } else if (hostname.includes('linkedin.com')) {
      css = getLinkedInCSS(settings.linkedinSettings);
    } else if (hostname.includes('instagram.com')) {
      css = getInstagramCSS(settings.instagramSettings);
    } else if (hostname.includes('pinterest.com')) {
      css = getPinterestCSS(settings.pinterestSettings);
    }

    applyStyles(css);
  } catch (err) {
    console.error('Error applying UnDistracted filters:', err);
  }
}

export default defineContentScript({
  matches: [
    '*://*.youtube.com/*',
    '*://*.facebook.com/*',
    '*://*.fb.com/*',
    '*://*.twitter.com/*',
    '*://*.x.com/*',
    '*://*.reddit.com/*',
    '*://*.netflix.com/*',
    '*://*.linkedin.com/*',
    '*://*.instagram.com/*',
    '*://*.pinterest.com/*',
  ],
  runAt: 'document_start',
  main() {
    // Run immediately at document_start
    runFilter();

    // Re-check once DOMContentLoaded fires in case document.head was populated late
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runFilter);
    }

    // Listen for runtime message broadcasts from popup or background
    if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener((message) => {
        if (message?.action === 'refresh') {
          runFilter();
        }
      });
    }

    // Listen for storage changes
    if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
      chrome.storage.onChanged.addListener(() => {
        runFilter();
      });
    }
  },
});
