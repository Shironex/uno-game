import React from "react";
import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
  placeholderText: string;
  background: string;
  color: string;
  bordercolor: string;
  required: boolean;
};

const Input = styled.input<Props>`
  min-height: 40px;
  width: ${({ width }) => (width ? width : "fit-content")};
  height: ${({ height }) => (height ? height : "fit-content")};
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  padding: 0.15rem 0.7rem;
  border-radius: 4px 4px 2px 2px;
  outline: none;
  border: none;
  line-height: 1.15;
  border-bottom: 2px solid ${({ bordercolor }) => bordercolor};
  transition: all 0.3s ease-in-out;
  margin-bottom: 15px;


  &:hover {
    border-bottom: 2px solid #fff;
  }
`;

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <Input
      {...props}
      ref={ref}
      required={props.required}
      placeholder={props.placeholderText}
    />
  );
});


export default TextInput;
