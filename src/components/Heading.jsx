import React from "react";
import styled from "styled-components";

const Title = styled.h2`
  padding: 40px 20px 10px;
  color: ${(props) => `${props.textColor}`};
  font-size: ${(props) => `${props.textSize}px`};
  font-weight: bold;
`;

const Circle = styled.span`
  color: ${(props) => `${props.dotColor}`};
  font-size: ${(props) => `${props.dotSize}px`};
  line-height: 0;
  margin-left: 5px;
`;

const Heading = ({ title, style, textSize, textColor, dotColor, dotSize }) => {
  return (
    <>
      <Title style={style} textSize={textSize} textColor={textColor}>
        {title}
        <Circle dotColor={dotColor} dotSize={dotSize}>
          .
        </Circle>
      </Title>
    </>
  );
};

Heading.defaultProps = {
  textSize: 40,
  textColor: "#222222",
  dotSize: 80,
  dotColor: "teal",
};

export default Heading;
