import API, { ImgAPI } from "./Config";

export const baseAPI = () => API.get("/");

// 향수

/** 향수 상세 조회 */
export const getPerfumeDetail = (perfumeId: string) => {
  return API.get(`/perfumes/${perfumeId}`).then((res) => res.data);
};

/** CBF 추천 조회 */
export const getRecommend = () => API.get("/recommend/top");

/** CF 추천 조회 */
export const getCFRecommend = () =>
  API.post("/members/recommend/cf").then((res) => res.data);

/** 향수 카테고리 목록 조회 */
export const getPerfumeSeason = (type: string, page: number = 1) =>
  API.get(`/perfumes/season/${type}?&page=${page}`).then((res) => res.data);

export const getPerfumeBrand = (type: string, page: number = 1) =>
  API.get(`/perfumes/brand/${type}?&page=${page}`).then((res) => res.data);

export const getPerfumeGender = (type: string, page: number = 1) =>
  API.get(`/perfumes/gender/${type}?&page=${page}`).then((res) => res.data);

/** 향수 좋아요 토글*/
export const postLike = (perfumeId: string) =>
  API.post(`/perfumes/${perfumeId}/hearts`).then((res) => res.data);

/** 향수 좋아요 조회 */
export const getLike = (perfumeId: string) =>
  API.get(`/perfumes/${perfumeId}/hearts`).then((res) => res.data);

/** 향수 리뷰 목록 조회 */
export const getPerfumeReviews = (perfumeId: string) =>
  API.get(`/perfumes/${perfumeId}/reviews`).then((res) => res.data);

// 리뷰

/** 리뷰 등록 */
export const postPerfumeReview = async (
  perfumeId: string,
  rate: number,
  content: string
) => {
  const formData = new FormData();

  const data = { rate: rate, content: content };
  const uploadData = JSON.stringify(data);
  const blobData = new Blob([uploadData], { type: "application/json" });

  formData.append("form", blobData);

  // formData.append("file", file);

  // ImgAPI를 사용하여 요청 보내기
  try {
    return ImgAPI.post(`/perfumes/${perfumeId}/reviews`, formData)
  } catch (error) {
    console.log(error);
  }
};

/** 리뷰 수정 */
export const updatePerfumeReview = (
  perfumeId: number,
  reviewId: number,
  newReview: object
) => API.put(`/perfumes/${perfumeId}/reviews/${reviewId}`, newReview);

/** 리뷰 삭제 */
export const deletePerfumeReview = (perfumeId: number, reviewId: number) =>
  API.delete(`/perfumes/${perfumeId}/reviews/${reviewId}`);

// 소셜로그인

/** 네이버 소셜 로그인 */
export const getNaverLogin = (code: string | null, state: string | null) => {
  return API.get("/auth/login/naver", {
    params: { code: code, state: state },
  });
};

/** 카카오 소셜 로그인 */
export const getKakaoLogin = (code: string | null) => {
  return API.get(`/auth/login/kakao`, { params: { code: code } });
};

/** 네이버 로그아웃 */
export const getNaverLogout = () => API.get("/auth/logout/naver");

/** 카카오 로그아웃 */
export const getKakaoLogout = () => API.get("/auth/logout/kakao");

// 멤버

/** 좋아요 한 향수 목록 조회 */
export const getLikes = (userId: number) =>
  API.get(`/members/${userId}/hearts`).then((res) => res.data);

/** 작성한 리뷰 목록 조회 */
export const getReviews = (userId: number) =>
  API.get(`/members/${userId}/reviews`).then((res) => res.data);

/** 추천받은 향수 목록 조회 */
export const getRecommendedPerfumeList = () =>
  API.get("/members/recommend").then((res) => res.data);

/** 멤버 정보 조회 */
export const getMember = (userId: number) =>
  API.get(`/members/${userId}/info`).then((res) => res.data);

/** 닉네임 수정 */
export const updateNickname = (nickName: string) => {
  return API.put(`members/${localStorage.getItem("uid")}/nickname`, {
    nickname: nickName,
  });
};

/** 프로필 이미지 수정 */
export const updateProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return ImgAPI.put(`/members/${localStorage.getItem("uid")}/image`, formData);
};

/** 회원 탈퇴 */
export const deleteMember = () =>
  API.delete(`/members/${localStorage.getItem("uid")}`);

// 설문

/** 설문 제출 */

export const postSurvey = (styles: object) =>
  API.post(`/members/survey`, styles);

export const getPersuit = () =>
  API.get(`/members/persuit`).then((res) => res.data);
