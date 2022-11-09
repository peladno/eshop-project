import { useContext, useEffect } from "react";
import ItemList from "../ItemList/index.jsx";
import styles from "./itemListContainer.module.css";
import { Waveform } from "@uiball/loaders";
import { APIContext } from "../../Context/ApiContext.jsx";
import SearchBar from "../SearchBar/index.jsx";
import ApiServices from "../../Services/ApiServices";
import { useParams } from "react-router-dom";
import Loader from "../../Shared/Loader/index.jsx";

const ItemListContainer = () => {
  const { loading, item, setItem, setLoading } = useContext(APIContext);

  const { keyword } = useParams();

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      try {
        const response = await ApiServices.getAllProducts(
          !keyword ? "" : keyword
        );
        const data = await response.data;
        setItem(data);
        setLoading(false);
      } catch (error) {
        throw new Error(`Error fetching data ${error}`);
      }
    };
    getProducts();
  }, [keyword, setItem, setLoading]);

  return (
    <div className={styles.itemListContainer}>
      <SearchBar />

      <h1 className={styles.itemListTitle}>Nuestros productos</h1>
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
