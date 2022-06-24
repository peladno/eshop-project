import React from "react";

function AdminItemList({ products }) {
  return products.map((products) => (
    <ul>
      <li>{products.name}</li>
      <li>{products.price}</li>
      <li>{products.description}</li>
      <li><img src={products.image_url} alt={products.name}/></li>
      <li>{products.stock}</li>
    </ul>
  ));
}

export default AdminItemList;
