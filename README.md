# BaitFree 🛡️

> **Browse intentionally.** Free your screen from clickbait, endless feeds, addictive comments, and algorithmic rabbit holes.

**BaitFree** is a digital wellness and focus tool built with **WXT**, **React**, and **Tailwind CSS**. Rather than blocking access to entire platforms, it surgically hides attention traps—letting you visit YouTube, LinkedIn, Facebook, Twitter, and Reddit intentionally for work or communication without falling into endless doomscrolling.

---

## ✨ Features

* **Surgical Feed Hiding**:
  * **YouTube**: Recommendations, sidebar guides, breaking news, comments, clickbait thumbnails (blur/hide), shorts, up-next queue.
  * **Facebook**: Infinite scroll feed, likes & comments, chat sidebar, marketplace, stories, reels.
  * **Twitter / X**: "For You" timeline, trending topics, "Who to Follow", media, home feed.
  * **Reddit**: Front page algorithm, comments, r/popular, r/all.
  * **LinkedIn**: Feed, persistent messaging drawer, news tickers, reaction counters.
  * **Instagram**: Home feed, explore discovery grid, reels, suggested posts.
  * **Netflix**: Auto-playing billboard recommendations, continue watching, my list.
  * **Pinterest**: Home feed, search suggestions, sidebar.
* **Intelligent Scheduling**:
  * **Temporary Snooze**: Pause filters for 5, 10, 15, or 30 minutes with automatic re-engagement.
  * **Time-Based Restrictions**: Activate filters only during work hours.
  * **Day-Based Restrictions**: Enable filters on specific days of the week.
* **Focus Shield / Internal Blocked Screen**:
  * When entire sites or custom blocklist domains are blocked, BaitFree displays a clean internal focus screen rather than routing to 3rd-party websites.

---

## 🛠️ Development

### Prerequisites
* Node.js 18+
* npm or bun

### Commands
```bash
# Install dependencies
npm install

# Run dev server with auto-reloading Chrome instance
npm run dev

# Compile TypeScript
npm run compile

# Build production extension (outputs to dist/chrome-mv3)
npm run build
```

---

## 📦 Loading in Chrome

1. Run `npm run build`
2. Open Chrome and navigate to `chrome://extensions`
3. Toggle on **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the `dist/chrome-mv3` folder inside this directory
