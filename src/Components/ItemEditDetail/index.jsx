import { Waveform } from "@uiball/loaders";
import styles from "./itemEditDetail.module.css";
import { useState } from "react";
import { Button } from "@mui/material";
import ApiServices from "../../Services/ApiServices";
import { NotificationContext } from "../../Context/NotificationContext";
import { useContext } from "react";

function ItemEditDetail({ item, loading }) {
  const { getError, getSuccess } = useContext(NotificationContext);
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
      await ApiServices.updateProducts(item._id, body)
        .then(() => {
          getSuccess("Your item was updated");
        })
        .catch((error) => {
          getError("Error updateing your product", error);
        });
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.titleForm}>Your product</h1>

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
        <ul className={styles.item}>
          <li>ID: {item._id}</li>
          <li>Name: {item.name}</li>
          <li>Price: {item.price}</li>
          <li>Description: {item.description}</li>
          <li>Code: {item.code}</li>
          <li>Stock: {item.stock}</li>
          <li>
            <img src={item.photo} alt={item.name} />
          </li>
        </ul>
      )}

      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <h2>Edit your product</h2>
        <p>Please fill all the form before submit.</p>

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
            maxLength="100"
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
            maxLength="100"
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
            maxLength="100"
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
            maxLength="100"
          />
          <label className={styles.userLabel}>Photo</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            name="code"
            value={code}
            onChange={(e) => {
              setCode(e.currentTarget.value);
            }}
            required
            maxLength="100"
            min="1"
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
            maxLength="100"
            min="1"
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

export default ItemEditDetail;
