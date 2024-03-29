import { useState } from "react";
import { CallGPT } from "./gpt";
import styled from "styled-components";
import theme from "../../../styles/Theme";

// interface PerfumeData{
//   title: string;
//   summary: string;
//   promotional_copywriting: string;
//   perfume_name: string;

// }

interface IData{
  title: string;
  promotional_copywriting: string;
  evaluates: string;
  description: string;
  perfume_name: string;
}

interface Props {
  perfumeName: string;
  notes: object;
}

function GPTSample(Props: Props) {
  const [data, setData] = useState<IData | null>(null);
  // const [data, setData] = useState<PerfumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () => {
    try {
      setIsLoading(true);
      const message = await CallGPT({
        prompt: `
        perfume Name : ${Props.perfumeName}
        spices of perfume : ${Props.notes}
        `,
      });
      setData(JSON.parse(message));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(">>data", data);

  
  return (
    <>
      <SContainer>
        <SButton onClick={handleClickAPICall}>GPT가 말해주는 향수 설명</SButton>
        {/* <div>perfume_name: {data?.perfume_name}</div> */}
        {/* <div>promotional_copywriting: {data?.promotional_copywriting}</div> */}
        <SDescription>description: {data?.description}</SDescription>
        <div>isLoading : {isLoading ? "loading.." : "fin"}</div>
      </SContainer>
    </>
  );
}

const SContainer = styled.div`
  background-color: gray;
  width: 250px;
`;

const SButton = styled.button`
  background-color: gray;
`;

const SDescription = styled.div`
  ${theme.font.Body1}
`;
export default GPTSample;
