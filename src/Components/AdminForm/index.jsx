import React, { useContext } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./adminForm.module.css";
import { APIContext } from "../../Context/ApiContext";

function AdminForm() {
  const { setItem } = useContext(APIContext);
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
      await fetch("https://ecommerce-javierp.herokuapp.com/api/products", {
        method: "POST",
        headers: { admin: "true", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      .then(response => response.json())
      .then(data => setItem((prev) => [...prev, data]))
      
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <h1 className={styles.titleForm}>Add products</h1>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Name</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            name="price"
            value={price}
            onChange={(e) => {
              setPrice(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Price</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>description</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="photo"
            value={photo}
            onChange={(e) => {
              setPhoto(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Photo</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="code"
            value={code}
            onChange={(e) => {
              setCode(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Code</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            name="stock"
            value={stock}
            onChange={(e) => {
              setStock(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Stock</label>
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AdminForm;
