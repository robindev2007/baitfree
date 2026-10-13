import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { TWITTER_CONFIGS } from '../constants';
import type { TwitterSettings, TwitterSettingKey } from '../types';
import { TwitterIcon } from '@/features/layout/components/PlatformIcons';
import { PermissionCard } from '@/features/shared/components/PermissionCard';

interface TwitterViewProps {
  settings: TwitterSettings;
  onUpdate: (key: TwitterSettingKey, value: boolean) => void;
  isPro?: boolean;
  hasPermission?: boolean;
  onRequestPermission?: () => void;
}

export function TwitterView({
  settings,
  onUpdate,
  isPro = false,
  hasPermission = true,
  onRequestPermission,
}: TwitterViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <TwitterIcon className="size-4 text-foreground" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Twitter / X Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {Object.values(settings).filter(Boolean).length} of {TWITTER_CONFIGS.length} active
        </span>
      </div>

      {!hasPermission && (
        <PermissionCard
          platformName="Twitter / X"
          onRequestPermission={onRequestPermission}
        />
      )}

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {TWITTER_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as TwitterSettingKey]}
            onChange={(val) => onUpdate(config.id as TwitterSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

