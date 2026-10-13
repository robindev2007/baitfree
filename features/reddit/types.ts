export interface RedditSettings {
  blockSite: boolean;
  hideComments: boolean;
  hideFrontPageFeed: boolean;
  allowed: number; // 0: All, 1: Just Posts, 2: Posts+Subs
  color: boolean;
}

export type RedditSettingKey = keyof RedditSettings;

