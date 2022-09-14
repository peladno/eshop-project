import React from "react";
import { Waveform } from "@uiball/loaders";
import styles from "./itemEditDetail.module.css";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import { APIContext } from "../../Context/ApiContext";

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
      await fetch(`http://localhost:8080/api/products/${item._id}`, {
        method: "PUT",
        headers: { admin: "true", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <h1>Edite Su producto</h1>
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
              />
            </li>
            <li>
              Codigo producto: {item.code}{" "}
              <input
                type="text"
                name="code"
                value={code}
                onChange={(e) => {
                  setCode(e.currentTarget.value);
                }}
                maxLength={100}
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
              />
            </li>
            <Button variant="contained" type="submit" size="small">
              Guardar
            </Button>
          </ul>
        </form>
      )}
    </>
  );
}

export default ItemEditDetail;
