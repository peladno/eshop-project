import { useEffect, useState, useContext } from "react";
import ApiServices from "../../Services/ApiServices";
import { USERContext } from "../../Context/UserContext";
import OrdersList from "../OrdersList";
import Loader from "../../Shared/Loader";
import styles from "./orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useContext(USERContext);

  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      try {
        const response = await ApiServices.allOrders(user?.user._id);
        const data = await response.data;
        setOrders(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    user != null && getOrders();
  }, [user?.user._id, user]);

  return (
    <div className={styles.orderContainer}>
      {loading ? (
        <Loader />
      ) : (
        orders.map((item, index) => <OrdersList key={index} item={item} />)
      )}
    </div>
  );
}

export default Orders;
