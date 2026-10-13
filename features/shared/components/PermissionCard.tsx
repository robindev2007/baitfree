import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PermissionCardProps {
  platformName: string;
  onRequestPermission?: () => void;
}

export function PermissionCard({
  platformName,
  onRequestPermission,
}: PermissionCardProps) {
  return (
    <div className="mx-3 my-2 flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs">
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
        <AlertCircle className="size-4 shrink-0" />
        <span>Allow {platformName} access to enable filters</span>
      </div>
      <Button
        size="xs"
        variant="outline"
        className="border-amber-500/40 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20"
        onClick={onRequestPermission}
      >
        Grant Access
      </Button>
    </div>
  );
}

