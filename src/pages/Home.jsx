import React from "react";
import Categories from "../components/Categories";
import Heading from "../components/Heading";
import Layout from "../layout/Layout";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { Wrapper } from "../styles/common";

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
