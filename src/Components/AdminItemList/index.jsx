import React from "react";

function AdminItemList({ products }) {
  return products.map((products) => (
    <ul>
      <li>{products.name}</li>
      <li>{products.price}</li>
      <li>{products.description}</li>
      <li><img src={products.photo} alt={products.name}/></li>
      <li>{products.stock}</li>
    </ul>
  ));
}

export default AdminItemList;
