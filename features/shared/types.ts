export type SettingType = 'switch' | 'switch-multi' | 'text' | 'button-list';

export interface BaseSettingConfig {
  id: string;
  label: string;
  description?: string;
  type?: SettingType;
  paid?: boolean;
  isDanger?: boolean;
  disabled?: boolean;
  multiOptions?: string[]; // e.g. ['Show', 'Blur', 'Hide']
}

