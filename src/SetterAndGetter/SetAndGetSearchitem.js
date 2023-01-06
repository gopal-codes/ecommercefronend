import { useState, useEffect } from "react";
import axios from "axios";

const FetchingData = () => {
  const [product, setproduct] = useState([]);
  const [product1, setproduct1] = useState([]);
  const [loading, setloading] = useState(true);
  const [loading1, setloading1] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
        )
        .then((res) => {
          setproduct(res.data);
          setloading(false);
        });

      await axios
        .get("https://fakestoreapi.com/products?limit=30")
        .then((res) => {
          setproduct1(res.data);
          setloading1(false);
        });
    }

    fetchData();
  }, []);

  const LoadingState = loading || loading1;
  const Allitem = [...product, ...product1];

  return { Allitem, LoadingState };
};

export { FetchingData };
