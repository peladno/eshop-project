import React, { useContext } from "react";
import ItemList from "../ItemList/index.jsx";
import styles from "./itemListContainer.module.css";
import { Waveform } from "@uiball/loaders";
import { APIContext } from "../../Context/ApiContext.jsx";

//contenedor de todos los productos

const ItemListContainer = () => {
  const { loading, item } = useContext(APIContext);

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
          <ItemList products={item} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
