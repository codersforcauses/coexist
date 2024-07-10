import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focusStyle?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, focusStyle, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-[#EFF1ED] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-[#7D916F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7D916F] disabled:cursor-not-allowed disabled:opacity-50",
          focusStyle,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
