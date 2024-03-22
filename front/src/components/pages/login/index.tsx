import { Link } from "react-router-dom";
import styled from "styled-components";

import { STitle } from "../../../styles/Font";
import theme from "../../../styles/Theme";

function LoginPage() {
  return (
    <SLoginContainer>
      <SLoginSection>
        <SLoginTitle>Login</SLoginTitle>
        <SFlexTap>
          <Link to="/">
            <SImg src="/naverLogin.png" alt="" />
          </Link>
          <Link to="/">
            <SImg src="/kakaoLogin.png" alt="" />
          </Link>
        </SFlexTap>
      </SLoginSection>
    </SLoginContainer>
  );
}

const SLoginSection = styled.div`
  width: 32rem;
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 60px 30px;
`;

const SLoginTitle = styled(STitle)`
  ${theme.font.Title}
`;

const SImg = styled.img`
  width: 200px;
`;

const SFlexTap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const SLoginContainer = styled.div`
  width: 100%;
  height: calc(100vh - 44px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default LoginPage;
