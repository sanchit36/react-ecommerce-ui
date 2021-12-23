import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getProducts } from 'api/products';
import { logoutUser } from 'api/auth';
import useAxios from 'hooks/useAxios';
import { Wrapper } from 'styles/common';

import {
  Container,
  NavWrapper,
  Left,
  Language,
  SearchContainer,
  Input,
  Center,
  Logo,
  Right,
  MenuItem,
} from './navbar.styles';

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api] = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(getProducts(api, 1, `&q=${text}`));
      navigate('/products');
    }
  };

  return (
    <Container>
      <Wrapper>
        <NavWrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer onSubmit={handleSubmit}>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='search'
              />
              <Search
                onClick={handleSubmit}
                style={{ color: 'gray', cursor: 'pointer' }}
              />
            </SearchContainer>
          </Left>
          <Center>
            <Logo onClick={() => navigate('/')}>Centr.</Logo>
          </Center>
          <Right>
            {!currentUser && (
              <>
                <MenuItem onClick={() => navigate('/register')}>
                  REGISTER
                </MenuItem>
                <MenuItem onClick={() => navigate('/login')}>SIGN IN</MenuItem>
              </>
            )}
            {currentUser && (
              <>
                {currentUser.isAdmin && (
                  <MenuItem onClick={() => navigate('/dashboard')}>
                    DASHBOARD
                  </MenuItem>
                )}
                <MenuItem onClick={() => dispatch(logoutUser(api))}>
                  LOG OUT
                </MenuItem>
                <MenuItem onClick={() => navigate('/cart')}>
                  <Badge badgeContent={quantity} color='secondary'>
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </>
            )}
          </Right>
        </NavWrapper>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
