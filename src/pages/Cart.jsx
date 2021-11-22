import { Add, Close, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Layout from "../layout/Layout";
import { tablet } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

import { addProductToCart, removeProductFromCart } from "../redux/cartReducer";
import useAxios from "../hooks/useAxios";

const KEY = process.env.REACT_APP_STRIPE;

const Wrapper = styled.div`
  padding: 20px;
  ${tablet({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "1px solid black" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${tablet({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${tablet({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${tablet({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border: none;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api] = useAxios();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await api.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          state: {
            data: res.data,
            cart,
          },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  return (
    <Layout noNewsletter>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <div key={product.id}>
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product.id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        onClick={() =>
                          dispatch(
                            addProductToCart({ ...product, quantity: 1 })
                          )
                        }
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove
                        onClick={() => dispatch(removeProductFromCart(product))}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price}</ProductPrice>
                  </PriceDetail>
                </Product>
                <Hr />
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -0.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>

            {cart.total > 0 && (
              <StripeCheckout
                name="Ecommerce Shop"
                image="https://avatars.githubusercontent.com/u/1486366?v=4"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            )}

            <FormControl
              fullWidth
              variant="outlined"
              style={{ margin: "20px 0 10px" }}
            >
              <InputLabel htmlFor="apply-coupon">Apply Coupon</InputLabel>
              <OutlinedInput
                id="apply-coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                type="text"
                required
                endAdornment={
                  isValid ? (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setIsValid(false);
                          setCoupon("");
                        }}
                      >
                        <Close />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
              />
            </FormControl>

            {!isValid && <Button>Apply Coupon</Button>}
          </Summary>
        </Bottom>
      </Wrapper>
    </Layout>
  );
};

export default Cart;
