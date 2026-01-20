import Link from "next/link";
import { cn } from "@/shared/utils/cn";

interface LogoProps {
  className?: string;
  variant?: "default" | "vertical" | "icon";
}

const Icon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8 text-brand-gold"
  >
    <path
      d="M16 2C16 2 6 12 6 20C6 25.5228 10.4772 30 16 30C21.5228 30 26 25.5228 26 20C26 12 16 2 16 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-brand-gold"
    />
    <path
      d="M16 2C16 2 24 10 24 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 22V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export function Logo({ className, variant = "default" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Link href="/" className={cn("inline-flex items-center justify-center", className)}>
        <Icon />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 font-montserrat font-bold text-2xl tracking-widest text-brand-gold", className)}>
      <Icon />
      <span>SAUDADE</span>
    </Link>
  );
}
