//TODO new cart context, using APIREST, and localStorage
import { useContext, createContext, useEffect, useState } from "react";
import { USERContext } from "./UserContext";
import ApiServices from "../Services/ApiServices";

export const NewCartContext = createContext();

const NewCartProvider = ({ children }) => {
  const tokenKey = localStorage.getItem("token");
  const [cart, setCart] = useState([]);
  const data = useContext(USERContext);

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await ApiServices.getCart(data.user._id);
        const dataCart = await response.data;
        setCart(dataCart);
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    if (tokenKey && data !== null) {
      getCart();
    }
  }, [tokenKey, data]);

  const totalCart = cart.products?.reduce((total, item) => total + item.count, 0);

  const totalPrice = cart.products?.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const clearCart = async(cart_id) => {
    try {
      const response = await ApiServices.deleteCart(cart_id);
      const dataCart = await response.data
      setCart([])
    }catch(error) {
      throw new Error(error)
    }
  }

  return (
    <NewCartContext.Provider value={{ cart, setCart, totalCart, totalPrice, clearCart }}>
      {children}
    </NewCartContext.Provider>
  );
};

export default NewCartProvider;