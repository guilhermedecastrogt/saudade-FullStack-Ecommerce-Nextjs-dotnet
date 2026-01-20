import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem } from "./types";
import { cartService, ApiCartItem } from "@/features/cart/api/cart-service";
import { Product } from "@/entities/product/types";

function mapCartItem(item: ApiCartItem): CartItem {
  const product: Product = {
    id: item.productId,
    slug: item.productSlug,
    name: item.productName,
    description: "",
    price: item.unitPrice,
    currency: item.currency,
    images: item.image ? [item.image] : [],
    category: "",
    sizes: [],
    colors: [],
    rating: 0,
    inventory: 0,
    isNew: false,
    isBestSeller: false,
    isOnSale: false,
  };

  return {
    id: item.id,
    product,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      isOpen: false,
      isLoading: false,

      initializeCart: async () => {
        if (get().isLoading) return;
        set({ isLoading: true });
        try {
          const cart = await cartService.createCart(get().cartId);
          set({
            cartId: cart.id,
            items: cart.items.map(mapCartItem),
          });
        } catch {
          return;
        } finally {
          set({ isLoading: false });
        }
      },

      addItem: async (product, quantity, size, color) => {
        if (!get().cartId) {
          await get().initializeCart();
        }
        const cartId = get().cartId;
        if (!cartId) return;

        const cart = await cartService.addItem(cartId, {
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          unitPrice: product.price,
          currency: product.currency,
          quantity,
          size,
          color,
          image: product.images[0] ?? "",
        });

        set({ items: cart.items.map(mapCartItem) });
      },

      removeItem: async (itemId) => {
        const cartId = get().cartId;
        if (!cartId) return;
        const cart = await cartService.removeItem(cartId, itemId);
        set({ items: cart.items.map(mapCartItem) });
      },

      updateQuantity: async (itemId, quantity) => {
        const cartId = get().cartId;
        if (!cartId) return;
        if (quantity < 1) {
          await get().removeItem(itemId);
          return;
        }
        const cart = await cartService.updateItem(cartId, itemId, quantity);
        set({ items: cart.items.map(mapCartItem) });
      },

      clearCart: async () => {
        const items = get().items;
        for (const item of items) {
          await get().removeItem(item.id);
        }
      },

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "saudade-cart",
    }
  )
);
