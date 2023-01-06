import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Styled from 'styled-components';
import { mobile } from '../makeResponsive';

const Container= Styled.div`
    display:flex;
    ${mobile({flexDirection:"column" })}
`
const Left = Styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`
const Logo= Styled.h1``
const Desc = Styled.p`
    margin: 20px 0px;
`
const SocialContainer= Styled.div`
    display:flex;
`
const SocialIcon =Styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:#${props=>props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`
const Center = Styled.div`
    flex:1;
    padding:20px;
    ${mobile({display:"none" })}
`
const Title= Styled.h3`
    margin-bottom:30px;
`
const List= Styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`
const ListItem= Styled.li`
    width:50%;
    margin-botton:10px;
    cursor:pointer
`
const Right = Styled.div`
    flex:1;
    padding:20px;
    ${mobile({backgroundColor:"#fff8f8" })}
`
const ContactItem= Styled.div`
    margin-bottom:20px;
    display:flex;
    align-items;center;
`

const Fotter = () => {
    const history = useHistory();
  return (
    <Container>
        <Left>
            <Logo>JOJO</Logo>
            <Desc>
                There are many variations of passages of Lorem Ipsum available, but the Majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Women Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem onClick={()=>history.push('/latest')}>Latest Items</ListItem>
                <ListItem >Order Tracking</ListItem>
                <ListItem onClick={()=>history.push('/sellproduct')} >Sell Product</ListItem>
                <ListItem>wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title>
                Contact
            </Title>
            <ContactItem>
                <Room style={{marginRight:"10px"}}/> 622 Dixie Path , South Tobinchester 98336
            </ContactItem>
            <ContactItem>
               <Phone style={{marginRight:"10px"}}/> +977/+889 9848880900
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight:"10px"}}/>@email.commercial.com
            </ContactItem>
        </Right>
    </Container>
  )
}

export default Fotter