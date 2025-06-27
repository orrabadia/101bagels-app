import React, { createContext, useContext, useState, useEffect } from 'react';
import { sample_items } from '../data';

const CartContext = createContext(null);

const CART_KEY = 'cart';
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem(CART_KEY);
  try {
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  } catch (e) {
    console.error('Error parsing cart from localStorage:', e);
    return EMPTY_CART;
  }
}

export default function CartProvider({ children }) {
  const initCart = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items)
  const [totalPrice, setTotalPrice] = useState(initCart.totalPrice);
  const [totalCount, setTotalCount] = useState(initCart.totalCount);


  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, ci) => sum + Number(ci.price || 0), 0);
    const totalCount = cartItems.reduce((sum, ci) => sum + Number(ci.quantity || 0), 0);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
    localStorage.setItem(CART_KEY, JSON.stringify({
      items: cartItems,
      totalPrice,
      totalCount,
    }));
  }, [cartItems]);

  const sum = items => {
    return items.reduce((prevValue, curValue) => prevValue + curValue, 0);
  }
  const updateItemQuantity = (cartItem, newQuantity) => {
    const { item } = cartItem;

    const updatedCartItems = cartItems.map(ci => {
      if (ci.item.id === item.id) {
        return {
          ...ci,
          quantity: newQuantity,
          price: item.price * newQuantity,
        };
      }
      return ci;
    });

    setCartItems(updatedCartItems);
  };

  const removeFromCartByIndex = index => {
    const updatedItems = [...cartItems];
    updatedItems.splice(index, 1);
    setCartItems(updatedItems);
  };

  const addToCart = item => {
    const cartItem = cartItems.find(item => item.item.id === item.id);
    if (cartItem) {
      updateItemQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {item, quantity: 1, price: item.price}])
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCartByIndex,
        updateItemQuantity,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
