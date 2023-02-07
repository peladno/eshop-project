import { useState, createContext, useEffect } from "react";
import ApiServices from "../Services/ApiServices";

export const USERContext = createContext();

//TODO eliminar esto despues de implementar redux

const USERContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const tokenKey = localStorage.getItem("token");

  useEffect(() => {
  
    const getUser = async () => {
      try {
        await ApiServices.getCurrentUser().then((res) => {
          setUser(res.data);
        
        });
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };

    tokenKey && getUser();
  }, [tokenKey]);

  return (
    <USERContext.Provider value={user}>
      {children}
    </USERContext.Provider>
  );
};
export default USERContextProvider;
