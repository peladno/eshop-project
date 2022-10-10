import { useContext } from "react";
import { NewCartContext } from "../../Context/NewCartContext";
import styles from "./cartDetail.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import CartDetailItem from "../CartDetailItem";

//TODO buy products

const CartDetail = () => {
  const { cart, removeFromCart, totalPrice, clearCart } =
    useContext(NewCartContext);

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.cartList}>
          <h1 className={styles.cartTitle}>Your products</h1>

          {cart.products?.length > 0 ? (
            <CartDetailItem
              products={cart.products}
              removeFromCart={removeFromCart}
            />
          ) : (
            <p className={styles.cartNotification}>No products in your cart</p>
          )}

          <div className={styles.cartTotalSection}>
            <h3>SubTotal</h3>
            <p>$ {totalPrice}</p>

            {cart.products?.length === 0 || !cart.products ? (
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
