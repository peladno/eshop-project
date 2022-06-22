import React from 'react'
import Item from '../Item/index.jsx';


//mapeo de productos
function ItemList({products}) {
  return (
      products.map ((products) => (
      <Item
      id={products.id}
      key={products.id}
      image_url={products.image_url}
      name={products.name}
      price={products.price}
      description={products.description}/>
    ))
  )
}

export default ItemList