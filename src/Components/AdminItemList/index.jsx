import { Button } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "../../Context/ApiContext";
import styles from "./adminItems.module.css";

function AdminItemList({ products }) {
  const { item, setItem } = useContext(APIContext);

  const handleSubmit = async (id) => {
    try {
      await fetch(`https://ecommerce-javierp.herokuapp.com/api/products/${id}`, {
        method: "DELETE",
        headers: { admin: "true", "Content-Type": "application/json" },
      });
      setItem(
        item.filter((items) => {
          return items._id !== id;
        })
      );
    } catch (error) {
      console.log("error");
    }
  };

  return products.map((products) => (
    <ul className={styles.itemList} key={products._id}>
      <li>{products.name}</li>
      <li>{products.price}</li>
      <li>{products.description}</li>
      <li>
        <img src={products.photo} alt={products.name} />
      </li>
      <li>{products.stock}</li>
      <div className={styles.buttonBox}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/itemEdit/${products._id}`}
        >
          <Button
            sx={{ marginRight: "1rem" }}
            variant="contained"
            type="Button"
            size="small"
          >
            Editar
          </Button>
        </Link>

        <Button
          variant="contained"
          type="button"
          onClick={() => handleSubmit(handleSubmit(products._id))}
          size="small"
          color="error"
        >
          Eliminar
        </Button>
      </div>
    </ul>
  ));
}

export default AdminItemList;
