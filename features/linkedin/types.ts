export interface LinkedInSettings {
  blockSite: boolean;
  feed: boolean;
  messaging: boolean;
  news: boolean;
  likesComments: boolean;
  color: boolean;
}

export type LinkedInSettingKey = keyof LinkedInSettings;

