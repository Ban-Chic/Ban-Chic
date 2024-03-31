import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";
import { STitle } from "../../../styles/Font";

function SurveyLandingPage() {
  return (
    <>
      <SContainer variants={FContainer} initial="hidden" animate="visible">
        <SSelectButton as={Link} to={Page_Url.SurveyImage} $url={"/test1.png"}>
          <SDiv $url={"/test2.png"} />
          <STitleDiff>이미지 기반 추천</STitleDiff>
        </SSelectButton>

        <SSelectButton
          as={Link}
          to={Page_Url.SurveySwipe}
          $url={"/test5.png"}
          initial={{ opacity: 0, translateY: -300 }}
          animate={{ opacity: 1, translateY: 0 }}
        >
          <SDiv $url={"/test6.png"} />
          <STitleDiff>질문 기반 추천</STitleDiff>
        </SSelectButton>
        <SSelectButton
          as={Link}
          to={Page_Url.SurveySelect}
          $url={"/test7.png"}
          initial={{ opacity: 0, translateY: -300 }}
          animate={{ opacity: 1, translateY: 0 }}
        >
          <SDiv $url={"/test9.png"} />
          <STitleDiff>추구미 기반 추천</STitleDiff>
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

const SSelectButton = styled(motion.div)<{ $url: string }>`
  background-image: url(${(props) => props.$url});
  width: 20em;
  height: 30em;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
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
`;

const SContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const FContainer = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 1,
      staggerChildren: 1,
    },
  },
};

export default SurveyLandingPage;
