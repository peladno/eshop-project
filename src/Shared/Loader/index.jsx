import { Waveform } from "@uiball/loaders";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles.loadingContainer}>
      <Waveform
        className={styles.loading}
        size={80}
        lineWeight={3.5}
        speed={1}
        color="black"
      />
    </div>
  );
}

export default Loader;
