import styled from "styled-components";

function GNB() {
  return <HeaderContainer>헤더</HeaderContainer>;
}

const HeaderContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  height: 44px;
`;

export default GNB;
