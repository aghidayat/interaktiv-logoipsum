import * as React from "react";
import { Link } from "react-router-dom";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@utils";
import IcLink from "@/assets/righttop.svg";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600",
        warning: "bg-secondary-500 text-white hover:bg-secondary-600",
        info: "bg-primary-50 text-primary-700 hover:bg-primary-100",
        white: "bg-white text-neutral-600 hover:bg-primary-50",
        link: "underline-offset-4 hover:underline text-primary-700 p-0 h-auto",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-[14px] py-[8px] rounded-xl",
        md: "h-10 px-[16px] py-[10px] rounded-xl",
        lg: "h-11 px-[18px] py-[10px] rounded-xl",
        xl: "h-12 px-3 py-5 rounded-xl",
        "2xl": "h-[60px] px-4 py-7 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link
          to={href}
          className={cn(buttonVariants({ variant, size: null, className }))}>
          <div className="flex flex-row gap-x-2 items-center">
            {children}
            <img src={IcLink} alt="link to" />
          </div>
        </Link>
      );
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
