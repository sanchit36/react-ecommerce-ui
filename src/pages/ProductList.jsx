import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../layout/MainLayout/main-layout.component';
import Heading from '../components/Heading';
import Products from '../components/Products';
import { Wrapper } from '../styles/common';
import { tablet } from '../responsive';
import { useParams } from 'react-router';
import Pagination from '../components/Pagination';
import useQuery from '../hooks/useQuery';
import { useSelector } from 'react-redux';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${tablet({
    width: '0px 20px',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${tablet({ marginRight: '0px' })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${tablet({ margin: '10px 0px' })}
`;

const Option = styled.option``;

const ProductList = () => {
  const { hasNext, hasPrev } = useSelector((state) => state.product);
  const { category } = useParams();
  const [filters, setFilters] = useState({
    sort: 'newest',
  });

  const query = useQuery();
  const page = Number(query.get('page') || 1);

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Layout>
      <Wrapper>
        <Heading title={category ? category.toUpperCase() : 'All Products'} />
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name='color' onChange={handleFilters}>
              <Option value='color'>Color</Option>
              <Option value='white'>White</Option>
              <Option value='black'>Black</Option>
              <Option value='red'>Red</Option>
              <Option value='blue'>Blue</Option>
              <Option value='yellow'>Yellow</Option>
              <Option value='green'>Green</Option>
            </Select>
            <Select name='size' onChange={handleFilters}>
              <Option value='size'>Size</Option>
              <Option value='xs'>XS</Option>
              <Option value='s'>S</Option>
              <Option value='m'>M</Option>
              <Option value='l'>L</Option>
              <Option value='xl'>XL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select name='sort' onChange={handleFilters} defaultValue='newest'>
              <Option value='newest'>Newest</Option>
              <Option value='asc'>Price (asc)</Option>
              <Option value='desc'>Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products cat={category} filters={filters} page={page} />
        <Pagination
          url={'/products'}
          page={page}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </Wrapper>
    </Layout>
  );
};

export default ProductList;
