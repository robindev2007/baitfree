import type { BaseSettingConfig } from '@/features/shared/types';
import type { YouTubeSettings } from './types';

export const DEFAULT_YOUTUBE_SETTINGS: YouTubeSettings = {
  blockSite: false,
  recommendations: false,
  redirectToSubscriptions: false,
  breakingNews: false,
  sidebar: false,
  comments: false,
  thumbnail: 0,
  upNext: false,
  shorts: false,
  color: false,
};

export const YOUTUBE_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block YouTube',
    description: 'Prevent accessing youtube.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'recommendations',
    label: 'Hide Recommendations',
    description: 'Hide home feed recommendation grid',
    type: 'switch',
  },
  {
    id: 'redirectToSubscriptions',
    label: 'Force redirect to my subscriptions',
    description: 'Always land on your subscribed channels',
    type: 'switch',
  },
  {
    id: 'breakingNews',
    label: 'Hide Breaking News',
    description: 'Hide top trending shelves & breaking news',
    type: 'switch',
  },
  {
    id: 'sidebar',
    label: 'Hide Sidebar',
    description: 'Remove YouTube side guide drawer',
    type: 'switch',
  },
  {
    id: 'comments',
    label: 'Hide Comments',
    description: 'Remove comments section under videos',
    type: 'switch',
  },
  {
    id: 'thumbnail',
    label: 'Thumbnails',
    description: 'Reduce clickbait attraction',
    type: 'switch-multi',
    multiOptions: ['Show', 'Blur', 'Hide'],
  },
  {
    id: 'upNext',
    label: 'Hide Up Next Suggestions',
    description: 'Remove right-column suggested video queue',
    type: 'switch',
  },
  {
    id: 'shorts',
    label: 'Hide Shorts',
    description: 'Remove Shorts shelf and navigation tab',
    type: 'switch',
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale video player and UI',
    type: 'switch',
    paid: true,
  },
];

