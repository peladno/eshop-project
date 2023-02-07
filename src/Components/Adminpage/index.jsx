import { useContext } from "react";
import { USERContext } from "../../Context/UserContext.jsx";
import AdminForm from "../AdminItemForm/index.jsx";
import AdminListProducts from "../AdminListProducts/index.jsx";
import { Navigate } from "react-router-dom";
import isAdmin from "../../utils/roleAutentication.jsx";
//TODO agregar redux
function AdminPage() {
  
  return (
    <>
      {
      isAdmin ? (
        <>
          <AdminForm />
          <AdminListProducts />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default AdminPage;
