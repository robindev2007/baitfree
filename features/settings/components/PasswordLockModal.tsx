import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordLockModalProps {
  active: boolean;
  isPro?: boolean;
  onSavePassword: (password: string) => void;
  onDisable: () => void;
}

export function PasswordLockModal({
  active,
  isPro = false,
  onSavePassword,
  onDisable,
}: PasswordLockModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [pwd, setPwd] = React.useState('');
  const disabled = !isPro;

  const handleSwitchChange = (checked: boolean) => {
    if (disabled) return;
    if (checked) {
      setIsOpen(true);
    } else {
      onDisable();
    }
  };

  const handleConfirm = () => {
    if (pwd.trim().length >= 4) {
      onSavePassword(pwd);
      setIsOpen(false);
      setPwd('');
    }
  };

  return (
    <div
      className={cn(
        'flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors',
        disabled && 'opacity-60'
      )}
    >
      <div className="flex flex-col gap-0.5 pr-3">
        <div className="flex items-center gap-2">
          <Lock className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Lock Settings with Password
          </span>
          <Badge variant="pro" className="h-4 px-1 text-[9px]">
            PRO
          </Badge>
        </div>
        <span className="text-[11px] text-muted-foreground">
          Prevent impulsive changes during work sessions
        </span>
      </div>

      <Switch
        checked={active}
        onCheckedChange={handleSwitchChange}
        disabled={disabled}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Settings Password</DialogTitle>
            <DialogDescription>
              Enter a passcode to lock settings. You will need this code to modify any filter toggles.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <Input
              type="password"
              placeholder="Enter at least 4 characters"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="text-xs"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleConfirm} disabled={pwd.trim().length < 4}>
              Save & Lock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

