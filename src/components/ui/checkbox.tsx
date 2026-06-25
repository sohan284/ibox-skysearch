"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onCheckedChange, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked ?? defaultChecked ?? false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.checked;
      setIsChecked(val);
      if (onCheckedChange) {
        onCheckedChange(val);
      }
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative flex items-center justify-center">
        <input
          ref={ref}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded border border-gray-300 bg-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:border-primary appearance-none cursor-pointer",
            className,
          )}
          {...props}
        />
        <FaCheck className="absolute text-[9px] text-white pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-200" />
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
