import React from "react";
import styled from "styled-components";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  flex: 1;
`;

const Layout = ({ children, noNewsletter }) => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>{children}</Wrapper>
      {!noNewsletter && <Newsletter />}
      <Footer />
    </Container>
  );
};

export default Layout;
