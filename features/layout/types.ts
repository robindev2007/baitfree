export type TabId =
  | 'facebook'
  | 'youtube'
  | 'twitter'
  | 'reddit'
  | 'netflix'
  | 'linkedin'
  | 'instagram'
  | 'pinterest'
  | 'settings';

export interface TabConfig {
  id: TabId;
  label: string;
  iconName: string;
}

