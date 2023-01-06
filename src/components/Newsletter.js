import { Send } from '@material-ui/icons'
import React, { useState } from 'react'
import Styled from 'styled-components';
import { mobile } from '../makeResponsive';
import { infotoast, successtoast } from './Toast';
import { axiosInstance } from '../config';

const Container= Styled.div`
    height:60vh;
    background-color:#fcf5f5;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
const Title= Styled.h1`
    font-size:70px;
    margin-bottom:20px;
`
const Desc =Styled.div`
    font-size:24px;
    font-weight:300;
    margin-bottom:20px;
    ${mobile({textAlign:"center" })}
`
const InputContainer= Styled.div`
    width:500px;
    height:40px;
    background-color:white;
    display:flex;
    justify-content:space-between;
    border:1px solid lightgray;
    ${mobile({width:"90vw" })}
`
const Input= Styled.input`
    border:none;
    flex:8;
    padding-left:20px;
   
`
const Button= Styled.button`
    flex:1;
    border:none;
    background-color: teal;
    color:white;
`

const Newsletter = () => {
const [email,setEmail] = useState(
    {email:""}
);


const sendEmail= async()=>{
    try{
        await axiosInstance.post("/api/Newsletter",email).then((res)=>{
        if(res.data.message==="Email Added Sucessfully."){
            successtoast(res.data.message)
        } else  infotoast(res.data.message); 
        
          })
}catch(err){
    console.log(err);
}
}

  return (
    <Container>
        <Title>Newsletter</Title>
        <Desc>Get timely updates from your favourite products.</Desc>
        <InputContainer>
            <Input onChange={e=>setEmail({email:e.target.value})} value={email.email} placeholder="Your email" />
            <Button>
                <Send onClick={sendEmail} />
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter