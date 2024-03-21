import styled from "styled-components";

function PerfumeDetailPage() {
  return (
    <>
      <SContainer>
        <SInnerContainer>
          <SImgContainer src="/img_perfume_sample.png" alt="logo" />
          <SContent>PerfumeName_English</SContent>
        </SInnerContainer>
        <SInnerContainer>
          <SContent>1</SContent>
          <SContent>2</SContent>
          <SContent>3</SContent>
        </SInnerContainer>
        <SInnerContainer>
          <SContent>ㅎㅇㅎ</SContent>
          <SContent>ㅎㅇㅎ</SContent>
        </SInnerContainer>
      </SContainer>
    </>
  );
}

export const SContainer = styled.nav`
  /* color: white; */
  display: flex;
  flex-direction: row;
  padding: 3rem;
  background-color: white;
`;

const SInnerContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`;

const SContent = styled.nav`
  /* background-color: white; */
  border: 2px solid black;
  justify-content: center;
`;

const SImgContainer = styled.img`
  padding: 10px;
  width: 100%;
`;

const SSpan = styled.span`
  /* background-color: white; */
  color: black;
  font-size: 2rem;
`;

export default PerfumeDetailPage;
