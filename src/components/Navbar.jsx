import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { getProducts } from "../api/products";
import { logoutUser } from "../api/auth";
import useAxios from "../hooks/useAxios";
import { mobile, tablet } from "../responsive";
import { Wrapper } from "../styles/common";

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  ${mobile({ height: "50px" })}
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${tablet({ display: "none" })}
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${tablet({ marginLeft: "0px" })}
  ${mobile({ marginLeft: "0px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${tablet({ width: "120px" })}
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-transform: uppercase;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [api] = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      getProducts(api, 1, dispatch, `&q=${text}`);
      navigate("/products");
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
                placeholder="search"
              />
              <Search
                onClick={handleSubmit}
                style={{ color: "gray", cursor: "pointer" }}
              />
            </SearchContainer>
          </Left>
          <Center>
            <Logo onClick={() => navigate("/")}>Centr.</Logo>
          </Center>
          <Right>
            {!currentUser && (
              <>
                <MenuItem onClick={() => navigate("/register")}>
                  REGISTER
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
              </>
            )}
            {currentUser && (
              <>
                {currentUser.isAdmin && (
                  <MenuItem onClick={() => navigate("/dashboard")}>
                    DASHBOARD
                  </MenuItem>
                )}
                <MenuItem onClick={() => logoutUser(api, dispatch)}>
                  LOG OUT
                </MenuItem>
                <MenuItem onClick={() => navigate("/cart")}>
                  <Badge badgeContent={quantity} color="secondary">
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
