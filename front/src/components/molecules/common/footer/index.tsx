import styled from "styled-components";
import theme from "../../../../styles/Theme";
import useScrollTop from "../../../../hooks/feat/useScrollTop";

function Footer() {
  const GoToTop = useScrollTop();
  return (
    <SFooterContainer>
      <SDiv>
        <SBody2NoWrap>TEAM Blo9</SBody2NoWrap>
        <SBody2NoWrap>Copyright © BANCHIC. ALL RIGHTS RESERVED</SBody2NoWrap>
        <SBody2NoWrap as={"button"} onClick={GoToTop}>
          BACK TO TOP
        </SBody2NoWrap>
      </SDiv>
      <SImg src="/footerLogo.svg" alt="" />
    </SFooterContainer>
  );
}

const SBody2NoWrap = styled.h1`
  white-space: nowrap;
  ${theme.font.PretendardRegular}
  font-size: 12px;
  transition: all 0.1s ease-in-out;
`;

export const SFooterContainer = styled.nav`
  margin: auto;
  padding: 1em;
  align-items: center;
  background-color: transparent;
  color: #f2f2f2;
`;

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
  transition: all 0.1s ease-in-out;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const SImg = styled.img`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;

export default Footer;
