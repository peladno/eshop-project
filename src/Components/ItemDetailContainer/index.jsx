import React, { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/index.jsx";
import { useParams } from "react-router-dom";
import styles from "./itemDetailContainer.module.css";
import ApiServices from "../../Services/ApiServices";

//Componente de llamada de producto especifico por id
const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await ApiServices.getProductId(id);
        const data = await result.data
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
