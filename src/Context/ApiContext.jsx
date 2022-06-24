import React, { useState, createContext, useEffect } from "react";

export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://apicart.herokuapp.com/api/products")
      .then((response) => response.json())
      .then((data) => setItem(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <APIContext.Provider value={{ loading, item, setItem }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
