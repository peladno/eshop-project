import React, { useState, useContext } from "react";
import ItemCount from "../ItemCount.jsx";
import Button from "@mui/material/Button";
import styles from "./itemDetail.module.css";
import { Link } from "react-router-dom";
import { Waveform } from "@uiball/loaders";
import ApiServices from "../../Services/ApiServices";
import { USERContext } from "../../Context/UserContext.jsx";

/*Componente de detalle de productos */
const ItemDetail = ({ item, loading }) => {
  const [number, setNumber] = useState(0);
  const { user } = useContext(USERContext);

  const addCart = (count) => {
    setNumber(count);
    handleSubmit(count);
  };

  const handleSubmit = async (count) => {
    try {
      const response = await ApiServices.addToCart(user._id, {
        ...item,
        count,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // TODO add post method (add to cart, including quantity). Delete cartcontext

  return (
    <>
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
        <div className={styles.itemDetailContainer} key={item._id}>
          <img className={styles.image} src={item.photo} alt={item.name} />
          <div className={styles.itemDescription}>
            <h1>{item.name}</h1>
            <ul>
              <li>Precio: ${item.price}</li>
              <li> {item.description}</li>
              <li>Stock: {item.stock}</li>
            </ul>

            <div className={styles.shoppingButtons}>
              {number > 0 ? (
                <Link to={"/cart"} style={{ textDecoration: "none" }}>
                  <Button className={styles.cartButton} variant="contained">
                    Ir al carrito
                  </Button>
                </Link>
              ) : (
                <ItemCount stock={item.stock} initial={1} addCart={addCart} />
              )}
              <Link
                className={styles.continue}
                to={"/"}
                style={{ textDecoration: "none" }}
              >
                <Button className={styles.continueButton} variant="contained">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetail;
