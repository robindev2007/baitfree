import type { PinterestSettings } from './types';

export function getPinterestCSS(settings: PinterestSettings): string {
  let css = '';

  // Main Feed
  if (settings.feed) {
    css += `
      [data-test-id*="homefeed-feed"] #homefeed,
      [data-test-id*="homefeed-feed"] .masonryContainer {
        display: none !important;
      }
    `;
  }

  // Search suggestions
  if (settings.searchSuggestions) {
    css += `
      [data-test-id='search-story-suggestions-container'] {
        display: none !important;
      }
    `;
  }

  // Sidebar
  if (settings.sidebar) {
    css += `
      [data-test-id='pinterest-logo-home-button'] ~ * {
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

