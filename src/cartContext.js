import React, { useReducer, useEffect, useContext } from 'react';
import CartReducer from './CartReducer';

//The default value would apply if a component tries consuming the context without a provider in a parent;
export const CartContext = React.createContext(null); 

let initialCart;
  try {
    initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
  } catch {
    console.error("The cart could not parse into JSON");
    initialCart = [];
  }

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(CartReducer, initialCart)
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
    
    const contextValue = {
      cart,
      dispatch
    }
    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}

//Easier to consume. Consumers dont have to import the context and useContext, or pass the context to useContext
//Can stop exporting the raw context so we can throw helpful errors if the provider is missing
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used in cartProvider. Wrap a parent component in <CartProvider /> to fix this error");
  }
  return context;
}