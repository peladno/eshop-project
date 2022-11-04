import { useState } from "react";
import styles from "./searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/products/${keyword}`);
    } else {
      navigate("/");
    }
  };
  //TODO usar formik
  return (
    <div className={styles.searchBar}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter product name..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
