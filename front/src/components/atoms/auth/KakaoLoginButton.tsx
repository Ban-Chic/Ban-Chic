import { styled } from "styled-components";
import Kakao from "/loginImg/kakaoLogin.png";

function KakaoLogin() {
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const Login = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button type="button" onClick={Login}>
      <SKakaoLogin src={Kakao} alt="Kakao Login" />
    </button>
  );
}

export default KakaoLogin;

const SKakaoLogin = styled.img`
  width: inherit;
`;
