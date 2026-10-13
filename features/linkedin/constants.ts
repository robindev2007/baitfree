import type { BaseSettingConfig } from '@/features/shared/types';
import type { LinkedInSettings } from './types';

export const DEFAULT_LINKEDIN_SETTINGS: LinkedInSettings = {
  blockSite: false,
  feed: false,
  messaging: false,
  news: false,
  likesComments: false,
  color: false,
};

export const LINKEDIN_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block LinkedIn',
    description: 'Prevent accessing linkedin.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'feed',
    label: 'Hide Feed',
    description: 'Keep messaging & job search, hide social feed',
    type: 'switch',
  },
  {
    id: 'messaging',
    label: 'Hide Messaging Popup',
    description: 'Remove bottom persistent messaging bar',
    type: 'switch',
  },
  {
    id: 'news',
    label: 'Hide LinkedIn News',
    description: 'Remove trending corporate news column',
    type: 'switch',
  },
  {
    id: 'likesComments',
    label: 'Hide Likes and Comments',
    description: 'Remove engagement counters on articles',
    type: 'switch',
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale distraction-free professional mode',
    type: 'switch',
    paid: true,
  },
];

