import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";
import { Button } from "../styles/common";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 60px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${tablet({ width: "60%" })}
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const LinkStyle = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const Login = () => {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input placeholder="username" />
            <Input placeholder="password" />
            <Button style={{ width: "40%" }}>LOGIN</Button>
            <LinkStyle to="/forget-password">
              DO NOT YOU REMEMBER THE PASSWORD?
            </LinkStyle>
            <LinkStyle to="/register">CREATE A NEW ACCOUNT</LinkStyle>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
