import React, { useEffect, useState } from "react";
import styles from "./itemEditContainer.module.css";
import { useParams } from "react-router-dom";
import ItemEditDetail from "../ItemEditDetail";

function ItemEditContainer() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  //TODO cambiar a API services
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const result = await fetch("http://localhost:8080/api/products/" + id);
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
    <div className={styles.itemEditContainer}>
      <ItemEditDetail item={item} loading={loading} />
    </div>
  );
}
export default ItemEditContainer;