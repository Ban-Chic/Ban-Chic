import { useState } from "react";
import styled from "styled-components";
import StarInput from "./StarInput";
import theme from "../../../styles/Theme";

interface StarRatingProps {
  setRate: (value: number) => void;
}

export const StarRating = ({ setRate }: StarRatingProps) => {
  const [rating, setRating] = useState(0);

  const handleClickRating = (value: number) => {
    setRate(value);
    setRating(value);
  };

  return (
    <Base>
      <Name>별점</Name>
      <RatingField>
        <StarInput onClickRating={handleClickRating} value={5} isHalf={false} />

        <StarInput onClickRating={handleClickRating} value={4} isHalf={false} />

        <StarInput onClickRating={handleClickRating} value={3} isHalf={false} />

        <StarInput onClickRating={handleClickRating} value={2} isHalf={false} />

        <StarInput onClickRating={handleClickRating} value={1} isHalf={false} />
      </RatingField>
      <RatingValue>{rating}</RatingValue>
    </Base>
  );
};

const Base = styled.section`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.span`
  font-size: 1.4rem;
  line-height: 100%;
  ${theme.font.Title}
`;

const RatingValue = styled.span`
  font-size: 1.2rem;
  line-height: 100%;
  ${theme.font.Title}
`;

const RatingField = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  transform: translateY(2px);

  input:checked ~ label,
  labeL:hover,
  labeL:hover ~ label {
    transition: 0.2s;
    color: orange;
  }
`;
