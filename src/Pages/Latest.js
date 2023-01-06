import React, { useEffect, useState } from 'react'
import Fotter from '../components/Fotter'
import Nav from '../components/Nav'
import {
    FavoriteBorderOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
  import Styled from "styled-components";
  import { useHistory } from "react-router-dom";
  import {useCart}  from 'react-use-cart';
  import {successtoast} from "../components/Toast"
import { axiosInstance } from '../config';
  

  const Body = Styled.div`
  display:flex;
  padding:20px;
  flex-wrap:wrap;
  justify-content:space-between;
  `
  
  const Info = Styled.div`
      opacity:0;
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      display:flex;
      justify-content:center;
      align-items:center;
      z-index:3;
      background-color:rgba(0,0,0,0.2);
      transition:all 1.5s ease;
      cursor:pointer;
  `;
  
  const Container = Styled.div`
      height:290px;
      min-width:270px;
      flex:1;
      display:flex;
      justify-content:center;
      align-items:center;
      margin:5px;
      background-color:#f5fbfd;
      position:relative;
  
      &:hover ${Info}{
          opacity:1;
      };
   
  `;
  const Circle = Styled.div`
      width:270px;
      height:200px;
      border-radius:50%;
      background-color:#fff;
      position:absolute;
  `;
  const Image = Styled.img`
      height:99%;
      width:99%;
      object-fit:;
      z-index:2;
  `;
  
  const Icon = Styled.div`
      width:40px;
      height:40px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      margin:10px;
      transition:all 0.5s ease-in-out;
      &:hover{
          transform:scale(1.2);
      };
      background-color:white;
     
  `;

const Latest = () => {
    const history = useHistory();
    const [fav, setFav] = useState("white");
    const [shop, setshop] = useState("white");
    const { addItem } = useCart();
    const [product,setproduct]= useState([]);
  
    const handlecarticon = () => {
      shop === "white" ? setshop("teal") : setshop("white");
    };
    const handlefavicon = () => {
      fav === "white" ? setFav("teal") : setFav("white");
    };
   
    useEffect(()=>{
        axiosInstance.get("/api/latest").then((res)=>{
          
            setproduct(res.data.product);
        })
    },[])
  return (
    <>
        <Nav/>
        <Body>
        {product.map((item)=>(
             <Container key={item._id}>
             <Circle />
             <Image src={process.env.REACT_APP_IMAGE_PATH+item.product} />
             <Info>
               <Icon  style={{ backgroundColor: shop }} onClick={handlecarticon}>
                 <ShoppingCartOutlined onClick={() => {addItem(item); successtoast("SUCCESSFULLY ADDED TO CART")}} />
               </Icon>
               <Icon
                 onClick={() =>
                   history.push({ pathname: "/singleProduct", state: { data: product } })
                 }
               >
                 <SearchOutlined />
               </Icon>
               <Icon style={{ backgroundColor: fav }} onClick={handlefavicon}>
                 <FavoriteBorderOutlined />
               </Icon>
             </Info>
           </Container>
        ))}
           </Body>
        <Fotter />
    </>
  )
}

export default Latest