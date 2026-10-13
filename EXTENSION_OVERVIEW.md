# UnDistracted Chrome Extension Overview

**Extension Name**: UnDistracted - Hide Facebook, YouTube Feeds  
**Extension ID**: `pjjgklgkfeoeiebjogplpnibpfnffkng`  
**Manifest Version**: Manifest V3 (v3.7.4)  
**Location**: [`tmp/`](file:///Users/robin/Desktop/projects/extensiton/tmp/)

---

## 1. What is the Purpose of this Extension?

**UnDistracted** is a digital wellness and focus tool. Rather than completely blocking access to entire websites, it surgically hides addictive, algorithm-driven feeds and rabbit holes (recommendation grids, comments, trending sidebars) on popular social media and entertainment platforms.

This allows users to visit these platforms intentionally—such as for work, job hunting, searching a specific video, or responding to messages—without falling into endless scrolling loops.

---

## 2. Platform Breakdown & What It Hides

### 1. YouTube ([`undistracted-youtube.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-youtube.js))
* **Recommendations / Home Feed**: Hides `[page-subtype="home"] #primary` and mobile home tabs.
* **Sidebar Guide**: Hides side navigation recommendations.
* **Comments**: Hides `ytd-comments` and mobile comment sections.
* **Thumbnails**: Option to blur or completely hide video thumbnails.
* **Breaking News / Shelves**: Hides `ytd-rich-section-renderer`.
* **Up Next / Related Videos**: Hides suggested video queues next to the player.

### 2. Facebook ([`undistracted-facebook.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-facebook.js))
* **Main News Feed**: Blocks infinite scroll feed on desktop and mobile.
* **Likes & Comments**: Hides like counters and comment sections on posts.
* **Watch / Reels & Chat**: Removes sidebars and video feeds.

### 3. Twitter / X ([`undistracted-twitter.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-twitter.js))
* **Timeline Feed**: Hides "For You" algorithmic timeline.
* **Trends & "What's happening"**: Removes trending topics and algorithmic sidebars.
* **"Who to Follow"**: Removes recommended account prompts.

### 4. LinkedIn ([`undistracted-linkedin.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-linkedin.js))
* **Feed**: Completely hides the main home feed.
* **News & Trending Topics**: Hides corporate news tickers and sponsored content modules.
* *Use case*: Enables using LinkedIn purely for job searching, messaging, and networking without social feed distraction.

### 5. Instagram ([`undistracted-instagram.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-instagram.js))
* **Explore Page & Feed**: Hides the algorithmic explore feed and main feed posts.
* **Reels**: Hides short-form video tab.

### 6. Reddit ([`undistracted-reddit.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-reddit.js))
* **Front Page Feed / All / Popular**: Hides main feeds while preserving direct subreddit navigation and search.
* **Popular / Trending sidebar items**.

### 7. Pinterest ([`undistracted-pinterest.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-pinterest.js))
* **Home Feed & Related Pins**: Hides the algorithmic pin feed.

### 8. Netflix ([`undistracted-netflix.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-netflix.js))
* **Billboard & Auto-playing recommendations**: Hides distracting auto-playing trailers and promotional billboards.

---

## 3. General Settings & Scheduling Controls

Beyond platform toggles, the extension includes schedule-based filters:
* **Time-Based Restrictions**: Activate blocking only between specified hours (e.g., during work hours `09:00 - 17:00`) and unblock automatically during evenings.
* **Day-Based Restrictions**: Enable blocking only on selected days (e.g., Monday through Friday).
* **Temporary Snooze**: Temporarily disable filters for a preset duration (e.g., 5 or 15 minutes) before automatically re-engaging.

---

## 4. Technical Architecture

```mermaid
flowchart TD
    Popup["Popup UI (index.html + React/assets)"]
    SyncStorage["chrome.storage.sync"]
    ServiceWorker["service_worker.js"]
    ContentScripts["Platform Content Scripts (undistracted-*.js)"]
    DOM["Web Page DOM (<style id='undistracted-style'>)"]

    Popup -->|Save settings| SyncStorage
    Popup -->|Send message (refresh)| ContentScripts
    ServiceWorker -->|Tracks navigation & tabs| ContentScripts
    SyncStorage -->|Read settings & schedule| ContentScripts
    ContentScripts -->|Inject dynamic CSS (display: none !important)| DOM
```

1. **Storage Layer**: Preferences are stored via `chrome.storage.sync`, synchronizing user toggles across devices.
2. **Dynamic CSS Hiding**:
   * Runs at `document_start` to prevent distracting feeds from flashing on screen (FOUC).
   * Checks current time and day against user schedule rules.
   * Injects or updates a `<style id="undistracted-style">` element targeting platform CSS selectors with `display: none !important`.
3. **Reactive State Syncing**: Listens on `chrome.runtime.onMessage`. When a user toggles an option in the popup, open tabs instantly refresh their injected styles without requiring a full page reload.

---

## 5. File Map

| File | Description |
| :--- | :--- |
| [`tmp/manifest.json`](file:///Users/robin/Desktop/projects/extensiton/tmp/manifest.json) | Extension metadata, MV3 permissions, and content script registration |
| [`tmp/service_worker.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/service_worker.js) | Background service worker managing tabs, navigation, and web events |
| [`tmp/index.html`](file:///Users/robin/Desktop/projects/extensiton/tmp/index.html) | Popup UI entrypoint |
| [`tmp/assets/`](file:///Users/robin/Desktop/projects/extensiton/tmp/assets) | Compiled UI bundles, fonts, and stylesheets |
| [`tmp/undistracted-youtube.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-youtube.js) | YouTube content script and CSS selector logic |
| [`tmp/undistracted-facebook.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-facebook.js) | Facebook content script |
| [`tmp/undistracted-twitter.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-twitter.js) | Twitter/X content script |
| [`tmp/undistracted-linkedin.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-linkedin.js) | LinkedIn content script |
| [`tmp/undistracted-instagram.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-instagram.js) | Instagram content script |
| [`tmp/undistracted-reddit.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-reddit.js) | Reddit content script |
| [`tmp/undistracted-netflix.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-netflix.js) | Netflix content script |
| [`tmp/undistracted-pinterest.js`](file:///Users/robin/Desktop/projects/extensiton/tmp/undistracted-pinterest.js) | Pinterest content script |

