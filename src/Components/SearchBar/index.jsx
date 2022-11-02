import { useContext } from "react";
import styles from "./searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { APIContext } from "../../Context/ApiContext";
import { useRef } from "react";

function SearchBar() {
  const { setKeyword } = useContext(APIContext);
  const inputRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const search = inputRef.current.value.trim();
    setKeyword(search);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Enter product name..." ref={inputRef} />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </div>
    </form>
  );
}

export default SearchBar;
