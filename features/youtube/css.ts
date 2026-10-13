import type { YouTubeSettings } from './types';

export function getYouTubeCSS(settings: YouTubeSettings): string {
  let css = '';

  // Recommendations / Home & Explore Feed
  if (settings.recommendations) {
    css += `
      [page-subtype="home"] #primary, [page-subtype="explore"] #primary {
        display: none !important;
      }
      /* mobile */
      [tab-title="Home"] {
        display: none !important;
      }
    `;
  }

  // Hide Sidebar Guide
  if (settings.sidebar) {
    css += `
      ytd-guide-renderer ytd-guide-section-renderer:not(:last-child) {
        display: none !important;
      }
    `;
  }

  // Hide Breaking News / Shelves
  if (settings.breakingNews) {
    css += `
      ytd-rich-section-renderer {
        display: none !important;
      }
    `;
  }

  // Hide Comments
  if (settings.comments) {
    css += `
      ytd-comments, ytm-comment-section-renderer {
        display: none !important;
      }
      [section-identifier="comment-item-section"],
      .single-column-watch-next-modern-panels:not([section-identifier="related-items"]) {
        display: none !important;
      }
    `;
  }

  // Thumbnails: 0 = show, 1 = blur, 2 = hide
  if (settings.thumbnail === 1) {
    css += `
      #thumbnail img, .ytp-videowall-still-image, .video-thumbnail-img,
      #player.inline-on-thumbnail, yt-thumbnail-view-model img,
      ytm-shorts-lockup-view-model img, ytd-thumbnail img,
      ytd-playlist-thumbnail img, #thumbnail-container img,
      .shelf-skeleton .thumbnail img, .video-thumbnail-img img {
        filter: blur(100px) !important;
      }
    `;
  } else if (settings.thumbnail === 2) {
    css += `
      #thumbnail img, .ytp-videowall-still-image, .video-thumbnail-img,
      #player.inline-on-thumbnail, yt-thumbnail-view-model img,
      ytm-shorts-lockup-view-model img, ytd-thumbnail img,
      ytd-playlist-thumbnail img, #thumbnail-container img,
      .shelf-skeleton .thumbnail img, .video-thumbnail-img img {
        visibility: hidden !important;
      }
    `;
  }

  // Up Next & Suggestions
  if (settings.upNext) {
    css += `
      .ytp-endscreen-content, ytd-watch-next-secondary-results-renderer,
      [data-content-type="related"], .ytp-ce-element.ytp-ce-video,
      .ytp-ce-element.ytp-ce-playlist, .ytp-fullscreen-grid,
      [section-identifier="related-items"] {
        display: none !important;
      }
    `;
  }

  // Shorts
  if (settings.shorts) {
    css += `
      [aria-label="Shorts"], [title="Shorts"], [is-shorts], [href="/shorts/"],
      grid-shelf-view-model:has(ytm-shorts-lockup-view-model), ytd-reel-shelf-renderer,
      .ytGridShelfViewModelGridShelfRow:has(ytm-shorts-lockup-view-model),
      ytm-reel-shelf-renderer, [role="tab"].pivot-shorts {
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

