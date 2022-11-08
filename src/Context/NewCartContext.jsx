import { createContext, useState } from "react";
import ApiServices from "../Services/ApiServices";

export const NewCartContext = createContext();

const NewCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const clearCart = async (cart_id) => {
    try {
      const response = await ApiServices.deleteCart(cart_id);
      await response.data;
      setCart([]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeFromCart = async (id, id_prod) => {
    try {
      const response = await ApiServices.deleteProductFromCart(id, id_prod);
      const removedData = await response.data;
      setCart(() => removedData);
    } catch (error) {
      throw new Error(error);
    }
  };

  const totalCart = cart.products?.reduce(
    (total, item) => total + item.count,
    0
  );

  const totalPrice = cart.products?.reduce(
    (total, item) => total + item._id.price * item.count,
    0
  );

  return (
    <NewCartContext.Provider
      value={{
        cart,
        setCart,
        totalCart,
        totalPrice,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </NewCartContext.Provider>
  );
};

export default NewCartProvider;
