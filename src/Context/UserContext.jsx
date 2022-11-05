import React, { useState, createContext, useEffect } from "react";
import ApiServices from "../Services/ApiServices";

export const USERContext = createContext();

const USERContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const tokenKey = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        await ApiServices.getCurrentUser().then((res)=> {
          setData(res.data);
        })
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    if (tokenKey) {
      getUser();
    }
  }, [tokenKey]);

  return <USERContext.Provider value={data}>{children}</USERContext.Provider>;
};
export default USERContextProvider;
