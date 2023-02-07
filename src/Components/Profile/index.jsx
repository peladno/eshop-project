import { useContext } from "react";
import { USERContext } from "../../Context/UserContext";
import Loader from "../../Shared/Loader";
import styles from "./profile.module.css";

function Profile() {
  const user = useContext(USERContext);

  //TODO usar redux
  
  return (
    <div className={styles.profileContainer}>
      {user === null ? <Loader/>: <div className={styles.profile}>
        <h1 className={styles.profileTitle} >Your Profile</h1>
        <ul>
          <img
            className={styles.photoProfile}
            src={user.photo}
            alt="userPhoto"
          />
          <li>Username: {user.user.username}</li>
          <li>Name: {user.user.name}</li>
          <li>Email: {user.user.email}</li>
          <li>Phone: {user.user.phone}</li>
          <li>Address: {user.user.address}</li>
        </ul>
      </div>}
    </div>
  );
}

export default Profile;
