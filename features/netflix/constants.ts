import type { BaseSettingConfig } from '@/features/shared/types';
import type { NetflixSettings } from './types';

export const DEFAULT_NETFLIX_SETTINGS: NetflixSettings = {
  blockSite: false,
  hideAllShowMyAndContinue: false,
  hideContinueWatching: false,
  hideMyList: false,
};

export const NETFLIX_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Netflix',
    description: 'Prevent accessing netflix.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'hideAllShowMyAndContinue',
    label: 'Hide Recommendations',
    description: 'Hide auto-playing billboard and suggested rows',
    type: 'switch',
  },
  {
    id: 'hideContinueWatching',
    label: 'Hide Continue Watching',
    description: 'Remove unfinished episode prompts',
    type: 'switch',
  },
  {
    id: 'hideMyList',
    label: 'Hide My List',
    description: 'Remove bookmarked watchlist row',
    type: 'switch',
  },
];

