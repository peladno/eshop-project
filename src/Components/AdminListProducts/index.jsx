import React, {useContext}from "react";
import styles from "./adminListProducts.module.css";
import { Waveform } from "@uiball/loaders";
import {APIContext} from "../../Context/ApiContext";
import AdminItemList from "../AdminItemList/index.jsx";

const AdminListProducts = () => {
  const {item, loading } = useContext(APIContext);
  return (
    <div className={styles.itemListContainer}>
      <h1 className={styles.itemListTitle}>Nuestros productos</h1>
      {/*loading que carga hasta que llegen todos los productos*/}
      {loading ? (
        <div className={styles.loadingContainer}>
          <Waveform
            className={styles.loading}
            size={80}
            lineWeight={3.5}
            speed={1}
            color="black"
          />
        </div>
      ) : (
        <div className={styles.items}>
          <AdminItemList products={item}/>
        </div>
      )}
    </div>
  );
};

export default AdminListProducts;
