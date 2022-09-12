import React from 'react'
import Item from '../Item/index.jsx';


//mapeo de productos
function ItemList({products}) {
  return (
      products.map ((products) => (
      <Item
      id={products._id}
      key={products._id}
      photo={products.photo}
      name={products.name}
      price={products.price}
      description={products.description}/>
    ))
  )
}

export default ItemList