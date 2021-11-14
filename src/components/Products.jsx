import { useEffect, useState } from "react";
import styled from "styled-components";
import storeApi from "../api/store-api";
import ProductItem from "./ProductItem";

const Container = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters }) => {
  const [products, setProducts] = useState([]);
  console.log(cat, filters);

  useEffect(() => {
    let url = "/products?";

    if (filters) {
      const { size, color, sort } = filters;
      url = cat ? url + `&category=${cat}` : url;
      url = size && size !== "size" ? url + `&size=${size}` : url;
      url = color && color !== "color" ? url + `&color=${color}` : url;
      url = sort ? url + `&sortBy=${sort}` : url;
    }

    const getProducts = async () => {
      try {
        const response = await storeApi.get(url);
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [filters, cat]);

  return (
    <Container>
      {products.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
