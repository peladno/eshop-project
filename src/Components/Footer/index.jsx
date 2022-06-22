import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from './footer.module.css'
import CottageIcon from '@mui/icons-material/Cottage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className = {styles.footer}>
      <ul className = {styles.links}>
        <Link to={"/"} style={{textDecoration:"none"}} ><li><CottageIcon />Home</li></Link>
        <Link to={"/cart"} style={{textDecoration:"none"}} ><li><ShoppingCartIcon />Carrito</li></Link>
      </ul>
      <div className = {styles.icons}>
        <a href='https://github.com/peladno'><GitHubIcon className= {styles.github} fontSize='large' /></a>
        <a href='https://www.linkedin.com/in/javier-perez-u/'><LinkedInIcon className= {styles.linkedin} fontSize='large' /></a>
      </div>
    </div>
  )
}

export default Footer;