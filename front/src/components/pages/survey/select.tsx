import styled from "styled-components";
import theme from "../../../styles/Theme";
import { SSubTitle } from "../../../styles/Font";
import PursuitBeauty from "../../../utils/PursuitBeauty";
import { motion } from "framer-motion";
import useSurvey from "../../../hooks/survey/useSurvey";
import API from "../../../api/Config";
import { StyleRanges, Styles } from "../../../utils/PursuitStyleRanges";
import { postSurvey } from "../../../api/Api";

function SurveyPage() {
  const [data, selectPursuit] = useSurvey();

  const onClickHandler = () => {
    // styleRanges 객체를 순회하면서 각 스타일에 대해 data 배열에 해당 범위의 숫자가 있는지 검사
    Object.entries(StyleRanges).forEach(([style, range]) => {
      const [min, max] = range;
      Styles[style] = data.some((num: number) => num >= min && num <= max);
    });

    // API 호출에 styles 객체 사용
    postSurvey(Styles).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <SContainer>
        <SSurveyContainer>
          <SSubTitle>선택해주세요</SSubTitle>
        </SSurveyContainer>
        <SSubTitle>나의 추구미</SSubTitle>
        <SPursuitBeautyContainer
          variants={FContainer}
          initial="hidden"
          animate="visible"
        >
          {PursuitBeauty.map((item, i) => (
            <SPursuitBlock
              key={i}
              onClick={async () => {
                selectPursuit(i);
              }}
              variants={FVariantitem}
            >
              {item}
            </SPursuitBlock>
          ))}
        </SPursuitBeautyContainer>
        <button onClick={() => onClickHandler()}>제출</button>
      </SContainer>
    </>
  );
}

const SPursuitBlock = styled(motion.button)`
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

const SPursuitBeautyContainer = styled(motion.section)`
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
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  gap: 2em;
`;

const FContainer = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.04,
    },
  },
};

const FVariantitem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default SurveyPage;
