import styled from "styled-components";
import { useState, useEffect } from "react";
import theme from "../../../styles/Theme";
import GPTSample from "../../molecules/gptApi/gptSample";
import { HeartFilled } from "@ant-design/icons";
import {
  getLike,
  getPerfumeDetail,
  getPerfumeReviews,
  postLike,
} from "../../../api/Api";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import RadarChartContainer from "../../molecules/charts/radarChart";
import NoteGroup from "../../molecules/detail/noteGroup";
import { Link } from "react-router-dom";
import { CallGPT } from "../../molecules/gptApi/gpt";

interface Props {
  data: {
    id: number;
    perfumeName: string;
    perfumeImg: string;
    brandName: string;
    brandImg: string;
    notes: string;
    accords: string;
    year: number;
    bestRate: number;
    rate: number;
    sillage: object;
    longevity: object;
    price: object;
    gender: object;
    season: Season;
    hearts: number;
    koreanName: string;
  } | null;
}
interface PerfumeDetailResponse {
  id: number;
  perfumeName: string;
  perfumeImg: string;
  brandName: string;
  brandImg: string;
  notes: string;
  accords: string;
  year: number;
  bestRate: number;
  rate: number;
  sillage: object;
  longevity: object;
  price: object;
  gender: object;
  season: Season;
  hearts: number;
  koreanName: string;
}
interface Season {
  spring: number;
  summer: number;
  fall: number;
  winter: number;
  day: number;
  night: number;
}
interface ParsedNotes {
  TopNotes?: string;
  MiddleNotes?: string;
  BaseNotes?: string;
}

function PerfumeDetail() {
  const { perfumeId } = useParams() as { perfumeId: string };
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Props["data"]>(null);
  const [isLike, setIsLike] = useState(false);
  const [parsedNotes, setParsedNotes] = useState<ParsedNotes>({});
  const [gptDescription, setGptDescription] = useState<string | null>(null);

  useEffect(() => {
    //향수 상세 조회
    getPerfumeDetail(perfumeId).then((response) => {
      const fetchedData = response.data.data as PerfumeDetailResponse;
      const parsedNotes = JSON.parse(fetchedData.notes);

      setData(fetchedData);
      setParsedNotes(parsedNotes);

      console.log("gpt설명");
      console.log(gptDescription);
       // 이미 memo에 저장된 description이 없는 경우에만 API 호출
       if (!gptDescription) {
        CallGPT({
          prompt: `
            perfume Name: ${fetchedData.perfumeName}
            spices of perfume: ${fetchedData.notes}
          `,
        }).then((message) => {
          const { description } = JSON.parse(message);
          setGptDescription(description); // API 호출 결과를 상태에 저장
        });
      }
    });

    // 리뷰 조회
    getPerfumeReviews(perfumeId).then((response) => {
      console.log(response);
    });

    // 좋아요 조회
    getLike(perfumeId).then((response) => {
      console.log(response.data.data);
      setIsLike(response.data.data);
    });

    
  }, [perfumeId, gptDescription]);

  // 좋아요 post
  const onClickHandler = () => {
    postLike(perfumeId).then((response) => {
      console.log(response);
      setIsLike(!isLike);
    });
  };

  return (
    <>
      <SDetailContainer>
        <SBlock>
          {data && <SImg src={data.perfumeImg} alt="Perfume Img" />}
          <SLikeButton onClick={onClickHandler}>
            <HeartFilled
              style={
                isLike
                  ? { color: "red", fontSize: "30px" }
                  : { color: "gray", fontSize: "30px" }
              }
            />
          </SLikeButton>
        </SBlock>
        <SBlock>
          {data && data.season && (
            <RadarChartContainer
              season={{
                day: data.season.day || 0,
                night: data.season.night || 0,
                spring: data.season.spring || 0,
                summer: data.season.summer || 0,
                fall: data.season.fall || 0,
                winter: data.season.winter || 0,
              }}
            />
          )}
        </SBlock>
        <SBlock>
          {data && gptDescription && (
            <GPTSample perfumeName={data.perfumeName} notes={data.notes} description={gptDescription}/>
          )}
        </SBlock>
        <SBlock>
          <>
            <SNote>
              {data && parsedNotes.TopNotes && (
                <>
                  <SNoteCate>Top Notes</SNoteCate>
                  <NoteGroup notes={parsedNotes.TopNotes} />
                </>
              )}
              {data && parsedNotes.MiddleNotes && (
                <>
                  <SNoteCate>Middle Notes</SNoteCate>
                  <NoteGroup notes={parsedNotes.MiddleNotes} />
                </>
              )}
              {data && parsedNotes.BaseNotes && (
                <>
                  <SNoteCate>Base Notes</SNoteCate>
                  <NoteGroup notes={parsedNotes.BaseNotes} />
                </>
              )}
            </SNote>
          </>
        </SBlock>
        <SBlock>
          <SParent
            layout
            isOpenCheck={isOpen}
            initial={{ borderRadius: 50 }}
            onClick={() => setIsOpen(!isOpen)}
            transition={{
              opacity: { ease: "linear" },
              layout: { duration: 0.6 },
            }}
          ></SParent>
        </SBlock>
        <SBlock>
          {data && <SPerfumeName> {data.perfumeName}</SPerfumeName>}
          {data && <SPerfumeName> {data.koreanName}</SPerfumeName>}
        </SBlock>
      </SDetailContainer>
      <div>
        <Link to="/perfumes/review/crud">CRUD Test</Link> |
        <Link to="/perfumes/1/reviews"> Review Zone</Link> |
      </div>
    </>
  );
}

const SDetailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding: 3rem;
  gap: 15px;
  height: calc(100vh - 50px);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const SBlock = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: black;
  &:nth-child(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 3;
    &:hover {
      background-color: yellowgreen;
    }
  }
  &:nth-child(2) {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
    background-color: black;
    display: flex;
    flex-direction: column;
  }
  &:nth-child(4) {
    grid-column: 3 / span 2;
    grid-row: 3 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &:hover {
      background-color: red;
    }
  }
  &:nth-child(3) {
    grid-column: 5 / span 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    &:hover {
      background-color: yellowgreen;
    }
  }
  &:nth-child(5) {
    grid-column: 5 / span 2;
    grid-row: 3 / span 2;
    &:hover {
      background-color: yellowgreen;
    }
  }
  &:nth-child(6) {
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover {
      background-color: yellowgreen;
    }
  }
`;

const SImg = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const SNote = styled.div`
  width: 100%;
  height: 100%;
`;

const SNoteCate = styled.div`
  ${theme.font.Title};
  padding: 10px;
`;

const SPerfumeName = styled.div`
  ${theme.font.Title};
`;

const SLikeButton = styled.button`
  position: absolute;
  /* z-index: 3; */
  top: 10px;
  right: 10px;
`;

const SParent = styled(motion.div)<{ isOpenCheck: boolean }>`
  background: white;
  width: ${(props) => (props.isOpenCheck ? "45.9%" : "100%")};
  height: ${(props) => (props.isOpenCheck ? "86.5%" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  position: ${(props) => (props.isOpenCheck ? "fixed" : "static")};
  z-index: 1;
  top: ${(props) => (props.isOpenCheck ? "9%" : "0%")};
  right: ${(props) => (props.isOpenCheck ? "16%" : "0%")};
  background-color: darkgreen;
  color: black;
`;

export default PerfumeDetail;
