import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const USERContext = createContext();

const USERContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
        const { user } = response.data;
        console.log(user);
        setUser(user);
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    getUser();
  }, []);

  console.log(user);
  return (
    <USERContext.Provider value={{ user }}>{children}</USERContext.Provider>
  );
};
export default USERContextProvider;
