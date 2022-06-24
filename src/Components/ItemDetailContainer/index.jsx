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
    
    const fetchData = async () => {
      try {
        const result = await fetch(
          "https://apicart.herokuapp.com/api/products/" + id
        );
        const data = await result.json();
        setItem(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);


  return (
    <div className={styles.itemContainer}>
      <ItemDetail item={item} loading={loading} />
    </div>
  );
};

export default ItemDetailContainer;
