import * as React from 'react';
import { SettingItem } from '@/features/shared/components/SettingItem';
import { REDDIT_CONFIGS } from '../constants';
import type { RedditSettings, RedditSettingKey } from '../types';
import { RedditIcon } from '@/features/layout/components/PlatformIcons';

interface RedditViewProps {
  settings: RedditSettings;
  onUpdate: (key: RedditSettingKey, value: any) => void;
  isPro?: boolean;
}

export function RedditView({ settings, onUpdate, isPro = false }: RedditViewProps) {
  const activeCount = Object.entries(settings).filter(([k, v]) => {
    if (k === 'allowed') return v !== 0;
    return Boolean(v);
  }).length;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <RedditIcon className="size-4 text-orange-600 dark:text-orange-500" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            Reddit Settings
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {activeCount} of {REDDIT_CONFIGS.length} active
        </span>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1">
        {REDDIT_CONFIGS.map((config) => (
          <SettingItem
            key={config.id}
            config={config}
            value={settings[config.id as RedditSettingKey]}
            onChange={(val) => onUpdate(config.id as RedditSettingKey, val)}
            disabled={config.paid && !isPro}
          />
        ))}
      </div>
    </div>
  );
}

