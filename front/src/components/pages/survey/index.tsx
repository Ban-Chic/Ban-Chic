import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import theme from "../../../styles/Theme";

function SurveySelectPage() {
  // 상태를 문자열로 관리하여 현재 어떤 텍스트를 보여줄지 결정합니다.
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    // 초기 상태를 'Ready?'로 설정합니다.
    setCurrentText("HI");

    // 2초 후에 상태를 'Ready?Ready?Ready?Ready?Ready?'로 변경합니다.
    const timer1 = setTimeout(() => {
      setCurrentText("dundigi");

      // 추가적으로 3초 후에 상태를 'START'로 변경합니다.
      const timer2 = setTimeout(() => {
        setCurrentText("perfume scam");
      }, 2000);

      return () => clearTimeout(timer2);
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <SContainer>
      <AnimatePresence>
        <FSTitle
          key={currentText} // Key를 현재 텍스트로 설정하여 각 상태를 구분합니다.
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
        >
          {currentText}
        </FSTitle>
      </AnimatePresence>
    </SContainer>
  );
}

const FSTitle = styled(motion.div)`
  ${theme.font.KumarOneOutline}
  font-size: 24px;
  position: relative;
`;

const SContainer = styled(motion.section)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  gap: 2em;
`;

export default SurveySelectPage;
