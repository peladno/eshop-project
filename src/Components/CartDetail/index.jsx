import { useContext, useEffect } from "react";
import { NewCartContext } from "../../Context/NewCartContext";
import styles from "./cartDetail.module.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ApiServices from "../../Services/ApiServices";
import CartDetailItem from "../CartDetailItem";
import { NotificationContext } from "../../Context/NotificationContext.jsx";
import { USERContext } from "../../Context/UserContext";

//TODO agregar redux

const CartDetail = () => {
  const { cart, setCart, removeFromCart, totalPrice, clearCart } =
    useContext(NewCartContext);
  const { getError, getSuccess } = useContext(NotificationContext);
  const user = useContext(USERContext);
  const tokenKey = localStorage.getItem("token");


  const handleBuyProduct = async (clientId) => {
    try {
      await ApiServices.buyProduct(clientId)
        .then((value) => clearCart(value.data.cart.user._id))
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

  useEffect(() => {
    const getCart = async () => {
      try {
        const response = await ApiServices.getCart(user.user._id);
        const dataCart = await response.data;
        setCart(dataCart);
      } catch (error) {
        throw new Error(`error fetching data ${error}`);
      }
    };
    if (tokenKey && user !== null) {
      getCart();
    }
  }, [tokenKey, user, setCart]);

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
                onClick={() => handleBuyProduct(cart.user._id)}
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
