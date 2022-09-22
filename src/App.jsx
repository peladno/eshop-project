import React from "react";
import NavBar from "./Components/NavBar/index.jsx";
import ItemListContainer from "./Components/ItemListContainer/index.jsx";
import ItemDetailContainer from "./Components/ItemDetailContainer/index.jsx";
import CartDetail from "./Components/CartDetail/index.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./Components/Footer/index.jsx";
import Error404 from "./Components/Error404/index.jsx";
import AdminPage from "./Components/Adminpage/index.jsx";
import APIContextProvider from "./Context/ApiContext.jsx";
import Login from "./Components/Login/Login";
import Signup from "./Components/Singup/SignUp";
import { USERContext } from "./Context/UserContext";
import { useContext } from "react";
import ItemEdit from "./Components/ItemEditContainer/ItemEditContainer.jsx";
import NewCartProvider from "./Context/NewCartContex.jsx";

export default function App() {
  const data = useContext(USERContext);

  return (
    <>
      <APIContextProvider>
        <NewCartProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<ItemListContainer />} />
              <Route
                exact
                path="/category/:category"
                element={<ItemListContainer />}
              />
              <Route exact path="/item/:id" element={<ItemDetailContainer />} />
              <Route exact path="/cart" element={<CartDetail />} />
              <Route exact path="/*" element={<Error404 />} />
              <Route exact path="/admin" element={<AdminPage />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route
                exact
                path="/login"
                element={data ? <Navigate to="/" /> : <Login />}
              />
              <Route exact path="/itemEdit/:id" element={<ItemEdit />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </NewCartProvider>
      </APIContextProvider>
    </>
  );
}
