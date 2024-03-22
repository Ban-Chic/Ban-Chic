import styled from "styled-components";
import React, { useState, useEffect } from "react";
import theme from "../../../styles/Theme";
import ReviewInDetail from "../../molecules/review/reviewInDetail";
import { SHeaderContainer } from "../../molecules/common/gnb";

interface Props {
  perfumeImg: string;
  perfumeName: string;
  RadioNodeListing: number;
  bestRate: number;
  vote: number;
  notes: object;
}

function PerfumeDetailPage() {
  const [data, setData] = useState<Props>();
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
      <SContainer>
        <SBlock>
          {data && <SImgContainer src={data[0].perfumeImg} alt="logo" />}
        </SBlock>
        <SBlock>
          {data && (
            <SContent>
              평점 : {data[0].RadioNodeListing} / {data[0].bestRate}
            </SContent>
          )}
          {data && (
            <SContent>Top Notes : {data[0].notes["Top Notes"]}</SContent>
          )}
          {data && (
            <SContent>Middle Notes : {data[0].notes["Middle Notes"]}</SContent>
          )}
          {data && (
            <SContent>Base Notes : {data[0].notes["Base Notes"]}</SContent>
          )}
        </SBlock>
        <SBlock>
          
           </SBlock>
        <SBlock></SBlock>
        <SBlock>
          최근 리뷰
          {data && <ReviewInDetail perfumeImg={data[0].perfumeImg} />}
        </SBlock>
        <SBlock>
          {data && <SSpan>{data[0].perfumeName}</SSpan>}
          <SSpan>향수 한글 이름</SSpan>
        </SBlock>

      </SContainer>
    </>
  );
}

export const SContainer = styled.div`
  display: grid;
  /* justify-content: space-between; */
  /* grid-template-columns: repeat(6, 1fr); */
  grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  padding: 3rem;
  background-color: white;
  gap: 10px;
  height: calc(100vh - 50px);
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 15px;
`;

const SBlock = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: blue; */
  &:nth-child(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 3;
    &:hover {
      background-color: red;
    }
    display: flex;
  }
  &:nth-child(2) {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
    /* background-color: green; */
  }
  &:nth-child(3) {
    /* background-color: yellowgreen; */
    grid-column: 5 / span 2;
    grid-row: 1 / span 2;
  }
  &:nth-child(4) {
    grid-column: 3 / span 2;
    grid-row: 3 / span 2;
    /* background-color: red; */
  }
  &:nth-child(5) {
    grid-column: 5 / span 2;
    grid-row: 3 / span 2;
    /* background-color: gray; */
  }
  &:nth-child(6) {
    grid-column: 1 / span 2;
    /* background-color: gray; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }
`;

const SImgContainer = styled.img`
  padding: 10px;
  margin: 0 auto;
`;

const SSpan = styled.span`
  ${theme.font.KumarOneRegular};
  color: black;
  font-size: 1.5rem;
  height: 30px;
  text-align: center;
`;

const SContent = styled.div``;

export default PerfumeDetailPage;
