export interface InstagramSettings {
  blockSite: boolean;
  feed: boolean;
  likesComments: boolean;
  stories: boolean;
  reels: boolean;
  explore: boolean;
  suggestedForYou: boolean;
  color: boolean;
}

export type InstagramSettingKey = keyof InstagramSettings;

