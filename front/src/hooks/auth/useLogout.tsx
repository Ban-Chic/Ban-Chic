import { useNavigate } from "react-router";
import { getKakaoLogout, getNaverLogout } from "../../api/Api";
function useLogout() {
  const navigate = useNavigate();
  const Logout = () => {
    // 네이버, 카카오 로그인 판별
    const auth = localStorage.getItem("oauthProvider");

    // 카카오일 경우
    if (auth === "KAKAO") {
      getKakaoLogout().then((res) => {
        console.log(res);
      });

      // 네이버일 경우
    } else if (auth === "NAVER") {
      console.log("네이버다");
      getNaverLogout().then((res) => {
        console.log(res);
      });

      // 잘못된 접근일 경우
    } else {
      console.log("?");
    }

    // 로컬스토리지 로그인 관련 삭제
    localStorage.removeItem("oauthProvider");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("uid");

    // 메인으로 이동
    navigate("/");
  };
  return Logout;
}

export default useLogout;
