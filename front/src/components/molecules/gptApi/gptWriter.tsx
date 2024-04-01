import styled from "styled-components";
import theme from "../../../styles/Theme";
import { Typewriter } from "react-simple-typewriter";
import LoadingSpinner from "../../../utils/LoadingSpinner";

interface Props {
  description: string | null;
}

function GPTSample({ description }: Props) {
  return (
    <>
      <SContainer>
        {description ? (
          <SDescription>
            <Typewriter
              words={[description]}
              cursor
              cursorStyle="|"
              typeSpeed={10}
            />
          </SDescription>
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
