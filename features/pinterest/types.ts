export interface PinterestSettings {
  blockSite: boolean;
  feed: boolean;
  searchSuggestions: boolean;
  sidebar: boolean;
  color: boolean;
}

export type PinterestSettingKey = keyof PinterestSettings;

