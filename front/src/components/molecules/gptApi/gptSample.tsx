import { useState } from "react";
import { CallGPT } from "./gpt";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { Typewriter } from "react-simple-typewriter";

interface IData {
  title: string;
  promotional_copywriting: string;
  evaluates: string;
  description: string;
}

interface Props {
  perfumeName: string;
  notes: string;
  description: string;
}

function GPTSample({
  perfumeName,
  notes,
  // , description
}: Props) {
  const [data, setData] = useState<IData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `
        perfume Name : ${perfumeName}
        spices of perfume : ${notes}
        `,
      });
      setData(JSON.parse(message));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SContainer>
        <SButton onClick={handleClickAPICall}>GPT가 말해주는 향수 설명</SButton>
        {data?.description ? (
          <SDescription>
            description:
            <Typewriter
              words={[data.description]}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              // deleteSpeed={50}
              // delaySpeed={1000}
            />
          </SDescription>
        ) : null}
        <div>isLoading : {isLoading ? "loading.." : "fin"}</div>
      </SContainer>

      {/* 수정 */}
      {/* <SContainer>
        {description ? (
          <SDescription>
            description:
            <Typewriter
              words={[description]} // `description` prop을 사용합니다.
              cursor
              cursorStyle="|"
              typeSpeed={70}
            />
          </SDescription>
        ) : (
          // description이 null일 때 대체 텍스트 또는 로딩 인디케이터를 표시할 수 있습니다.
          <SDiv>Loading description...</SDiv>
        )}
      </SContainer> */}
    </>
  );
}

const SContainer = styled.div`
  background-color: gray;
  width: 100%;
  height: 100%;
`;

const SButton = styled.button`
  background-color: gray;
`;

const SDescription = styled.div`
  ${theme.font.Body1}
`;

// const SDiv = styled.div`
//   color: white;
// `;
export default GPTSample;
