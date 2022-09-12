import axios from "axios";
import React, { useState, createContext, useEffect } from "react";

export const USERContext = createContext();

const USERContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/login/success");
        setUser(await response.json());
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    getUser();
  }, []);

  /*useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:8080/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          throw new Error(err);
        });
    };
    getUser();
  }, [setUser]);*/

  return (
    <USERContext.Provider value={{ user }}>{children}</USERContext.Provider>
  );
};

export default USERContextProvider;
