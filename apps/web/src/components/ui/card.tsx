/**
 * @file apps/web/src/components/ui/card.tsx
 * @description Layer 1: Presentation - Reusable Atomic Card Container Component.
 */

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-neutral-800 bg-neutral-950 p-6 shadow-sm transition-colors duration-200 hover:border-[#FF0000]/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
