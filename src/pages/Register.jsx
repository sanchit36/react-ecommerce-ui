import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authUser } from "../api/apiCall";
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
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  border-radius: 5px;
  background-color: white;
  ${tablet({ width: "60%" })}
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  font-size: 16px;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  cursor: pointer;
`;

const LinkStyle = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const { isFetching } = useSelector((state) => state.user);

  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authUser(dispatch, "/auth/signup", values).then(() => {
      setValues(initialState);
      navigate("/");
    });
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="first name"
              required
            />
            <Input
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="last name"
              required
            />
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="username"
              required
            />
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="email"
              required
            />
            <Input
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
              required
            />
            <Input
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="confirm password"
              required
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <strong>PRIVACY POLICY</strong>
            </Agreement>
            <Button
              disabled={isFetching}
              onClick={handleSubmit}
              style={{ width: "40%" }}
            >
              {isFetching ? "..." : "CREATE"}
            </Button>
          </Form>
          <LinkStyle to="/login">ALREADY HAVE A ACCOUNT? LOGIN</LinkStyle>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
