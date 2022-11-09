import React from "react";

function OrdersList({ item }) {
  return (
    <div>
      <h2>Your order</h2>
      <ul>
        <li>Date of purchase: {item.timeStamp}</li>
        <li>Number od Order: {item._id}</li>
        <li>Total: {item.total}</li>
        {item.products.map((product) => (
          <ul key={product._id}>
            <h3>Your products:</h3>
            <li>
              name: {product._id.name} n° of items: {product.count}
            </li>
          </ul>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
