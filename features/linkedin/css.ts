import type { LinkedInSettings } from './types';

export function getLinkedInCSS(settings: LinkedInSettings): string {
  let css = '';

  // Main Feed
  if (settings.feed) {
    css += `
      #voyager-feed main#main[aria-label='Main Feed'],
      .scaffold-layout__content main[aria-label="Main Feed"] > div:has([data-finite-scroll-hotkey-context="FEED"]),
      .scaffold-layout__content main[aria-label="Main Feed"] > div:has(scaffold-finite-scroll__content),
      #voyager-feed main#main[aria-label='Hoofdfeed'],
      #voyager-feed main#main[aria-label='Hauptfeed'],
      #voyager-feed main#main[aria-label='Fil d’actualité principal'],
      .feeds .feed-container,
      .feed-shared-update-v2:not(section.fixed-full > .feed-shared-update-v2):not(div:not([data-id]) > .occludable-update > .feed-shared-update-v2),
      div[data-testid="mainFeed"],
      div[componentkey*="mainFeed"],
      main > .mb2.artdeco-dropdown--placement-bottom {
        visibility: hidden !important;
        display: none !important;
      }
    `;
  }

  // Messaging overlay popup
  if (settings.messaging) {
    css += `
      #msg-overlay, .msg-overlay-container, [class^="msg-overlay"],
      [data-nav-type="MESSAGING"] {
        display: none !important;
      }
    `;
  }

  // News & trending
  if (settings.news) {
    css += `
      .news-module, #feed-news-module,
      [data-display-contents="true"] > div[componentKey]:has([id*=signal-notice]) {
        display: none !important;
      }
    `;
  }

  // Likes & comments
  if (settings.likesComments) {
    css += `
      .update-v2-social-activity, [data-feed-action="socialActionsLabel"],
      .social-actions-panel, #comment-preview,
      div:has(+ hr + div [id*=thumbs-up]):has(+ hr + div [id*=comment]),
      hr + div:has([id*=thumbs-up]):has([id*=comment-small]),
      [componentkey*="commentsSectionContainer"],
      .main-feed-activity-card__social-actions,
      .main-feed-activity-card__social-actions + div {
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

