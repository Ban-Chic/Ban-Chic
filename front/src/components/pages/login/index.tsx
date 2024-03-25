import styled from "styled-components";

import { STitle } from "../../../styles/Font";
import theme from "../../../styles/Theme";
import NaverLogin from "../../atoms/auth/NaverLoginButton";
import KakaoLogin from "../../atoms/auth/KakaoLoginButton";

function LoginPage() {
  return (
    <SLoginContainer>
      <SLoginSection>
        <SLoginTitle>Login</SLoginTitle>
        <SFlexTap>
          <NaverLogin />
          <KakaoLogin />
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

const SFlexTap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 10em;
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
