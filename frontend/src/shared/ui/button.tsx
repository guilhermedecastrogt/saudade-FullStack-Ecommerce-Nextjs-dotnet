import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-montserrat font-medium text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default:
          "bg-brand-teal text-white shadow-sm hover:bg-brand-teal/90 hover:shadow-md hover:brightness-95",
        secondary:
          "bg-brand-gold text-white shadow-sm hover:bg-brand-gold/90 hover:shadow-md hover:brightness-95",
        outline:
          "border border-brand-teal/30 text-brand-teal bg-brand-cream hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/10 hover:shadow-sm",
        ghost:
          "text-brand-teal bg-brand-cream/60 hover:text-brand-gold hover:bg-brand-gold/10",
        link: "text-brand-gold bg-brand-cream/60 hover:bg-brand-gold/10",
        white: "bg-white text-brand-teal shadow-sm hover:bg-white/95 hover:shadow-md",
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
