import React from "react";
import NavBar from "./Components/NavBar/index.jsx";
import ItemListContainer from "./Components/ItemListContainer/index.jsx";
import ItemDetailContainer from "./Components/ItemDetailContainer/index.jsx";
import CartDetail from "./Components/CartDetail/index.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartContextProvider from "./Context/CartContext.jsx";
import Footer from "./Components/Footer/index.jsx";
import Error404 from "./Components/Error404/index.jsx";
import AdminPage from "./Components/Adminpage/index.jsx";
import APIContextProvider from "./Context/ApiContext.jsx";
import USERContextProvider from "./Context/UserContext.jsx";
import Login from "./Components/Login.jsx/Login.jsx";
import Signup from "./Components/Signup/Signup.jsx";

export default function App() {
  return (
    <>
      <APIContextProvider>
        <USERContextProvider>
          <CartContextProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route exact path="/" element={<ItemListContainer />} />
                <Route
                  exact
                  path="/category/:category"
                  element={<ItemListContainer />}
                />
                <Route
                  exact
                  path="/item/:id"
                  element={<ItemDetailContainer />}
                />
                <Route exact path="/cart" element={<CartDetail />} />
                <Route exact path="/*" element={<Error404 />} />
                <Route exact path="/admin" element={<AdminPage />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </CartContextProvider>
        </USERContextProvider>
      </APIContextProvider>
    </>
  );
}
