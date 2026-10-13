import type { TwitterSettings } from './types';

export function getTwitterCSS(settings: TwitterSettings): string {
  let css = '';

  // Trends & Explore
  if (settings.trends) {
    css += `
      .Trends, [aria-label="Timeline: Trending now"], [href="/explore"], [aria-label="Timeline: Explore"] {
        display: none !important;
      }
    `;
  }

  // "For You" Algorithmic Timeline
  if (settings.forYou) {
    css += `
      .for-you-timeline {
        visibility: hidden !important;
      }
      .for-you {
        display: none !important;
      }
    `;
  }

  // Who to Follow
  if (settings.whoToFollow) {
    css += `
      .wtf-module, [aria-label="Who to follow"] {
        display: none !important;
      }
    `;
  }

  // Media (images & videos)
  if (settings.media) {
    css += `
      .AdaptiveMedia, [aria-label="Image"], video {
        display: none !important;
      }
    `;
  }

  // Timeline (Main feed)
  if (settings.timeline) {
    css += `
      [role='main']#timeline .stream-container, [aria-label="Timeline: Your Home Timeline"] {
        visibility: hidden !important;
      }
    `;
  }

  // Remove Colors (Pro)
  if (settings.color) {
    css += `
      html {
        filter: saturate(0) !important;
      }
    `;
  }

  return css;
}

