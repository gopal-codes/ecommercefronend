import React, { useState } from "react";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Styled from "styled-components";
import { mobile } from "../makeResponsive";
import Nav from "../components/Nav";
import Fotter from "../components/Fotter";
import ValidationSellProduct from "../components/ValidationSellProduct";
import { axiosInstance } from "../config";

const Wrapper = Styled.div`
    
    display:flex;
    ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const Left = Styled.div`
    flex:1;
    position:relative;
`;
const Right = Styled.div`
    flex:1;
`;
const H2 = Styled.h3`
  text-align:center;
  color:teal;
`;

const Image = Styled.img`
    width:100%;
    height:90vh;
    object-fit:cover;
    ${mobile({ height: "45vh" })}
`;
const ImageText= Styled.h2`
    width:100%;
    position:absolute;
    color:#fff;
    top:30%;
    text-align:center;
`
const ImageSelect = Styled.div`
    width:100%;
    position:absolute;
    top:40%;  
    margin-top:10px;
    ${mobile({ marginTop: "20px" ,top:'45%' })}
    display:flex;
    justify-content:center;
    transition:all .75s ease;
    &:hover{
      transform:scale(0.9);
    }
`;
const InputContainer = Styled.div`
    flex:1;
    height:90vh;
    padding:50px 50px;
    background-color:#fbf0f4;
    ${mobile({ padding: "10px" })}
`;
const Label = Styled.label`
  padding:5px 0;
  font-weight:500;
  color:teal;
`;
const Spam = Styled.span`
  color:red;
`;
const Input = Styled.input`
  border: none;
  border-bottom:2px solid gray;
  width:100%;
  height:40px;
  font-size:18px;
`;
const Textarea =Styled.textarea`
border: none;
border-bottom:2px solid gray;
width:100%;
text-align:center;
font-size:18px;
`
const File = Styled.input`
  position:relative;
  width:150px;
  height:50px;
  opacity:0.01;
  z-index:1;
  padding:16px;
  cursor:pointer;
`;
const Select = Styled.div`
  width:150px;
  height:50px;
  border-radius:40%;
  background-color:transparent;
  border:5px solid teal;
  text-align:center;
  position:absolute;
 
`;
const H3 = Styled.h3`
  padding:7px;
  color:teal;
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
const FilterSize = Styled.select`
    margin-left:10px;
    padding:5px;
`;
const FilterSizeOption = Styled.option`

`;
const Button = Styled.button`
  width:120px;
  height:50px;
  font-size:25px;
  color:teal;
  transition:all .75s ease;
  &:hover{
    transform:scale(0.9);
  } ;
  border:1px solid teal;
`;
const ProfilePage = () => {
  // errors part..
  const [errors, seterror] = useState({});

  // declearing variable using usestate..
  const sunrise = "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-after/Landscape-BW.jpg";
  const [inputs, setInputs] = useState({
    id:"1",
    product: sunrise,
    catogories: "",
    title: "",
    description: "",
    price: "",
  });

  // handling from inputs...
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleimage = async (e) => {
   await setInputs({
      ...inputs,
      product: e.target.files[0],
    });
    
    console.log(e.target.files[0]);
  };

  const sell = async () => {
    // before submitting. need to check error.
    seterror(ValidationSellProduct(inputs));
   
    const formdata = new FormData();
    formdata.append("catogories", inputs.catogories);
    formdata.append("title", inputs.title);
    formdata.append("price", inputs.price );
    formdata.append("myfile", inputs.product, inputs.product.name);
    formdata.append("description", inputs.description);
    formdata.append("id",inputs.id);
    try {
      await axiosInstance
        .post("/api/sellproducts", formdata)
        .then((res) => {
          if (res.data.message === "Successfully Added To Market Product.") {
            alert(res.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Nav />

      <Wrapper>
        <Left>
          <Image src={(inputs.product!==sunrise)?URL.createObjectURL(inputs.product):sunrise} />
          <ImageText>SELECT YOUR PRODUCT IMAGE </ImageText>
          <ImageSelect >
              <File type="file"  onChange={handleimage} />
              <Select>
                <H3>SELECT</H3>
              </Select>
            </ImageSelect>
        </Left>
        <Right>
          <InputContainer>
          <H2>ALL FIELDS ARE REQUIRED</H2>

            <Label>
              CATOGORIES<Spam>*</Spam>
            </Label>
            <Input
              type="text"
              name="catogories"
              value={inputs.catogories}
              onChange={handlechange}
              placeholder="FASHION/FURNITURE/ELECTRONIC"
            ></Input>
            {errors.catogories && (
              <p style={{ color: "red", letterSpacing: "0.4px" }}>
                {errors.catogories}
              </p>
            )}

            <Label>
              TITLE<Spam>*</Spam>
            </Label>
            <Input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handlechange}
              placeholder="HAKURA ZEANS.."
            ></Input>
            {errors.title && (
              <p style={{ color: "red", letterSpacing: "0.4px" }}>
                {errors.title}
              </p>
            )}

            <Label>
              Describe your product<Spam>*</Spam>
            </Label>
            <Textarea
              rows="3"
              type="text"
              name="description"
              value={inputs.description}
              onChange={handlechange}
              placeholder="HARURA ZEANS, MADE BY OUR TOP DESIGNERS..."
            ></Textarea>
            {errors.description && (
              <p style={{ color: "red", letterSpacing: "0.4px" }}>
                {errors.description}
              </p>
            )}

            <Label>
              PRICE IN (RS)/($)<Spam>*</Spam>
            </Label>
            <Input
              type="number"
              name="price"
              value={inputs.price}
              onChange={handlechange}
              placeholder="PRICE : 100.00"
            ></Input>
            {errors.price && (
              <p style={{ color: "red", letterSpacing: "0.4px" }}>
                {errors.price}
              </p>
            )}

            <FilterContainer>
              <Filter>
                <FilterTitle>PRODUCT </FilterTitle>
                <FilterSize>
                  <FilterSizeOption>SELECT</FilterSizeOption>
                  <FilterSizeOption>EMPORTED</FilterSizeOption>
                  <FilterSizeOption>LOCAL</FilterSizeOption>
                  <FilterSizeOption>SELF MADE</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <Button onClick={sell}>
              POST
              <DoubleArrowIcon
                style={{ color: "teal", padding: "1px", marginBottom: "4px" }}
              />
            </Button>
          </InputContainer>
        </Right>
      </Wrapper>

      <Fotter />
    </>
  );
};

export default ProfilePage;
