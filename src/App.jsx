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
import ChatContainer from "./Components/ChatContainer/ChatContainer.jsx";
//TODO hacer la redireccion como corresponde con el admin

export default function App() {
  const data = useContext(USERContext);

  return (
    <>
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
          <Route
            exact
            path="/admin"
            element={
              data?.user.role !== "admin" ? <Navigate to="/" /> : <AdminPage />
            }
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/login"
            element={data ? <Navigate to="/" /> : <Login />}
          />
          <Route exact path="/itemEdit/:id" element={<ItemEdit />} />
          <Route excat path="/chat" element={<ChatContainer />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
