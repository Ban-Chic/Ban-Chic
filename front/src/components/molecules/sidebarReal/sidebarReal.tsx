import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { Link } from "react-router-dom";

interface Props {
  width: number;
  isOpenCheck: boolean;
  setIsOpen: () => void;
  cal: number;
}

const SidebarReal = ({ width, isOpenCheck, setIsOpen }: Props) => {
  // const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenCheck) {
      setX(0);
    } else {
      setX(-width);
    }
  }, [isOpenCheck, width]);

  // 사이드바 외부 클릭시 닫히는 함수
  // const handleClose = async (e: MouseEvent) => {
  //   if (side.current) {
  //     const sideArea = side.current;
  //     const sideCildren = side.current.contains(e.target as Node);
  //     if (isOpen && (!sideArea || !sideCildren)) {
  //       await setX(-width);
  //       await setOpen(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("click", handleClose);
  //   return () => {
  //     window.removeEventListener("click", handleClose);
  //   };
  // });

  return (
    <SContainer isOpenCheck={isOpenCheck}>
      <SSidebar>
        <SDiv
          ref={side}
          style={{
            width: `0px`,
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink>LOGIN</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `${width}px`,
            height: "100px",
            transformOrigin: "right",
            transform: `translatex(${xPosition - 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink>HOME</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `0px`,
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink>SURVEY</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `${width}px`,
            height: "100px",
            transformOrigin: "right",
            transform: `translatex(${xPosition - 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink>SEARCH</SMenuLink>
        </SDiv>
        <SDiv
          ref={side}
          style={{
            width: `0px`,
            height: "100px",
            transformOrigin: "left",
            transform: `translatex(${-xPosition + 10}px) scaleX(${xPosition === 0 ? 1.2 : 1})`,
          }}
        >
          <SMenuLink >MY PAGE</SMenuLink>
        </SDiv>
      </SSidebar>
    </SContainer>
  );
};

const SContainer = styled.div<{ isOpenCheck: boolean }>`
  background-color: #e3ecf1;
  opacity: ${({ isOpenCheck }) => (isOpenCheck ? 1 : 0)};
  transition: 1.3s ease;
  z-index: ${({ isOpenCheck }) => (isOpenCheck ? 6 : -1)};
`;

const SSidebar = styled.div<{ cal: number }>`
  background-color: #191919;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: white;
  height: 100%;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const SMenuLink = styled(Link)`
  ${theme.font.KumarOneRegular};
  font-size: 6.3em;
  line-height: 1.5;
`;

const SDiv = styled.div`
  transition: 1s ease;
  position: relative;
  z-index: 0;

  &:nth-child(1) {
    font-size: 5px;
  }
  &:nth-child(odd) {
    text-align: end;
  }
  &:nth-child(even) {
    text-align: end;
  }
`;

export default SidebarReal;
