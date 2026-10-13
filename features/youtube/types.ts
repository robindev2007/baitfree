export interface YouTubeSettings {
  blockSite: boolean;
  recommendations: boolean;
  redirectToSubscriptions: boolean;
  breakingNews: boolean;
  sidebar: boolean;
  comments: boolean;
  thumbnail: number; // 0: Show, 1: Blur, 2: Hide
  upNext: boolean;
  shorts: boolean;
  color: boolean;
}

export type YouTubeSettingKey = keyof YouTubeSettings;

