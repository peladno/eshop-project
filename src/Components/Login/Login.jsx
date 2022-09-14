import React, { useContext } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./login.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const body = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://ecommerce-javierp.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const { token } = await response.json();

      localStorage.setItem("token", token);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <h1 className={styles.titleForm}>Login</h1>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Username</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Password</label>
        </div>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Login;
