"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Tropical Wave Bikini",
    price: "€89.00",
    image: "https://images.unsplash.com/photo-1576186726580-a816e8b12896?q=80&w=2788&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Ipanema Linen Dress",
    price: "€120.00",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2683&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Copacabana Silk Scarf",
    price: "€45.00",
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=2582&auto=format&fit=crop",
  },
];

export function FeaturedSection() {
  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-brand-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="font-accent text-brand-gold text-2xl italic">New Arrivals</h2>
            <h3 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-teal leading-tight">
              From Brazil to <br />Your Heart
            </h3>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-brand-teal hover:text-brand-gold p-0 h-auto group">
              View All Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/products/${product.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-teal/5 mb-6 rounded-sm group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-brand-gold text-xs">♥</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 w-3/4 bg-white text-brand-teal hover:bg-brand-gold hover:text-white shadow-lg"
                  >
                    Add to Cart
                  </Button>
                </div>
                
                <div className="space-y-2 group-hover:translate-y-1 transition-transform duration-300">
                  <h4 className="font-dmSans font-bold text-xl text-brand-teal group-hover:text-brand-gold transition-colors">
                    {product.name}
                  </h4>
                  <p className="font-inter text-brand-charcoal/70 text-lg">{product.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 text-brand-gold/40">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
            <span className="font-accent italic text-sm">Saudade</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
