"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

export interface CustomInputProps extends React.ComponentProps<typeof Input> {
  label: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, id, placeholder, className, ...props }, ref) => {
    return (
      <FormItem>
        <Label htmlFor={id} className="text-sm">
          {label}
        </Label>
        <FormControl>
          <Input
            ref={ref}
            id={id}
            placeholder={placeholder}
            className={cn(
              "border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary",
              className,
            )}
            {...props}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  },
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
