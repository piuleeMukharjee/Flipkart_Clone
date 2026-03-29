"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as api from "@/lib/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshCart = useCallback(async () => {
    setError(null);
    try {
      const res = await api.getCart();
      setCart(res.data);
    } catch (e) {
      setError(e.message || "Failed to load cart");
      setCart(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await api.getCart();
        if (!cancelled) setCart(res.data);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load cart");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const addItem = useCallback(async (productId, quantity = 1) => {
    setError(null);
    const res = await api.addToCart(productId, quantity);
    setCart(res.data);
    return res;
  }, []);

  const updateItem = useCallback(async (cartItemId, quantity) => {
    setError(null);
    const res = await api.updateCartItem(cartItemId, quantity);
    setCart(res.data);
    return res;
  }, []);

  const removeItem = useCallback(async (itemId) => {
    setError(null);
    const res = await api.removeCartItem(itemId);
    setCart(res.data);
    return res;
  }, []);

  const itemCount = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce((n, i) => n + i.quantity, 0);
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      itemCount,
    }),
    [
      cart,
      loading,
      error,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      itemCount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
