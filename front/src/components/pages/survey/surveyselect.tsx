import styled from "styled-components";
import theme from "../../../styles/Theme";
import { SSubTitle } from "../../../styles/Font";
import PursuitBeauty from "../../../utils/PursuitBeauty";
import { motion, useDragControls } from "framer-motion";
import useSurvey from "../../../hooks/survey/useSurvey";
import { StyleRanges, Styles } from "../../../utils/PursuitStyleRanges";
import { postSurvey } from "../../../api/Api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Page_Url from "../../../router/Url";
import LoadingSpinner from "../../../utils/LoadingSpinner";

function SurveySelectPage() {
  const [data, selectPursuit] = useSurvey();
  const [selected, setSelected] = useState<number[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickHandler = () => {
    setLoad(true);
    // styleRanges 객체를 순회하면서 각 스타일에 대해 data 배열에 해당 범위의 숫자가 있는지 검사
    Object.entries(StyleRanges).forEach(([style, range]) => {
      const [min, max] = range;
      Styles[style] = data.some((num: number) => num >= min && num <= max);
    });
    // API 호출에 styles 객체 사용
    postSurvey(Styles)
      .then(() => {
        navigate(Page_Url.SurveyResult);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // 개별 버튼 클릭 핸들러
  const handleSelect = (index: number) => {
    selectPursuit(index);
    setSelected((prevSelected) => {
      // 이미 선택된 아이템이면 제거, 아니면 추가
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  // 선택 여부를 판단하는 함수
  const isSelected = (index: number) => selected.includes(index);
  const controls = useDragControls();
  const constraintsRef = useRef(null);
  return (
    <>
      <SContainer ref={constraintsRef}>
        <SSubTitle>나의 추구미</SSubTitle>
        <SPursuitBeautyContainer
          variants={FContainer}
          initial="hidden"
          animate="visible"
        >
          {PursuitBeauty.map((item, i) => (
            <SPursuitBlock
              key={i}
              isSelected={isSelected(i)}
              onClick={async () => {
                handleSelect(i);
              }}
              variants={FVariantitem}
              drag={true}
              dragControls={controls}
              dragConstraints={constraintsRef}
            >
              {item}
            </SPursuitBlock>
          ))}
        </SPursuitBeautyContainer>
        {load && (
          <SAb>
            <LoadingSpinner />
          </SAb>
        )}
        <SButton disabled={data.length === 0} onClick={() => onClickHandler()}>
          제출
        </SButton>
      </SContainer>
    </>
  );
}

const SAb = styled.div`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
`;

const SButton = styled(motion.button)`
  padding: 1em 4em;
  background-color: ${theme.color.actionColor};
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  &:disabled {
    background-color: #707070;
    color: #909090;
  }
`;

const SPursuitBlock = styled(motion.button)<{ isSelected?: boolean }>`
  background-color: ${(props) =>
    props.isSelected ? theme.color.successColor : "transparent"};
  color: ${(props) => (props.isSelected ? theme.color.bgColor : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(0.5px);
  border: ${(props) =>
    props.isSelected
      ? "5px soild rgb(255, 255, 255)"
      : "3px solid rgba(255, 255, 255, 0.18)"};
  transition: all 0.2s;
  padding: 10px;
  white-space: nowrap;
  &:hover {
    transform: scale(1.2);
  }
`;

const SPursuitBeautyContainer = styled(motion.section)`
  display: grid;
  gap: 1em;
  &:nth-child(1) {
    grid-row: 1 / span 5;
  }
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  @media only screen and (min-width: 768px) {
    width: 700px;
    height: 500px;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 2.5em);
    grid-auto-flow: row;
  }
`;

const SContainer = styled(motion.article)`
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

export default SurveySelectPage;
