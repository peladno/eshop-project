import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import styles from './signup.module.css'

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const body = {
    name: name,
    username: username,
    address: address,
    email: email,
    photo: photo,
    phone: phone,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return await response.json()
    } catch (error) {
      console.log("error");
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
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Email</label>
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
            maxLength={100}
          />
          <label className={styles.userLabel}>Photo</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="text"
            name="address"
            value={address}
            onChange={(e) => {
              setAddress(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Address</label>
        </div>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            type="number"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.currentTarget.value);
            }}
            required
            maxLength={100}
          />
          <label className={styles.userLabel}>Phone</label>
        </div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}


export default SignUp