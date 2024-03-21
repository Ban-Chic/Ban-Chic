import styled from "styled-components";

function Footer() {
  return (
    <>
      <SFooterContainer>
        <SUlContainer>
          <li>HOME</li>
          <li>FACEBOOK</li>
          <li>INSTAGRAM</li>
        </SUlContainer>
      </SFooterContainer>
      <SImg src="/footerLogo.svg" alt="" />
    </>
  );
}

export const SFooterContainer = styled.nav`
  display: block;
  position: relative;
  /* justify-content: space-between; */
  width: 89.8vw;
  margin: auto;
  left: 0;
  right: 0;
  padding-right: 5rem;
  padding-left: 5rem;
  align-items: center;
  background-color: transparent;
  /* height: 100%; */
  color: #f2f2f2;
`;

const SUlContainer = styled.nav`
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

const SImg = styled.img`
  padding: 4rem;
  width: 100%;
`;


export default Footer;
