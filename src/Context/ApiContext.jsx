import { useState, createContext } from "react";
export const APIContext = createContext();

const APIContextProvider = ({ children }) => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <APIContext.Provider value={{ loading, item, setItem, setLoading }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
