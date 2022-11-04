import React from "react";
import Button from "@mui/material/Button";
import styles from "./login.module.css";
import ApiServices from "../../Services/ApiServices";
import { Form, Formik, Field } from "formik";


//TODO falta mensaje de usuario no existe
function Login() {
  const handleSubmit = async (values) => {
    try {
      let response = await ApiServices.loginUser(values);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const { token, user } = response.data;
      console.log(user);

      if (token !== null) {
        localStorage.setItem("token", token);
        window.location.reload();
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "User is required";
    } else if (values.username.length > 15) {
      errors.username = "Must be 15 characters or less";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        validate={validateForm}
        onSubmit={handleSubmit}
        initialValues={{ username: "", password: "" }}
      >
        {(formik) => (
          <Form className={styles.adminForm}>
            <h1 className={styles.titleForm}>Login</h1>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="username"
                maxLength={20}
              />
              <label className={styles.userLabel}>Username</label>

              {formik.touched.username && formik.errors.username ? (
                <p>{formik.errors.username}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="password"
                name="password"
                maxLength={20}
              />
              <label className={styles.userLabel}>Password</label>
              {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
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

export default Login;
