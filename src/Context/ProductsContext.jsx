import { useState, createContext } from "react";
export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ProductsContext.Provider value={{ loading, item, setItem, setLoading }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
