import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => ({
  ...config,
  headers: {
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
}));

// 응답 인터셉터 처리
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { config } = error;
      // 토큰 만료시
      if (error.response.data.statusCode === 401) {
        const originRequest = config;
        // 리프레시 토큰 api
        const response = await axios.post(
          "리프레시토큰 발급 api자리",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        // 리프레시 토큰 요청이 성공할 때
        if (response.status === 200) {
          const newAccessToken = response.headers["accessToken"];
          localStorage.setItem("accessToken", response.headers["accessToken"]);
          localStorage.setItem(
            "refreshToken",
            response.headers["refreshtoken"]
          );
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          // 진행중이던 요청 이어서하기
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios.create(originRequest);
          // 리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
        }
        if (response.status === 401) {
          window.location.href = "/login";
        }
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
