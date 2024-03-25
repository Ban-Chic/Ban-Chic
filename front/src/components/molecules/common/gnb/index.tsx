import styled from "styled-components";
import theme from "../../../../styles/Theme";
import { Link } from "react-router-dom";
import Sidebar from "../../sidebar/sidebar";
import React, {useState} from "react";



function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };

  return (
    <SHeaderContainer>
      <SLink to="/">Ban:Chic</SLink>
      <SLink to="/mainSample">
        <SImgContainer src="/logo_triangle_banchic.png" alt="logo" />
      </SLink>
      <SLink to="/perfumeId">PerfumeDetail</SLink>
      <SLink to="/mypage">MyPage</SLink>
      <SButton onClick={toggleSide}>
        MENU
      </SButton>
      {/* <Sidebar isOpen={isOpen} setIsOpen={isOpen} /> */}
      {/* <SSpanContainer>
        <MenuIcon>menu</MenuIcon>
      </SSpanContainer> */}
      {/* <Sidebar /> */}
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
  
`;

export default GNB;
