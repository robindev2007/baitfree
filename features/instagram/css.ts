import type { InstagramSettings } from './types';

export function getInstagramCSS(settings: InstagramSettings): string {
  let css = '';

  // Likes & comments
  if (settings.likesComments) {
    css += `
      div._ae1h._ae1i._ae1l,
      div.xvbhtw8.x78zum5.xdt5ytf.x5yr21d.x1n2onr6 {
        display: none !important;
      }
    `;
  }

  // Stories
  if (settings.stories) {
    css += `
      [data-pagelet="story_tray"] {
        display: none !important;
      }
    `;
  }

  // Reels
  if (settings.reels) {
    css += `
      a[href*="/reels/"] {
        display: none !important;
      }
    `;
  }

  // Explore
  if (settings.explore) {
    css += `
      div.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.x5o85r1.xeo4mu6.x1vz142a.x18uqkz4.x1pv78wv.xghhx3z,
      div.x78zum5.xdt5ytf.x1iyjqo2.xdj266r.x11t971q.x4n8cb0.xvc5jky.x1ykew4q.xh8yej3.x19b80pe.xhae0no.xmjrnx3.x103t36t.xlph30v.x1e49onv.x57odl9.x1ugxg0y {
        display: none !important;
      }
    `;
  }

  // Suggested for you
  if (settings.suggestedForYou) {
    css += `
      div.x9f619.xjbqb8w.x78zum5.x15mokao.x1ga7v0g.x16uus16.xbiv7yw.xqui205.x1e56ztr.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1,
      div.x6s0dn4.xd18jyu.xso031l.x78zum5.x1q0g3np.x1ejq31n.x18oe1m7.xstzfhl.x1sy0etr.x1y1aw1k.xyri2b.xwxc41k.x1c1uobl,
      article:has(.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.xt0psk2.x1i0vuye.x1fhwpqd.xo1l8bm.x5n08af),
      article + div ~ article {
        display: none !important;
        visibility: hidden !important;
      }
    `;
  }

  // Main Feed
  if (settings.feed) {
    css += `
      main[role="main"] > div > div > div:has(article) {
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

