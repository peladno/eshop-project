import React, { useState , useContext} from 'react';
import ItemCount from '../ItemCount.jsx';
import Button from '@mui/material/Button';
import styles from "./itemDetail.module.css";
import { CartContext } from "../../Context/CartContext.jsx";
import { Link } from "react-router-dom";
import { Waveform } from "@uiball/loaders"

/*Componente de detalle de productos */
const ItemDetail = ({item, loading}) => {

  const [number, setNumber] = useState(0);

  const { addToCart } = useContext(CartContext);

  const addCart = (count) => {
    setNumber(count);
    addToCart({...item, count});
  }


  return (
    <>
      {!loading ?
        <div className={styles.loadingContainer}>
          <Waveform className={styles.loading}
          size={80}
          lineWeight={3.5}
          speed={1} 
          color="black" /> 
        </div> :
          <div className={styles.itemDetailContainer} key={item.id}>
          <img className={styles.image} src= {item.image_url} alt ={item.name} />
          <div className={styles.itemDescription}>
            <h1>{item.name}</h1>
            <p>Precio: ${item.price}</p>
            <p>{item.description}</p>
            <p>Stock: {item.stock}</p>
            <div className={styles.shoppingButtons}>
              {number> 0 ?  <Link to={"/cart"} style={{textDecoration:"none"}}><Button className={styles.cartButton} variant="contained">Ir al carrito</Button></Link> : 
              <ItemCount stock = {item.stock} initial ={1} addCart={addCart} />}
              <Link className={styles.continue} to={"/"} style={{textDecoration:"none"}}><Button className={styles.continueButton} variant="contained">Seguir Comprando</Button></Link>
            </div>
          </div>
        </div>
      }
        
    </>
  )
}

export default ItemDetail;