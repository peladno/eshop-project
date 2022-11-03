import React from "react";
import NavBar from "./Components/NavBar/index.jsx";
import ItemListContainer from "./Components/ItemListContainer/index.jsx";
import ItemDetailContainer from "./Components/ItemDetailContainer/index.jsx";
import CartDetail from "./Components/CartDetail/index.jsx";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./Components/Footer/index.jsx";
import Error404 from "./Components/Error404/index.jsx";
import AdminPage from "./Components/Adminpage/index.jsx";
import Login from "./Components/Login/Login";
import Signup from "./Components/Singup/SignUp";
import { USERContext } from "./Context/UserContext";
import { useContext } from "react";
import ItemEdit from "./Components/ItemEditContainer/index";
import ChatContainer from "./Components/ChatContainer/index.jsx";

//TODO hacer ruta protegida como corresponde

export default function App() {
  const data = useContext(USERContext);
  console.log(data);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/search/products/:keyword"
            element={<ItemListContainer />}
          />
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartDetail />} />
          <Route path="/*" element={<Error404 />} />
          <Route
            path="/admin"
            element={
              data?.user.role !== "admin" ? <Navigate to="/" /> : <AdminPage />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={data ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/itemEdit/:id" element={<ItemEdit />} />
          <Route
            path="/chat"
            element={
              data?.user.role !== "admin" ? (
                <Navigate to="/" />
              ) : (
                <ChatContainer />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
