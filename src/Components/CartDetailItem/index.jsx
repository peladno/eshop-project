import { useContext } from "react";
import styles from "./cartDetailItem.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { NotificationContext } from "../../Context/NotificationContext.jsx";
import { USERContext } from "../../Context/UserContext";

function CartDetailItem({ products, removeFromCart }) {
  const { getError, getSuccess } = useContext(NotificationContext);
  const user = useContext(USERContext);

  const handleRemoveProduct = async (idUser, idItem, itemName) => {
    try {
      await removeFromCart(idUser, idItem)
        .then(() => {
          getSuccess(`${itemName} was deleted from the cart`);
        })
        .catch((error) => {
          getError("Error deleting product from cart", error);
        });
    } catch (error) {
      getError("Error deleting product from cart", error);
      console.log(error);
    }
  };

  return products.map((item) => (
    <div className={styles.cartItem} key={item._id}>
      <img src={item._id.photo} alt={item._id.name} />
      <h2>{item._id.name}</h2>
      <div className={styles.quantityItem}>
        <h3>Quantity</h3>
        <p>{item.count}</p>
      </div>
      <div className={styles.priceItem}>
        <h3>Price</h3>
        <p>${item._id.price * item.count}</p>
      </div>
      <IconButton
        onClick={() => handleRemoveProduct(user.user._id, item._id._id, item._id.name)}
      >
        <DeleteForeverIcon className={styles.delete} style={{ color: "red" }} />
      </IconButton>
    </div>
  ));
}

export default CartDetailItem;
