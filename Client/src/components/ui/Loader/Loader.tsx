import React from "react";
import styled, { keyframes } from "styled-components";

type Props = { width?: string; height?: string };

const turn = keyframes`
    to{transform: rotate(1turn)}
`;

const CustomLoader = styled.div<Props>`
  width: ${({ width }) => (width ? width : "50px")};
  height: ${({ height }) => (height ? height : "50px")};
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #dd6b20);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: ${turn} 1s infinite linear;
`;

const Loader = ({ width, height }: Props) => {
  return <CustomLoader width={width} height={height} />;
};

export default Loader;
