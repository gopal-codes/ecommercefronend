import React, { useState } from "react";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import VerifiedUserRoundedIcon from "@material-ui/icons/VerifiedUserRounded";
import Styled from "styled-components";
import { Badge } from "@material-ui/core";
import { mobile } from "../makeResponsive";
import { useHistory } from "react-router-dom";
import { getemail } from "../SetterAndGetter/SetAndGetUser";
import { getBadge } from "../SetterAndGetter/SetAndGetUniqueCARTItem";
import { infotoast } from "./Toast";
import {FetchingData} from '../SetterAndGetter/SetAndGetSearchitem';

const Components = Styled.div`
    height:60px;
    ${mobile({ height: "50px" })}
   
`;
const Wrapper = Styled.div`
    padding:10px 20px;
    display: flex;
    justify-content:space-between;
    align-items:center;
    ${mobile({ padding: "10px 0px" })}
`;
const Left = Styled.div`
    flex: 1;
    display:flex;
    align-items:center;
`;
const Language = Styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display: "none" })}
`;
const SearchBox =Styled.div`
    position:relative;
`
const SearchContainer = Styled.div`
    border:1px solid lightgrey;
    display:flex;
    align-items:center;
    margin-left: 15px;
    padding:5px;
`;

const Option = Styled.div`
    position:absolute;
    z-index:5;
    left:0;
    right:0;
    margin:auto auto;
    margin-left:15px;
    border:0.5px solid gray;
    background:white;
`;
const Suggestion = Styled.div`
    display:flex;
    justify-content:space-betweeen;
    align-items:center;
    padding:10px 5px;
    &:hover{
      background:lightgray;
    }
`
const OptionText =Styled.div`
    height:50px;
    cursor:pointer;
    &:hover{
      background:lightgray;
    }
`

const Input = Styled.input`
    border:none;
    ${mobile({ width: "50px" })};
    outline: none;
`;

const Center = Styled.div`
    flex:1;
    display:flex;
    justify-content:center;
`;

const Logo = Styled.h1`
    font-weight: bold;
    cursor:pointer;
    color:teal;
    ${mobile({ fontSize: "23px" })}
`;

const Right = Styled.div`
    flex: 1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = Styled.div`
color:teal;
font-size:16px;
cursor:pointer;
margin-left:10px;
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Nav = () => {
  const history = useHistory();
  const {Allitem} = FetchingData();
  const [searchtxt, setsearchtxt] = useState("");

  // handling search container size for diffrent screen.
  const handlesearchcontainer = () => {
    const logo = document.querySelector(".logo");
    const searchinput = document.querySelector(".searchinput");
    searchinput.setAttribute("style", "width:300px;");

    if (window.innerWidth <= 750) {
      logo.setAttribute("style", "display:none");
      searchinput.setAttribute("style", "width:165px");
    }
  };

  const RunSearch = ()=>{
    history.push({
      pathname: "/Searchpage",search: '', state:{data:searchtxt}
    })
  }
  
  // selecting dropdown items for searching
  const DropdownSearch = (text)=>{  
    console.log(text)
    setsearchtxt(text.slice(0,18).toLowerCase())
    history.push({
      pathname: "/Searchpage", state:{data:text.slice(12,18).toLowerCase()}
    })
  }

console.log(searchtxt)
  // getting email and num after user login.
  const email = getemail();
  var num = getBadge();

  return (
    <Components>
      <Wrapper>
        <Left>
          <Language>En</Language>
          <SearchBox>
          <SearchContainer onClick={handlesearchcontainer}>
            <Input
              type="text"
              className="searchinput"
              name="searchbox"
              value={searchtxt}
              onChange={(e)=>setsearchtxt(e.target.value)}
              autoComplete="off"
              onKeyPress={(e)=>
               {
                if(e.key==="Enter"){
                  RunSearch();
                }}
               }
              placeholder="Search"
            />
            <Search
              onClick={RunSearch}
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
         <Option>
          {
            searchtxt.toString().length>0?
            Allitem.filter(item=>
              {
                var searchtext = searchtxt.toString().toLowerCase()  
                var items = item.title ||item.name || " "
                items = items.toString().toLowerCase();
                return items.includes(searchtext)
               }).slice(0,5)
            .map((item,index)=>(
             <Suggestion key={index} style={{padding:"10px",display:"flex", justifyContent:"space-between", alignItems:"center"}}> 
             <OptionText  onClick={()=>DropdownSearch(item.name||item.title||" ")} >{item.name||item.title}</OptionText>
              <Search
              onClick={RunSearch}
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
            </Suggestion>
            )):<></>
          }
          
          </Option> 
          </SearchBox>
        </Left>
        <Center>
          <Logo className="logo" onClick={() => history.push("/")}>
            MERN
          </Logo>
        </Center>
        <Right>
          <MenuItem onClick={() => history.push("/register")}>
            REGISTER
          </MenuItem>
          <MenuItem onClick={() => history.push("/login")}>
            LOGIN
            {email !== "" ? (
              <VerifiedUserRoundedIcon
                style={{ color: "teal", fontSize: 22 }}
              />
            ) : (
              <></>
            )}{" "}
          </MenuItem>
          <MenuItem>
            <Badge badgeContent={num} color="primary">
              <ShoppingCartOutlined
                style={{ color: "teal" }}
                onClick={() => {
                  email === ""
                    ? infotoast("YOU NEED TO SIGN IN FIRST TO VIEW YOUR CART")
                    : history.push("/cart");
                }}
              />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Components>
  );
};

export default Nav;
