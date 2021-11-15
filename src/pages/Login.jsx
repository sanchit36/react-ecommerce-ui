import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authUser } from "../api/apiCall";
import Navbar from "../components/Navbar";
import useForm from "../hooks/useForm";
import { Button } from "../styles/common";

import {
  Container,
  Wrapper,
  Title,
  Form,
  Input,
  LinkStyle,
} from "../styles/AuthForm";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    toast.promise(
      authUser(dispatch, "/auth/signin", values, () => navigate("/")),
      {
        pending: "Trying to login...",
        success: {
          render({ data }) {
            return `Welcome back, ${data.user.firstName}`;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      }
    );
  };

  const [values, handleChange, handleSubmit] = useForm(initialState, onSubmit);

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form direction="column" onSubmit={handleSubmit}>
            <Input
              required
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="email"
              variant="outlined"
            />
            <Input
              required
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
              variant="outlined"
            />
            <Button
              disabled={isFetching}
              type="submit"
              style={{ width: "40%" }}
            >
              LOGIN
            </Button>
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
