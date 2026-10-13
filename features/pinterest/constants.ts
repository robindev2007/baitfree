import type { BaseSettingConfig } from '@/features/shared/types';
import type { PinterestSettings } from './types';

export const DEFAULT_PINTEREST_SETTINGS: PinterestSettings = {
  blockSite: false,
  feed: false,
  searchSuggestions: false,
  sidebar: false,
  color: false,
};

export const PINTEREST_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Pinterest',
    description: 'Prevent accessing pinterest.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'feed',
    label: 'Hide All Feed',
    description: 'Hide infinite recommendations home pin feed',
    type: 'switch',
  },
  {
    id: 'searchSuggestions',
    label: 'Hide Search Suggestions',
    description: 'Remove suggested search query tags',
    type: 'switch',
  },
  {
    id: 'sidebar',
    label: 'Hide Sidebar',
    description: 'Remove side exploration menu',
    type: 'switch',
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale pins display',
    type: 'switch',
    paid: true,
  },
];

