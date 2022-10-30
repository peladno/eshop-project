import React, { useContext } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom"
import IconButton from '@mui/material/IconButton';
import {NewCartContext} from "../../Context/NewCartContext"


export default function CartWidget() {
  const { totalCart } = useContext(NewCartContext);

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
