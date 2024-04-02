import { motion } from "framer-motion";
import styled from "styled-components";
import { SSubTitle, STitle } from "../../../styles/Font";
import useRecommended from "../../../hooks/recommed/useRecommended";
import { useState } from "react";
import PerfumeSummary from "../../molecules/detail/perfume";
import { useLocation } from "react-router-dom";
import useScrollTop from "../../../hooks/feat/useScrollTop";

interface Props {
  title?: string;
  //   data: Perfume[];
}

interface Perfume {
  id: number;
  perfumeName: string;
  perfumeImg: string;
  brandName: string;
  accords: string;
}

function SurveyResultPage({ title = "나와 어울리는 향수! TOP 10" }: Props) {
  const { data: result } = useRecommended();
  const [toggle, setToggle] = useState(false);
  const [perfumeI, setPerfumeI] = useState<number>();
  const top = useScrollTop();
  const location = useLocation();
  const fashion = location?.state?.fashion;
  const handlerClick = (id: number) => {
    if (id === perfumeI) {
      setToggle(!toggle);
    } else {
      top();
      setPerfumeI(id);
      setToggle(true);
    }
  };

  return (
    <SResultContainer>
      <STitle>{title}</STitle>
      {fashion && <SSubTitle>{fashion} 스타일인 나에게?</SSubTitle>}
      <SFlexWrap>
        {toggle && perfumeI && (
          <SResult
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PerfumeSummary pid={perfumeI}></PerfumeSummary>
          </SResult>
        )}
        <SResult
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SList layout>
            {result?.data?.data.map((item: Perfume, index: number) => (
              <SListItem key={index} onClick={() => handlerClick(item.id)}>
                <SImage $url={item.perfumeImg}></SImage>
                <SFlexWrap>
                  <SSubTitle> {item.perfumeName}</SSubTitle>
                  <SAccordList>
                    {Object.keys(JSON.parse(item.accords)).map((acc) => (
                      <SAccord key={acc} $name={acc}></SAccord>
                    ))}
                  </SAccordList>
                </SFlexWrap>
              </SListItem>
            ))}
          </SList>
        </SResult>
      </SFlexWrap>
    </SResultContainer>
  );
}

const SAccord = styled.div<{ $color?: string; $name: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  position: relative;
  background-color: ${(props) => (props.$color ? props.$color : "white")};
  cursor: pointer;

  &:hover::after {
    content: "${(props) => props.$name}"; // 호버 시 표시할 이름
    position: absolute;
    top: -300%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background-color: #f2f2f2;
    color: black;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8em;
    z-index: 100;
  }
`;

const SAccordList = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
  @media only screen and (min-width: 768px) {
    max-width: 20%;
  }
`;

const SImage = styled(motion.div)<{ $url: string }>`
  background-image: url(${(props) => props.$url});
  min-width: 40px;
  border: 2px solid #f2f2f2;
  position: relative;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 2.5em;
  @media only screen and (min-width: 768px) {
    width: 2.5em;
  }
`;

const SListItem = styled(motion.div)`
  border: 2px solid #e2e2e2;
  padding: 1em;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media only screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;

const SList = styled(motion.div)`
  border: 2px solid #e2e2e2;
  padding: 1em;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  overflow-y: hidden;
  border-radius: 5px;
  &:hover {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const SResult = styled(motion.article)`
  width: 100%;
  height: 80vh;
  padding: 1em;
  border-radius: 5px;
  max-width: 1200px;
  border: 2px solid #e2e2e2;
  transition: 1s ease-in-out;
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
`;

const SFlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }
`;

const SFlexWrap = styled(motion.article)`
  display: flex;
  gap: 1em;
  width: 100%;
  padding: 0 10%;
  flex-direction: row;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SResultContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
`;

export default SurveyResultPage;
