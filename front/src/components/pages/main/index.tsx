import styled from "styled-components";
import theme from "../../../styles/Theme";
import FrameSection from "../../atoms/framer/frameSection";

function MainPage() {
  return (
    <>
      <main>
        <SDivContainer>
          <SFisrtLoad>
            <div>
              <FrameSection>
                <SDivKumarWhite>BaBaBA Ed:ge</SDivKumarWhite>
              </FrameSection>
              <FrameSection>
                <SDivKumarWhite>Perfume —</SDivKumarWhite>
              </FrameSection>
            </div>
            <FrameSection>
              <SImgGroup>
                <SImgOne src="/logo_yellow.png" alt="perfume_square" />
                <SImgOne src="/logo_green.png" alt="perfume_square" />
              </SImgGroup>
            </FrameSection>
          </SFisrtLoad>
          <FrameSection>
            <SH1Cascade>
              <SDivKumarWhite>Just Like That</SDivKumarWhite>
            </SH1Cascade>
          </FrameSection>

          <FrameSection>
            <SZIndex1>
              <SImg src="/img_main.png" alt="perfume" />
            </SZIndex1>
          </FrameSection>
        </SDivContainer>
        <FrameSection>
          <SDiv2Container>
            <SPContainer>
              <SSpan>A PERFECT PERFUME WITH NOTHING TO ADD</SSpan>
            </SPContainer>
            <SMiddleSection>
              <SImgFlower src="/main_flower_perfume.jpg" alt="" />
              <FrameSection>
                <SMiddleSquareGroup>
                  <SMiddleSquare src="/logo_orange.png" alt="" />
                  <SMiddleSquare src="/logo_black.png" alt="" />
                </SMiddleSquareGroup>
              </FrameSection>
            </SMiddleSection>
            <SBottomSection>
              <FrameSection>
                <SImgHand src="/main_hand_perfume.jpg" alt="" />
              </FrameSection>
              <FrameSection>
                <SH2Group>
                  <SH2>From our </SH2>
                  <SH2>Orchards to</SH2>
                  <SH2>your Hands</SH2>
                </SH2Group>
              </FrameSection>
            </SBottomSection>
          </SDiv2Container>
        </FrameSection>
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
  background-color: #0038a6;
  height: 136vw;
  padding-top: 24.6vw;
  margin-top: -8vw;
`;

const SDiv4Container = styled.div`
  height: 50vw;
  background-color: white;
`;

const SMiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 450px;
`;

const SBottomSection = styled.div``;

const SDivKumarWhite = styled.span`
  ${theme.font.KumarOneRegular};
  font-size: 90px;
  color: white;
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
  overflow: hidden;
  padding-bottom: 0.2em;
  font-size: 30px;
  z-index: 3;
`;

const SImg = styled.img`
  position: relative;
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
  margin-right: 100px;
  justify-content: end;
  z-index: 3;
`;

const SH2 = styled.h2`
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
