import type { BaseSettingConfig } from '@/features/shared/types';
import type { RedditSettings } from './types';

export const DEFAULT_REDDIT_SETTINGS: RedditSettings = {
  blockSite: false,
  hideComments: false,
  hideFrontPageFeed: false,
  allowed: 0,
  color: false,
};

export const REDDIT_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Reddit',
    description: 'Prevent accessing reddit.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'hideComments',
    label: 'Hide Comments',
    description: 'Hide discussion thread comments',
    type: 'switch',
  },
  {
    id: 'hideFrontPageFeed',
    label: 'Hide Front Page Feed',
    description: 'Hides r/all, r/popular, and front page algorithm',
    type: 'switch',
  },
  {
    id: 'allowed',
    label: 'Allowed Content',
    description: 'Filter content depth',
    type: 'switch-multi',
    multiOptions: ['All', 'Just Posts', 'Posts+Subs'],
    paid: true,
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Monochrome Reddit reading mode',
    type: 'switch',
    paid: true,
  },
];

