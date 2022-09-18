import React from "react";
import { Waveform } from "@uiball/loaders";
import styles from "./itemEditDetail.module.css";
import { useState } from "react";
import { Button } from "@mui/material";
import ApiServices from "../../Services/ApiServices";

function ItemEditDetail({ item, loading }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [code, setCode] = useState("");
  const [stock, setStock] = useState("");

  const body = {
    name: name,
    price: price,
    description: description,
    photo: photo,
    code: code,
    stock: stock,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await ApiServices.updateProducts(item._id, body)
     console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(URL);
  return (
    <>
      <h1>Edite Su producto</h1>
      <p>
        Porfavor tiene que llenar todos los campos antes de anviar la
        actualizacion
      </p>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Waveform
            className={styles.loading}
            size={80}
            lineWeight={3.5}
            speed={1}
            color="black"
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul>
            <li>ID: {item._id}</li>
            <li>
              Nombre: {item.name}{" "}
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
            <li>
              Precio {item.price}{" "}
              <input
                className={styles.input}
                type="number"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
            <li>
              Descripcion: {item.description}{" "}
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
            <li>
              Photo Url: {item.photo}{" "}
              <input
                type="text"
                name="photo"
                value={photo}
                onChange={(e) => {
                  setPhoto(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
            <li>
              Codigo producto: {item.code}{" "}
              <input
                type="number"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
            <li>
              Stock: {item.stock}{" "}
              <input
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => {
                  setStock(e.currentTarget.value);
                }}
                maxLength={100}
                required
              />
            </li>
          </ul>
          <Button variant="contained" type="submit" size="small">
            Guardar
          </Button>
        </form>
      )}
    </>
  );
}

export default ItemEditDetail;
