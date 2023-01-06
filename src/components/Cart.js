import { Add, Remove } from "@material-ui/icons";
import Nav from "./Nav";
import Fotter from "./Fotter";
import Styled from "styled-components";
import Announcement from "./Announcement";
import { mobile } from "../makeResponsive";
import { useCart } from "react-use-cart";
import { useHistory } from "react-router-dom";
import { setBadge } from "../SetterAndGetter/SetAndGetUniqueCARTItem";
import StripeCheckout from "react-stripe-checkout";
import { errortoast, successtoast } from "./Toast";
import { axiosInstance } from "../config";

const Container = Styled.div`

`;
const Wrapper = Styled.div`
    padding:20px;
    ${mobile({ padding: "10px" })}
`;

const Title = Styled.h1`
    font-weight:300;
    text-align:center;
`;
const Top = Styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
   
`;
const TopButton = Styled.button`
    padding:10px;
    font-weight:600;
    cursor:pointer;
    border:${(props) => props.type === "filled" && "none"};
    background-color:${(props) =>
      props.type === "filled" ? "black" : "transparent"};
    color:${(props) => props.type === "filled" && "white"};
    ${mobile({ padding: "8px" })}
`;
const TopTexts = Styled.div`
     ${mobile({ display: "none" })};
`;
const TopText = Styled.span`
    text-decoration:underline;
    cursor:pointer;
    margin:0px 10px;
`;

const Bottom = Styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`;
const Info = Styled.div`
    flex:3;
`;
const Product = Styled.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })};
    padding:15px 0;
    border-bottom:1px solid lightgray;
`;
const ProductDetail = Styled.div`
    flex:2;
    display:flex;
`;
const Image = Styled.img`
    width:200px;
`;
const Details = Styled.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = Styled.div`
    
`;
const ProductId = Styled.div`
    
`;
const ProductColor = Styled.div`
    height:20px;
    width:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
`;
const ProductSize = Styled.div`
    
`;
const PriceDetail = Styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;
const ProductAmountContainer = Styled.div`
    display:flex;
    align-items:center;
`;

const ProductAmount = Styled.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = Styled.div`
    font-size:30px;
    font-weight:200;
    ${mobile({ marginBottom: "20px" })}
`;
const Hr = Styled.hr`
    background-color:#000;
    border:none;
`;
const Summary = Styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    inner-height:50vh;
    height:50vh;
`;
const SummaryTitle = Styled.h1`
    font-weight:200;
`;
const SummaryItem = Styled.div`
    margin:25px 0px;
    display:flex;
    justify-content:space-between;
    font-weight:${(props) => props.type === "total" && "500"};
    font-size:${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = Styled.span`
    
`;
const SummaryItemPrice = Styled.span`
    
`;
const Button = Styled.button`
    width:100%;
    padding:10px;
    background-color:black;
    color:white;
    font-weight:600;
`;

const Cart = () => {
  const history = useHistory();

  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    emptyCart,
  } = useCart();

  setBadge(totalItems);

  const handleStripeToken = (token) => {
    axiosInstance.post("/stripe/checkout", { token }).then((res) => {
      if (res.status === 200) {
        successtoast("PAYMENT DONE!!!");
      }else{errortoast("SOME ERROR IN PROCESSING REQUEST");}
      
    });
  };

  if (isEmpty)
    return (
      <Container>
        <Nav />
        <Announcement />
        <Wrapper>
          <Title>Your Cart</Title>
          <Top>
            <TopButton onClick={() => history.push("/")}>
              CONTINUE SHOPPING
            </TopButton>
            <TopTexts>
              <TopText>Shopping Bag(0)</TopText>
              <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              <Product>
                <h2 style={{ width: "100%", textAlign: "center" }}>
                  YOUR CART IS EMPTY.
                </h2>
              </Product>
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText type="total">Total</SummaryItemText>
                <SummaryItemPrice>$ 0</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
        <Fotter />
      </Container>
    );

  return (
    <Container>
      <Nav />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton onClick={() => history.push("/")}>
            CONTINUE SHOPPING
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag( {totalUniqueItems} ) </TopText>
            <TopText>Your Wishlist({totalItems})</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={() => emptyCart()}>
            EMPTY CART
          </TopButton>
        </Top>

        <Bottom>
          <Info>
            {items.map((item, index) => (
              <Product key={index}>
                <ProductDetail>
                  <Image
                    src={
                      item.image ||
                      item.image_link ||
                      process.env.REACT_APP_IMAGE_PATH + item.product
                    }
                  />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {item.title || item.name}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>0807633282
                    </ProductId>
                    <ProductColor color="black" />
                    <ProductSize>
                      <b>Stock:</b>
                      {item.rating || null ? "IN-STOCK" : "NULL"}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                      style={{ cursor: "pointer" }}
                    />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Remove
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>$ {item.price}</ProductPrice>
                </PriceDetail>
                <div>
                  {" "}
                  <Hr />{" "}
                </div>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cartTotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 5</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemPrice>
                $ {(cartTotal - 5).toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              stripeKey="pk_test_51KskpeSHjBg5lmSuVCMrZVfv2Lx1uKXdEMmjL2eCJDCxhozIQPTw4eiNeXf9k98fBkMluj0U7mENOauHUNzNJ3n100apS7GRKk"
              token={handleStripeToken}
              amount={500}
              billingAddress
              description="Awesome Product"
              locale="auto"
              name="Your Cart Product"
              zipCode
            >
              <Button>CHECKOUT NOW </Button>
            </StripeCheckout>{" "}
          </Summary>
        </Bottom>
      </Wrapper>
      <Fotter />
    </Container>
  );
};

export default Cart;
