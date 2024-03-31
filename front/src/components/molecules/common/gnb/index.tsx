import styled from "styled-components";
import { Link } from "react-router-dom";

import theme from "../../../../styles/Theme";
import Page_Url from "../../../../router/Url";
import SideBar from "./sideBar";

function GNB() {
  return (
    <SHeaderContainer>
      <SLink to={Page_Url.Main}>Ban:Chic</SLink>
      <SImgContainer src="/logo_triangle_banchic.png" alt="Logo" />
      <SideBar />
    </SHeaderContainer>
  );
}

const SHeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  color: ${theme.color.fontColor};
  white-space: nowrap;
  height: 50px;
  padding: 0 1em;
  @media only screen and (min-width: 768px) {
    padding: 0 5em;
  }
`;

const SImgContainer = styled.img`
  padding: 10px;
  width: 50px;
`;

const SLink = styled(Link)`
  ${theme.font.KumarOneRegular};
  ${theme.color.fontColor}
  font-size: 30px;
  @media only screen and (min-width: 768px) {
    font-size: 1.5em;
  }
`;

export default GNB;
