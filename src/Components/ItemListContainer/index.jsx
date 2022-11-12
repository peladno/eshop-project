import { useContext, useEffect, useState } from "react";
import ItemList from "../ItemList/index.jsx";
import styles from "./itemListContainer.module.css";
import { ProductsContext } from "../../Context/ProductsContext";
import SearchBar from "../SearchBar/index.jsx";
import ApiServices from "../../Services/ApiServices";
import { useParams } from "react-router-dom";
import Loader from "../../Shared/Loader/index.jsx";
import Categories from "../Categories/index.jsx";

const ItemListContainer = () => {
  const { loading, item, setItem, setLoading } = useContext(ProductsContext);
  const [category, setCategory] = useState("");

  const { keyword } = useParams();

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const response = !category
          ? await ApiServices.getAllProducts(!keyword ? "" : keyword)
          : await ApiServices.getAllProductsCategory(
              !keyword ? "" : keyword,
              category
            );
        const data = await response.data;
        setItem(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    getProducts();
  }, [keyword, setItem, setLoading, category]);
  const setCategoryFunction = (item) => {
    setCategory(item);
  };
  return (
    <div className={styles.itemListContainer}>
      <h1 className={styles.itemListTitle}>E-shop</h1>

      <SearchBar />
      <div className={styles.filterContainer}>
        <p>Filter by:</p>
        <Categories setCategoryFunction={setCategoryFunction} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.items}>
          <ItemList products={item} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
