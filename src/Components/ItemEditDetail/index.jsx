import { Waveform } from "@uiball/loaders";
import styles from "./itemEditDetail.module.css";
import { Button } from "@mui/material";
import ApiServices from "../../Services/ApiServices";
import { NotificationContext } from "../../Context/NotificationContext";
import { useContext } from "react";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import Loader from "../../Shared/Loader";

function ItemEditDetail({ item, loading }) {
  const { getError, getSuccess } = useContext(NotificationContext);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await ApiServices.updateProducts(item._id, values)
        .then(() => {
          getSuccess("Your item was updated");
          resetForm({ values: "" });
        })
        .catch((error) => {
          getError("Error updating your product", error);
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!values.description) {
      errors.description = "Description is required";
    } else if (values.description.length < 10) {
      errors.description = "Must be 10 characters or more";
    }

    if (!values.price) {
      errors.price = "Price is required";
    } else if (!validator.isNumeric(values.price)) {
      errors.price = "Invalid character, should be a number";
    }

    if (!values.code) {
      errors.code = "Code is required";
    } else if (!validator.isNumeric(values.code)) {
      errors.code = "Invalid character, should be a number";
    }

    if (!values.stock) {
      errors.stock = "Stock is required";
    } else if (!validator.isNumeric(values.stock)) {
      errors.stock = "Invalid character, should be a number";
    }

    if (!values.photo) {
      errors.photo = "Photo url is required";
    } else if (!validator.isURL(values.photo, { require_protocol: true })) {
      errors.code = "Invalid character";
    }

    return errors;
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.titleForm}>Your product</h1>

      {loading ? (
        <Loader />
      ) : (
        <ul className={styles.item}>
          <li>ID: {item._id}</li>
          <li>Name: {item.name}</li>
          <li>Price: {item.price}</li>
          <li>Description: {item.description}</li>
          <li>Category: {item.category || "No category"} </li>
          <li>Code: {item.code}</li>
          <li>Stock: {item.stock}</li>
          <li>
            <img src={item.photo} alt={item.name} />
          </li>
        </ul>
      )}
      <Formik
        validate={validateForm}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          price: "",
          description: "",
          category: "",
          photo: "",
          code: "",
          stock: "",
        }}
      >
        {(formik) => (
          <Form className={styles.adminForm}>
            <h1>Edit your product</h1>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                maxLength={100}
              />
              <label className={styles.userLabel}>Name</label>
              {formik.touched.name && formik.errors.name ? (
                <p>{formik.errors.name}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                maxLength={100}
              />
              <label className={styles.userLabel}>Price</label>
              {formik.touched.price && formik.errors.price ? (
                <p>{formik.errors.price}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.categoryLabel}>Category:</label>
              <Field
                className={styles.input}
                as="select"
                name="category"
                value={formik.values.category}
              >
                <option value="Electronics">Electronics</option>
                <option value="Cameras">Cameras</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
                <option value="Headphones">Headphones</option>
                <option value="Food">Food</option>
                <option value="Books">Books</option>
                <option value="Clothes/Shoes">Clothes/Shoes</option>
                <option value="Beauty/Health">Beauty/Health</option>
                <option value="Sports">Sports</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Home">Home</option>
              </Field>
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                maxLength={100}
              />
              <label className={styles.userLabel}>description</label>
              {formik.touched.description && formik.errors.description ? (
                <p>{formik.errors.description}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="photo"
                value={formik.values.photo}
                onChange={formik.handleChange}
              />
              <label className={styles.userLabel}>Photo</label>
              {formik.touched.photo && formik.errors.photo ? (
                <p>{formik.errors.photo}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                maxLength={100}
                min={1}
              />
              <label className={styles.userLabel}>Code</label>
              {formik.touched.code && formik.errors.code ? (
                <p>{formik.errors.code}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                maxLength={100}
                min={1}
              />
              <label className={styles.userLabel}>Stock</label>
              {formik.touched.stock && formik.errors.stock ? (
                <p>{formik.errors.stock}</p>
              ) : null}
            </div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ItemEditDetail;
