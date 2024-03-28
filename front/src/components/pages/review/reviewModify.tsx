import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { updatePerfumeReview } from "../../../api/Api";

interface Props {
  oneReview: {
    content: string;
    rating: number;
  };
}

function ReviewModify() {
  const { perfumeId } = useParams() as { perfumeId: string };
  const { reviewId } = useParams() as { reviewId: string };
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState<string>(location.state.content);
  const [rating, setRating] = useState<number>(location.state.rating);

  const formCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("리뷰 수정을 취소할까요?")) {
      navigate(`/perfumes/${perfumeId}/reviews`);
    } else {
      return false;
    }
  };

  const formSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (content.length === 0) {
      alert("내용을 입력해주세요.");
    } else if (rating == null) {
      alert("별점을 입력해주세요.");
    } else {
      if (window.confirm("리뷰를 수정하시겠습니까?")) {
        updatePerfumeReview(Number(perfumeId), Number(reviewId), {rate: rating, content: content})
          .then(function (response) {
            alert("수정 완료");
            navigate(`/perfumes/${perfumeId}/reviews`);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        return false;
      }
    }
  };

  return (
    <>
      <div>
        <form action="">
          <div>
            <label htmlFor="content">content</label>
            <SInput
              type="text"
              id="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder="리뷰를 입력하세요"
              defaultValue={content}
            />
          </div>
          <div>
            <label htmlFor="rating">rating</label>
            <SInput
              type="number"
              id="rating"
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="별점을 입력하세요"
              defaultValue={rating}
            />
          </div>
        </form>
        <div>
          <button onClick={formSubmit}>완료 </button> |
          <button onClick={formCancel}> 취소</button>
        </div>
      </div>
    </>
  );
}

const SInput = styled.input`
  background-color: black;
`;

export default ReviewModify;
