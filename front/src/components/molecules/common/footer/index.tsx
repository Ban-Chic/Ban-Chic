import styled from "styled-components";

function Footer() {
  return <SFooterContainer>푸터</SFooterContainer>;
}

export const SFooterContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  height: 200px;
`;

export default Footer;
