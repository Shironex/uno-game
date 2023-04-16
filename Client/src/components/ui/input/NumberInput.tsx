import React, { useState, forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

type Props = {
  width: string;
  height: string;
  placeholderText: string;
  background: string;
  color: string;
  bordercolor: string;
  min: number;
  max: number;
  mainvalue: number;
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

const NumberInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [Value, setValue] = useState(props.mainvalue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(event.target.value);

    if (newValue < props.min) {
      newValue = props.min;
    } else if (newValue > props.max) {
      newValue = props.max;
    }
    setValue(newValue);
  };
  return (
    <Input
      type="number"
      width={props.width}
      height={props.height}
      placeholderText={props.placeholderText}
      background={props.background}
      color={props.color}
      bordercolor={props.bordercolor}
      min={props.min}
      max={props.max}
      mainvalue={props.mainvalue}
      value={Value}
      required={props.required}
      onChange={(e) => setValue(Number(e.target.value))}
      onBlur={handleChange}
      ref={ref}
    />
  );
});

export default NumberInput;
