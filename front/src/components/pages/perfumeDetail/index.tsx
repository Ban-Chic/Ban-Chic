import styled from "styled-components";
import React, { useState, useEffect } from "react";
import theme from "../../../styles/Theme";
import ReviewInDetail from "../../molecules/review/reviewInDetail";
import { SHeaderContainer } from "../../molecules/common/gnb";
import PieChartContainer from "../../molecules/charts/pieChart";
import RadarChartContainer from "../../molecules/charts/radarChart";
import SpriceImageUrl from "../../../utils/ImgUrl";
import BarChartContainer from "../../molecules/charts/barChart";
import GPTSample from "../../molecules/gptApi/gptSample";

interface Props {
  // data: string;
  // perfumeImg: string;
  // perfumeName: string;
  // RadioNodeListing: number;
  // bestRate: number;
  // vote: number;
  // notes: object;
  // season: object;
  data: {
    perfumeImg: string;
    perfumeName: string;
    RadioNodeListing: number;
    bestRate: number;
    vote: number;
    notes: object;
    season: object;
  } | null;
}

function PerfumeDetail() {
  const [data, setData] = useState<Props["data"]>(null);
  // const [data, setData] = useState<Props>();
  useEffect(() => {
    fetch("/chart")
      .then((res) => res.json())
      .then((response: Props) => {
        console.log(response);
        setData(response);
      });
  }, []);

  return (
    <>
      <SDetailContainer>
        <SBlock>
          {data && <SImg src={data[0].perfumeImg} alt="Perfume Img" />}
        </SBlock>
        <SBlock>
          {data && <GPTSample perfumeName={data[0].perfumeName} notes={data[0].notes}/>}
        </SBlock>
        <SBlock>
          {data && <RadarChartContainer season={data[0].season} />}
        </SBlock>
        <SBlock>
          <SNote>
            <SNoteCate>Top Notes</SNoteCate>
            <SNoteGroup>
              <SEachNote>
                {data && (
                  <SNoteImg
                    src={SpriceImageUrl[
                      `${data[0].notes["Top Notes"]}`
                    ].replace("/m.", "/o.")}
                    alt="Perfume Img"
                  />
                )}
                {data && <SNoteName>{data[0].notes["Top Notes"]}</SNoteName>}
              </SEachNote>
              <SEachNote>
                {data && (
                  <SNoteImg
                    src={SpriceImageUrl[
                      `${data[0].notes["Top Notes"]}`
                    ].replace("/m.", "/o.")}
                    alt="Perfume Img"
                  />
                )}
                {data && <SNoteName>{data[0].notes["Top Notes"]}</SNoteName>}
              </SEachNote>
            </SNoteGroup>
          </SNote>
          <SNote>
            <SNoteCate>Middle Notes</SNoteCate>
            <SNoteGroup>
              <SEachNote>
                {data && (
                  <SNoteImg
                    src={SpriceImageUrl[
                      `${data[0].notes["Middle Notes"]}`
                    ].replace("/m.", "/o.")}
                    alt="Perfume Img"
                  />
                )}
                {data && <SNoteName>{data[0].notes["Middle Notes"]}</SNoteName>}
              </SEachNote>
            </SNoteGroup>
          </SNote>
          <SNote>
            <SNoteCate>Base Notes</SNoteCate>
            <SNoteGroup>
              <SEachNote>
                {data && (
                  <SNoteImg
                    src={SpriceImageUrl[
                      `${data[0].notes["Base Notes"]}`
                    ].replace("/m.", "/o.")}
                    alt="Perfume Img"
                  />
                )}
                {data && <SNoteName>{data[0].notes["Base Notes"]}</SNoteName>}
              </SEachNote>
            </SNoteGroup>
          </SNote>
        </SBlock>
        <SBlock>
        {data && <ReviewInDetail perfumeImg={data[0].perfumeImg}/>}
        </SBlock>
        <SBlock>
          {data && <SPerfumeName> {data[0].perfumeName}</SPerfumeName>}
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

const SNote = styled.div`
`;

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

export default PerfumeDetail;
