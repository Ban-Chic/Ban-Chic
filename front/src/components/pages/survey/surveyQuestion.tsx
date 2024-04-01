import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";

function SurveyQuestionPage() {
  const [roundOne, setRoundOne] = useState(true); // 첫 번째 라운드는 기본적으로 표시
  const [roundTwo, setRoundTwo] = useState(false);
  const [roundThree, setRoundThree] = useState(false);

  // 각 라운드의 버튼 클릭 핸들러
  const handleRoundOne = () => {
    setRoundTwo(true);
    setRoundOne(false); // 첫 번째 라운드 숨김
  };

  const handleRoundTwo = () => {
    setRoundThree(true);
    setRoundTwo(false); // 두 번째 라운드 숨김
  };

  // 라운드 Three에 대한 핸들러가 필요한 경우 여기에 추가
  return (
    <AnimatePresence mode="wait">
      <SResultContainer>
        {roundOne && (
          <SResult>
            <SQuestionBox>
              <Typewriter
                words={["나는 죽었따"]}
                cursor
                cursorStyle="|"
                typeSpeed={20}
              />
            </SQuestionBox>

            <SButtonBox>
              <SFButton
                initial={{
                  translateX: -1000,
                  translateY: -1000,
                  translateZ: -1000,
                  rotateZ: -180,
                }}
                animate={{
                  translateX: 0,
                  translateY: 0,
                  translateZ: 0,
                  rotateZ: 0,
                }}
                exit={{
                  translateX: -1000,
                  translateY: -1000,
                  translateZ: -1000,
                  rotateZ: -180,
                }}
                onClick={handleRoundOne}
              >
                버튼1
              </SFButton>
              <SFButton
                initial={{
                  translateX: 1000,
                  translateY: -1000,
                  translateZ: -1000,
                  rotateZ: 180,
                }}
                animate={{
                  translateX: 0,
                  translateY: 0,
                  translateZ: 0,
                  rotateZ: 0,
                }}
                exit={{
                  translateX: 1000,
                  translateY: -1000,
                  translateZ: -1000,
                  rotateZ: 180,
                }}
                onClick={handleRoundOne}
              >
                버튼2
              </SFButton>
            </SButtonBox>
          </SResult>
        )}
        {roundTwo && (
          <SResult>
            라운드2
            <SFButton onClick={handleRoundTwo}>버튼1</SFButton>
            <SFButton onClick={handleRoundTwo}>버튼2</SFButton>
          </SResult>
        )}
        {roundThree && (
          <SResult>
            라운드3
            {/* roundThree의 버튼 핸들러를 구현 */}
          </SResult>
        )}
      </SResultContainer>
    </AnimatePresence>
  );
}

const SFButton = styled(motion.button)`
  width: 100%;
  background-color: red;
  border-radius: 5px;
  margin: 10px;
`;

const SQuestionBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButtonBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const SResult = styled(motion.article)`
  width: 100%;
  height: 80vh;
  padding: 1em;
  border-radius: 5px;
  margin: 0 10%;
  max-width: 1200px;
  ${theme.styleBase.glassmorphism}
  display: flex;
  flex-direction: column;
`;

const SResultContainer = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SurveyQuestionPage;
