import styled from "styled-components";
import { mobile } from "../responsive";

const MAX_WIDTH = 1440;

export const Wrapper = styled.div`
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 10px 20px;
  ${mobile({ padding: "0px 10px" })}
`;

export const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;
