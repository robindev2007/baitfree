import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { LINKEDIN_CONFIGS } from '../constants';
import type { LinkedInSettings, LinkedInSettingKey } from '../types';
import { LinkedInIcon } from '@/features/layout/components/PlatformIcons';

interface LinkedInViewProps {
  settings: LinkedInSettings;
  onUpdate: (key: LinkedInSettingKey, value: boolean) => void;
  isPro?: boolean;
}

export function LinkedInView({ settings, onUpdate, isPro = false }: LinkedInViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <LinkedInIcon className="size-4 text-sky-700 dark:text-sky-500" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            LinkedIn Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {LINKEDIN_CONFIGS.length} active
        </span>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {LINKEDIN_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as LinkedInSettingKey]}
            onChange={(val) => onUpdate(config.id as LinkedInSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

