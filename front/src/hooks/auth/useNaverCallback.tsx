import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getNaverLogin } from "../../api/Api";
import Page_Url from "../../router/Url";
import LoadingSpinner from "../../utils/LoadingSpinner";

function useNaverCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    getNaverLogin(code, state)
      .then((response) => {
        // spring에서 발급된 jwt 반환 localStorage 저장
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem("refreshToken", response.headers["refreshtoken"]);
        localStorage.setItem("uid", response.data.data.userId);
        localStorage.setItem("oauthProvider", response.data.data.oauthProvider);

        // 메인 페이지로 이동
        navigate(Page_Url.Main);
      })
      .catch((error: any) => {
        // 에러발생 시 login 페이지로 전환
        navigate(Page_Url.Login);
        console.log(error);
      });
  }, []);
  return (
    <SErrorDiv>
      <LoadingSpinner />
    </SErrorDiv>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const SErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 1em;
`;

export default useNaverCallback;
