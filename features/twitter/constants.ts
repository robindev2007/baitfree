import type { BaseSettingConfig } from '@/features/shared/types';
import type { TwitterSettings } from './types';

export const DEFAULT_TWITTER_SETTINGS: TwitterSettings = {
  blockSite: false,
  timeline: false,
  forYou: false,
  trends: false,
  whoToFollow: false,
  media: false,
  color: false,
};

export const TWITTER_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Twitter / X',
    description: 'Prevent accessing x.com and twitter.com',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'timeline',
    label: 'Hide Timeline',
    description: 'Hide main following & home timeline feed',
    type: 'switch',
  },
  {
    id: 'forYou',
    label: 'Hide "For You" Timeline',
    description: 'Remove algorithmic recommendation tab',
    type: 'switch',
  },
  {
    id: 'trends',
    label: 'Hide Trends',
    description: 'Remove "What\'s happening" sidebar & trends',
    type: 'switch',
  },
  {
    id: 'whoToFollow',
    label: 'Hide Who to Follow',
    description: 'Remove suggested user widgets and prompts',
    type: 'switch',
  },
  {
    id: 'media',
    label: 'Hide All Media',
    description: 'Hide photos, gifs, and video clips in tweets',
    type: 'switch',
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale feed for neutral browsing',
    type: 'switch',
    paid: true,
  },
];

