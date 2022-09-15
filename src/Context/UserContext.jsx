import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const USERContext = createContext();

const USERContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const tokenKey = localStorage.getItem("token");

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${tokenKey}`,
      "Content-Type": "application/json",
    };
    const getUser = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce-javierp.herokuapp.com/login/success",
          {
            headers: headers,
          }
        );
        const data = await response.data;
        setData(data);
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    if (tokenKey !== null) {
      getUser();
    }
  }, [tokenKey]);

  return <USERContext.Provider value={data}>{children}</USERContext.Provider>;
};
export default USERContextProvider;
