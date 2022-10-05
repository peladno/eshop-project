import React, { useContext } from "react";
import { NewCartContext } from "../../Context/NewCartContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styles from "./cartDetail.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { USERContext } from "../../Context/UserContext";

//TODO buy products

const CartDetail = () => {
  const { cart, removeFromCart, totalPrice, clearCart } =
    useContext(NewCartContext);
  const data = useContext(USERContext);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.cartList}>
          <h1 className={styles.cartTitle}>Your products</h1>
          {/*Mapeo de productos en carrito*/}
          {cart.products?.length > 0 ? (
            cart.products?.map((item) => (
              <div className={styles.cartItem} key={item._id}>
                <img src={item.photo} alt={item.name} />
                <h2>{item.name}</h2>
                <div className={styles.quantityItem}>
                  <h3>Quantity</h3>
                  <p>{item.count}</p>
                </div>
                <div className={styles.priceItem}>
                  <h3>Price</h3>
                  <p>${item.price * item.count}</p>
                </div>
                <IconButton
                  onClick={() => removeFromCart(data.user._id, item.id)}
                >
                  <DeleteForeverIcon
                    className={styles.delete}
                    style={{ color: "red" }}
                  />
                </IconButton>
              </div>
            ))
          ) : (
            <p className={styles.cartNotification}>No products in your cart</p>
          )}
          <div className={styles.cartTotalSection}>
            <h3>SubTotal</h3>
            <p>$ {totalPrice}</p>

            {/*Si el carrito esta vacio el boton no se puede utilizar*/}
            {cart.products?.length === 0 ? (
              <Button variant="contained" disabled>
                Buy
              </Button>
            ) : (
              <Link to={"/checkOut"} style={{ textDecoration: "none" }}>
                <Button variant="contained">Buy</Button>
              </Link>
            )}
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button variant="contained">Continue shopping</Button>
            </Link>
            {
              <Button
                variant="contained"
                onClick={() => clearCart(cart.client)}
              >
                Clear cart
              </Button>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
