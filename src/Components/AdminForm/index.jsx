import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./adminForm.module.css";

function AdminForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [code, setCode] = useState("");
  const [stock, setStock] = useState("");

  const body = {
    name: name,
    price: price,
    description: description,
    imageURL: imageURL,
    code: code,
    stock: stock,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://apicart.herokuapp.com/api/products", {
        method: "POST",
        headers: { admin: "true", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
            name="imageURL"
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Image URL</label>
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
