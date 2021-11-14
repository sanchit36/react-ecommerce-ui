import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Wrapper } from "../styles/common";
import { mobile, tablet } from "../responsive";
import { useParams } from "react-router";
import storeApi from "../api/store-api";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartReducer";

const ProductWrapper = styled.div`
  padding: 50px 0px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${tablet({ height: "70vh" })}
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding-left: 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
`;

const Desc = styled.p`
  margin-bottom: 40px;
`;

const Price = styled.h3`
  margin: 20px 0px;
  font-weight: 700;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${tablet({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  border: ${(props) => (props.selected ? "2px solid teal" : "none")};
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${tablet({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    color: white;
    background-color: teal;
  }
`;

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [colorState, setColorState] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await storeApi.get("/products/" + id);
        setProduct(response.data);
        setSize(response.data.sizes[0].name);
        setColorState(response.data.colors[0].name);
      } catch (e) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color: colorState, size }));
  };

  if (!product) return null;

  return (
    <Layout>
      <Wrapper>
        <ProductWrapper>
          <ImageContainer>
            <Image src={product.image} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Price>$ {product.price}</Price>
            <Desc>{product.description}</Desc>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.colors.map((color) => (
                  <FilterColor
                    selected={colorState === color.name}
                    key={color._id}
                    color={color.name}
                    onClick={() => setColorState(color.name)}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.sizes.map((size) => (
                    <FilterSizeOption value={size.name} key={size._id}>
                      {size.name.toUpperCase()}
                    </FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("dec")}
                />
                <Amount>{quantity}</Amount>
                <Add
                  style={{ cursor: "pointer" }}
                  onClick={() => handleQuantity("inc")}
                />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </ProductWrapper>
      </Wrapper>
    </Layout>
  );
};

export default Product;
