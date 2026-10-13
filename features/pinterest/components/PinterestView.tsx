import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { PINTEREST_CONFIGS } from '../constants';
import type { PinterestSettings, PinterestSettingKey } from '../types';
import { PinterestIcon } from '@/features/layout/components/PlatformIcons';
import { PermissionCard } from '@/features/shared/components/PermissionCard';

interface PinterestViewProps {
  settings: PinterestSettings;
  onUpdate: (key: PinterestSettingKey, value: boolean) => void;
  isPro?: boolean;
  hasPermission?: boolean;
  onRequestPermission?: () => void;
}

export function PinterestView({
  settings,
  onUpdate,
  isPro = false,
  hasPermission = true,
  onRequestPermission,
}: PinterestViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <PinterestIcon className="size-4 text-red-600 dark:text-red-500" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Pinterest Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {PINTEREST_CONFIGS.length} active
        </span>
      </div>

      {!hasPermission && (
        <PermissionCard
          platformName="Pinterest"
          onRequestPermission={onRequestPermission}
        />
      )}

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {PINTEREST_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as PinterestSettingKey]}
            onChange={(val) => onUpdate(config.id as PinterestSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

