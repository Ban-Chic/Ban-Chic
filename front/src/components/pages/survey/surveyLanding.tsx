import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";
import { STitle } from "../../../styles/Font";

function SurveyLandingPage() {
  return (
    <>
      <SContainer
        variants={FContainer}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <SSelectButton
          as={Link}
          to={Page_Url.SurveyImage}
          $url={"/test1.png"}
          variants={FVariantitem}
          initial="hidden"
          animate="visible"
          exit="exit"
          contents="내 스타일과 어울리는 향수를 추천 받아보세요"
        >
          <SDiv $url={"/test2.png"} />
          <STitleDiff>내 착장 기반 추천</STitleDiff>
        </SSelectButton>

        <SSelectButton
          as={Link}
          to={Page_Url.SurveySelect}
          $url={"/test7.png"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={FVariantitem}
          contents="나의 추구미와 어울리는 향수를 추천 받아보세요"
        >
          <SDiv $url={"/test9.png"} />
          <STitleDiff>추구미 기반 추천</STitleDiff>
        </SSelectButton>

        <SSelectButton
          as={Link}
          to={Page_Url.SurveySwipe}
          $url={"/test5.png"}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={FVariantitem}
          contents="나와 어울리는 향수를 추천 받아보세요"
        >
          <SDiv $url={"/test6.png"} />
          <STitleDiff>질문 기반 추천</STitleDiff>
        </SSelectButton>
      </SContainer>
    </>
  );
}
const STitleDiff = styled(STitle)`
  text-shadow:
    -2px -2px 0 #000,
    2px -2px 0 #000,
    -2px 2px 0 #000,
    2px 2px 0 #000;
`;

const SDiv = styled(motion.div)<{ $url: string }>`
  background-image: url(${(props) => props.$url});
  width: 20em;
  height: 30em;
  background-position: center;
  background-size: cover;
  position: absolute;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const SSelectButton = styled(motion.div)<{ $url: string; contents: string }>`
  background-image: url(${(props) => props.$url});
  width: 20em;
  height: 30em;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(0.98);
  }
  & > :not(:first-child) {
    padding: 1em;
  }
  @media only screen and (min-width: 768px) {
    &:hover::after {
      content: "${(props) => props.contents}";
      position: absolute;
      bottom: -10%;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background-color: #f2f2f2;
      color: black;
      padding: 5px;
      border-radius: 5px;
      font-size: 0.8em;
    }
  }
  @media only screen and (max-width: 768px) {
    &::after {
      content: "${(props) => props.contents}";
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      background-color: #f2f2f2;
      color: black;
      padding: 5px;
      border-radius: 5px;
      font-size: 0.8em;
    }
  }
`;

const SContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  margin: 3em 0;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const FContainer = {
  hidden: { opacity: 0, translateY: 100 },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      delayChildren: 1,
      staggerChildren: 1,
    },
  },
  exit: {
    translateY: -100,
    opacity: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 20 },
  },
};

const FVariantitem = {
  hidden: { opacity: 0, translateY: -300 },
  visible: {
    translateY: 0,
    opacity: 1,
  },
  exit: {
    translateY: -100,
    opacity: 0,
    transition: { duration: 0.5, type: "spring", stiffness: 300, damping: 20 },
  },
};

export default SurveyLandingPage;
