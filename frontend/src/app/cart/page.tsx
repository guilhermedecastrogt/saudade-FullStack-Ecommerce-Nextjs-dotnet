"use client";

import Link from "next/link";
import { useCartStore } from "@/entities/cart/cart-store";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="py-20 bg-brand-cream min-h-screen">
        <Container className="text-center space-y-6">
          <h1 className="font-montserrat font-bold text-3xl text-brand-teal">Your Cart is Empty</h1>
          <p className="text-brand-charcoal/70">Looks like you haven&apos;t added any pieces of Brazil to your cart yet.</p>
          <Link href="/products">
            <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white mt-4">
              Start Shopping
            </Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-brand-cream min-h-screen">
      <Container>
        <h1 className="font-montserrat font-bold text-3xl md:text-4xl text-brand-teal mb-12">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div 
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-sm shadow-sm border border-brand-teal/5"
              >
                <div className="w-full sm:w-24 aspect-[3/4] bg-brand-teal/5 rounded-sm overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/products/${item.product.slug}`} className="font-dmSans font-bold text-lg text-brand-teal hover:text-brand-gold transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-brand-charcoal/60 font-inter mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                    </div>
                    <p className="font-dmSans font-bold text-brand-teal">
                      {new Intl.NumberFormat('en-IE', { style: 'currency', currency: item.product.currency }).format(item.product.price)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center border border-brand-teal/20 rounded-sm">
                      <button
                        className="p-1 hover:bg-brand-teal/5 text-brand-teal disabled:opacity-50"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-dmSans text-sm font-bold">{item.quantity}</span>
                      <button
                        className="p-1 hover:bg-brand-teal/5 text-brand-teal"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      className="text-red-400 hover:text-red-600 transition-colors p-2"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5 sticky top-24">
              <h2 className="font-montserrat font-bold text-xl text-brand-teal mb-6">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-brand-charcoal/80 font-inter border-b border-brand-teal/10 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span>{shipping === 0 ? "Free" : new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-6 font-bold text-lg text-brand-teal">
                <span>Total</span>
                <span>{new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(total)}</span>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button className="w-full h-12 text-base bg-brand-gold hover:bg-brand-gold/90 text-white">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              
              <div className="mt-4 text-xs text-center text-brand-charcoal/50">
                <p>Secure Checkout powered by Stripe (Mock)</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
