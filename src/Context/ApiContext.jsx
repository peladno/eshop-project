import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  return (
    <APIContext.Provider value={{ loading, item, setItem }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
