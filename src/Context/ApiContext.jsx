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
      })
  }, []);
  

  /*
  const [user, setUser] = useState(null);

  useEffect(() => {
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
          throw new Error(err)
        });
    };
    getUser();
  }, [user]);

  console.log(user);*/

  return (
    <APIContext.Provider value={{ loading, item }}>
      {children}
    </APIContext.Provider>
  );
};

export default APIContextProvider;
