import { Settings } from 'lucide-react';
import {
  FacebookIcon,
  YouTubeIcon,
  TwitterIcon,
  RedditIcon,
  NetflixIcon,
  LinkedInIcon,
  InstagramIcon,
  PinterestIcon,
} from './components/PlatformIcons';
import type { TabId } from './types';
import { isPlatformEnabled } from '@/features/shared/config';

export interface NavTabItem {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

export const ALL_NAV_TABS: NavTabItem[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    icon: FacebookIcon,
    accentColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    icon: YouTubeIcon,
    accentColor: 'text-red-600 dark:text-red-500',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: TwitterIcon,
    accentColor: 'text-foreground',
  },
  {
    id: 'reddit',
    label: 'Reddit',
    icon: RedditIcon,
    accentColor: 'text-orange-600 dark:text-orange-500',
  },
  {
    id: 'netflix',
    label: 'Netflix',
    icon: NetflixIcon,
    accentColor: 'text-red-700 dark:text-red-600',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: LinkedInIcon,
    accentColor: 'text-sky-700 dark:text-sky-500',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: InstagramIcon,
    accentColor: 'text-pink-600 dark:text-pink-400',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    icon: PinterestIcon,
    accentColor: 'text-red-600 dark:text-red-500',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    accentColor: 'text-muted-foreground',
  },
];

/**
 * Filtered list containing only platforms that are currently enabled in PLATFORM_FLAGS
 */
export const NAV_TABS: NavTabItem[] = ALL_NAV_TABS.filter((tab) =>
  isPlatformEnabled(tab.id)
);
