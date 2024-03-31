import styled from "styled-components";
import SpiceImageUrl from "../../../utils/ImgUrl";
import theme from "../../../styles/Theme";

// Props 인터페이스 정의
interface Props {
  notes: string;
}

function NoteGroup({ notes }: Props) {
  const data = notes;

  return (
    <>
      <SNoteGroup>
        {data.split(", ")?.map((note: string, index: number) => (
          <SEachNote key={index}>
            <SNoteImg
              $src={
                SpiceImageUrl[note]
                  ? SpiceImageUrl[note]?.replace("/m.", "/o.")
                  : "/logo_yellow.png"
              }
              $name={note}
            />
          </SEachNote>
        ))}
      </SNoteGroup>
    </>
  );
}

const SEachNote = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const SNoteImg = styled.div<{ $src: string; $name: string }>`
  /* max-width: 2.5em; */
  /* max-height: 2.5em; */
  width: 2.5em;
  height: 2.5em;
  border: 2px solid #f2f2f2;
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
  }
`;

const SNoteName = styled.div`
  ${theme.font.Body1};
  margin: 0 auto;
  /* white-space: nowrap; */
`;

const SNoteGroup = styled.div`
  display: flex;
  gap: 0.2em;
`;
export default NoteGroup;
