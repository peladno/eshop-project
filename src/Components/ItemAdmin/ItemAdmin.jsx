import { Button } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../Context/ProductsContext";
import styles from "./itemAdmin.module.css";
import ApiServices from "../../Services/ApiServices";
import { NotificationContext } from "../../Context/NotificationContext.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

function ItemAdmin({ id, name, price, description, photo, stock }) {
  const { item, setItem } = useContext(ProductsContext);
  const { getError, getSuccess } = useContext(NotificationContext);

  const handleSubmit = async (id) => {
    try {
      await ApiServices.deleteProduct(id)
        .then(() => {
          getSuccess("Your product was deleted");
        })
        .catch((error) => {
          getError("Error deleting product", error);
        });
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
    <Card className={styles.adminItem} key={id}>
      <CardContent>
        <ul className={styles.itemList}>
          <li>Name: {name}</li>
          <li>Price: {price}</li>
          <li>
            <img src={photo} alt={name} />
          </li>
          <li>Stock: {stock}</li>
        </ul>
      </CardContent>
      <CardActions className={styles.buttonBox}>
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
      </CardActions>
    </Card>
  );
}

export default ItemAdmin;
