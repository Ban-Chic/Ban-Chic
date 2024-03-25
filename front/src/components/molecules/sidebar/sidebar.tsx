import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  // const [isOpen, setOpen] = useState(false);
  // const [xPosition, setX] = useState(-100);
  // const side = useRef();

  // button 클릭 시 토글
  // const toggleMenu = () => {
  //   if (xPosition < 0) {
  //     setX(0);
  //     setOpen(true);
  //   } else {
  //     setX(-100);
  //     setOpen(false);
  //   }
  // };

  // 사이드바 외부 클릭시 닫히는 함수
  // const handleClose = async (e) => {
  //   let sideArea = side.current;
  //   let sideCildren = side.current.contains(e.target);
  //   if (isOpen && (!sideArea || !sideCildren)) {
  //     await setX(-width);
  //     await setOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("click", handleClose);
  //   return () => {
  //     window.removeEventListener("click", handleClose);
  //   };
  // });

  const outside = useRef<any>();
  useEffect(() => {
    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  });
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  return (
    <>
      <SideBarWrap id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
        <button
          onClick={toggleSide}
          onKeyDown={toggleSide}
        >oioijoi</button>
        <ExitMenu onClick={toggleSide} onKeyDown={toggleSide}>
          closeddd
        </ExitMenu>
        <ul>
          <Menu>메뉴1</Menu>
          <Menu>메뉴2</Menu>
          <Menu>메뉴3</Menu>
        </ul>
      </SideBarWrap>
    </>
  );
}

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  border-radius: 15px 0 0 15px;
  background-color: darkcyan;
  height: 100%;
  width: 100%;
  right: -100%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const Menu = styled.li`
  margin: 30px 8px;
`;
const ExitMenu = styled.span`
  position: absolute;
  bottom: 26px;
  font-size: 0.8rem;
`;

export default Sidebar;
