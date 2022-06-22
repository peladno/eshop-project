import React, { useState, useEffect } from "react"; 
import ItemList from "../ItemList/index.jsx";
import styles  from "./itemListContainer.module.css";
import { Waveform } from "@uiball/loaders";

//contenedor de todos los productos

const ItemListContainer = () => {
  const [item, setItem] = useState ([]);
  const [loading, setLoading] = useState(true);

  //useEffect que llama a los productos del API
  useEffect(() => {
    fetch('https://apicart.herokuapp.com/api/products')
    .then((response) => response.json())
    .then((data) => setItem(data))
    setLoading(false)
  }, []);

  return (
      <div className={styles.itemListContainer}>
        <h1 className={styles.itemListTitle}>Nuestros productos</h1>
        {/*loading que carga hasta que llegen todos los productos*/}
        {loading ?
        <div className={styles.loadingContainer}>
          <Waveform className={styles.loading}
          size={80}
          lineWeight={3.5}
          speed={1} 
          color="black" /> 
        </div> :
        <div className={styles.items}>
          <ItemList products={item} loading={loading} />
        </div>}
      </div>
  );

  
}

export default ItemListContainer
