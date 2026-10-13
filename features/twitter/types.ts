export interface TwitterSettings {
  blockSite: boolean;
  timeline: boolean;
  forYou: boolean;
  trends: boolean;
  whoToFollow: boolean;
  media: boolean;
  color: boolean;
}

export type TwitterSettingKey = keyof TwitterSettings;

