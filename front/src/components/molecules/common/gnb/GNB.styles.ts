import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../../../styles/Theme";

export const SHeaderContainer = styled.nav`
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

export const SImgContainer = styled.img`
  padding: 10px;
  width: 50px;
`;

export const SLink = styled(Link)`
  ${theme.font.KumarOneRegular};
  ${theme.color.fontColor}
  font-size: 30px;
  @media only screen and (min-width: 768px) {
    font-size: 1.5em;
  }
`;
