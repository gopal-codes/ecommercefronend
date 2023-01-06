import React from "react";
import Styled from "styled-components";
import Nav from "../components/Nav";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Fotter from "../components/Fotter";
import Newsletter from "../components/Newsletter";
import { mobile } from "../makeResponsive";

const Container = Styled.div`

`;
const Title = Styled.h1`
    margin:20px;
`;
const FilterContainer = Styled.div`
    display:flex;
    justify-content:space-between;
`;
const Filter = Styled.div`
    margin:20px;
    ${mobile({width:"0px 20px", display:"flex", flexDirection:"column" })}
`;
const FilterText = Styled.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({marginRight:"0px" })}
`;
const Select = Styled.select`
    padding:10px;
    margin-right:20px;
    ${mobile({margin:"10px 0px" })}
`;
const Option = Styled.option``;

const ProductList = () => {
  return (
    <Container>
      <Nav />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled >
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
          </Select>
          <Select>
            <Option disabled >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option >Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Fotter />
    </Container>
  );
};

export default ProductList;
