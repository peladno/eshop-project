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
      <SearchBar />

      <h1 className={styles.itemListTitle}>Nuestros productos</h1>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.items}>
          <Categories setCategoryFunction={setCategoryFunction} />
          <ItemList products={item} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;
