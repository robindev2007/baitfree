import type { RedditSettings } from './types';

export function getRedditCSS(settings: RedditSettings): string {
  let css = '';

  // Comments (old.reddit & new reddit)
  if (settings.hideComments) {
    css += `
      .commentarea, shreddit-comment-tree, #comment-tree {
        display: none !important;
      }
    `;
  }

  // Front Page Feed
  if (settings.hideFrontPageFeed) {
    css += `
      head:has(link[href="https://www.reddit.com/"]) ~ body div #siteTable,
      .PostsList {
        display: none !important;
      }
      .CommunityHeader ~ .PostsList {
        display: unset !important;
      }
    `;
  }

  // Popular
  if (settings.allowed === 1) {
    css += `
      a[href$='/r/popular/'] {
        display: none !important;
      }
    `;
  }

  // All
  if (settings.allowed === 2) {
    css += `
      a[href$='/r/all/'] {
        display: none !important;
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

