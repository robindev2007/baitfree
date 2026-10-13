import type { GeneralSettings } from './types';

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  disableFilters: false,
  disableFiltersTemporary: {
    active: false,
    pauseTime: 5,
  },
  disableDuringHours: {
    active: false,
    fromTime: '09:00',
    toTime: '17:00',
  },
  disableDuringDays: {
    active: false,
    days: [false, false, false, false, false, false, false],
  },
  blockDomainCategories: false,
  customSitesToBlock: {
    active: false,
    customURLList: [],
  },
  customRedirectURL: '',
  password: {
    active: false,
    password: '',
  },
};

export const SNOOZE_PRESETS = [5, 10, 15, 30];

export const DAYS_OF_WEEK = [
  { label: 'M', full: 'Mon' },
  { label: 'T', full: 'Tue' },
  { label: 'W', full: 'Wed' },
  { label: 'T', full: 'Thu' },
  { label: 'F', full: 'Fri' },
  { label: 'S', full: 'Sat' },
  { label: 'S', full: 'Sun' },
];
