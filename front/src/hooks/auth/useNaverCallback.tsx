import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { postNaverLogin } from "../../api/Api";

function useNaverCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    postNaverLogin(code, state)
      .then((response) => {
        console.log(response);
        // spring에서 발급된 jwt 반환 localStorage 저장
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem("refreshToken", response.headers["refreshtoken"]);
        localStorage.setItem("uid", response.data.data.userId);
        localStorage.setItem("oauthProvider", response.data.data.oauthProvider);

        // 메인 페이지로 이동
        // navigate("/");
      })
      .catch((error: any) => {
        // 에러발생 시 login 페이지로 전환
        // navigate("/login");
        console.log(error);
      });
  }, []);

  return (
    <SErrorDiv>
      <h1>이동중입니다</h1>
      <p>loading...</p>
    </SErrorDiv>
  );
}

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
