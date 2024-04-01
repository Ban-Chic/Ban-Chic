import { ReactNode } from "react";
import styled from "styled-components";
import { SBody1, SBody2 } from "../../../styles/Font";

interface Props {
  children?: ReactNode;
  data: {
    data: {
      content: {
        id: number;
        rate: number;
        content: string;
        imgUrl: string;
        member: {
          image: string;
          nickname: string;
        };
      }[];
    };
    totalPages: number;
    totalElements: number;
  };
}

function TempReviewBox({ children, data }: Props) {
  return (
    <SBoxContainer>
      {children}
      {data.data.content.map((item) => (
        <SReviewItem>
          <SBody1>{item.content}</SBody1>
          <SRate>{item.rate}</SRate>
          <SProfile>
            <SProfileCircle
              $ImgUrl={item.member.image || "/user.svg"}
            ></SProfileCircle>
            <SBody2>{item.member.nickname}</SBody2>
          </SProfile>
        </SReviewItem>
      ))}
    </SBoxContainer>
  );
}

const SRate = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  background-color: deepskyblue;
  width: 1.5em;
  text-align: center;
  border-radius: 2em;
`;

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

export default TempReviewBox;
