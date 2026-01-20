"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-brand-charcoal">
      <div 
        className="absolute inset-0 bg-[url('https://cdn.dooca.store/9528/files/prancheta-50-copia-100-3.jpg?v=1768829612')] bg-cover bg-center"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />

      <Container className="relative z-20 text-brand-cream h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-accent text-3xl md:text-4xl italic text-brand-gold tracking-wide mb-2">
              Authentic Brazilian Fashion
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="font-montserrat font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-white">
              Feel Home, <br />
              Anywhere.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="max-w-lg text-lg md:text-xl font-light text-white/90 leading-relaxed border-l-2 border-brand-gold pl-6">
              For the longing heart. We bring warmth, quality, and story to every piece.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-brand-gold hover:bg-brand-gold/90 text-white min-w-[200px] h-14 text-lg font-medium tracking-wide shadow-lg"
              >
                Shop New Arrivals
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-brand-charcoal min-w-[200px] h-14 text-lg font-medium tracking-wide"
              >
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
