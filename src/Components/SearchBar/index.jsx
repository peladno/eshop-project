import styles from "./searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";

function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = (values, { resetForm }) => {
    const keyword = values.keyword.trim();
    if (keyword) {
      navigate(`/search/products/${keyword}`);
    } else {
      navigate("/");
    }
    resetForm({ values: "" });
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.formContainer}>
        <Formik initialValues={{ keyword: "" }} onSubmit={handleSearch}>
          {(formik) => (
            <Form>
              <Field
                type="text"
                name="keyword"
                placeholder="Enter product name..."
                onChange={formik.handleChange}
              />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SearchBar;
