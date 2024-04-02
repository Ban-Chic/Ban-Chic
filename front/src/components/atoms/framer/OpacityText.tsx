import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import theme from "../../../styles/Theme";

interface Props {
  data: string[];
  start?: (s: boolean) => void;
}

function OpacityText({ data, start }: Props) {
  const [currentText, setCurrentText] = useState("");
  const [on, setOn] = useState(true);

  useEffect(() => {
    setCurrentText(data[0]);

    const timer1 = setTimeout(() => {
      setCurrentText(data[1]);

      const timer2 = setTimeout(() => {
        setCurrentText(data[2]);

        const timer3 = setTimeout(() => {
          if (start) start(true);
          setOn(false);
        }, 2000);
        return () => clearTimeout(timer3);
      }, 2000);

      return () => clearTimeout(timer2);
    }, 2000);

    return () => clearTimeout(timer1);
  }, []);

  if (on)
    return (
      <SContainer exit={{ opacity: 0 }}>
        <FSTitle
          key={currentText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 50 }}
        >
          {currentText}
        </FSTitle>
      </SContainer>
    );
}

const FSTitle = styled(motion.div)`
  ${theme.font.PretendardLight}
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

export default OpacityText;
