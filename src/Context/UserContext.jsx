import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const USERContext = createContext();

const USERContextProvider = ({ children }) => {
  const [data, seData] = useState(null);

  useEffect(() => {
    const tokenKey = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${tokenKey}`,
      "Content-Type": "application/json",
    };
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/login/success",
          {
            headers: headers,
          }
        );
        const data = response.data;
        seData(data);
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    getUser();
  }, []);

  return <USERContext.Provider value={data}>{children}</USERContext.Provider>;
};
export default USERContextProvider;
