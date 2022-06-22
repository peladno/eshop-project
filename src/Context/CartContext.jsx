import React, { useState, createContext } from 'react'

export const CartContext = createContext();

const CartContextProvider = ( { children } ) => {

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {

    const indexProduct = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (indexProduct !== -1) {
      const newCart = [...cart];

      newCart[indexProduct].count = newCart[indexProduct].count + item.count;
      setCart(newCart);

    } else {
      setCart([...cart, item]);
    }
  };

  const removeCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  }

  const clearCart = () => setCart([]);

  const totalCart = cart.reduce((total, item) => total + item.count, 0)

  const totalPrice = cart.reduce((total, item) => total + item.count * item.price, 0);


  return (
    <CartContext.Provider value={{cart, addToCart, removeCart, clearCart, totalCart, totalPrice}}>
      {children}
    </CartContext.Provider>  
  )
}

export default CartContextProvider;