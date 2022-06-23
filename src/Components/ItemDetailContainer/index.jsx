import React, { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/index.jsx";
import { useParams } from "react-router-dom";
import styles from "./itemDetailContainer.module.css";

//Componente de llamada de producto especifico por id
const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  //llamada a producto segun cambia el id
  useEffect(() => {
    setLoading(true);
    fetch(`https://apicart.herokuapp.com/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data)
      ).finally(() => setLoading(false));
  }, [id]);

  return (
    <div className={styles.itemContainer}>
      <ItemDetail item={item} loading={loading} />
    </div>
  );
};

export default ItemDetailContainer;
