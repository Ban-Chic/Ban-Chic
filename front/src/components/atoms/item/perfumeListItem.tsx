import styled from "styled-components";
import { SSubTitle, SBody2 } from "../../../styles/Font";
import theme from "../../../styles/Theme";
import { Link } from "react-router-dom";

interface Props {
  perfumeId?: number;
  perfumeImg?: string;
  perfumeName?: string;
  perfumeBrand?: string;
  perfumeKorName?: string;
}

function PerfumeListItem({
  perfumeId = 1,
  perfumeImg = "/tomford.jpg",
  perfumeName = "Neroli Prtofino",
  perfumeBrand = "Tomford",
  perfumeKorName = "",
}: Props) {
  return (
    <>
      <SPerfumeBox as={Link} to={`/perfumes/${perfumeId}`}>
        <SPerfumeImg src={perfumeImg} alt="향수 이미지" />
        <SSubTitleDark>{perfumeName}</SSubTitleDark>
        <SBody2Dark>{perfumeKorName}</SBody2Dark>
        <SBody2Dark>{perfumeBrand}</SBody2Dark>
      </SPerfumeBox>
    </>
  );
}

export default PerfumeListItem;

const SBody2Dark = styled(SBody2)`
  color: #191919;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SSubTitleDark = styled(SSubTitle)`
  color: #191919;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
`;

const SPerfumeImg = styled.img`
  width: 100px;
  display: block;
  margin: auto;
`;

const SPerfumeBox = styled.li`
  width: 200px;
  padding: 1em;
  white-space: nowrap;
  border-radius: 5px;
  ${theme.styleBase.glassmorphism}
  background-color: white;
`;
