import { motion } from "framer-motion";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import OpacityText from "../../atoms/framer/OpacityText";

function SurveyResultPage() {
  return (
    <>
      <OpacityText
        data={["당신에게 어울리는 향수는?", "뭘까요?", "피 피카츄"]}
      ></OpacityText>
      <SResultContainer>
        <SResult
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></SResult>
      </SResultContainer>
    </>
  );
}

const SResult = styled(motion.article)`
  width: 100%;
  height: 80vh;
  padding: 1em;
  border-radius: 5px;
  margin: 0 10%;
  max-width: 1200px;
  ${theme.styleBase.glassmorphism}
`;

const SResultContainer = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SurveyResultPage;
