import styled from "styled-components";
import SpiceImageUrl from "../../../utils/ImgUrl";
import theme from "../../../styles/Theme";

// Props 인터페이스 정의
interface Props {
  noteName: string;
  notes: string;
}

function NoteGroup({ notes, noteName }: Props) {
  const data = JSON.parse(notes);

  return (
    <>
      <SNoteGroup>
        {data[noteName]?.split(", ")?.map((note: string, index: number) => (
          <SEachNote key={index}>
            <SNoteImg
              src={
                SpiceImageUrl[note]
                  ? SpiceImageUrl[note]?.replace("/m.", "/o.")
                  : "/logo_yellow.png"
              }
              alt="향료이미지"
            />
            <SNoteName>{note}</SNoteName>
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
  width: 65px;
`;

const SNoteImg = styled.img`
  width: 60px;
`;

const SNoteName = styled.div`
  ${theme.font.Body1};
  margin: 0 auto;
`;

const SNoteGroup = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 15px;
`;
export default NoteGroup;
