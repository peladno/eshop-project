import React, { useContext } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom"
import { CartContext } from "../../Context/CartContext";
import IconButton from '@mui/material/IconButton';


export default function CartWidget() {
  //Se trae usContext con total del carrito
  const { totalCart } = useContext(CartContext);

  return (
    <>
      <Link to="../cart" style={{textDecoration:"none"}}>
        <IconButton>
          <ShoppingCartIcon />{totalCart > 0 ? totalCart : null}
        </IconButton>
      </Link>
    </>
  );
}
