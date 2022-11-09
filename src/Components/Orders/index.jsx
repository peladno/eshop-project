import { useEffect, useState, useContext } from "react";
import ApiServices from "../../Services/ApiServices";
import { USERContext } from "../../Context/UserContext";
import OrdersList from "../OrdersList";
import Loader from "../../Shared/Loader";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(USERContext);

  useEffect(() => {
    setLoading(true);
    const getOrders = async () => {
      try {
        const response = await ApiServices.allOrders(user._id);
        const data = await response.data;
        setOrders(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    getOrders();
  }, [user._id]);

  return (
    <>
      {loading ? <Loader /> : orders.map((item) => <OrdersList item={item} />)}
    </>
  );
}

export default Orders;
