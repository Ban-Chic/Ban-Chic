import styled from "styled-components";

import { STitle } from "../../../styles/Font";
import theme from "../../../styles/Theme";
import NaverLogin from "../../atoms/auth/NaverLoginButton";
import KakaoLogin from "../../atoms/auth/KakaoLoginButton";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function LoginPage() {
  return (
    <SLoginContainer>
      <SLoginSection
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 10,
        }}
      >
        <SFlexWrap>
          <SLoginTitle>Ban:Chic</SLoginTitle>
          <SLoginTitle>Login</SLoginTitle>
        </SFlexWrap>
        <SFlexTap>
          <KakaoLogin />
        </SFlexTap>
      </SLoginSection>
      <SAb>
        <Typewriter
          words={[
            "매력적인 당신이 향수까지 뿌리면",
            "반칙",
            "나 오늘 반칙할래",
          ]}
          cursor
          loop
          cursorStyle="|"
          typeSpeed={50}
        />
      </SAb>
    </SLoginContainer>
  );
}

const SAb = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const SFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SLoginSection = styled(motion.div)`
  display: flex;
  gap: 2em;
  justify-content: space-between;
  padding: 5em;
  ${theme.styleBase.glassmorphism}
  border-radius: 5px;
  flex-direction: column;
  border: 2px solid white;
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
