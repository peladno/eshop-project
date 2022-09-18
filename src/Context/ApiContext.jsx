import React, { useState, createContext, useEffect } from "react";
import ApiServices from "../Services/ApiServices";
export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const response = await ApiServices.getAllProducts();
        const data = await response.data;
        setItem(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    getProducts();
  }, []);

  return (
    <APIContext.Provider value={{ loading, item, setItem }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
