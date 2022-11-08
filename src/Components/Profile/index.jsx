import { useContext } from "react";
import { USERContext } from "../../Context/UserContext";
import styles from "./profile.module.css";

function Profile() {
  const { user } = useContext(USERContext);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profile}>
        <h1 className={styles.profileTitle} >Your Profile</h1>
        <ul>
          <img
            className={styles.photoProfile}
            src={user.photo}
            alt="userPhoto"
          />
          <li>Username: {user.username}</li>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Phone: {user.phone}</li>
          <li>Address: {user.address}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
