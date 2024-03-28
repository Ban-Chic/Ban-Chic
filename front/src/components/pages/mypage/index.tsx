import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { STitle, SSubTitle, SBody1 } from "../../../styles/Font";

import List from "../../molecules/list";
import CircleItem from "../../atoms/item/circleItem";
import { getMember, updateProfileImage } from "../../../api/Api";
import ButtonComponent from "../../atoms/auth/Button";
import useLogout from "../../../hooks/auth/useLogout";
import useNickNameChange from "../../../hooks/auth/useNickNameChange";
import useDeleteId from "../../../hooks/auth/useDeleteId";
import useOpenModal from "../../../hooks/modal/useOpenModal";
import Modal from "../../atoms/modal/Modal";

function MyPage() {
  const [nickNamedata, setNickNamedata] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { isOpenModal, clickModal, closeModal } = useOpenModal();
  const Logout = useLogout();
  const { nick, changeNickName } = useNickNameChange();
  const DeleteId = useDeleteId();
  const [files, setFiles] = useState<FileList | null>();

  useEffect(() => {
    getMember(Number(localStorage.getItem("uid"))).then((res) => {
      setNickNamedata(res.data.data.nickname);
      setEmail(res.data.data.email);
      res.data.data.image
        ? setProfileImg(res.data.data.image)
        : setProfileImg("/defalutUser.png");
    });
  }, [nick]);

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
            <SProfile $imageurl={profileImg} />
            <input
              type="file"
              id="profileImg"
              accept="iamge/*"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFiles(event?.target?.files);
              }}
            />
            <button type="submit" onClick={subsub}>
              제출
            </button>
            {nickNamedata && <STitle>{nickNamedata}</STitle>}
            {email && <SBody1>{email}</SBody1>}
          </SFlexCenter>
        </SBlock>
        <SBlock>
          <SSubTitle>내가 쓴 리뷰들</SSubTitle>
        </SBlock>
        <SBlock>
          <SSubTitle>좋아요 한 향수</SSubTitle>
          <List>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
          </List>
        </SBlock>
        <SBlock>
          <SSubTitle>내가 본 향수</SSubTitle>
          <List>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" $imageUrl="/tomford.jpg"></CircleItem>
          </List>
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
            actionModal={changeNickName}
            title="닉네임 수정하기"
            alert={nickNamedata}
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
