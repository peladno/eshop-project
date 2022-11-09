import { useContext } from "react";
import styles from "./adminListProducts.module.css";
import { APIContext } from "../../Context/ApiContext";
import AdminItemList from "../AdminItemList/index.jsx";
import Loader from "../../Shared/Loader/index";

const AdminListProducts = () => {
  const { item, loading } = useContext(APIContext);
  return (
    <div className={styles.itemListContainer}>
      <h1 className={styles.itemListTitle}>Nuestros productos</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.items}>
          <AdminItemList products={item} />
        </div>
      )}
    </div>
  );
};

export default AdminListProducts;
