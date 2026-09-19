/**
 * @file apps/web/src/components/ui/button.tsx
 * @description Layer 1: Presentation - Reusable Atomic Button Component.
 * Supports primary, secondary, and ghost visual variants with focus/hover transitions.
 */

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Props supported by the Button component.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual appearance variant */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Size dimension modifier */
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable UI button component with standard accessible styling.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    // Step 1: Compute base classes
    const baseClasses =
      "inline-flex items-center justify-center rounded-sm font-medium font-mono uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF0000] disabled:pointer-events-none disabled:opacity-50";

    // Step 2: Resolve variant classes
    const variantClasses = {
      primary:
        "border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]",
      secondary:
        "border border-neutral-800 bg-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-700",
      ghost:
        "hover:bg-neutral-900 text-neutral-400 hover:text-white",
      outline:
        "border border-neutral-800 bg-black hover:border-[#FF0000] hover:text-[#FF0000] text-neutral-300",
    }[variant];

    // Step 3: Resolve size classes
    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
