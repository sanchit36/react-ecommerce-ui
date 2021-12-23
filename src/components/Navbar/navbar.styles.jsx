import { mobile, tablet } from 'responsive';
import styled from 'styled-components';

export const Container = styled.div`
  height: 60px;
  background-color: #fff;
  ${mobile({ height: '50px' })}
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${tablet({ display: 'none' })}
  ${mobile({ display: 'none' })}
`;

export const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${tablet({ marginLeft: '0px' })}
  ${mobile({ marginLeft: '0px' })}
`;

export const Input = styled.input`
  border: none;
  outline: none;
  ${tablet({ width: '120px' })}
  ${mobile({ width: '50px' })}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: '24px' })}
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-transform: uppercase;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
