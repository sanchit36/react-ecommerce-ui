import { Visibility } from "@material-ui/icons";
import styled, { css } from "styled-components";

const pending = css`
  background-color: #ebf1fe;
  color: #2a7ade;
`;

const declined = css`
  background-color: #fff0f1;
  color: #d95087;
`;

const approved = css`
  background-color: #e5faf2;
  color: #3bb077;
`;

const getStyle = (type) => {
  return type === "pending"
    ? pending
    : type === "declined"
    ? declined
    : approved;
};

export const Container = styled.div`
  flex: 1;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
  margin-right: 20px;
`;

export const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
`;

export const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

export const User = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Username = styled.h3`
  font-weight: 600;
`;

export const Fullname = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
  ${({ type }) => type && getStyle(type)}
`;

export const Icon = styled(Visibility)`
  font-size: 16px !important;
  margin-right: 5px;
`;
