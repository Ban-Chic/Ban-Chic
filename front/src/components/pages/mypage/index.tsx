import { useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { STitle, SSubTitle, SBody1 } from "../../../styles/Font";
import { updateProfileImage } from "../../../api/Api";
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

function MyPage() {
  const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const Logout = useLogout();
  const DeleteId = useDeleteId();
  const [files, setFiles] = useState<FileList | null>();

  // 내 정보 불러오는 탠스택쿼리
  const { data, isLoading, isError, error } = useGetUser();

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
    console.log(typeof data);
  };

  // 로딩 화면
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>{error.message}</>;
  return (
    <SMypageContainer>
      <SMyPageGrid>
        <SBlock>
          <SSubTitle>내 추구미</SSubTitle>
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
        </SBlock>
        <SBlock>
          <CircleItemList data={[{ perfumeId: 1, imageUrl: "/tomford.jpg" }]}>
            <SSubTitle>좋아요 한 향수</SSubTitle>
          </CircleItemList>
        </SBlock>
        <SBlock>
          <CircleItemList data={[{ perfumeId: 1, imageUrl: "/tomford.jpg" }]}>
            <SSubTitle>내가 본 향수</SSubTitle>
          </CircleItemList>
        </SBlock>
        <SBlock>
          <CircleItemList data={[{ perfumeId: 1, imageUrl: "/tomford.jpg" }]}>
            <SSubTitle>내가 추천받은 향수들</SSubTitle>
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
    </SMypageContainer>
  );
}

const SMypageContainer = styled.main``;

const SMyPageGrid = styled.section`
  max-width: 1200px;

  margin: 0 auto;
  display: grid;
  padding: 1em;
  gap: 15px;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(
      4,
      minmax(calc((100vh - 44px - 60px) / 4), auto)
    );
  }
`;

const SBlock = styled.div`
  background-color: ${theme.color.sectionColor};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  transition: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  ${theme.styleBase.glassmorphism}
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: ease 0.1s all;
  @media only screen and (min-width: 768px) {
    &:nth-child(1),
    &:nth-child(3) {
      grid-row: 1 / span 2;
    }

    &:nth-child(2) {
      grid-row: 2 / span 2;
    }

    &:nth-child(4),
    &:nth-child(6) {
      grid-row: 3 / span 2;
    }
  }
`;

export default MyPage;
