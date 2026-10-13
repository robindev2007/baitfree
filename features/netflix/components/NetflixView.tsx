import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { NETFLIX_CONFIGS } from '../constants';
import type { NetflixSettings, NetflixSettingKey } from '../types';
import { NetflixIcon } from '@/features/layout/components/PlatformIcons';

interface NetflixViewProps {
  settings: NetflixSettings;
  onUpdate: (key: NetflixSettingKey, value: boolean) => void;
  isPro?: boolean;
}

export function NetflixView({ settings, onUpdate, isPro = false }: NetflixViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <NetflixIcon className="size-4 text-red-700 dark:text-red-600" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Netflix Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {NETFLIX_CONFIGS.length} active
        </span>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {NETFLIX_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as NetflixSettingKey]}
            onChange={(val) => onUpdate(config.id as NetflixSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

