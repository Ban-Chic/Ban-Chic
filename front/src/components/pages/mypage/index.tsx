import { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../../../styles/Theme";
import { STitle, SSubTitle, SBody1 } from "../../../styles/Font";
import List from "../../molecules/list";
import CircleItem from "../../atoms/item/circleItem";
import { getMember } from "../../../api/Api";
import ButtonComponent from "../../atoms/auth/Button";
import useLogout from "../../../hooks/auth/useLogout";

function MyPage() {
  const [nickNamedata, setNickNamedata] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const Logout = useLogout();

  useEffect(() => {
    getMember(Number(localStorage.getItem("uid"))).then((res) => {
      console.log(res);
      setNickNamedata(res.data.data.nickname);
      setProfileImg(res.data.data.image);
      setEmail(res.data.data.email);
    });
  }, []);

  return (
    <SMypageContainer>
      <SMyPageGrid>
        <SBlock>
          <SSubTitle>내 추구미</SSubTitle>
        </SBlock>
        <SBlock>
          <SFlexCenter>
            <SSubTitle>내 정보</SSubTitle>
            <SProfile imageUrl={profileImg} />
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
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
          </List>
        </SBlock>
        <SBlock>
          <SSubTitle>내가 본 향수</SSubTitle>
          <List>
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
            <CircleItem url="/" imageUrl="/tomford.jpg"></CircleItem>
          </List>
        </SBlock>
        <SBlock>
          <SSubTitle>내 검색기록</SSubTitle>
        </SBlock>
        <SBlock>
          <ButtonComponent onClick={() => Logout()}>로그아웃</ButtonComponent>
        </SBlock>
      </SMyPageGrid>
    </SMypageContainer>
  );
}
const SProfile = styled.div<{ imageUrl: string }>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: red;
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
`;

const SFlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const SMypageContainer = styled.main`
  background-image: url("./ddddd.jpg");
`;

const SMyPageGrid = styled.section`
  max-width: 1200px;

  margin: 0 auto;
  display: grid;
  padding: 10px;
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
  border-radius: 10px;
  padding: 10px;
  transition: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  ${theme.styleBase.glassmorphism}
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
