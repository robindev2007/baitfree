export interface NetflixSettings {
  blockSite: boolean;
  hideAllShowMyAndContinue: boolean;
  hideContinueWatching: boolean;
  hideMyList: boolean;
}

export type NetflixSettingKey = keyof NetflixSettings;

