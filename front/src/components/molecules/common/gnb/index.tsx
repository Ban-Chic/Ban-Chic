import styled from "styled-components";
import theme from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import SidebarReal from "../../sidebarReal/sidebarReal";
import { motion } from "framer-motion";
import MenuToggle from "../../../atoms/menuToggle/menuToggle";

function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWidth, setIsWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // button 클릭 시 토글
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <SHeaderContainer>
      <SLink to="/">Ban:Chic</SLink>
      <SLink to="/mainSample">
        <SImgContainer src="/logo_triangle_banchic.png" alt="logo" />
      </SLink>
      <SLink to="/perfumes/1">PerfumeDetail</SLink>
      <SLink to="/mypage">MyPage</SLink>
      {/* <SLink to="/perfumes/1/reviews">리뷰더보기</SLink> */}
      <SidebarReal
        width={isWidth}
        isOpenCheck={isOpen}
        // setIsOpen={setIsOpen}
      ></SidebarReal>
      <MenuToggle toggle={() => toggleMenu()} isOpen={isOpen} />
    </SHeaderContainer>
  );
}

export const SHeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding-left: 5rem;
  padding-right: 5rem;
  align-items: center;
  background-color: transparent;
  color: #f2f2f2;
  white-space: nowrap;
  height: 50px;
`;

const SImgContainer = styled.img`
  padding: 10px;
  width: 50px;
`;

const SLink = styled(Link)`
  ${theme.font.KumarOneRegular};
  font-size: 30px;
`;

export default GNB;
