"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section className="py-32 bg-brand-teal text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-6 h-6 border-2 border-brand-gold/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-4 h-4 bg-brand-gold/40 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-10 w-3 h-3 bg-white/20 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Container className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:mx-0 overflow-hidden rounded-sm group">
              <img
                src="https://images.unsplash.com/photo-1583209814683-c023dd293cc6?q=80&w=2670&auto=format&fit=crop"
                alt="Artisan crafting fashion in Brazil"
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="absolute -top-8 -left-8 w-32 h-32 border border-brand-gold/30 rounded-full hidden md:block" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 border border-brand-gold/20 rounded-full hidden md:block" />
            
            <motion.div
              className="absolute top-4 right-4 bg-brand-gold text-brand-teal px-4 py-2 rounded-full text-sm font-bold"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Authentic
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-8 order-1 lg:order-2 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2 className="font-accent text-3xl md:text-4xl italic text-brand-gold">Our Story</h2>
              <h3 className="font-montserrat font-bold text-4xl md:text-6xl leading-tight">
                Saudade is a <br />
                <span className="text-brand-gold">feeling...</span>
              </h3>
            </div>
            
            <div className="space-y-6 text-xl text-brand-cream/80 font-light leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                SAUDADE brings authentic Brazilian fashion to women everywhere who long for connection, quality, and home.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Born from the nostalgia of tropical warmth and the elegance of European life, we bridge the gap between two worlds. Each piece is selected to tell a story of craftsmanship, joy, and the unique Brazilian spirit.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="inline-block pt-4"
            >
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-teal px-10 h-14 text-lg group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    Learn More About Us
                  </span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-3 gap-8 mt-20 pt-16 border-t border-brand-cream/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="font-montserrat font-bold text-4xl text-brand-gold mb-2">100%</div>
            <div className="text-brand-cream/70">Authentic Brazilian</div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-4xl text-brand-gold mb-2">50+</div>
            <div className="text-brand-cream/70">Artisan Partners</div>
          </div>
          <div className="text-center">
            <div className="font-montserrat font-bold text-4xl text-brand-gold mb-2">∞</div>
            <div className="text-brand-cream/70">Saudade Feeling</div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
