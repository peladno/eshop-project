import React, { useState } from 'react'
import Button from "@mui/material/Button"
import styles from "./itemCount.module.css"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//componente de boton contador

function ItemCount({stock, initial, addCart}) {
  const [ count, setCount] = useState(initial)

  function incrementCount() {
    if (count < stock)
    setCount(currentCount => currentCount + 1);
  }

  function decrementCount() {
    if (count > 1)
    setCount(currentCount => currentCount - 1);
  }


  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonContainerCount} >
          <Button variant="contained" size="small" onClick={decrementCount}><RemoveIcon/></Button>
          <p className={styles.count}>{count}</p>
          <Button variant="contained" size="small" onClick={incrementCount}><AddIcon/></Button>
        </div>
        <Button className={styles.addCart} variant="contained" onClick={() => addCart(count)}>Agregar al carrito</Button>
      </div>
    </>
  )
}

export default ItemCount

