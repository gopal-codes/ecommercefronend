import { Copyright, Lock } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Styled from "styled-components";
import Announcement from "../components/Announcement";
import Nav from "../components/Nav";
import { mobile } from "../makeResponsive";
import Sunrise from "./Sunrise.jpg";
import Validation from "../components/Validation";
import AOS from "aos";
import "aos/dist/aos.css";
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
`;
const Image = Styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
  opacity:0.6;
`;
const Center = Styled.div`
  min-width:380px;
  height:550px;
  background-color:transparent;
  box-shadow:25px 30px grey;
  position:absolute;
  z-index:2;

  display:flex;
  flex-direction:column;
  align-items:center;
  padding:10px;
  border:2px solid white;
  ${mobile({ height: "100%", border: "none", boxShadow: "none" })}

`;
const Header = Styled.h1`
 color:teal;
`;
const Inputcontainer = Styled.div`

  width:95%;
  height:50px;
  margin:12px 0px;
  opacity:0.7;
  &:hover{
    opacity:1;
  }
  padding:${(props) => props.file === "file" && "3.5px"};
`;
const Input = Styled.input`
border-radius:10%;
 width:100%;

  height:100%;
  font-weight:500;
  font-size:20px;
  text-align:center;
`;
const Buttoncontainer = Styled.div`
    margin-top:10px;
`;
const Button = Styled.button`
  font-size:25px;
  background:transparent;
  color:white;
  border:none;
  position:absolute;
  transition:all .55s ease-in;
  &:hover{ transform:scale(1.1)}
  left:${(props) => props.left === "left" && "20px"};
  right:${(props) => props.right === "right" && "20px"};
`;
const Span = Styled.span`
  font-size:25px;
  color:white;
  
`;
const Fotter = Styled.p`
 display:flex;
 justify-content:center;
 position:absolute;
 bottom:0px;
 font-weight:500;
 color:white;
`;

const Register = () => {
  const history = useHistory();
  // declearing variable using usestate..
  const [inputs, setInputs] = useState({
    profilepic: "",
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });
  // errors part..
  const [errors, seterror] = useState({});
  // handling from inputes...
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleimage = (e) => {
    setInputs({
      ...inputs,
      profilepic: e.target.files[0],
    });
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    AOS.init({ delay: 200, duration: 2000 });
  }, []);

  const registerbtn = async () => {
    seterror(Validation(inputs));

    const formdata = new FormData();
    formdata.append("myfile", inputs.profilepic, inputs.profilepic.name);
    formdata.append("name", inputs.name);
    formdata.append("email", inputs.email);
    formdata.append("password", inputs.password);
    try {
      await axiosInstance
        .post("/api/register", formdata)
        .then((res) => {
          alert(res.data.message);
          if (res.data.message === "sucessfully registered please Login now.") {
            history.push("login");
          }
        });
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

        <Center data-aos="fade-right">
          <div 
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
            <Lock style={{ color: "teal", width: "30px", height: "30px" }} />
          </div>
          <Header >Register</Header>
          <Inputcontainer >

            <Input
            data-aos="fade-right "
            data-aos-delay="800"
              type="text"
              name="name"
              autoComplete="off"
              value={inputs.name}
              placeholder="YOUR_NAME/ROBIN/PARAS"
              onChange={handlechange}
            />
            {errors.name && (
              <p
                style={{
                  color: "red",
                  background: "black",
                  letterSpacing: "0.5px",
                }}
              >
                {errors.name}
              </p>
            )}
          </Inputcontainer>
          <Inputcontainer>
            <Input
            data-aos="fade-right "
            data-aos-delay="1000"
              type="email"
              name="email"
              autoComplete="off"
              value={inputs.email}
              placeholder="YOUR_NAME@GMAIL.COM"
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
          <Inputcontainer>
            <Input
            data-aos="fade-right "
            data-aos-delay="1200"
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
          <Inputcontainer data-aos="fade-right "
            data-aos-delay="1400"  file="file">
            <Input type="file" name="myfile" onChange={handleimage} />
          </Inputcontainer>
          <Buttoncontainer>
            <Button left="left" onClick={registerbtn}>
              Register
            </Button>
            <Span>OR</Span>
            <Button right="right" onClick={() => history.push("/login")}>
              Sign In
            </Button>
          </Buttoncontainer>
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

export default Register;
