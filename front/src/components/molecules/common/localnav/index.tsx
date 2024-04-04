import styled from "styled-components";
import ButtonComponent from "../../../atoms/auth/Button";
import { useNavigate } from "react-router-dom";
import Page_Url from "../../../../router/Url";
import { FaUser,FaMap, FaList, FaVoteYea } from "react-icons/fa";
import theme from "../../../../styles/Theme";

function LocalNav() {
  const navigate = useNavigate();
  return (
    <SContainer>
      <ButtonComponent onClick={() => navigate(Page_Url.SurveyLanding)}>
        나의 추구미는?
      </ButtonComponent>
      <ButtonComponent onClick={() => navigate(Page_Url.Recommend)}>
        카테고리
      </ButtonComponent>
      <ButtonComponent onClick={() => navigate(Page_Url.Map)}>
        향수 지도
      </ButtonComponent>
      <ButtonComponent onClick={() => navigate(Page_Url.My)}>
        마이페이지
      </ButtonComponent>
      <SButton onClick={() => navigate(Page_Url.Map)}><FaMap/></SButton>
      <SButton onClick={() => navigate(Page_Url.Recommend)}><FaList /></SButton>
      <SButton onClick={() => navigate(Page_Url.SurveyLanding)}><FaVoteYea /></SButton>
      <SButton onClick={() => navigate(Page_Url.My)}><FaUser /></SButton>
    </SContainer>
  );
}

const SButton = styled.button`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    & > * {
        transform: translateY(100%) scale(1.5);
    }
`

const SContainer = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 1em;
  opacity: 1;
  margin-bottom: 1em;
  background-color: ${theme.color.bgColor};
  gap: 1em;
  &:nth-child(1) > :nth-child(5), :nth-child(6), :nth-child(7),:nth-child(8) {
      display: none;
    }
  @media only screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-bottom: 0;
    z-index: 9999;
    &:nth-child(1) > :nth-child(1), :nth-child(2), :nth-child(3),:nth-child(4) {
      display: none;
    }
    &:nth-child(1) > :nth-child(5), :nth-child(6), :nth-child(7),:nth-child(8) {
      display: flex;
    }
  }
`;

export default LocalNav;
