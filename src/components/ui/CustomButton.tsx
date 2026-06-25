"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { BiLoaderAlt } from "react-icons/bi";

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      children,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      variant = "gradient",
      size = "md",
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot.Root : "button";

    // Style tokens for premium feel
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden active:scale-[0.98]";

    const variantStyles = {
      gradient:
        "bg-gradient-to-r from-primary via-[#006bb6] to-[#009bda] text-white shadow-md hover:shadow-lg hover:shadow-primary/20 hover:brightness-110 active:brightness-95 border-none",
      primary:
        "bg-primary text-white hover:bg-primary/95 hover:shadow-md hover:shadow-primary/10",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-sm",
      outline:
        "border border-input bg-background hover:bg-muted hover:text-foreground",
      ghost:
        "hover:bg-muted hover:text-foreground",
    };

    const sizeStyles = {
      sm: "h-8 px-4 text-xs rounded gap-1.5",
      md: "h-9 px-6 text-sm rounded gap-2",
      lg: "h-10 px-8 text-base rounded-lg gap-2.5",
    };

    const isBtnDisabled = disabled || isLoading;

    return (
      <Comp
        ref={ref}
        disabled={isBtnDisabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          isLoading && "text-transparent select-none",
          className,
        )}
        {...props}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center text-current">
            <BiLoaderAlt className="h-5 w-5 animate-spin" />
          </span>
        )}

        {/* Content with optional icons */}
        <span className={cn("inline-flex items-center gap-2", isLoading && "opacity-0 invisible")}>
          {leftIcon && <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-[-2px]">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]">{rightIcon}</span>}
        </span>

        {/* Premium hover overlay shine effect */}
        {variant === "gradient" && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shine_1.5s_infinite]" />
        )}
      </Comp>
    );
  },
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
