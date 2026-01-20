"use client";

import { useState } from "react";
import { useProduct } from "@/features/products/api/use-product";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/entities/cart/cart-store";
import { Star, Minus, Plus, Heart, Share2, Truck, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailsViewProps {
  slug: string;
}

export function ProductDetailsView({ slug }: ProductDetailsViewProps) {
  const { data: product, isLoading } = useProduct(slug);
  const addItem = useCartStore((state) => state.addItem);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (isLoading) {
    return (
      <div className="py-20 bg-brand-cream min-h-screen">
        <Container>
           <div className="animate-pulse flex flex-col md:flex-row gap-12 lg:gap-20">
             <div className="w-full md:w-1/2">
               <div className="aspect-[3/4] bg-brand-teal/5 rounded-sm mb-4" />
               <div className="flex gap-4">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="w-20 h-20 bg-brand-teal/5 rounded-sm" />
                 ))}
               </div>
             </div>
             <div className="w-full md:w-1/2 space-y-6">
               <div className="h-8 w-3/4 bg-brand-teal/5 rounded" />
               <div className="h-6 w-1/4 bg-brand-teal/5 rounded" />
               <div className="h-32 w-full bg-brand-teal/5 rounded" />
               <div className="h-10 w-1/2 bg-brand-teal/5 rounded" />
               <div className="h-10 w-full bg-brand-teal/5 rounded" />
             </div>
           </div>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 bg-brand-cream min-h-screen text-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-montserrat font-bold text-brand-teal mb-4">Product not found</h1>
            <p className="text-brand-charcoal/70 mb-8">The product you are looking for does not exist.</p>
            <Button variant="link" onClick={() => window.history.back()}>Go Back</Button>
          </motion.div>
        </Container>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert("Please select a size");
      return;
    }
    if (!selectedColor && product.colors.length > 0) {
      alert("Please select a color");
      return;
    }
    
    await addItem(product, quantity, selectedSize || "One Size", selectedColor || "Default");
    
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      button.classList.add('animate-pulse');
      setTimeout(() => {
        button.classList.remove('animate-pulse');
      }, 1000);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="py-12 md:py-20 bg-brand-cream min-h-screen">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-brand-teal/5 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-gold hover:text-white shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-brand-gold hover:text-white shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-brand-teal">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    className={cn(
                      "relative flex-shrink-0 w-24 aspect-[3/4] overflow-hidden rounded-sm border-2 transition-all duration-300",
                      currentImageIndex === idx 
                        ? "border-brand-gold shadow-lg" 
                        : "border-transparent hover:border-brand-teal/50 hover:shadow-md"
                    )}
                    onClick={() => setCurrentImageIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    {currentImageIndex === idx && (
                      <div className="absolute inset-0 bg-brand-gold/20" />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 text-sm text-brand-gold font-medium">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span>In Stock</span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="font-montserrat font-bold text-4xl md:text-5xl text-brand-teal leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.name}
              </motion.h1>
              
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-3xl md:text-4xl font-dmSans text-brand-gold font-bold">
                  {new Intl.NumberFormat('en-IE', { style: 'currency', currency: product.currency }).format(product.price)}
                </span>
                <div className="flex items-center gap-1 text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-5 h-5", i < Math.floor(product.rating) ? "fill-current" : "text-brand-teal/20")} />
                  ))}
                  <span className="text-brand-charcoal/60 ml-2 font-medium">({product.rating})</span>
                </div>
              </motion.div>
            </div>

            <motion.p 
              className="text-brand-charcoal/80 font-inter leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {product.description}
            </motion.p>

            <div className="space-y-6 pt-6 border-t border-brand-teal/10">
              {product.colors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold font-montserrat text-brand-teal">Color</span>
                    <span className="text-sm text-brand-charcoal/60">{selectedColor || "Select color"}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        className={cn(
                          "px-4 py-2 rounded-sm border text-sm transition-all duration-200",
                          selectedColor === color
                            ? "border-brand-gold bg-brand-gold text-white shadow-lg"
                            : "border-brand-teal/20 text-brand-charcoal hover:border-brand-gold/50 hover:shadow-md"
                        )}
                        onClick={() => setSelectedColor(color)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {product.sizes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold font-montserrat text-brand-teal">Size</span>
                    <span className="text-sm text-brand-charcoal/60">{selectedSize || "Select size"}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        className={cn(
                          "h-10 min-w-[3rem] px-3 flex items-center justify-center rounded-sm border text-sm transition-all duration-200",
                          selectedSize === size
                            ? "border-brand-gold bg-brand-gold text-white shadow-lg"
                            : "border-brand-teal/20 text-brand-charcoal hover:border-brand-gold/50 hover:shadow-md"
                        )}
                        onClick={() => setSelectedSize(size)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold font-montserrat text-brand-teal">Quantity</span>
                  <span className="text-sm text-brand-charcoal/60">{product.inventory} available</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-brand-teal/20 rounded-sm bg-white">
                    <motion.button
                      className="p-3 hover:bg-brand-teal/5 text-brand-teal disabled:opacity-50 transition-colors duration-200"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-16 text-center font-dmSans font-bold text-lg">{quantity}</span>
                    <motion.button
                      className="p-3 hover:bg-brand-teal/5 text-brand-teal transition-colors duration-200"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= product.inventory}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <motion.button 
                  className="add-to-cart-btn flex-1 h-14 text-lg font-medium bg-brand-gold hover:bg-brand-gold/90 text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Cart
                </motion.button>
                
                <div className="flex gap-3">
                  <motion.button
                    className={cn(
                      "w-14 h-14 border rounded-sm flex items-center justify-center transition-all duration-200",
                      isWishlisted 
                        ? "border-brand-gold bg-brand-gold text-white" 
                        : "border-brand-teal/20 text-brand-teal hover:border-brand-gold hover:text-brand-gold"
                    )}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={cn("w-5 h-5", isWishlisted ? "fill-current" : "")} />
                  </motion.button>
                  
                  <motion.button
                    className="w-14 h-14 border border-brand-teal/20 rounded-sm flex items-center justify-center text-brand-teal hover:border-brand-gold hover:text-brand-gold transition-all duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-brand-teal/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.div 
                className="flex items-center gap-3 p-4 bg-white rounded-sm border border-brand-teal/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Truck className="w-5 h-5 text-brand-gold" />
                <div>
                  <div className="font-medium text-brand-teal">Free Shipping</div>
                  <div className="text-xs text-brand-charcoal/60">On orders over €150</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 p-4 bg-white rounded-sm border border-brand-teal/5"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <RotateCcw className="w-5 h-5 text-brand-gold" />
                <div>
                  <div className="font-medium text-brand-teal">Easy Returns</div>
                  <div className="text-xs text-brand-charcoal/60">30-day return policy</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
