import React from "react";
import ItemAdmin from "../ItemAdmin/ItemAdmin";

function AdminItemList({ products }) {
  return products.map((products) => (
    <ItemAdmin
      id={products._id}
      key={products._id}
      photo={products.photo}
      name={products.name}
      price={products.price}
      description={products.description}
      stock={products.stock}
    />
  ));
}

export default AdminItemList;
