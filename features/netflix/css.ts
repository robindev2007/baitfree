import type { NetflixSettings } from './types';

export function getNetflixCSS(settings: NetflixSettings): string {
  let css = '';

  // Recommendations & Billboard
  if (settings.hideAllShowMyAndContinue) {
    css += `
      .mainView {
        margin-top: 5em !important;
      }
      span.notifications div {
        display: none !important;
      }
      .billboard-row, .lolomoRow:not([data-list-context='continueWatching']):not([data-list-context='queue']) {
        display: none !important;
      }
    `;
  }

  // Continue Watching
  if (settings.hideContinueWatching) {
    css += `
      [data-list-context='continueWatching'] {
        display: none !important;
      }
    `;
  }

  // My List
  if (settings.hideMyList) {
    css += `
      [data-list-context='queue'] {
        display: none !important;
      }
    `;
  }

  return css;
}

