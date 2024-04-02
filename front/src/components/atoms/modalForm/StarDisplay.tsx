import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

interface StarDisplayProps {
  rate: number;
}

const StarDisplay: React.FC<StarDisplayProps> = ({ rate }) => {
  const wholeStars = Math.floor(rate);
  const halfStar = rate % 1 !== 0;
  const emptyStars = 5 - wholeStars - (halfStar ? 1 : 0);

  return (
    <SDiv>
      {Array.from({ length: wholeStars }, (_, index) => (
        <FaStar key={index} style={{ color: "orange" }} />
      ))}
      {halfStar && <FaStarHalf style={{ color: "orange" }} />}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={index} style={{ color: "orange" }} />
      ))}
    </SDiv>
  );
};

const SDiv = styled.div`
  display  : flex;
`;

export default StarDisplay;
