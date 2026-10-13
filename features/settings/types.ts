export interface GeneralSettings {
  disableFilters: boolean;
  disableFiltersTemporary: {
    active: boolean;
    pauseTime: number; // in minutes (e.g. 5, 10, 15, 30)
    endTimestamp?: number;
  };
  disableDuringHours: {
    active: boolean;
    fromTime: string; // e.g. "09:00"
    toTime: string;   // e.g. "17:00"
  };
  disableDuringDays: {
    active: boolean;
    days: boolean[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
  };
  blockDomainCategories: boolean;
  customSitesToBlock: {
    active: boolean;
    customURLList: string[];
  };
  customRedirectURL: string;
  password: {
    active: boolean;
    password?: string;
  };
}

