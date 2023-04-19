import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DropdowItem from "./DropDownItem";

interface IProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  dropref?: React.RefObject<any>;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  height: string;
  width: string;
  children?: React.ReactNode;
  gap?: string;
}

function DropDown(props: IProps) {
  const { isOpen, setIsOpen, dropref, top, left, right, bottom, height, width, children, gap } = props;

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!dropref || !setIsOpen)
        return;
      if (!dropref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [setIsOpen, dropref]);

  return (
    <SLayout
      ref={dropref}
      isOpen={isOpen}
      top={top}
      left={left}
      right={right}
      bottom={bottom}
      width={width}
      height={height}
      gap={gap}
    >
      {children}
    </SLayout>
  );
}

DropDown.item = DropdowItem;


const slideDown = keyframes`
  from {
    transform: scaleY(0);
    transform-origin: top;
  }
  to {
    transform: scaleY(1);
    transform-origin: top;
  }
`;

const slideUp = keyframes`
  from {
    transform: scaleY(1);
    transform-origin: top;
  }
  to {
    transform: scaleY(0);
    transform-origin: top;
  }
`;

const SLayout = styled.div<IProps>`
  position: absolute;
  top: ${(props) => props.top};
  top: ${(props) => props.bottom};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: #242830;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  //  box-shadow: 0px 0px 1px .5px #f27d0a;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};

  padding: 2px;
  transform-origin: top;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-name: ${(props) => (props.isOpen ? slideDown : slideUp)};
  color: white;

  z-index: 100;

  span {
    font-size: 16px;
    margin: 3px 7px;
  }
`;

export default DropDown;
