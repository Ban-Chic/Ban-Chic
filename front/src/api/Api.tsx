import { AxiosResponse } from "axios";
import API, { ImgAPI } from "./Config";

interface PerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
  brandName: string;
  notes: string;
  data: object;
}

interface IReview {
  perfumeId: number;
  reviewId?: number;
  content: string;
  rate: number;
  file: string;
  // imgUrl은 스트링 아니면 file
}

export const baseAPI = () => API.get("/");

// 향수

/** 향수 상세 조회 */
export const getPerfumeDetail = (
  perfumeId: string
): Promise<AxiosResponse<PerfumeData>> => API.get(`/perfumes/${perfumeId}`);

export const getRecommend = () => API.get("/recommend/top");

/** 향수 목록 조회 */
export const getPerfumeList = () => API.get("/perfumes");

/** 향수 좋아요 */
export const postLike = (perfumeId: string) => API.post(`/heart/${perfumeId}`);

/** 향수 리뷰 목록 조회 */
export const getPerfumeReviews = (perfumeId: string) =>
  API.get(`/perfumes/${perfumeId}/reviews`);

// 리뷰

/** 리뷰 등록 */
export const postPerfumeReview = (
  perfumeId: string,
  file: File,
  rate: number,
  content: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  const data = { rate: rate, content: content };
  const uploadData = JSON.stringify(data);
  // const blobData = new Blob([uploadData], { type: "application/json" });
  formData.append("form", uploadData);

  console.log(uploadData);
  console.log("FormData:", formData.get("file")); // FormData 내용 확인

  // ImgAPI를 사용하여 요청 보내기
  return ImgAPI.post(`/perfumes/${perfumeId}/reviews`, formData);
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
export const getLikes = (userId: number) => API.get(`/members/${userId}/likes`);

/** 작성한 리뷰 목록 조회 */
export const getReviews = (userId: number) =>
  API.get(`/members/${userId}/reviews`);

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
