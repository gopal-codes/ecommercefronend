import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import axios from "axios";
import Style from "./Customcss.module.css";
import "aos/dist/aos.css";

const Container = Styled.div`
  overflow:hidden;
`;
const Wrapper = Styled.div`
    background-color: #000;
    display:flex;
    gap:5px;
    padding:10px;
    overflow-x:auto;
    overflow-behavior-inline:contain;
`;
const Center = Styled.div`
padding: 20px;
margin:5px 10px;
background-color:#fff;
&:hover{
transform:scale(0.97);
}
`;

const Image = Styled.img`
    max-height:125px;
    aspect-ratio:16/10;
  
    padding:5px;
    &:hover{
      box-shadow:0px 0px 20px 7px pink;
      transform:scale(1.025)
    } 
`;
const Info = Styled.div`
    color:red;
    padding:10px;
    text-align:center;
    font-weight:bold;
    
`;
const Skeleton = Styled.div`
    height:283.6px;
    width:100%;
     min-width:280px;
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:5px;
    background-color:#eee;
    position:relative;
    overflow:hidden;
`;
const Img = Styled.img`
height:262.5px;
width:95%;
`;
const Panal = Styled.div`
    height:100%;
    width:100%;
    background:transparent;
    position:absolute;
    animation-name: move;
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite; 
@keyframes move {
    0%{
        transform: translateX(-7vw);
    }
    100%{
        transform: translateX(100%) ;
    }
}
`;
const Panalslide = Styled.div`
    height:125%;
    width:10%;
    transform: skewX(-30deg);
    background:#fff;  
`;

const HorizontalScroll = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setloading] = useState("");

  // sending data to single product page.
  const tosinglepage = (data) => {
    console.log(data);
    history.push({
      pathname: "/singleProduct",

      state: { data: data },
    });
  };

  useEffect(() => {
    // getting image from backend.
    const getdata =  () => {
       axios
        .get("https://fakestoreapi.com/products?limit=12")
        .then((res) => {
          setloading(res.data[0].title);
          setData(res.data);
        });
    };
    getdata();

    // this shoud be included if memory leak warning occur
    return () => {
      setData([]);
      setloading(''); // This worked for me
    };
  }, []);

  if (loading === "") {
    return (
      <Skeleton>
        <Img />
        <Panal>
          <Panalslide />
        </Panal>
      </Skeleton>
    );
  }

  return (
    <Container className={Style.nothing}>
      <Wrapper data-aos="fade-left">
        {data.map((data) => (
          <Center  key={data.id}>
            <Image onClick={() => tosinglepage(data)} src={data.image} />
            <Info>PRICE: ${data.price}</Info>
          </Center>
        ))}
      </Wrapper>
    </Container>
  );
};

export default HorizontalScroll;
