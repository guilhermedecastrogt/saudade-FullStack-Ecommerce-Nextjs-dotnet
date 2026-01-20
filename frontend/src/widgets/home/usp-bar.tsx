"use client";

import { Container } from "@/shared/ui/container";
import { Truck, ShieldCheck, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";

const USPS = [
  {
    icon: Globe,
    title: "Authentic Brazilian",
    description: "Designed in Brazil, loved worldwide",
  },
  {
    icon: Truck,
    title: "Worldwide Shipping",
    description: "Free shipping on orders over €150",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: Heart,
    title: "Quality Promise",
    description: "Hand-picked premium materials",
  },
];

export function USPBar() {
  return (
    <section className="bg-brand-cream border-b border-brand-teal/5 py-12">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {USPS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-brand-teal/5 flex items-center justify-center text-brand-teal group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-sm text-brand-teal uppercase tracking-wide mb-1">
                  {item.title}
                </h3>
                <p className="font-inter text-xs text-brand-charcoal/60">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
