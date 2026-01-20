"use client";

import Link from "next/link";
import { Product } from "@/entities/product/types";
import { Button } from "@/shared/ui/button";
import { motion } from "framer-motion";
import { Heart, Eye, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div 
          className="relative aspect-[3/4] overflow-hidden bg-brand-teal/5 mb-6 rounded-sm group-hover:shadow-2xl transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7 }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <motion.span 
                className="bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                New
              </motion.span>
            )}
            {product.isBestSeller && (
              <motion.span 
                className="bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                Best Seller
              </motion.span>
            )}
          </div>
          
          <motion.div 
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-200 shadow-lg">
              <Heart className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all duration-200 shadow-lg">
              <Eye className="w-4 h-4" />
            </button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button className="bg-white text-brand-teal hover:bg-brand-gold hover:text-white shadow-xl backdrop-blur-sm">
              Quick Add
            </Button>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-dmSans font-bold text-brand-teal">
              {new Intl.NumberFormat('en-IE', { style: 'currency', currency: product.currency }).format(product.price)}
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          className="space-y-3 group-hover:translate-y-1 transition-transform duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="font-dmSans font-bold text-xl text-brand-teal group-hover:text-brand-gold transition-colors">
            {product.name}
          </h4>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-xs text-brand-charcoal/60">({product.rating})</span>
          </div>
          
          {product.colors.length > 0 && (
            <div className="flex gap-2">
              {product.colors.slice(0, 3).map((color) => (
                <div
                  key={color}
                  className="w-4 h-4 rounded-full border border-brand-teal/20"
                  style={{ backgroundColor: color.toLowerCase() === 'multi' ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)' : color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-brand-charcoal/60">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
}
