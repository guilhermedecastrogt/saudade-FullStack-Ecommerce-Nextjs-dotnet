"use client";

import Link from "next/link";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "swimwear",
    name: "Swimwear",
    image: "https://images.unsplash.com/photo-1576186726580-a816e8b12896?q=80&w=2788&auto=format&fit=crop",
    link: "/products?category=swimwear",
    size: "large",
  },
  {
    id: "dresses",
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2683&auto=format&fit=crop",
    link: "/products?category=dresses",
    size: "normal",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=2582&auto=format&fit=crop",
    link: "/products?category=accessories",
    size: "normal",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12 space-y-2">
          <h2 className="font-accent text-2xl text-brand-gold italic">Collections</h2>
          <h3 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-teal uppercase tracking-wide">
            Shop by Category
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[600px] md:h-[500px]">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group overflow-hidden rounded-sm ${
                category.size === "large" ? "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <Link href={category.link} className="block w-full h-full relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-white font-montserrat font-bold text-2xl md:text-3xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <div className="flex items-center text-white/90 font-medium text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
