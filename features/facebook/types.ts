export interface FacebookSettings {
  blockSite: boolean;
  blockMessenger: boolean;
  feed: boolean;
  redirectToFriendsFeed: boolean;
  likesComments: boolean;
  chatSidebar: boolean;
  marketplace: boolean;
  stories: boolean;
  reel: boolean;
  color: boolean;
}

export type FacebookSettingKey = keyof FacebookSettings;

