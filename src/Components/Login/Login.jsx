import { useContext } from "react";
import Button from "@mui/material/Button";
import styles from "./login.module.css";
import ApiServices from "../../Services/ApiServices";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../Context/NotificationContext.jsx";


function Login() {
  const navigate = useNavigate();
  const { getError, getSuccess } = useContext(NotificationContext);

  const handleSubmit = async (values) => {
    try {
      const response = await ApiServices.loginUser(values);

      const { token, user } = response.data;

      if (token !== null) {
        getSuccess("Login succesfully");
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role)
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      error.response.status === 401
        ? getError("Username or password incorrect")
        : getError("Oops something happened", error);
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
