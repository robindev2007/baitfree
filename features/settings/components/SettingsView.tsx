import * as React from 'react';
import { Settings, Power, ShieldAlert } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { SnoozeControl } from './SnoozeControl';
import { SchedulePicker } from './SchedulePicker';
import { DayPicker } from './DayPicker';
import { BlocklistModal } from './BlocklistModal';
import { PasswordLockModal } from './PasswordLockModal';
import { SupportActions } from './SupportActions';
import type { GeneralSettings } from '../types';

interface SettingsViewProps {
  settings: GeneralSettings;
  onUpdate: <K extends keyof GeneralSettings>(key: K, value: GeneralSettings[K]) => void;
  isPro?: boolean;
}

export function SettingsView({ settings, onUpdate, isPro = false }: SettingsViewProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-2">
        <div className="flex items-center gap-2">
          <Settings className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            General Settings & Scheduling
          </h2>
        </div>
      </div>

      <div className="divide-y divide-border/40 overflow-y-auto pr-1 flex-1">
        {/* Master Pause Filter Toggle */}
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
          <div className="flex flex-col gap-0.5 pr-3">
            <div className="flex items-center gap-1.5">
              <Power className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                Pause All Filters
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Temporarily allow all websites and feeds without losing settings
            </span>
          </div>
          <Switch
            checked={settings.disableFilters}
            onCheckedChange={(checked) => onUpdate('disableFilters', checked)}
          />
        </div>

        {/* Temporary Snooze */}
        <SnoozeControl
          active={settings.disableFiltersTemporary.active}
          pauseTime={settings.disableFiltersTemporary.pauseTime}
          onToggle={(active) =>
            onUpdate('disableFiltersTemporary', {
              ...settings.disableFiltersTemporary,
              active,
            })
          }
          onSelectTime={(pauseTime) =>
            onUpdate('disableFiltersTemporary', {
              ...settings.disableFiltersTemporary,
              pauseTime,
            })
          }
        />

        {/* Scheduled Hours */}
        <SchedulePicker
          active={settings.disableDuringHours.active}
          fromTime={settings.disableDuringHours.fromTime}
          toTime={settings.disableDuringHours.toTime}
          onToggle={(active) =>
            onUpdate('disableDuringHours', {
              ...settings.disableDuringHours,
              active,
            })
          }
          onChangeFrom={(fromTime) =>
            onUpdate('disableDuringHours', {
              ...settings.disableDuringHours,
              fromTime,
            })
          }
          onChangeTo={(toTime) =>
            onUpdate('disableDuringHours', {
              ...settings.disableDuringHours,
              toTime,
            })
          }
        />

        {/* Selected Days */}
        <DayPicker
          active={settings.disableDuringDays.active}
          days={settings.disableDuringDays.days}
          onToggleActive={(active) =>
            onUpdate('disableDuringDays', {
              ...settings.disableDuringDays,
              active,
            })
          }
          onToggleDay={(idx) => {
            const nextDays = [...settings.disableDuringDays.days];
            nextDays[idx] = !nextDays[idx];
            onUpdate('disableDuringDays', {
              ...settings.disableDuringDays,
              days: nextDays,
            })
          }}
          isPro={isPro}
        />

        {/* Gambling / NSFW Blocker */}
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
          <div className="flex flex-col gap-0.5 pr-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                Block Gambling & NSFW Sites
              </span>
              <Badge variant="pro" className="h-4 px-1 text-[9px]">
                PRO
              </Badge>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Automatic category-level protection filter
            </span>
          </div>
          <Switch
            checked={settings.blockDomainCategories}
            onCheckedChange={(checked) => onUpdate('blockDomainCategories', checked)}
            disabled={!isPro}
          />
        </div>

        {/* Custom Block List */}
        <BlocklistModal
          active={settings.customSitesToBlock.active}
          urls={settings.customSitesToBlock.customURLList}
          onToggleActive={(active) =>
            onUpdate('customSitesToBlock', {
              ...settings.customSitesToBlock,
              active,
            })
          }
          onAddUrl={(url) =>
            onUpdate('customSitesToBlock', {
              ...settings.customSitesToBlock,
              customURLList: [...settings.customSitesToBlock.customURLList, url],
            })
          }
          onRemoveUrl={(url) =>
            onUpdate('customSitesToBlock', {
              ...settings.customSitesToBlock,
              customURLList: settings.customSitesToBlock.customURLList.filter(
                (u) => u !== url
              ),
            })
          }
        />

        {/* Blocked Screen Mode */}
        <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
          <div className="flex flex-col gap-0.5 pr-3">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                Blocked Page Display
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Shows clean internal focus screen (no external 3rd-party redirect)
            </span>
          </div>
          <Badge variant="secondary" className="text-[10px] font-mono">
            Internal Screen
          </Badge>
        </div>

        {/* Password Lock Settings */}
        <PasswordLockModal
          active={settings.password.active}
          isPro={isPro}
          onSavePassword={(password) =>
            onUpdate('password', { active: true, password })
          }
          onDisable={() => onUpdate('password', { active: false, password: '' })}
        />
      </div>

      <div className="mt-2 pt-2">
        <SupportActions />
      </div>
    </div>
  );
}
