import styled from "styled-components";
import theme from "../../../styles/Theme";
import GPTSample from "../../molecules/gptApi/gptWriter";
import { HeartFilled } from "@ant-design/icons";

import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";

import RadarChartContainer from "../../molecules/charts/radarChart";
import NoteGroup from "../../molecules/detail/noteGroup";
import useGetPerfumeDetail from "../../../hooks/info/useGetDetail";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import useGetHeart, { useUpdateHeart } from "../../../hooks/heart/useGetHeart";
import { SSubTitle } from "../../../styles/Font";
import TempReviewBox from "../../molecules/detail/tempReviewBox";
import useGetPerfumeReviews from "../../../hooks/review/useGetPerfumeReviews";
import { useEffect, useState } from "react";
import { CallGPT } from "../../molecules/gptApi/gpt";

function PerfumeDetail() {
  const { perfumeId } = useParams() as { perfumeId: string };
  // const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isError, error } = useGetPerfumeDetail(perfumeId);
  const { data: hearts } = useGetHeart(perfumeId);
  const postHeart = useUpdateHeart(perfumeId);
  const { data: reviews } = useGetPerfumeReviews(perfumeId);
  const [gptDescription, setGptDescription] = useState<string | null>(null);
  const [gptDescriptionFetched, setGptDescriptionFetched] = useState(false);

  const heartMutation = () => {
    postHeart.mutate();
  };

  useEffect(() => {
    const fetchGptDescription = async () => {
      try {
        if (data && !gptDescriptionFetched) {
          const message = await CallGPT({
            prompt: `
              perfume Name: ${data.data.perfumeName}
              spices of perfume: ${data.data.notes}
            `,
          });
          const { description } = JSON.parse(message);
          setGptDescription(description);
          setGptDescriptionFetched(true);
        }
      } catch (error) {
        console.error("GPT 호출 실패", error);
      }
    };

    fetchGptDescription();
  }, [data, gptDescriptionFetched]);

  // 로딩 화면
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>{error.message}</>;
  if (data && hearts && reviews)
    return (
      <>
        <SDetailContainer>
          <SBlock>
            {isLoading && <LoadingSpinner />}
            {data && <SImg $ImgUrl={data.data.perfumeImg} />}
            <SLikeButton onClick={() => heartMutation()}>
              <HeartFilled
                style={
                  hearts?.data
                    ? { color: "red", fontSize: "30px" }
                    : { color: "gray", fontSize: "30px" }
                }
              />
            </SLikeButton>
          </SBlock>
          <SBlock>
            <RadarChartContainer season={data.data.season} />
          </SBlock>
          <SBlock>
            <GPTSample description={gptDescription} />
          </SBlock>
          <SBlock>
            <SSubTitle>Spices</SSubTitle>
            {JSON.parse(data.data.notes)["TopNotes"] && (
              <SNote>
                <SNoteCate>Top Notes</SNoteCate>
                <NoteGroup notes={JSON.parse(data.data.notes)["TopNotes"]} />
              </SNote>
            )}
            {JSON.parse(data.data.notes)["MiddleNotes"] && (
              <SNote>
                <SNoteCate>Middle Notes</SNoteCate>
                <NoteGroup notes={JSON.parse(data.data.notes)["MiddleNotes"]} />
              </SNote>
            )}
            {JSON.parse(data.data.notes)["BaseNotes"] && (
              <SNote>
                <SNoteCate>Base Notes</SNoteCate>
                <NoteGroup notes={JSON.parse(data.data.notes)["BaseNotes"]} />
              </SNote>
            )}
          </SBlock>
          <SBlock>
            {/* <SParent
              layout
              isOpenCheck={isOpen}
              initial={{ borderRadius: 50 }}
              onClick={() => setIsOpen(!isOpen)}
              transition={{
                opacity: { ease: "linear" },
                layout: { duration: 0.6 },
              }}
            > */}
            {/* <ReviewPage /> */}
            {/* </SParent> */}

            <TempReviewBox data={reviews}>
              <SReviewDiv>
                <SSubTitle>Review</SSubTitle>
                <button>리뷰등록</button>
              </SReviewDiv>
            </TempReviewBox>
          </SBlock>
          <SBlock>
            <SPerfumeName> {data.data.perfumeName}</SPerfumeName>
            <SPerfumeName> {data.data.koreanName}</SPerfumeName>
          </SBlock>
        </SDetailContainer>
      </>
    );
}

const SDetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(400px, 1fr);
  gap: 0.5em;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0.5em;
  position: relative;
  background-color: #707070;
  border-radius: 5px;

  @media only screen and (min-width: 768px) {
    height: calc(100vh - 50px);
    padding: 1.5em;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
`;

const SBlock = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  ${theme.styleBase.glassmorphism}
  border:2px solid #e2e2e2;
  border-radius: 5px;
  flex-direction: column;
  &:nth-child(3) {
    grid-row: 5;
    display: flex;
  }
  &:nth-child(6) {
    grid-row: 2;
    padding: 1em 0;
  }
  @media only screen and (min-width: 768px) {
    &:nth-child(1) {
      grid-column: 1 / span 2;
      grid-row: 1 / span 5;
    }
    &:nth-child(2) {
      grid-column: 3 / span 2;
      grid-row: 1 / span 3;
      flex-direction: row;
    }
    &:nth-child(4) {
      grid-column: 3 / span 2;
      grid-row: 4 / span 3;
      display: flex;
      justify-content: space-around;
    }
    &:nth-child(3) {
      grid-column: 5 / span 2;
      grid-row: 1 / span 2;
      display: flex;
      overflow-y: hidden;
      &:hover {
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &:nth-child(5) {
      grid-column: 5 / span 2;
      grid-row: 3 / span 4;
      overflow-y: hidden;
      &:hover {
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &:nth-child(6) {
      grid-column: 1 / span 2;
      grid-row: 6;
      display: flex;
      justify-content: center;
    }
  }
`;

const SImg = styled.div<{ $ImgUrl: string }>`
  border-radius: 5px;
  border: 5px solid #cccccc;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$ImgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const SNote = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0.2em;
`;

const SNoteCate = styled.div`
  ${theme.font.Title};
  font-size: 12px;
`;

const SPerfumeName = styled.div`
  ${theme.font.Title};
  font-size: 14px;
  margin: 0 auto;
  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const SLikeButton = styled.button`
  position: absolute;
  z-index: 3;
  top: 1em;
  right: 1em;
`;

// const SParent = styled(motion.div)<{ isOpenCheck: boolean }>`
//   background: white;
//   width: ${(props) => (props.isOpenCheck ? "45.9%" : "100%")};
//   height: ${(props) => (props.isOpenCheck ? "86.5%" : "100%")};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: ${(props) => (props.isOpenCheck ? "fixed" : "static")};
//   z-index: 1;
//   top: ${(props) => (props.isOpenCheck ? "9%" : "0%")};
//   right: ${(props) => (props.isOpenCheck ? "16%" : "0%")};
//   background-color: darkgreen;
//   color: black;
// `;

const SReviewDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default PerfumeDetail;
