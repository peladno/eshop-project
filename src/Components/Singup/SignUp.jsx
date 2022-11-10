import { useContext } from "react";
import Button from "@mui/material/Button";
import styles from "./signup.module.css";
import { Form, Formik, Field } from "formik";
import validator from "validator";
import ApiServices from "../../Services/ApiServices";
import { NotificationContext } from "../../Context/NotificationContext.jsx";

function SignUp() {
  const { getError, getSuccess } = useContext(NotificationContext);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await ApiServices.signup(values).then(() => {
        getSuccess("Signup succesfully");
      });
      resetForm({ values: "" });
    } catch (error) {
      error.response.status === 409
        ? getError("User already exist")
        : getError("Error signing up");
    }
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.username = "User is required";
    }

    if (!values.username) {
      errors.username = "User is required";
    } else if (values.username.length > 15) {
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

    if (!values.phone) {
      errors.phone = "Phone Number is required";
    } else if (
      !validator.isMobilePhone(values.phone, "es-CL", { strictMode: true })
    ) {
      errors.phone = "Invalid Phone Number - +56XXXXXXXX";
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
          name: "",
          username: "",
          password: "",
          email: "",
          photo: "",
          phone: "",
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
                type="text"
                name="name"
                maxLength={20}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label className={styles.userLabel}>Name</label>

              {formik.touched.name && formik.errors.name ? (
                <p>{formik.errors.name}</p>
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
                name="phone"
                maxLength={15}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
              <label className={styles.userLabel}>Mobile phone</label>

              {formik.touched.phone && formik.errors.phone ? (
                <p>{formik.errors.phone}</p>
              ) : null}
            </div>

            <div className={styles.inputGroup}>
              <Field
                className={styles.input}
                type="text"
                name="photo"
                maxLength={100}
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
