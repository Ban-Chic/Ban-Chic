import styled from "styled-components";
import SpriceImageUrl from "../../../utils/ImgUrl";

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
        {data[noteName].split(", ").map((note:string, index:number) => (
          <SEachNote key={index}>
            <SNoteImg src={SpriceImageUrl[note].replace("/m.", "/o.")} />
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
`;

const SNoteImg = styled.img`
  width: 60px;
`;

const SNoteName = styled.div`
  margin: 0 auto;
`;

const SNoteGroup = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 15px;
`;
export default NoteGroup;
