import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import Styled from "styled-components";
import auttum from "../components/auttum1.png";
import summer from "../components/summer.PNG";
import winter from "../components/winter.PNG";
import { mobile } from "../makeResponsive";

const Container = Styled.div`
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden;
    ${mobile({display:"none"})}
`;

const Arrow = Styled.div`
    width: 50px;
    height: 50px;
    background-color: teal;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    left:${(props) => props.direction === "left" && "10px"};
    right:${(props) => props.direction === "right" && "10px"};
    margin:auto;
    cursor:pointer;
    opacity:0.6;
    z-index:2;
    opacity:0.4;
    &:active{
      opacity:1;
    }
`;
const Wrapper = Styled.div`
    height:100%;
    display:flex;
    transition:all 1s ease;
    transform:translateX(${(props)=> props.slideIndex* -100}vw);
`;

const Slide = Styled.div`
    width: 100vw;
    height:100vh;
    display:flex;
    align-items:center;
    background-color: #${props =>props.bg};
`;
const ImgContainer = Styled.div`
    flex:1;
    height:100%;
`;
const Imag = Styled.img`
    height:100%;
    width:100%;
    object-fit: cover;
    `;

const InfoContainer = Styled.div`
    flex:1;
    padding:50px;
`;
const Title = Styled.h1`
    font-size:70px;
`;

const Desc = Styled.p`
    margin: 50px 0px;
    font-size:20px;
    font-weight: 500;
    letter-spacing:3px;
`;
const Button = Styled.button`
    padding:10px;
    font-size:20px;
    border:2px solid teal;
    background-color:transparent;
    cursor:pointer;
    transition:all .75s ease;
    &:hover{
      transform:scale(0.95);
      background-color:teal;
    }
`;

const Slider = () => {

   const [slideIndex, setSlideIndex] = useState(0);
    const handleClick=(direction)=>{
        if(direction==="left"){
          setSlideIndex(slideIndex>0?slideIndex-1:2)
        }else{
          setSlideIndex(slideIndex<2? slideIndex+1:0)
        }
    }

  return (
    <Container>   
      <Arrow direction="left" onClick={()=>handleClick("left")} >
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex} >
        <Slide bg="f5fafd">
          <ImgContainer>
            <Imag src={summer}/>
          </ImgContainer>
          <InfoContainer>
            <Title>SUMMER SALE</Title>
            <Desc>
              DONT'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fcf1ed">
          <ImgContainer>
            <Imag src={auttum}/>
          </ImgContainer>
          <InfoContainer>
            <Title>AUTTUM SALE</Title>
            <Desc>
              DONT'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
        <Slide bg="fbf0f4">
          <ImgContainer>
            <Imag src={winter}/>
          </ImgContainer>
          <InfoContainer>
            <Title>WINTER SALE</Title>
            <Desc>
              DONT'T COMPROMISE ON STYLE! GET FLAT 30% OFF ON NEW ARRIVALS.
            </Desc>
            <Button>SHOW NOW</Button>
          </InfoContainer>
        </Slide>
      </Wrapper>
      <Arrow direction="right"  onClick={()=>handleClick("right")} >
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
