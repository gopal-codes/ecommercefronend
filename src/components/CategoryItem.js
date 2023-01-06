import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { mobile } from '../makeResponsive';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Container = Styled.div`
    flex:1;
    margin:3px;
    position:relative;
    background-color:#f5fafd;
`;
const Image = Styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    cursor:pointer;
    ${mobile({height:"45vh" })}
`;
const Info = Styled.div`
    position:absolute;
    right:0;
    bottom:0;
    
`;
const Title = Styled.h1`
    color:black;
    margin-bottom:5px;
    color:teal;
`;

const CategoryItem = ({value ,index}) => {
    const history = useHistory();

    useEffect(()=>{
        AOS.init({delay: 200,duration: 2000, });
    },[])

  return (
    <Container key={index} onClick={()=>history.push("/productlist")} >
        <Image data-aos="zoom-in"   src={value} />
        <Info data-aos="slide-right" >
            <Title >{value.substring(14,20)}</Title>
        </Info>
    </Container>
  )
}

export default CategoryItem