import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@utils";

const labelVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary-50 text-primary-500",
        warning: "bg-secondary-50 text-secondary-500",
        success: "bg-success-100 text-success-700",
        info: "bg-info-100 text-info-700",
        danger: "bg-danger-100 text-danger-700",
      },
      size: {
        default: "h-[24px] py-[2px] px-[10px]",
        sm: "h-[22px] py-[2px] px-[8px] text-xs",
        md: "h-[24px] py-[2px] px-[10px]",
        lg: "h-[28px] py-[4px] px-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <span
        className={cn(labelVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        {children}
      </span>
    );
  },
);
Label.displayName = "Label";

export { Label, labelVariants };
