import styled from "styled-components";

function Footer() {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  };

  return (
    <>
      <SFooterContainer>
        <SDiv>
          <SInner>TEAM Blo9</SInner>
          <SInner>Copyright © BANCHIC. ALL RIGHTS RESERVED</SInner>
          <SInner>
            <SButton onClick={goToTop}>BACK TO TOP</SButton>
          </SInner>
        </SDiv>
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
  margin-top: 50px;
  align-items: center;
  background-color: transparent;
  /* height: 100%; */
  color: #f2f2f2;
`;

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SInner = styled.div``;

const SUlContainer = styled.nav`
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

const SImg = styled.img`
  /* padding: 5rem; */
  height: 300px;
  width: 100%;
`;

const SButton = styled.button`
`;

export default Footer;
