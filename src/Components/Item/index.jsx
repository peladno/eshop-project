import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from "../Button/index";
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import styles  from "./item.module.css";

//tarjeta de cada item, se usó Material UI

function Item({id, image_url, name, price}) {
  return (
    <>
      <Card className={styles.cardItem} sx={{ maxWidth: 275 }} key={id}>
        <CardContent>
        <img className={styles.imageItem} src={image_url} alt={name}/>
          <Typography variant="h5" component="div">
            <p>{name}</p>
          </Typography>
          <Typography variant="body2">
            <p>${price}</p>
          </Typography>
        </CardContent>
        <CardActions>
          <Link style={{textDecoration:"none"}} to={`/item/${id}`}><Button>Ver producto</Button></Link>
        </CardActions>
      </Card>
    </>
  );
}

export default Item;