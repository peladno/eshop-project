import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-javierp.herokuapp.com/api/products"
        );

        const data = await response.data;
        setItem(data)
        setLoading(false)
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    getProducts()
  }, []);

  return (
    <APIContext.Provider value={{ loading, item, setItem }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
