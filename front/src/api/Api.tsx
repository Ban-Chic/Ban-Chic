import { AxiosResponse } from "axios";
import API from "./Config";

interface PerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
  brandName: string;
}

interface IReview {
  perfumeId: number;
  reviewId?: number;
  content: string;
  memberId: number;
  rating: number;
}

export const baseAPI = () => API.get("/");

// 향수

/** 향수 상세 조회 */
export const perfumeDetail = (
  perfumeId: string
): Promise<AxiosResponse<PerfumeData>> => API.get(`${perfumeId}`);

export const getRecommend = () => API.get("/recommend/top");

/** 향수 목록 조회 */
export const getPerfumeList = () => API.get("/perfumes");

/** 향수 좋아요 */
export const postLike = (perfumeId: number) =>
  API.post(`/perfumes/${perfumeId}/likes`);

/** 향수 좋아요 삭제 */
export const deleteLike = (perfumeId: number) =>
  API.delete(`/perfumes/${perfumeId}/likes`);

/** 향수 리뷰 목록 조회 */
export const getPerfumeReviews = (perfumeId: number) =>
  API.delete(`/perfumes/${perfumeId}/reviews`);

// 리뷰

/** 리뷰 등록 */
export const postPerfumeReview = (review: IReview) =>
  API.post(`/perfumes/${review.perfumeId}/reviews`);

/** 리뷰 수정 */
export const updatePerfumeReview = (review: IReview) =>
  API.patch(`/perfumes/${review.perfumeId}/reviews/${review.reviewId}`);

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

/** 토큰 연장 */
export const postExtendToken = (refreshToken: string) =>
  API.post("/auth/extend/token", { refreshToken: refreshToken });

/** 토큰 연장 */

// 멤버

/** 좋아요 한 향수 목록 조회 */
export const getLikes = () => API.get("/members/likes");

/** 작성한 리뷰 목록 조회 */
export const getReviews = () => API.get("/members/reviews");

/** 멤버 정보 조회 */
export const getMember = (userId: number) => API.get(`/members/${userId}/info`);

/** 닉네임 수정 */
export const updateNickname = (nickName: string) =>
  API.patch(`members/${localStorage.getItem("uid")}/nickname`, {
    nickname: nickName,
  });

/** 프로필 이미지 수정 */
export const updateProfileImage = () => API.patch("/members/image");

/** 회원 탈퇴 */
export const deleteMember = () =>
  API.delete(`/members/${localStorage.getItem("uid")}`);
