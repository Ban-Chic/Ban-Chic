import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import theme from "../../../styles/Theme";
import { useNavigate } from "react-router";
import Page_Url from "../../../router/Url";

function LandingPage() {
  const [currentText, setCurrentText] = useState("");
  const [on, setOn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentText("매력있는 내가");

    const timer1 = setTimeout(() => {
      setCurrentText("향수까지 뿌리면?");

      const timer2 = setTimeout(() => {
        setCurrentText("Ban:Chic");

        const timer3 = setTimeout(() => {
          setOn(false);
          navigate(Page_Url.Main);
        }, 3000);
        return () => clearTimeout(timer3);
      }, 2000);

      return () => clearTimeout(timer2);
    }, 1000);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <SContainer>
      {on && (
        <FSTitle
          key={currentText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 50 }}
        >
          {currentText}
        </FSTitle>
      )}
    </SContainer>
  );
}

const FSTitle = styled(motion.div)`
  ${theme.font.KumarOneOutline}
  font-size: 24px;
  position: absolute;
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

export default LandingPage;
