import React from "react";
import Button from "@mui/material/Button";
import styles from "./signup.module.css";
import { Form, Formik, Field } from "formik";
import validator from "validator";

function SignUp() {
  //TODO cambiar apiservices

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.log("error");
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "User is required";
    } else if (values.username.length < 15) {
      errors.username = "Must be 15 characters or less";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!validator.isStrongPassword(values.password)) {
      errors.password =
        "Password must contain one Capital letter, Small Letter, Number & Special symbol";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }

    if (!values.phoneNo) {
      errors.phoneNo = "Phone Number is required";
    } else if (
      !validator.isMobilePhone(values.phoneNo, "es-CL", { strictMode: true })
    ) {
      errors.phoneNo = "Invalid Phone Number - +56XXXXXXXX";
    }

    if (!values.address) {
      errors.address = "Address is required";
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
          username: "",
          password: "",
          email: "",
          phoneNo: "",
          address: "",
          confirmPassword: "",
        }}
      >
        {(formik) => (
          <Form className={styles.adminForm}>
            <h1 className={styles.titleForm}>Signup</h1>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="username"
                maxLength={20}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              <label className={styles.userLabel}>Username</label>

              {formik.touched.username && formik.errors.username ? (
                <p>{formik.errors.username}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="email"
                name="email"
                maxLength={50}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label className={styles.userLabel}>Email</label>

              {formik.touched.email && formik.errors.email ? (
                <p>{formik.errors.email}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="phoneNo"
                maxLength={15}
                onChange={formik.handleChange}
                value={formik.values.phoneNo}
              />
              <label className={styles.userLabel}>Mobile phone</label>

              {formik.touched.phoneNo && formik.errors.phoneNo ? (
                <p>{formik.errors.phoneNo}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="photo"
                maxLength={15}
                onChange={formik.handleChange}
                value={formik.values.photo}
              />
              <label className={styles.userLabel}>URL photo</label>

              {formik.touched.photo && formik.errors.photo ? (
                <p>{formik.errors.photo}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="address"
                maxLength={25}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
              <label className={styles.userLabel}>Address</label>

              {formik.touched.address && formik.errors.address ? (
                <p>{formik.errors.address}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="password"
                name="password"
                maxLength={20}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <label className={styles.userLabel}>Password</label>
              {formik.touched.password && formik.errors.password ? (
                <p>{formik.errors.password}</p>
              ) : null}
            </div>
            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="password"
                name="confirmPassword"
                maxLength={20}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <label className={styles.userLabel}>Confirm password</label>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <p>{formik.errors.confirmPassword}</p>
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

export default SignUp;
