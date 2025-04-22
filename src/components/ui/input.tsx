'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  helperText?: string;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  InputComponentProps
>(
  (
    { name, helperText,  className, ...props },
    ref
  ) => {

    const hasError = !!helperText;

    return (
      <div className={cn('flex flex-col', className)}>
        <div className="relative">
          <input
            id={name}
            name={name}
            className={cn(
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
              "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              className
            )}
            aria-invalid={hasError || undefined}
            {...props}
            ref={ref}
          />
        </div>
        {helperText && (
          <p className="text-destructive text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
