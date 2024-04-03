import styled from "styled-components";
import Page_Url from "../../../router/Url";
import { Link } from "react-router-dom";
import theme from "../../../styles/Theme";

interface Props {
  text: string;
  link?: string;
  linkText?: string;
}

function DefaultBlock({ text, link, linkText }: Props) {
  return (
    <SContainer>
      <SImg src="public\perfumeImg\empty.png" alt="빈 박스" />
      <div>{text}</div>
      {link && (
        <SButton as={Link} to={Page_Url.SurveyLanding}>
          {linkText}
        </SButton>
      )}
    </SContainer>
  );
}
const SImg = styled.img`
  width: 150px;
  height: 150px;
`;

const SButton = styled.button`
  transition: 0.2s all;
  color: ${theme.color.actionColor};
  &:hover {
    transform: scale(1.05);
  }
`;

const SContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export default DefaultBlock;
