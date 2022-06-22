import React from 'react'
import Button from './../Button/index.jsx'
import { Link } from 'react-router-dom'
import styles from "./error404.module.css"

function Error404() {
  return (
    <div className={styles.errorContainer}>
      <h1>404</h1>
      <p>Oops!!. Esta pagina no existe, por favor vuelve al inicio.</p>
      <Link to='/'><Button>Inicio</Button></Link>
    </div>
  )
}

export default Error404