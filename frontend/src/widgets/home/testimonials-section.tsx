"use client";

import { Container } from "@/shared/ui/container";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ana Silva",
    location: "Dublin, Ireland",
    quote: "Finally found a brand that understands my style. The quality is amazing and it feels like wearing a piece of home.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sarah O'Connor",
    location: "Cork, Ireland",
    quote: "I've never been to Brazil, but wearing these clothes makes me feel the warmth. Absolutely stunning designs!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2550&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Mariana Costa",
    location: "London, UK",
    quote: "Saudade brings the best of Brazilian fashion. Fast shipping and beautiful packaging. Highly recommend!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2776&auto=format&fit=crop",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-brand-teal/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-20 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-accent text-brand-gold text-2xl italic">Community Love</h2>
          <h3 className="font-montserrat font-bold text-4xl md:text-5xl text-brand-teal">
            What Our Customers Say
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 rounded-sm shadow-sm border border-brand-teal/5 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="mb-6">
                  <div className="text-6xl text-brand-gold/20 font-serif">&ldquo;</div>
                </div>
                
                <div className="flex gap-1 mb-6 text-brand-gold">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                
                <motion.p 
                  className="text-brand-charcoal/80 mb-8 font-inter italic leading-relaxed text-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {testimonial.quote}
                </motion.p>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-brand-cream ring-2 ring-brand-gold/20 group-hover:ring-brand-gold transition-all duration-300">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-dmSans font-bold text-brand-teal">{testimonial.name}</h4>
                    <p className="text-sm text-brand-charcoal/60">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-6 text-brand-gold/40">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
            <span className="font-accent italic text-lg">Do Brasil pro Coração</span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
