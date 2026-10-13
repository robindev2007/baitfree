import * as React from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Shield, Plus, Trash2, Globe } from 'lucide-react';

interface BlocklistModalProps {
  active: boolean;
  urls: string[];
  onToggleActive: (active: boolean) => void;
  onAddUrl: (url: string) => void;
  onRemoveUrl: (url: string) => void;
}

export function BlocklistModal({
  active,
  urls,
  onToggleActive,
  onAddUrl,
  onRemoveUrl,
}: BlocklistModalProps) {
  const [newUrl, setNewUrl] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newUrl.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (clean && !urls.includes(clean)) {
      onAddUrl(clean);
      setNewUrl('');
    }
  };

  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
      <div className="flex flex-col gap-0.5 pr-3">
        <div className="flex items-center gap-1.5">
          <Shield className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Custom Block List
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">
            {urls.length} custom {urls.length === 1 ? 'site' : 'sites'} configured
          </span>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-[11px] text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Manage list
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Custom Block List</DialogTitle>
                <DialogDescription>
                  Enter domain names you want to block (e.g. news.ycombinator.com).
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleAdd} className="flex gap-2 mt-2">
                <Input
                  placeholder="domain.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="text-xs h-8"
                />
                <Button type="submit" size="sm" className="h-8 gap-1">
                  <Plus className="size-3.5" />
                  Add
                </Button>
              </form>

              <div className="mt-2 max-h-48 overflow-y-auto space-y-1 divide-y divide-border/40">
                {urls.length === 0 ? (
                  <div className="py-6 text-center text-xs text-muted-foreground">
                    No custom domains added yet.
                  </div>
                ) : (
                  urls.map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between py-1.5 px-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="size-3.5 text-muted-foreground" />
                        <span className="font-mono">{domain}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => onRemoveUrl(domain)}
                      >
                        <Trash2 className="size-3" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Switch checked={active} onCheckedChange={onToggleActive} />
    </div>
  );
}

