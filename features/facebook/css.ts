import type { FacebookSettings } from './types';

export function getFacebookCSS(settings: FacebookSettings): string {
  let css = '';

  // Hide Feed
  if (settings.feed) {
    css += `
      div.x1hc1fzr.x1unhpq9.x6o7n8i {
        display: none !important;
      }
      /* for mobile */
      #screen-root:has([aria-label="Facebook logo"]) > div > div > :nth-child(n+7) {
        display: none !important;
      }
    `;
  }

  // Hide Likes & Comments
  if (settings.likesComments) {
    css += `
      div.xabvvm4.xeyy32k.x1ia1hqs.x1a2w583.x6ikm8r.x10wlt62 {
        display: none !important;
      }
      /* for mobile */
      div:has(>[aria-label*="like"]) {
        display: none !important;
      }
    `;
  }

  // Hide Chat Sidebar
  if (settings.chatSidebar) {
    css += `
      .fbChatSidebar, #BuddylistPagelet, [data-pagelet="ChatTab"], [aria-label="New Message"], [aria-label="New message"], div[aria-label*="Messenger"], [aria-label="Nieuw chatbericht"] {
        display: none !important;
      }
      [href*="/messages/"] {
        display: none !important;
      }
      .x1n2onr6.x1uc6qws.xyen2ro {
        display: none !important;
      }
    `;
  }

  // Hide Marketplace
  if (settings.marketplace) {
    css += `
      [href*="/marketplace/"] {
        display: none !important;
      }
      [aria-label*="marketplace"] {
        display: none !important;
      }
    `;
  }

  // Hide Reels and Video
  if (settings.reel) {
    css += `
      [href*="/reel/"], [href*="/watch/"] {
        display: none !important;
      }
      [data-type="video"], video, [role="tab"][aria-label*="reel"], [data-is-reels="true"] {
        display: none !important;
      }
    `;
  }

  // Hide Stories
  if (settings.stories) {
    css += `
      [aria-label="Stories"], [aria-label="Verhalen"], [aria-label="Relacje"] {
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

