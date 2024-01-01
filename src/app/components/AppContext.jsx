"use client";

import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;

  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras) {
    cartProduct.extras.map((extra) => (price += extra.price));
  }
  return price;
}

const AppContext = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage && localStorage.getItem("cart")) {
      setCartProducts(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  function saveCartProductsInLocalStorage(cartProducts) {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevproducts) => {
      const cartProduct = { ...product, size, extras };
      const newproducts = [...prevproducts, cartProduct];
      saveCartProductsInLocalStorage(newproducts);
      return newproducts;
    });
  }

  function clearCart() {
    setCartProducts([]);
    saveCartProductsInLocalStorage([]);
  }

  function removeCartProduct(index) {
    setCartProducts((prevproducts) => {
      const newproducts = prevproducts.filter((v, i) => i !== index);
      saveCartProductsInLocalStorage(newproducts);
      return newproducts;
    });
    toast.success("Product Removed!");
  }

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          clearCart,
          removeCartProduct,
          cartProductPrice,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default AppContext;
