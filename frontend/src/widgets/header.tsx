"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/shared/ui/logo";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/entities/cart/cart-store";

const NAV_LINKS = [
  { href: "/products", label: "Shop" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-teal/10 bg-brand-cream/95 backdrop-blur supports-[backdrop-filter]:bg-brand-cream/60">
      <div className="h-1 w-full bg-gradient-to-r from-brand-gold via-brand-gold/70 to-brand-gold/40" />
      <Container className="flex h-20 md:h-24 items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 -ml-2 text-brand-teal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-teal/90 hover:text-brand-gold transition-colors font-montserrat tracking-wide uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/account">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </Container>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-brand-cream border-b border-brand-teal/10 p-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-medium text-brand-teal hover:text-brand-gold transition-colors font-montserrat tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4 pt-4 border-t border-brand-teal/10">
            <Button variant="ghost" size="sm" className="justify-start px-0">
              <Search className="h-5 w-5 mr-2" /> Search
            </Button>
            <Link href="/account">
               <Button variant="ghost" size="sm" className="justify-start px-0">
                <User className="h-5 w-5 mr-2" /> Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
