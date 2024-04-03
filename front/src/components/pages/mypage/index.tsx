import { useState } from "react";
import styled from "styled-components";

import theme from "../../../styles/Theme";
import { SSubTitle } from "../../../styles/Font";
import ButtonComponent from "../../atoms/auth/Button";
import useLogout from "../../../hooks/auth/useLogout";
import useDeleteId from "../../../hooks/auth/useDeleteId";
import useOpenModal from "../../../hooks/modal/useOpenModal";
import Modal from "../../atoms/modal/Modal";
import CircleItemList from "../../molecules/list/circleItemList";
import useGetUser, {
  useUpdateNickname,
  useUpdateProfileImage,
} from "../../../hooks/info/useGetUser";
import ProfileCard from "../../molecules/mypage/profileCard";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import useGetMyHeartList from "../../../hooks/heart/useGetMyHeartList";
import useGetMyReviews from "../../../hooks/review/useGetMyReviews";
import useRecommended from "../../../hooks/recommed/useRecommended";
import usePersuit from "../../../hooks/persuit/usePersuit";
import PersuitCard from "../../molecules/mypage/persuitCard";
import DefaultBlock from "../../atoms/item/defalutBlock";
import Page_Url from "../../../router/Url";
import TempMyReviewBox from "../../molecules/detail/tempReviewBoxMy";

function MyPage() {
  const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const Logout = useLogout();
  const DeleteId = useDeleteId();
  const [files, setFiles] = useState<FileList | null>();

  // 내 정보 불러오는 탠스택쿼리
  const { data, isLoading, isError, error } = useGetUser();
  const { data: HeartList } = useGetMyHeartList();
  const { data: ReviewList } = useGetMyReviews();
  const { data: RecommendedList } = useRecommended();
  const { data: PersuitList } = usePersuit();

  // 닉네임 뮤테이션
  const nickNameMutation = useUpdateNickname();

  // 닉네임 업데이트
  const updateNicknameFunction = (nickname: string) => {
    nickNameMutation.mutate(nickname);
  };

  // 프로필 이미지 뮤테이션
  const profileImageMutation = useUpdateProfileImage();

  // 프로필 이미지 버튼 핸들러
  const updateProfileImage = () => {
    if (files) {
      profileImageMutation.mutate(files[0]);
    } else {
      window.alert("프로필 이미지를 업로드해주세요.");
    }
  };
  // 로딩 화면
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>{error.message}</>;
  if (data && HeartList && RecommendedList && ReviewList)
    return (
      <SMyPageGrid>
        <SBlock>
          <PersuitCard data={PersuitList?.data}>
            <SSubTitle>내 추구미</SSubTitle>
            {PersuitList.data === null && (
              <DefaultBlock
                text="아직 정한 추구미가 없어요"
                link={Page_Url.SurveyLanding}
                linkText="추구미 정하러 가기"
              />
            )}
          </PersuitCard>
        </SBlock>
        <SBlock>
          <ProfileCard
            data={data}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFiles(event?.target?.files);
            }}
            updateProfileImage={updateProfileImage}
          />
        </SBlock>
        <SBlock>
          <SSubTitle>내가 쓴 리뷰들</SSubTitle>
          <TempMyReviewBox data={ReviewList.data}></TempMyReviewBox>
          {PersuitList.data === null && (
            <DefaultBlock text="작성한 리뷰가 없어요" />
          )}
        </SBlock>
        <SBlock>
          <CircleItemList data={HeartList.data}>
            <SSubTitle>좋아요 한 향수</SSubTitle>
            {HeartList.data == "" && (
              <DefaultBlock text="아직 좋아하는 향수가 없어요!" />
            )}
          </CircleItemList>
        </SBlock>
        <SBlock>
          <CircleItemList
          // data={[
          //   {
          //     id: localStorage.getItem("visited"),
          //     perfumeImg: localStorage.getItem("visitedImg"),
          //   },
          // ]}
          >
            <SSubTitle>내가 본 향수</SSubTitle>
          </CircleItemList>
        </SBlock>
        <SBlock>
          <CircleItemList data={RecommendedList?.data}>
            <SSubTitle>내가 추천받은 향수들</SSubTitle>
            {RecommendedList.data === null && (
              <DefaultBlock
                text="아직 추천받은 향수가 없어요!"
                link={Page_Url.SurveyLanding}
                linkText="추천 받으러 가기"
              />
            )}
          </CircleItemList>
        </SBlock>
        <SBlock>
          <ButtonComponent onClick={() => clickModal()}>
            닉네임 수정
          </ButtonComponent>
          <ButtonComponent onClick={() => Logout()}>로그아웃</ButtonComponent>
          <ButtonComponent onClick={() => DeleteId()}>회원탈퇴</ButtonComponent>
        </SBlock>
        {isOpenModal && (
          <Modal
            closeModal={closeModal}
            actionModal={updateNicknameFunction}
            title="닉네임 수정하기"
            alert={data.data?.nickname}
          />
        )}
      </SMyPageGrid>
    );
}

const SMyPageGrid = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  padding: 1em;
  gap: 15px;
  grid-template-columns: 1fr;
  width: 100%;
  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax((99vh / 4), auto));
  }
`;

const SBlock = styled.div`
  background-color: ${theme.color.sectionColor};
  width: 100%;
  min-width: 20em;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  transition: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  ${theme.styleBase.glassmorphism}
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: ease 0.1s all;
  &:nth-child(3) {
    max-height: 350px;
    overflow-y: hidden;
    &:hover {
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  @media only screen and (min-width: 768px) {
    &:nth-child(1) {
      grid-row: 1 / span 2;
    }

    &:nth-child(2) {
      grid-row: 2 / span 2;
    }
    &:nth-child(3) {
      grid-row: 1 / span 2;
      grid-column: 3 / span 1;
      max-height: 350px;
      overflow-y: hidden;
      &:hover {
        overflow-y: scroll;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &:nth-child(4) {
      grid-row: 3 / span 2;
    }
    &:nth-child(6) {
      grid-row: 3 / span 2;
      grid-column: 3;
    }
    &:nth-child(7) {
      grid-row: 4 / span 1;
      grid-column: 2;
    }
  }
`;

export default MyPage;
