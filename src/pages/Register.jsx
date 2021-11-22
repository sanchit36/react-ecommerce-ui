import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
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
  Agreement,
  LinkStyle,
} from "../styles/AuthForm";
import useAxios from "../hooks/useAxios";

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
  const [api] = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.password !== values.confirmPassword) {
      return toast.error("Password do not match");
    }

    toast.promise(
      authUser(api, dispatch, "/auth/signup", values, () => navigate("/")),
      {
        pending: "Trying to register...",
        success: {
          render({ data }) {
            return `Welcome, ${data.user.firstName}`;
          },
        },
        error: {
          render({ data }) {
            console.log({ data });
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
          <Title>CREATE AN ACCOUNT</Title>
          <Form direction="row" onSubmit={handleSubmit}>
            <Input
              label="First Name"
              variant="outlined"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="first name"
              required
            />
            <Input
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="last name"
              required
            />
            <Input
              label="Username"
              variant="outlined"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="username"
              required
            />
            <Input
              label="Email"
              variant="outlined"
              name="email"
              value={values.email}
              onChange={handleChange}
              type="email"
              placeholder="email"
              required
            />
            <Input
              label="Password"
              variant="outlined"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
              required
            />
            <Input
              label="Confirm Password"
              variant="outlined"
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
              type="submit"
              disabled={isFetching}
              style={{ width: "40%" }}
            >
              CREATE
            </Button>
          </Form>
          <LinkStyle to="/login">ALREADY HAVE A ACCOUNT? LOGIN</LinkStyle>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
