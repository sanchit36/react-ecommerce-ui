import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getProducts } from '../api/products';
import useAxios from '../hooks/useAxios';
import ProductItem from './ProductItem';

const Container = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, page }) => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [api] = useAxios();

  useEffect(() => {
    let params = '';
    if (filters) {
      const { size, color, sort } = filters;
      params = cat ? params + `&category=${cat}` : params;
      params = size && size !== 'size' ? params + `&size=${size}` : params;
      params = color && color !== 'color' ? params + `&color=${color}` : params;
      params = sort ? params + `&sortBy=${sort}` : params;
    }
    dispatch(getProducts(api, page, params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, cat, page, dispatch]);

  return (
    <Container>
      {products.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
