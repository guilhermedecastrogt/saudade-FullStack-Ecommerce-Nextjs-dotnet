import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Container } from "@/shared/ui/container";
import { Logo } from "@/shared/ui/logo";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function Footer() {
  return (
    <footer className="bg-brand-teal text-brand-cream">
      <div className="h-1 w-full bg-gradient-to-r from-brand-gold via-brand-gold/70 to-brand-gold/40" />
      <Container className="py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1 space-y-6">
            <Logo className="text-brand-cream" />
            <p className="text-sm leading-relaxed text-brand-cream/80 max-w-xs">
              Authentic Brazilian fashion for women who long for connection, quality, and home.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-brand-cream/80 hover:text-brand-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-montserrat font-bold text-lg text-brand-gold">Shop</h4>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li><Link href="/products" className="hover:text-brand-gold transition-colors">All Products</Link></li>
              <li><Link href="/products?category=new" className="hover:text-brand-gold transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?category=bestsellers" className="hover:text-brand-gold transition-colors">Best Sellers</Link></li>
              <li><Link href="/products?category=sale" className="hover:text-brand-gold transition-colors">Sale</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-montserrat font-bold text-lg text-brand-gold">Support</h4>
            <ul className="space-y-2 text-sm text-brand-cream/80">
              <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-brand-gold transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-montserrat font-bold text-lg text-brand-gold">Stay in the loop</h4>
            <p className="text-sm text-brand-cream/80">
              Subscribe to our newsletter for exclusive offers and Brazilian stories.
            </p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-brand-cream/10 border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/50 focus-visible:ring-brand-gold"
              />
              <Button variant="white">Subscribe</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/60">
          <p>&copy; {new Date().getFullYear()} SAUDADE. All rights reserved.</p>
          <p>Designed with ❤️ in Brazil & Dublin.</p>
        </div>
      </Container>
    </footer>
  );
}
