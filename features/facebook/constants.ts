import type { BaseSettingConfig } from '@/features/shared/types';
import type { FacebookSettings } from './types';

export const DEFAULT_FACEBOOK_SETTINGS: FacebookSettings = {
  blockSite: false,
  blockMessenger: false,
  feed: false,
  redirectToFriendsFeed: false,
  likesComments: false,
  chatSidebar: false,
  marketplace: false,
  stories: false,
  reel: false,
  color: false,
};

export const FACEBOOK_CONFIGS: BaseSettingConfig[] = [
  {
    id: 'blockSite',
    label: 'Block Facebook',
    description: 'Prevent accessing facebook.com entirely',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'blockMessenger',
    label: 'Block Messenger',
    description: 'Block messages and messenger.com',
    type: 'switch',
    isDanger: true,
  },
  {
    id: 'feed',
    label: 'Hide Feed',
    description: 'Hides main infinite scroll feed',
    type: 'switch',
  },
  {
    id: 'redirectToFriendsFeed',
    label: 'Force redirect to Friends feed',
    description: 'Only show updates from direct friends',
    type: 'switch',
  },
  {
    id: 'likesComments',
    label: 'Hide Likes and Comments',
    description: 'Remove reaction counts and comment threads',
    type: 'switch',
  },
  {
    id: 'chatSidebar',
    label: 'Hide Chat Sidebar',
    description: 'Remove contacts sidebar',
    type: 'switch',
  },
  {
    id: 'marketplace',
    label: 'Hide Marketplace',
    description: 'Block marketplace tabs and listings',
    type: 'switch',
  },
  {
    id: 'stories',
    label: 'Hide Stories',
    description: 'Remove stories bar at the top',
    type: 'switch',
  },
  {
    id: 'reel',
    label: 'Hide Video and Reels',
    description: 'Remove short-form video tabs',
    type: 'switch',
    paid: true,
  },
  {
    id: 'color',
    label: 'Remove Colors',
    description: 'Grayscale filter for reduced stimulation',
    type: 'switch',
    paid: true,
  },
];

