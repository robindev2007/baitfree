import { getAllSettings, isFilterPaused, saveCategorySettings, broadcastRefresh } from '@/lib/storage';

export default defineBackground(() => {
  // Setup alarm to monitor temporary snooze expiration
  if (typeof chrome !== 'undefined' && chrome.alarms) {
    chrome.alarms.create('checkSnooze', { periodInMinutes: 1 });

    chrome.alarms.onAlarm.addListener(async (alarm) => {
      if (alarm.name === 'checkSnooze') {
        const settings = await getAllSettings();
        const snooze = settings.generalSettings.disableFiltersTemporary;

        if (snooze?.active && snooze.endTimestamp && Date.now() >= snooze.endTimestamp) {
          // Snooze expired, turn it off
          await saveCategorySettings('generalSettings', {
            ...settings.generalSettings,
            disableFiltersTemporary: {
              active: false,
              pauseTime: snooze.pauseTime,
              endTimestamp: undefined,
            },
          });
          updateBadge();
          broadcastRefresh();
        } else {
          updateBadge();
        }
      }
    });
  }

  // Update extension badge based on filter active/paused state
  async function updateBadge() {
    if (typeof chrome === 'undefined' || !chrome.action) return;

    try {
      const settings = await getAllSettings();
      const paused = isFilterPaused(settings.generalSettings);

      if (paused) {
        chrome.action.setBadgeText({ text: 'OFF' });
        chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
        chrome.action.setTitle({ title: 'UnDistracted: Filters Paused' });
      } else {
        chrome.action.setBadgeText({ text: '' });
        chrome.action.setTitle({ title: 'UnDistracted: Active' });
      }
    } catch (e) {
      // ignore
    }
  }

  // Initial badge update
  updateBadge();

  // Listen to storage changes to update badge immediately
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
    chrome.storage.onChanged.addListener(() => {
      updateBadge();
    });
  }

  // Intercept navigation for site blocking and feed redirection
  if (typeof chrome !== 'undefined' && chrome.webNavigation?.onBeforeNavigate) {
    chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
      // Only process top-level frame navigation
      if (details.frameId !== 0) return;

      try {
        const blockedPageBase = chrome.runtime.getURL('/blocked.html');
        // Prevent redirect loop if already on the blocked page
        if (details.url.startsWith(blockedPageBase)) return;

        const settings = await getAllSettings();
        if (isFilterPaused(settings.generalSettings)) return;

        const url = new URL(details.url);
        const host = url.hostname.toLowerCase();
        const path = url.pathname.toLowerCase();

        // Redirect directly to the internal Blocked page
        const blockedUrl = `${blockedPageBase}?url=${encodeURIComponent(details.url)}`;

        // 1. Check custom blocklist
        if (settings.generalSettings.customSitesToBlock?.active) {
          const list = settings.generalSettings.customSitesToBlock.customURLList || [];
          if (list.some((blocked) => host === blocked || host.endsWith('.' + blocked))) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 2. Facebook
        if (host.includes('facebook.com') || host.includes('fb.com')) {
          if (settings.facebookSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
          if (settings.facebookSettings.blockMessenger && (path.includes('/messages') || host.includes('messenger.com'))) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
          if (settings.facebookSettings.redirectToFriendsFeed) {
            if ((path === '/' || path === '') && !url.search.includes('sk=h_chr')) {
              chrome.tabs.update(details.tabId, {
                url: 'https://www.facebook.com/?filter=friends&sk=h_chr',
              });
              return;
            }
          }
        }

        // 3. YouTube
        if (host.includes('youtube.com') || host.includes('youtu.be')) {
          if (settings.youtubeSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
          if (settings.youtubeSettings.redirectToSubscriptions) {
            if (path === '/' || path === '') {
              chrome.tabs.update(details.tabId, {
                url: 'https://www.youtube.com/feed/subscriptions',
              });
              return;
            }
          }
          if (settings.youtubeSettings.shorts && path.startsWith('/shorts')) {
            chrome.tabs.update(details.tabId, {
              url: 'https://www.youtube.com/feed/subscriptions',
            });
            return;
          }
        }

        // 4. Twitter / X
        if (host.includes('twitter.com') || host.includes('x.com')) {
          if (settings.twitterSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 5. Reddit
        if (host.includes('reddit.com')) {
          if (settings.redditSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 6. Netflix
        if (host.includes('netflix.com')) {
          if (settings.netflixSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 7. LinkedIn
        if (host.includes('linkedin.com')) {
          if (settings.linkedinSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 8. Instagram
        if (host.includes('instagram.com')) {
          if (settings.instagramSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }

        // 9. Pinterest
        if (host.includes('pinterest.com')) {
          if (settings.pinterestSettings.blockSite) {
            chrome.tabs.update(details.tabId, { url: blockedUrl });
            return;
          }
        }
      } catch (e) {
        // invalid URL or ignore
      }
    });
  }
});
