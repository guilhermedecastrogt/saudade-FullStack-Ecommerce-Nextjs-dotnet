import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-montserrat tracking-wide text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-brand-gold text-white hover:bg-brand-gold/90 shadow-md hover:shadow-lg",
        secondary:
          "bg-brand-teal text-white hover:bg-brand-teal/90 shadow-md hover:shadow-lg",
        outline:
          "border border-brand-teal/30 text-brand-teal bg-white/0 hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 shadow-sm",
        ghost:
          "text-brand-teal hover:text-brand-gold hover:bg-brand-gold/10",
        link: "text-brand-gold underline-offset-4 hover:underline",
        white: "bg-white text-brand-teal hover:bg-white/90 shadow-md",
      },
      size: {
        default: "h-11 px-8",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
