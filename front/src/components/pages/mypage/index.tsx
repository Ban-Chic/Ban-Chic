import { useEffect, useState } from "react";
import styled from "styled-components";

function MyPage() {
  const [nickNamedata, setNickNamedata] = useState<string>("");
  const [Img, setImg] = useState<string>("");
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNickNamedata(data[0].nickName);
        setImg(data[0].profileImg);
      });
  }, []);
  return (
    <>
      <SMyPageGrid>
        <SBlock>좋아요 한 향수</SBlock>
        <SBlock>
          <SFlexCenter>
            <div>내정보</div>
            <SProfile imageUrl={Img} />
            {nickNamedata && <div>{nickNamedata}</div>}
          </SFlexCenter>
        </SBlock>
        <SBlock>내가 본 향수</SBlock>
        <SBlock>서베이</SBlock>
        <SBlock>내가 쓴 리뷰들</SBlock>
        <SBlock>내 검색기록</SBlock>
        <SBlock>닉네임 변경 / 로그아웃</SBlock>
      </SMyPageGrid>
    </>
  );
}

const SFlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const SProfile = styled.div<{ imageUrl: string }>`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: red;
  background-image: url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
`;

const SMyPageGrid = styled.main`
  display: grid;
  padding: 10px;
  gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, minmax(calc((100vh - 44px - 60px) / 4), auto));
`;

const SBlock = styled.div`
  background-color: #e2e2e2;
  width: 100%;
  border-radius: 10px;
  color: #191919;
  padding: 10px;

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
`;

export default MyPage;
