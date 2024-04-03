import styled from "styled-components";
import ButtonComponent from "../../../atoms/auth/Button";
import { useNavigate } from "react-router-dom";
import Page_Url from "../../../../router/Url";

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
    </SContainer>
  );
}

const SContainer = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 0 1em;
  gap: 1em;
`;

export default LocalNav;
