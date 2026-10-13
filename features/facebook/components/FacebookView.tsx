import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { FACEBOOK_CONFIGS } from '../constants';
import type { FacebookSettings, FacebookSettingKey } from '../types';
import { FacebookIcon } from '@/features/layout/components/PlatformIcons';

interface FacebookViewProps {
  settings: FacebookSettings;
  onUpdate: (key: FacebookSettingKey, value: boolean) => void;
  isPro?: boolean;
}

export function FacebookView({ settings, onUpdate, isPro = false }: FacebookViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <FacebookIcon className="size-4 text-blue-600 dark:text-blue-400" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Facebook Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {FACEBOOK_CONFIGS.length} active
        </span>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {FACEBOOK_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as FacebookSettingKey]}
            onChange={(val) => onUpdate(config.id as FacebookSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

