import styled from "styled-components";

interface Props {
  perfumeImg: string;
}

function ReviewInDetail(Props: Props) {
  return (
    <>
      <SContainer>
        <SListItemContainer>
          <SIdAndRating>
            <div>아이디1</div>
            <div>별점 </div>
          </SIdAndRating>
          <SImgContainer src={Props.perfumeImg} alt="logo" />
          <SReviewText>이 향수 별로네요!! 강추!!</SReviewText>
        </SListItemContainer>
        <SListItemContainer>
          <SIdAndRating>
            <div>아이디2</div>
            <div>별점 </div>
          </SIdAndRating>
          <SImgContainer src={"public/img_perfume_sample.png"} alt="logo" />
          <SReviewText>앞 리뷰 때문에 샀어요!! 돈낭비 오짐!</SReviewText>
        </SListItemContainer>
      </SContainer>
    </>
  );
}

const SContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  gap: 15px;
`;

const SListItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid black;
  border-radius: 15px;
  width: 170px;
  height: 100%;
  background-color: pink;
  gap: 10px;
`;

const SImgContainer = styled.img`
  width: 70%;
  margin: 0 auto;
`;

const SReviewText = styled.span`
  font-size: 15px;
`;

const SIdAndRating = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default ReviewInDetail;
