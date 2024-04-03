import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

interface StarInputProps {
  onClickRating: (value: number) => void;
  value: number;
  init: number;
}

const StarInput: React.FC<StarInputProps> = ({
  onClickRating,
  value,
  init,
}) => {
  // 사용자가 별을 클릭했는지 여부를 추적하는 상태
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되어야 함
    // 사용자가 별을 클릭하지 않았고, init 값이 value와 같다면, 해당 별을 "체크된" 상태로 설정
    if (!isClicked && init === value) {
      onClickRating(value);
    }
  }, [init, value, onClickRating, isClicked]);

  return (
    <>
      <Input
        type="radio"
        name="rating"
        id={`star${value}`}
        value={value}
        checked={init === value}
        onChange={() => {}}
        onClick={() => setIsClicked(true)}
      />
      <Label
        onClick={() => {
          onClickRating(value);
          setIsClicked(true);
        }}
        htmlFor={`star${value}`}
      >
        <FaStar />
      </Label>
    </>
  );
};

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1.5em;
  color: lightgray;
`;

export default StarInput;
