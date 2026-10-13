import * as React from 'react';
import { NAV_TABS } from '../constants';
import type { TabId } from '../types';
import { cn } from '@/lib/utils';

interface SidebarNavProps {
  activeTab: TabId;
  onSelectTab: (tabId: TabId) => void;
  filterCounts?: Record<TabId, number>;
}

export function SidebarNav({
  activeTab,
  onSelectTab,
  filterCounts = {} as Record<TabId, number>,
}: SidebarNavProps) {
  const platformTabs = NAV_TABS.filter((t) => t.id !== 'settings');
  const settingsTab = NAV_TABS.find((t) => t.id === 'settings');

  return (
    <aside className="w-44 shrink-0 border-r border-border/60 bg-muted/20 p-2 flex flex-col justify-between select-none">
      <div className="space-y-0.5">
        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Platforms
        </div>
        {platformTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const activeCount = filterCounts[tab.id] || 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={cn(
                'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors text-left',
                isActive
                  ? 'bg-secondary text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <Icon
                  className={cn(
                    'size-3.5 shrink-0 transition-colors',
                    isActive ? tab.accentColor : 'text-muted-foreground'
                  )}
                />
                <span className="truncate">{tab.label}</span>
              </div>

              {activeCount > 0 && (
                <span
                  className={cn(
                    'text-[10px] rounded-full px-1.5 py-0.2 font-mono font-medium',
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {activeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {settingsTab && (
        <div className="pt-2 border-t border-border/60 space-y-0.5">
          <button
            type="button"
            onClick={() => onSelectTab(settingsTab.id)}
            className={cn(
              'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors text-left',
              activeTab === settingsTab.id
                ? 'bg-secondary text-foreground font-semibold shadow-xs'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            )}
          >
            <settingsTab.icon
              className={cn(
                'size-3.5 shrink-0',
                activeTab === settingsTab.id
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            />
            <span className="truncate">{settingsTab.label}</span>
          </button>
        </div>
      )}
    </aside>
  );
}

