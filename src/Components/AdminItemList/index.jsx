import React from "react";
import styles from "./adminItems.module.css"

function AdminItemList({ products }) {
  return products.map((products) => (
    <ul className={styles.itemList} key={products._id}>
      <li>{products.name}</li>
      <li>{products.price}</li>
      <li>{products.description}</li>
      <li><img src={products.photo} alt={products.name}/></li>
      <li>{products.stock}</li>
    </ul>
  ));
}

export default AdminItemList;
