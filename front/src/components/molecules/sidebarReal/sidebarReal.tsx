import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SidebarReal = ({ width = 500 }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef<HTMLDivElement>(null);

  const toggleSide = ()=>{
    setIsOpen(true)
  }

  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(false);
    } else {
      setX(-width);
      setOpen(true);
    }
  };

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async (e: MouseEvent) => {
    if (side.current) {
      const sideArea = side.current;
      const sideCildren = side.current.contains(e.target as Node);
      if (isOpen && (!sideArea || !sideCildren)) {
        await setX(-width);
        await setOpen(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <SContainer>
      <SSidebar
        ref={side}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <SContent></SContent>
        <SButton onClick={() => toggleMenu()}>
          {isOpen ? (
            <SSpan>X</SSpan>
          ) : (
            <SImg src="/logo_yellow.png" alt="contact open button" />
          )}
        </SButton>
      </SSidebar>
    </SContainer>
  );
};

const SContainer = styled.div`
  background-color: #e3ecf1;
`;

const SSidebar = styled.div`
  background-color: #068c16;
  border-left: 4px solid #202020;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 6;
`;

const SButton = styled.button`
  position: absolute;
  left: -100px;
  top: 10px;
  width: 40px;
  height: 40px;
  z-index: 1;
  transition: 0.8s ease;
  border: 2px solid #202020;
  border-radius: 40px;
  overflow: hidden;
`;

const SContent = styled.div`
  padding: 40px 40px 0 20px;
  position: relative;
  width: 100%;
`;

const SImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SSpan = styled.span`
  color: white;
`;

// .icon {
//   margin: 0;
//   color: #202020;
// }

export default SidebarReal;
