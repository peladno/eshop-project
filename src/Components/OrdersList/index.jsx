import styles from "./ordersList.module.css";

function OrdersList({ item }) {
  return (
    <div className={styles.orderListContainer}>
      <h2>Order number</h2>
      <ul className={styles.orderDetail}>
        <li>Date of purchase: {item.timeStamp}</li>
        <li>Number od Order: {item._id}</li>
        <li>Total: {item.total}</li>
        <ul>
          <h3>Your products:</h3>
          {item.products.map((product) => (
            <li key={product._id}>
              name: {product._id.name} - N° of items: {product.count}
            </li>
          ))}
        </ul>
      </ul>
    </div> 
  );
}

export default OrdersList;
