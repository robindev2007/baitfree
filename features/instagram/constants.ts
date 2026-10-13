import type { BaseSettingConfig } from '@/features/shared/types';
import type { InstagramSettings } from './types';

export const DEFAULT_INSTAGRAM_SETTINGS: InstagramSettings = {
  blockSite: false,
  feed: false,
  likesComments: false,
  stories: false,
  reels: false,
  explore: false,
  suggestedForYou: false,
  color: false,
};

export const INSTAGRAM_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Instagram',
    description: 'Prevent accessing instagram.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'feed',
    label: 'Hide Feed',
    description: 'Hide main feed posts and stories',
    type: 'switch',
  },
  {
    id: 'likesComments',
    label: 'Hide Likes and Comments',
    description: 'Remove vanity metrics on posts',
    type: 'switch',
  },
  {
    id: 'stories',
    label: 'Hide Stories',
    description: 'Remove top story bubbles tray',
    type: 'switch',
  },
  {
    id: 'reels',
    label: 'Block Reels',
    description: 'Block addictive short-form video tab',
    type: 'switch',
  },
  {
    id: 'explore',
    label: 'Hide Explore',
    description: 'Remove explore discovery grid',
    type: 'switch',
  },
  {
    id: 'suggestedForYou',
    label: 'Hide Suggested For You',
    description: 'Block algorithmic recommended posts',
    type: 'switch',
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale photo display',
    type: 'switch',
    paid: true,
  },
];

