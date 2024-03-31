import styled from "styled-components";

import { STitle } from "../../../styles/Font";
import theme from "../../../styles/Theme";
import NaverLogin from "../../atoms/auth/NaverLoginButton";
import KakaoLogin from "../../atoms/auth/KakaoLoginButton";
import { motion } from "framer-motion";

function LoginPage() {
  return (
    <SLoginContainer>
      <SLoginSection
        initial={{ rotate: 180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 10,
        }}
      >
        <div>
          <SLoginTitle>Ban:Chic</SLoginTitle>
          <SLoginTitle>Login</SLoginTitle>
        </div>
        <SFlexTap>
          <NaverLogin />
          <KakaoLogin />
        </SFlexTap>
      </SLoginSection>
    </SLoginContainer>
  );
}

const SLoginSection = styled(motion.div)`
  display: flex;
  gap: 2em;
  justify-content: space-between;
  padding: 5em 5em;
  ${theme.styleBase.glassmorphism}
  border-radius: 5px;
  flex-direction: column;
  margin: 0 auto;
  @media only screen and (min-width: 768px) {
    width: 32rem;
    flex-direction: row;
  }
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
