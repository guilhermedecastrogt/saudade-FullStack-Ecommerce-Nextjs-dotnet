"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";

export function PromoSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-brand-teal text-brand-cream">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=2574&auto=format&fit=crop" 
          alt="Summer vibes" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-teal via-brand-teal/90 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 border border-brand-gold text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">
              Limited Time Offer
            </span>
            <h2 className="font-accent text-3xl md:text-4xl text-brand-gold italic mb-2">Summer Essentials</h2>
            <h3 className="font-montserrat font-bold text-4xl md:text-6xl leading-tight mb-6">
              Get Ready for <br />
              <span className="text-white">The Sun</span>
            </h3>
            <p className="text-lg text-brand-cream/80 leading-relaxed mb-8">
              Discover our curated collection of breathable linens, vibrant swimwear, and handcrafted accessories perfect for the warmer days ahead.
            </p>
            <div className="flex gap-4">
              <Link href="/products?collection=summer">
                <Button className="bg-brand-gold hover:bg-brand-gold/90 text-white h-14 px-8 text-lg font-medium">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/journal/summer-style-guide">
                <Button variant="outline" className="border-brand-cream text-brand-cream hover:bg-brand-cream hover:text-brand-teal h-14 px-8 text-lg font-medium">
                  Read Style Guide
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
