import styled from "styled-components";
import { ReactNode } from "react";
import { SBody1, SBody2 } from "../../../styles/Font";
import StarDisplay from "../../atoms/modalForm/StarDisplay";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";

interface Props {
  children?: ReactNode;
  data: {
    id: number;
    rate: number;
    content: string;
    imgUrl: string;
    perfumeOverviewRes: {
      id: number;
      perfumeImg: string;
      perfumeName: string;
    };
  }[];
}

function TempMyReviewBox({ children, data }: Props) {
  return (
    <SBoxContainer>
      {children}
      {data.map((item) => (
        <SReviewItem
          as={Link}
          to={Page_Url.PerfumeDetail + `${item.perfumeOverviewRes.id}`}
        >
          <SDiv>
            <SBody1>{item.content}</SBody1>
            <SStarRate>
              <StarDisplay rate={item.rate} />
            </SStarRate>
          </SDiv>
          <SProfile>
            <SProfileCircle
              $ImgUrl={item.perfumeOverviewRes.perfumeImg || "/user.svg"}
            ></SProfileCircle>
            <SBody2>{item.perfumeOverviewRes.perfumeName}</SBody2>
          </SProfile>
        </SReviewItem>
      ))}
    </SBoxContainer>
  );
}

const SProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SProfileCircle = styled.div<{ $ImgUrl: string }>`
  max-width: 30px;
  max-height: 30px;
  min-width: 10px;
  min-height: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  background-image: url(${(props) => props.$ImgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
`;

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SReviewItem = styled.div`
  background-color: #707070;
  border-radius: 5px;
  padding: 0.5em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const SBoxContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  @media only screen and (min-width: 768px) {
    /* max-width: 300px; */
  }
`;

const SStarRate = styled.div`
  position: absolute;
  /* top: 3px; */
  bottom: 15px;
  right: 3px;
  /* background-color: deepskyblue; */
  width: 5em;
  display: flex;
  justify-content: center;
  /* text-align: center; */
  /* border-radius: 2em; */
`;

export default TempMyReviewBox;
