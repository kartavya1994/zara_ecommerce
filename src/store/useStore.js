import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const { items } = get();
        const key = `${product.id}-${selectedSize}-${selectedColor}`;
        const existing = items.find(i => i.key === key);
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) });
        } else {
          set({ items: [...items, { ...product, selectedSize, selectedColor, quantity, key }] });
        }
        set({ isOpen: true });
      },

      removeItem: (key) => set(s => ({ items: s.items.filter(i => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) return;
        set(s => ({ items: s.items.map(i => i.key === key ? { ...i, quantity } : i) }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
      get count() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: 'zarr-cart' }
  )
);

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => {
        const { items } = get();
        const exists = items.find(i => i.id === product.id);
        set({ items: exists ? items.filter(i => i.id !== product.id) : [...items, product] });
      },
      isWishlisted: (id) => get().items.some(i => i.id === id),
    }),
    { name: 'zarr-wishlist' }
  )
);

export const useUIStore = create((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  toggleSearch: () => set(s => ({ searchOpen: !s.searchOpen })),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileMenu: () => set(s => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
