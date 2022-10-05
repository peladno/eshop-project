import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { APIContext } from "../../Context/ApiContext";
import styles from "./itemAdmin.module.css";
import ApiServices from "../../Services/ApiServices";

function ItemAdmin({ id, name, price, description, photo, stock }) {
  const { item, setItem } = useContext(APIContext);

  const handleSubmit = async (id) => {
    try {
      await ApiServices.deleteProduct(id);
      setItem(
        item.filter((items) => {
          return items._id !== id;
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div key={id}>
      <ul className={styles.itemList}>
        <li>Name: {name}</li>
        <li>Price: {price}</li>
        <li>Description: {description}</li>
        <li>
          <img src={photo} alt={name} />
        </li>
        <li>Stock: {stock}</li>
        <div className={styles.buttonBox}>
          <Link style={{ textDecoration: "none" }} to={`/itemEdit/${id}`}>
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
            onClick={() => handleSubmit(id)}
            size="small"
            color="error"
          >
            Eliminar
          </Button>
        </div>
      </ul>
    </div>
  );
}

export default ItemAdmin;
