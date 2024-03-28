import styled, { keyframes } from "styled-components";
import theme from "../../../styles/Theme";

function MainPage() {
  return (
    <>
      <main>
        <SDivContainer>
          <SFisrtLoad>
            <div>
              <h1>
                <SDivKumarWhite>BaBaBA Ed:ge</SDivKumarWhite>
              </h1>
              <h1>
                <SDivKumarWhite>Perfume —</SDivKumarWhite>
              </h1>
            </div>
            <SImgGroup>
              <SImgOne src="/logo_yellow.png" alt="perfume_square" />
              <SImgOne src="/logo_green.png" alt="perfume_square" />
            </SImgGroup>
          </SFisrtLoad>
          <SH1Cascade>
            <SDivKumarWhite>Just Like That</SDivKumarWhite>
          </SH1Cascade>
          <SZIndex1>
            <SImg src="/img_main.png" alt="perfume" />
          </SZIndex1>
        </SDivContainer>
        <SDiv2Container>
          <SPContainer>
            <SSpan>A PERFECT PERFUME WITH NOTHING TO ADD</SSpan>
          </SPContainer>
          <SMiddleSection>
            <SImgFlower src="/main_flower_perfume.jpg" alt="" />
            <SMiddleSquareGroup>
              <SMiddleSquare src="/logo_orange.png" alt="" />
              <SMiddleSquare src="/logo_black.png" alt="" />
            </SMiddleSquareGroup>
          </SMiddleSection>
          <SBottomSection>
            <SImgHand src="/main_hand_perfume.jpg" alt="" />
            <SH2Group>
              <SH2>From our </SH2>
              <SH2>Orchards to</SH2>
              <SH2>your Hands</SH2>
            </SH2Group>
          </SBottomSection>
        </SDiv2Container>
        <SDiv3Container></SDiv3Container>
        <SDiv4Container></SDiv4Container>
      </main>
    </>
  );
}

const SDivContainer = styled.div`
  margin-top: 80px;
  height: 550px;
  color: white;
`;
const SDiv2Container = styled.div`
  margin-top: 40px;
  height: 1500px;
  background-color: #fcf1d4;
`;

const SDiv3Container = styled.div`
  /* margin-top: 40px; */
  /* height: 1200px; */
  background-color: #0038a6;
  height: 136vw;
  padding-top: 24.6vw;
  margin-top: -8vw;
`;

const SDiv4Container = styled.div`
  /* margin-top: 40px; */
  /* height: 1200px; */
  height: 50vw;
  background-color: white;
`;

const SMiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
`;

const SBottomSection = styled.div`
  /* display: flex; */
`;

const SDivKumarWhite = styled.span`
  ${theme.font.KumarOneRegular};
  font-size: 90px;
  color: white;
  animation-delay: 0ms;
`;

const SDivKumarBlack = styled.span`
  ${theme.font.KumarOneRegular};
  font-size: 100px;
  color: black;
  animation-delay: 0ms;
`;

const SFisrtLoad = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-evenly;
`;

const SH1Cascade = styled.h1`
  position: absolute;
  margin-left: 170px;
  margin-top: 100px;
  display: block;
  vertical-align: top;
  overflow: hidden;
  padding-bottom: 0.2em;
  font-size: 30px;
  z-index: 3;
`;

const SSecondLoad = styled.div`
  display: flex;
`;

const SImg = styled.img`
  position: relative;
  /* margin-right: 30px; */
  width: 40%;
  height: 40%;
`;

const SImgGroup = styled.div`
  display: flex;
`;

const SImgOne = styled.img`
  position: relative;
  width: 150px;
  height: 150px;
  margin-left: 10px;
  margin-top: 10px;
  z-index: 3;
`;

const SImgFlower = styled.img`
  height: 30em;
  position: absolute;
  margin-left: 170px;
  margin-top: 30px;
  display: block;
  vertical-align: top;
  overflow: hidden;
  padding-bottom: 0.2em;
  z-index: 3;
`;

const SImgHand = styled.img`
  height: 50em;
  position: absolute;
  display: block;
  padding-bottom: 0.2em;
  z-index: 1;
`;

const SZIndex1 = styled.div`
  z-index: 1;
  display: flex;
  justify-content: end;
`;

const SSpan = styled.span`
  color: black;
`;

const SPContainer = styled.p`
  margin-left: 16.666%;
  font-size: 30px;
  color: white;
  width: 300px;
  position: relative;
  padding-left: 0.8%;
  padding-top: 50px;
  padding-right: 0.8%;
`;

const SH2Group = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  /* margin-top: 150px; */
  margin-right: 100px;
  justify-content: end;
  z-index: 3;
`;

const SH2 = styled.h2`
  /* -webkit-transform: translate3d(0, 30vw, 0);
  -moz-transform: translate3d(0, 30vw, 0);
  transform: translate3d(0, 30vw, 0); */
  color: black;
  font-size: 80px;
  display: flex;
  justify-content: end;
  ${theme.font.KumarOneRegular};
`;

const SMiddleSquareGroup = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 150px;
  margin-right: 100px;
`;

const SMiddleSquare = styled.img`
  position: relative;
  width: 150px;
  z-index: 3;
`;

export default MainPage;
