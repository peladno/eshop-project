import React, { useState, createContext, useEffect } from "react";

export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://apicart.herokuapp.com/api/products"
        );
        const data = await result.json();
        setItem(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <APIContext.Provider value={{ loading, item, setItem }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
