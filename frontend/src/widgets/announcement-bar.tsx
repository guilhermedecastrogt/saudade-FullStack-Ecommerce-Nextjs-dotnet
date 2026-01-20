"use client";

import { Container } from "@/shared/ui/container";
import { Truck } from "lucide-react";
import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-gold text-brand-teal text-xs font-bold py-2 overflow-hidden relative z-50">
      <Container>
        <div className="flex items-center justify-center gap-2">
          <Truck className="w-4 h-4" />
          <motion.span
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            FREE SHIPPING ON ALL ORDERS OVER €150
          </motion.span>
        </div>
      </Container>
    </div>
  );
}
