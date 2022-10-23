import React, { useState, useContext } from "react";
import ItemCount from "../ItemCount.jsx";
import Button from "@mui/material/Button";
import styles from "./itemDetail.module.css";
import { Link } from "react-router-dom";
import { Waveform } from "@uiball/loaders";
import ApiServices from "../../Services/ApiServices";
import { USERContext } from "../../Context/UserContext.jsx";
import { NewCartContext } from "../../Context/NewCartContext.jsx";
import { NotificationContext } from "../../Context/NotificationContext.jsx";

/*Componente de detalle de productos */
const ItemDetail = ({ item, loading }) => {
  const [number, setNumber] = useState(0);
  const data = useContext(USERContext);
  const { setCart } = useContext(NewCartContext);
  const { getError, getSuccess } = useContext(NotificationContext);

  const addCart = (count) => {
    setNumber(count);
    handleSubmit(count);
  };

  const handleSubmit = async (count) => {
    try {
      const response = await ApiServices.addToCart(data.user._id, {
        ...item,
        count,
      });
      const cartData = await response.data;
      
      cartData
        ? getSuccess("Product Added to Cart")
        : getError("Error adding to cart");
    } catch (error) {
      console.log(error);
    }
  };

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
              <li>Price: ${item.price}</li>
              <li> {item.description}</li>
              <li>Stock: {item.stock}</li>
            </ul>

            <div className={styles.shoppingButtons}>
              <ItemCount stock={item.stock} initial={1} addCart={addCart} />
              <Link
                className={styles.continue}
                to={"/"}
                style={{ textDecoration: "none" }}
              >
                <Button className={styles.continueButton} variant="contained">
                  Continue shopping
                </Button>
              </Link>
              {number > 0 ? (
                <Link to={"/cart"} style={{ textDecoration: "none" }}>
                  <Button variant="contained">
                    To the cart
                  </Button>
                </Link>
              ) : (
                <Button variant="contained" disabled>
                  To the cart
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetail;
