import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../../styles/Theme";
import { SSubTitle } from "../../../styles/Font";
import PursuitBeauty from "../../../utils/PursuitBeauty";

function SurveyPage() {
  return (
    <>
      <SContainer>
        <SSurveyContainer>
          <SSubTitle>선택해주세요</SSubTitle>
        </SSurveyContainer>
        <SSubTitle>나의 추구미</SSubTitle>
        <SPursuitBeautyContainer>
          {PursuitBeauty.map((item) => (
            <SPursuitBlock to="">{item}</SPursuitBlock>
          ))}
        </SPursuitBeautyContainer>
      </SContainer>
    </>
  );
}

const SPursuitBlock = styled(Link)`
  background-color: blue;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  ${theme.styleBase.glassmorphism}
  &:hover {
    transition: all 0.2s;
    transform: scale(1.05);
  }
`;

const SPursuitBeautyContainer = styled.section`
  width: 700px;
  height: 500px;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 2.5em);
  grid-auto-flow: row;
  &:nth-child(1) {
    grid-row: 1 / span 5;
  }
`;

const SSurveyContainer = styled.figure`
  width: 20em;
  height: 5em;
  border-radius: 0.5em;
  ${theme.styleBase.glassmorphism}
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const SContainer = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  gap: 2em;
`;

export default SurveyPage;
