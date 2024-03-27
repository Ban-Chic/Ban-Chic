import styled from "styled-components";
import React, { useState, useEffect } from "react";
import theme from "../../../styles/Theme";
import ReviewInDetail from "../../molecules/review/reviewInDetail";
import { SHeaderContainer } from "../../molecules/common/gnb";
import SpriceImageUrl from "../../../utils/ImgUrl";
import GPTSample from "../../molecules/gptApi/gptSample";
import { getPerfumeDetail, getPerfumeReviews, postLike } from "../../../api/Api";
import { useParams } from "react-router-dom";

import RadarChartContainer from "../../molecules/charts/radarChart";
import BarChartContainer from "../../molecules/charts/barChart";
import PieChartContainer from "../../molecules/charts/pieChart";
import NoteGroup from "../../molecules/detail/noteGroup";
import { Link } from "react-router-dom";

interface Props {
  data: {
    id: number;
    perfumeImg: string;
    perfumeName: string;
    RadioNodeListing: number;
    bestRate: number;
    vote: number;
    notes: string;
    season: object;
    TopNotes: string[];
    MiddleNotes: string[];
    BottomNotes: string[];
  } | null;
}

function PerfumeDetail() {
  const { perfumeId } = useParams() as { perfumeId: string };

  const [data, setData] = useState<Props["data"]>(null);
  // const [notes, setNotes] = useState<Props["data"]>(null);

  useEffect(() => {
    getPerfumeDetail(perfumeId).then((data) => {
      console.log(data.data);
      setData(data.data);
      // setNotes(JSON.parse(data.data.notes));
    });
    getPerfumeReviews(perfumeId).then((response)=>{
      console.log(response);
    })
  }, []);

  const onClickHandler = () => {
    postLike(Number(perfumeId)).then((response) => {
      console.log(response);
      });
    }


  return (
    <>
      <SDetailContainer>
        <SBlock>
          {data && <SImg src={data.data.perfumeImg} alt="Perfume Img" />}
          <SLikeButton onClick={onClickHandler}>좋아요버튼임</SLikeButton>
        </SBlock>
        <SBlock>
          {data && (
            <GPTSample
              perfumeName={data.data.perfumeName}
              notes={data.data.notes}
            />
          )}
        </SBlock>
        <SBlock>
          {data && data.data.season && (
            <RadarChartContainer season={data.data.season} />
          )}
        </SBlock>
        <SBlock>
          <SNote>
            <SNoteCate>Top Notes</SNoteCate>
            {data && (
              <NoteGroup notes={data.data.notes} noteName={"TopNotes"} />
            )}
          </SNote>
          <SNote>
            <SNoteCate>Middle Notes</SNoteCate>
            {data && (
              <NoteGroup notes={data.data.notes} noteName={"MiddleNotes"} />
            )}
          </SNote>
          <SNote>
            <SNoteCate>Base Notes</SNoteCate>
            {data && (
              <NoteGroup notes={data.data.notes} noteName={"BaseNotes"} />
            )}
          </SNote>
        </SBlock>
        <SBlock>{data && <ReviewInDetail perfumeId={perfumeId} />}</SBlock>
        <SBlock>
          {data && <SPerfumeName> {data.data.perfumeName}</SPerfumeName>}
        </SBlock>
      </SDetailContainer>
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
`;

const SBlock = styled.div`
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
    background-color: gray;
    display: flex;
    flex-direction: column;
  }
  &:nth-child(4) {
    grid-column: 3 / span 2;
    grid-row: 2 / span 3;
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
    justify-content: center;
    &:hover {
      background-color: yellowgreen;
    }
  }
`;

const SImg = styled.img`
  margin: 0 auto;
`;

const SNote = styled.div``;

const SNoteCate = styled.div`
  font-size: 30px;
  padding: 10px;
`;

const SNoteGroup = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 15px;
`;

const SEachNote = styled.div`
  display: flex;
  flex-direction: column;
`;

const SNoteName = styled.div`
  margin: 0 auto;
`;

const SNoteImg = styled.img`
  width: 60px;
`;

const SPerfumeName = styled.div`
  font-size: 30px;
`;

const SLikeButton = styled.button`
  position: absolute;
  z-index: 3;
  background-color: red;
  margin-left: 250px;
`;

export default PerfumeDetail;
