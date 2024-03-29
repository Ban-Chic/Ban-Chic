import styled from "styled-components";
import theme from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Example from "../../sidebarFramer/example";
import SidebarReal from "../../sidebarReal/sidebarReal";
import { MenuToggle } from "../../../atoms/menuToggle/menuToggle";

function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
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
      {/* <Example/> */}
      {/* <SMenuButton role="button" onClick={toggleSide}>삼단바</SMenuButton>
      <SidebarReal width={1500} isOpen={isOpen} setIsOpen={setIsOpen}>
      </SidebarReal> */}

      {/* <MenuToggle toggle={() => toggleSide} /> */}
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

const SSpanContainer = styled.span`
  width: 154.59px;
  display: flex;
  justify-content: center;
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 200,
    "opsz" 24;
`;

const MenuIcon = styled.div`
  font-family: "Material Icons";
  font-size: 50px;
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

const SImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SSpan = styled.span`
  color: white;
`;

const SMenuButton = styled.button`
  position: relative;
  z-index: 5;
`;

export default GNB;
