import axios from "axios";
import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import Product from "./Product";
import Productskeleton from "./Productskeleton";

const Container = Styled.div`
   display:flex;
   padding:20px;
   flex-wrap:wrap;
   justify-content:space-between;
`;

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState("");

  useEffect(() => {
    // getting image from backend.
    const getuserInfo = () => {
      axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline").then((res) => {
        setloading(res.data[0].title);
        console.log(res.data)
        setData(res.data);
      });
    };
    getuserInfo();

    // this shoud be included if memory leak warning occur
    return () => {
      setData([]);
      setloading(''); // This worked for me
    };
  }, []);

  if (loading === "") {
    return (
      <Container>
        {[1, 2, 3,4].map((value) => (
          <Productskeleton key={value} value={value} />
        ))}
      </Container>
    );
  } else {
    return (
      <Container>
        {data.map((data, index) => (
          <Product image={data.image_link} key={index} data={data} />
        ))}
      </Container>
    );
  }
};

export default Products;
