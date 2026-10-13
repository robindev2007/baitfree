import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { INSTAGRAM_CONFIGS } from '../constants';
import type { InstagramSettings, InstagramSettingKey } from '../types';
import { InstagramIcon } from '@/features/layout/components/PlatformIcons';
import { PermissionCard } from '@/features/shared/components/PermissionCard';

interface InstagramViewProps {
  settings: InstagramSettings;
  onUpdate: (key: InstagramSettingKey, value: boolean) => void;
  isPro?: boolean;
  hasPermission?: boolean;
  onRequestPermission?: () => void;
}

export function InstagramView({
  settings,
  onUpdate,
  isPro = false,
  hasPermission = true,
  onRequestPermission,
}: InstagramViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <InstagramIcon className="size-4 text-pink-600 dark:text-pink-400" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Instagram Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {INSTAGRAM_CONFIGS.length} active
        </span>
      </div>

      {!hasPermission && (
        <PermissionCard
          platformName="Instagram"
          onRequestPermission={onRequestPermission}
        />
      )}

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {INSTAGRAM_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as InstagramSettingKey]}
            onChange={(val) => onUpdate(config.id as InstagramSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

