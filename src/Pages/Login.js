import { Copyright, LockOpen } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import { mobile } from "../makeResponsive";
import Sunrise from "./Default.jpg";
import Nav from "../components/Nav";
import Announcement from "../components/Announcement";
import Validation from "../components/Validation";
import AOS from "aos";
import "aos/dist/aos.css";
import { infotoast } from "../components/Toast";
import {setToken,setRefreshToken} from '../SetterAndGetter/SetAndGetToken'
import { setemail } from "../SetterAndGetter/SetAndGetUser";
import { axiosInstance } from "../config";

const Component = Styled.div`
  
`;
const Wrapper = Styled.div`
  width:100%;
  height:100vh;
  position:relative;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:#333;
  
`;
const Image = Styled.img`
  width:100%;
  height:100%;
  opacity:0.5;
`;
const Center = Styled.div`
  min-width:380px;
  height:500px;
  background-color:transparent;

  position:absolute;
  z-index:2;

  display:flex;
  flex-direction:column;
  align-items:center;
  padding:5px;
  border:2px solid white;
  
  // 1'st 0px is for x:offset--2'nd 0px is for y:offset
   //3'rd 20px is for blur area in x,y axis, 4'th 10px is for spread color.
 
   box-shadow:0px 0px 20px 10px #fff;
  &:hover{
    box-shadow:0px 0px 50px 30px #fff;
    ${mobile({ boxShadow: "none" })};
  };
  ${mobile({
    height: "100%",
    justifyContent: "center",
    border: "none",
    boxShadow: "none",
  })};

`;

const Div = Styled.div`
  margin-top:10px;
`;
const Header = Styled.h1`

 color:teal;
`;
const Inputcontainer = Styled.div`
  width:90%;
  height:50px;
  border-radius:10%;
  margin:10px 0px;
  border: 2px solid white;
  
`;
const Input = Styled.input`
  border:none;
  width:100%;
  height:100%;
  opacity:0.7;
  padding:10px;
  font-weight:500;
  font-size:20px;
  &:hover{
    opacity:1;
    box-shadow:0px 0px 50px 30px #fff;
   
  }
  text-align:center;
`;
const Buttoncontainer = Styled.div`
    margin-top:20px;
    
`;

const Button = Styled.button`
  font-size:23px;
  position:absolute;
  transition:all .75s ease-in;
  &:hover{ box-shadow:0px 0px 50px 30px #fff;}
  left:${(props) => props.left === "left" && "20px"};
  right:${(props) => props.right === "right" && "20px"};
`;
const Span = Styled.span`
  font-size:18px;
  color:white;
  position:absolute;
  margin-top:10px;
  
`;
const Para = Styled.div`
  font-size:20px;
  font-weight:600;
 margin-top:4rem;
  cursor:pointer;
  color:white;
`;
const Fotter = Styled.p`
 display:flex;
 justify-content:center;
 position:absolute;
 bottom:5px;
`;

const Login = () => {
  const history = useHistory();
  // declearing variable using usestate..
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  // handling error part;
  const [errors, seterror] = useState({});

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    AOS.init({ delay: 200, duration: 2000 });
  }, []);

  const Login = async () => {
    seterror(Validation(inputs));
    try {
      if (
        inputs.name !== "" &&
        inputs.password.length > 5 &&
        inputs.password !== ""
      ) {
        await axiosInstance.post("/api/login", inputs).then((res) => {
          infotoast(res.data.message);
          if (res.data.message === "login Successful") {
            setToken(res.data.token);
            setRefreshToken(res.data.rtoken);
            setemail(res.data.email);
            history.push({
              pathname: "/",
              search: "",
              state: { email:res.data.email,token:res.data.token,rtoken:res.data.rtoken},
            });
            }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Component>
      <Announcement />
      <Nav />

      <Wrapper>
        <Image src={Sunrise} />

        <Center data-aos="zoom-in">
          <Div
            data-aos="zoom-in "
            data-aos-delay="800"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "white",
              width: "45px",
              height: "45px",
              borderRadius: "50%",
            }}
          >
            <LockOpen
              style={{ color: "teal", width: "30px", height: "30px" }}
            />
          </Div>{" "}
          <Header>Sign In</Header>
          <Inputcontainer data-aos="fade-right" data-aos-delay="1200">
            <Input
              type="email"
              name="email"
              autoComplete="off"
              value={inputs.email}
              placeholder="YOUREMAIL@GMAIL.COM"
              onChange={handlechange}
            />
            {errors.email && (
              <p
                style={{
                  color: "red",
                  background: "black",
                  letterSpacing: "0.5px",
                }}
              >
                {errors.email}
              </p>
            )}
          </Inputcontainer>
          <Inputcontainer data-aos="fade-left" data-aos-delay="1200">
            <Input
              type="text"
              name="password"
              autoComplete="off"
              value={inputs.password}
              placeholder="YOUR_PASSWORD"
              onChange={handlechange}
            />
            {errors.password && (
              <p
                style={{
                  color: "red",
                  background: "black",
                  letterSpacing: "0.5px",
                }}
              >
                {errors.password}
              </p>
            )}
          </Inputcontainer>
          <Buttoncontainer>
            <Button
              left="left"
              onClick={Login}
              data-aos="fade-down-right"
              data-aos-delay="1500"
            >
              Sign In
            </Button>
            <Span>OR</Span>
            <Button
              right="right"
              onClick={() => history.push("/register")}
              data-aos="fade-down-left"
              data-aos-delay="1500"
            >
              Register
            </Button>
          </Buttoncontainer>
          <Para onClick={()=>infotoast("SORRY!!! WORKING ON THIS FEATURE")}>Forgot password?</Para>
          <Fotter>
            Copyright
            <Copyright />
            yoyo 2022{" "}
          </Fotter>
        </Center>
      </Wrapper>
    </Component>
  );
};

export default Login;
