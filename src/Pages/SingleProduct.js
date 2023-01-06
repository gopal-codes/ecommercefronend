import { Add, Remove } from "@material-ui/icons";
import Styled from "styled-components";
import Announcement from "../components/Announcement";
import Fotter from "../components/Fotter";
import Nav from "../components/Nav";
import Newsletter from "../components/Newsletter";
import { mobile } from "../makeResponsive";
import { useEffect, useState } from "react";
import {successtoast} from "../components/Toast"
import { useLocation } from "react-router-dom";
import {useCart}  from 'react-use-cart'

const Container = Styled.div`

`;
const Wrapper = Styled.div`
    padding:20px;
    display:flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = Styled.div`
    flex:1;
`;
const Image = Styled.img`
    width:100%;
    height:90vh;
    object-fit:center-cut;
    ${mobile({ height: "40vh" })}
`;
const InfoContainer = Styled.div`
    flex:1;
    padding:0px 50px;
    ${mobile({ padding: "10px" })}
`;
const Title = Styled.h1`
    font-weight:200;
`;
const Desc = Styled.p`
    margin:20px 0px;
`;
const Price = Styled.span`
    font-weight:100px;
    font-size:40px;
`;
const FilterContainer = Styled.div`
    display:flex;
    justify-content:space-between;
    margin:30px 0px;
    width:50%;
    ${mobile({ width: "100%" })}
`;
const Filter = Styled.div`
    display:flex;
    align-items:center;
`;
const FilterTitle = Styled.span`
    font-size:20px;
    font-weight:200;
`;
const FilterColor = Styled.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color: ${(props) => props.color};
    margin:0px 5px;
    cursor:pointer;
`;
const FilterSize = Styled.select`
    margin-left:10px;
    padding:5px;
`;
const FilterSizeOption = Styled.option`

`;
const AddContainer = Styled.div`
    display:flex;
    align-items:center;
    width:50%;
    justify-content:space-between;
    ${mobile({ width: "100%" })};
`;
const AmountContainer = Styled.div`
    display:flex;
    align-items:center;
    font-weight:700;
`;
const Amount = Styled.span`
    width:30px;
    height:30px;
    border-radius:10px;
    border:1px solid teal;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0px 5px;
`;
const Button = Styled.button`
    padding:15px;
    border:2px solid teal;
    background-color:white;
    cursor:pointer;
    font-weight:200;

    &:hover{
        background-color: #f8f4f4;
    }
`;

const SingleProduct = () => {
  const [num, setnum] = useState(0);
  const [singledata, setsingledata] = useState([]);
  const location = useLocation();
  const { addItem } = useCart();
  //   console.log(location.state.data)

  useEffect(() => {
    setsingledata(location.state.data);
  },[location,singledata]);

  return (

    <Container>
      <Nav />
      <Announcement />
    
          <Wrapper>
          <ImgContainer>
            <Image src={singledata.image|| singledata.image_link||process.env.REACT_APP_IMAGE_PATH+singledata.product} />
          </ImgContainer>
          <InfoContainer>
            <Title>{singledata.title||singledata.name} </Title>
            <Desc>
              {singledata.description}
            </Desc>
            <Price>$:{singledata.price}</Price>
  
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                <FilterColor color="black" />
                <FilterColor color="darkblue" />
                <FilterColor color="gray" />
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize  >
                  <FilterSizeOption >XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
  
            <AddContainer>
              <AmountContainer>
                <Remove
                  onClick={() => {
                    if (num >= 1) {
                      setnum(num - 1);
                    }
                  }}
                />
                <Amount>{num}</Amount>
                <Add onClick={() => setnum(num + 1)} />
              </AmountContainer>
              <Button onClick={() => {addItem(singledata); successtoast("SUCCESSFULLY ADDED TO CART")}}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
    
      <Newsletter />
      <Fotter />
    </Container>
 

  );
};

export default SingleProduct;
