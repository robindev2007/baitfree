import * as React from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlProps {
  options: string[];
  value: number | string;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  disabled = false,
}: SegmentedControlProps) {
  const selectedIdx = typeof value === 'string' ? parseInt(value, 10) || 0 : value;

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-lg bg-muted p-0.5 text-xs font-medium',
        disabled && 'opacity-50 pointer-events-none'
      )}
    >
      {options.map((opt, idx) => {
        const isSelected = selectedIdx === idx;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(idx)}
            className={cn(
              'px-2.5 py-1 rounded-md transition-all outline-none',
              isSelected
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

