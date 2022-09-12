import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./signup.module.css";
import { APIContext } from "../../Context/ApiContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const body = {
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      let data = await response.json()

    } catch (error) {
      throw new Error(error);
    }
  };

  

  return (
    <div className={styles.formContainer}>
      <form className={styles.adminForm} onSubmit={handleSubmit}>
        <h1 className={styles.titleForm}>SignUp</h1>
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

export default Signup;
