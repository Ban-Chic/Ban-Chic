import styled from "styled-components";
import SpiceImageUrl from "../../../utils/ImgUrl";

// Props 인터페이스 정의
interface Props {
  notes: string;
}

function NoteGroupwrap({ notes }: Props) {
  const data = notes;

  return (
    <>
      {data.split(", ")?.map((note: string, index: number) => (
        <SEachNote key={index}>
          <SNoteImg
            $src={
              SpiceImageUrl[note]
                ? SpiceImageUrl[note]?.replace("/m.", "/o.")
                : SpiceImageUrl["Cranberry"]?.replace("/m.", "/o.")
            }
            $name={note}
          />
        </SEachNote>
      ))}
    </>
  );
}

const SEachNote = styled.div`
  display: grid;
  grid-auto-columns: auto;
  margin: 0 auto;
`;

export const SNoteImg = styled.div<{ $src: string; $name: string }>`
  width: 2.5em;
  height: 2.5em;
  border: 2px solid #f2f2f2;
  position: relative;
  border-radius: 5px;
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  &:hover::after {
    content: "${(props) => props.$name}"; // 호버 시 표시할 이름
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background-color: #f2f2f2;
    color: black;
    padding: 5px;
    border-radius: 5px;
    font-size: 0.8em;
    z-index: 100;
  }
`;

export default NoteGroupwrap;
