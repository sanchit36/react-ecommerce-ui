import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";

export const Container = styled.div`
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

export const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  border-radius: 5px;
  background-color: white;
  ${tablet({ width: "60%" })}
  ${mobile({ width: "75%" })}
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex-wrap: wrap;
`;

export const Input = styled(TextField)`
  flex: 1 !important;
  min-width: 40% !important;
  margin: 10px 10px 10px 0px !important;
`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  cursor: pointer;
`;

export const LinkStyle = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;
