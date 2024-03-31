import { useEffect, useState } from "react";
import styled from "styled-components";
import { deletePerfumeReview, getPerfumeReviews } from "../../../api/Api";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  data: {
    content: {
      id: number;
      rate: number;
      content: string;
      imgUrl: string;
      member: {
        email: string;
        imageUrl: string;
        nickname: string;
      };
    };
    pagealbe: object;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  } | null;
}

interface item {
  id: number;
  rate: number;
  content: string;
  imgUrl: string;
  member: {
    email: string;
    imageUrl: string;
    nickname: string;
  };
}

function ReviewPage() {
  const { perfumeId } = useParams() as { perfumeId: string };
  const [data, setData] = useState<Props["data"]>(null);

  const navigate = useNavigate();

  const navigateToModify = (perfumeId: number, item: item) => {
    navigate(`/perfumes/${perfumeId}/reviews/${item.id}`, {
      state: { content: item.content, rating: item.rate },
    });
  };

  useEffect(() => {
    getPerfumeReviews(perfumeId).then((response) => {
      setData(response.data.data.content);
    });
  }, []);

  return (
    <>
      <SReivewContainer>
        {data &&
          data.map((item, index: number) => (
            <SReviewCard key={index}>
              <SReviewImg src={item.imgUrl} alt="" />
              <div>
                <p>{item.content}</p>
              </div>
              <SWriterInfo>
                <SProfileImg src={item.member.imgUrl} alt="" />
                <p>{item.member.nickname}</p>
                <p>{item.rate}</p>
              </SWriterInfo>
              <button onClick={() => navigateToModify(Number(perfumeId), item)}>
                수정 버튼
              </button>
              <button
                onClick={() => deletePerfumeReview(Number(perfumeId), item.id)}
              >
                삭제 버튼
              </button>
            </SReviewCard>
          ))}
      </SReivewContainer>
    </>
  );
}

const SReivewContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 90%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const SReviewImg = styled.img`
  width: 300px;
  background: url(/img_perfume_sample.png) no-repeat;
  background-size: cover;
  height: 300px;

  border-radius: 15px;
`;

const SProfileImg = styled.img`
  transition: 2s linear;
  border-radius: 50%;
  width: 30px;
  background: url(/logo_orange.png) no-repeat;
  background-size: cover;
`;

const SReviewCard = styled.div`
  border-radius: 15px;
  background-color: blue;
  padding: 10px;
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SWriterInfo = styled.div`
  display: flex;
  justify-content: space-around;
`;
export default ReviewPage;
