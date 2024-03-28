import { useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { STitle, SSubTitle, SBody1 } from "../../../styles/Font";
import {
  getMember,
  updateNickname,
  updateProfileImage,
} from "../../../api/Api";
import ButtonComponent from "../../atoms/auth/Button";
import useLogout from "../../../hooks/auth/useLogout";
import useDeleteId from "../../../hooks/auth/useDeleteId";
import useOpenModal from "../../../hooks/modal/useOpenModal";
import Modal from "../../atoms/modal/Modal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CircleItemList from "../../molecules/list/circleItemList";

function MyPage() {
  const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const Logout = useLogout();
  const DeleteId = useDeleteId();
  const [files, setFiles] = useState<FileList | null>();

  const queryClient = useQueryClient();

  // 내 정보 불러오는 탠스택쿼리
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mypage"],
    queryFn: () => getMember(Number(localStorage.getItem("uid"))),
  });

  // 닉네임 뮤테이션
  const useUpdateNickname = useMutation({
    mutationFn: updateNickname,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mypage"] });
    },
    mutationKey: ["nickname"],
  });

  // 닉네임 업데이트
  const updateNicknameFunction = (nickname: string) => {
    useUpdateNickname.mutate(nickname);
  };

  // 로딩 화면
  if (isLoading) return <>Loading</>;
  if (isError) return <>{error.message}</>;

  // 이미지 제출
  const subsub = () => {
    if (files) {
      updateProfileImage(files[0]).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <SMypageContainer>
      <SMyPageGrid>
        <SBlock>
          <SSubTitle>내 추구미</SSubTitle>
        </SBlock>
        <SBlock>
          <SFlexCenter>
            <SSubTitle>내 정보</SSubTitle>
            <SProfile $imageurl={data.data.image} />
            <input
              type="file"
              id="profileImg"
              accept="iamge/*"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                console.log(event.target.files);
                setFiles(event?.target?.files);
              }}
            />
            <button type="submit" onClick={subsub}>
              제출
            </button>
            {data.data.nickname && <STitle>{data.data.nickname}</STitle>}
            {data.data.email && <SBody1>{data.data.email}</SBody1>}
          </SFlexCenter>
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
          <SSubTitle>내 검색기록</SSubTitle>
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
            alert={data.data.nickname}
          />
        )}
      </SMyPageGrid>
    </SMypageContainer>
  );
}
const SProfile = styled.div<{ $imageurl: string }>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: var(--color-white);
  background-image: url(${(props) => props.$imageurl});
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(0.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const SFlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

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
