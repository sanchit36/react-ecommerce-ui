import React from "react";
import styled from "styled-components";
import Categories from "../components/Categories";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Home = () => {
  return (
    <Layout>
      <Slider />
      <Categories />
      <Wrapper>
        <Heading title="Featured Products" />
        <Products />
      </Wrapper>
    </Layout>
  );
};

export default Home;
