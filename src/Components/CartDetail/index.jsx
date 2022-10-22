import { useContext } from "react";
import { NewCartContext } from "../../Context/NewCartContext";
import styles from "./cartDetail.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ApiServices from "../../Services/ApiServices";
import CartDetailItem from "../CartDetailItem";
import { NotificationContext } from "../../Context/NotificationContext.jsx";

const CartDetail = () => {
  const { cart, removeFromCart, totalPrice, clearCart } =
    useContext(NewCartContext);
  const { getError, getSuccess } = useContext(NotificationContext);

  const handleBuyProduct = async (clientId) => {
    try {
      await ApiServices.buyProduct(clientId)
        .then((value) => clearCart(value.data.cart.client))
        .then(() => {
          getSuccess("Your order is in process");
        })
        .catch((error) => {
          getError("Error accure in your order", error);
        });
    } catch (error) {
      getError("Error accure in your order");
      console.log(error);
    }
  };

  console.log(cart);

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
            <p>$ {totalPrice || 0}</p>

            {cart.products?.length === 0 || !cart.products ? (
              <Button variant="contained" disabled>
                Buy
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => handleBuyProduct(cart.client)}
              >
                Buy
              </Button>
            )}
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button variant="contained">Continue shopping</Button>
            </Link>
            {
              <Button
                variant="contained"
                onClick={() => clearCart(cart.user._id)}
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
