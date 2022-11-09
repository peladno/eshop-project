import React, { useContext } from "react";
import Button from "@mui/material/Button";
import styles from "./adminItemForm.module.css";
import { ProductsContext } from "../../Context/ProductsContext";
import ApiServices from "../../Services/ApiServices";
import { NotificationContext } from "../../Context/NotificationContext.jsx";
import { Form, Formik, Field } from "formik";
import validator from "validator";

function AdminForm() {
  const { getError, getSuccess } = useContext(NotificationContext);
  const { setItem } = useContext(ProductsContext);

  const handleSubmit = async (values) => {
 
    try {
      await ApiServices.saveProduct(values)
        .then((response) => {
          const data = response.data;
          setItem((prev) => [...prev, data]);
          getSuccess("Your product was added");
        })
        .catch((error) => {
          getError("Error adding your product", error);
        });
    } catch (error) {
      console.log(error);
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
      errors.price = "Invalid character";
    }

    if (!values.code) {
      errors.code = "Code is required";
    } else if (!validator.isNumeric(values.code)) {
      errors.code = "Invalid character";
    }

    if (!values.stock) {
      errors.stock = "Stock is required";
    } else if (!validator.isNumeric(values.stock)) {
      errors.stock = "Invalid character";
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
      <Formik
        validate={validateForm}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          price: "",
          description: "",
          category: "Electronics",
          photo: "",
          code: "",
          stock: "",
        }}
      >
        {(formik) => (
          <Form className={styles.adminForm}>
            <h1 className={styles.titleForm}>Add products</h1>
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
              <label className={styles.categoryLabel}>
                Category:
              </label>
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
                maxLength={15}
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
                maxLength={100}
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

export default AdminForm;
