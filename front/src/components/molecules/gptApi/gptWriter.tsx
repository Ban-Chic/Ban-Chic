import styled from "styled-components";
import theme from "../../../styles/Theme";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import React, { useState, useEffect } from "react";

interface Props {
  description: string | null;
}

function GPTSample({ description }: Props) {
  const [loadingTimedOut, setLoadingTimedOut] = useState(false); // Step 2

  useEffect(() => {
    // Step 3
    const timer = setTimeout(() => {
      setLoadingTimedOut(true);
    }, 20000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SContainer>
        {description ? (
          <SDescription>
            <Typewriter
              words={[description]}
              cursor
              cursorStyle="|"
              typeSpeed={30}
            />
          </SDescription>
        ) : loadingTimedOut ? (
          <div>새로고침을 해주세요.</div>
        ) : (
          <LoadingSpinner />
        )}
      </SContainer>
    </>
  );
}

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const SDescription = styled.div`
  ${theme.font.Body1}
  text-indent: 10px;
`;

export default GPTSample;
