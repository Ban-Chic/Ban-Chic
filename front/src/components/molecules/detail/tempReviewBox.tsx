import styled from "styled-components";
import { ReactNode, useState } from "react";
import { SBody1, SBody2 } from "../../../styles/Font";
import { useParams } from "react-router-dom";

import StarDisplay from "../../atoms/modalForm/StarDisplay";
import ModalUpdateForm from "../../atoms/modalForm/ModalUpdateForm";

import {
  useDeleteReview,
  useUpdateReview,
} from "../../../hooks/review/useGetPerfumeReviews";
import useOpenModal from "../../../hooks/modal/useOpenModal";
import useGetUser from "../../../hooks/info/useGetUser";

interface Props {
  children?: ReactNode;
  data: {
    data: {
      content: {
        id: number;
        rate: number;
        content: string;
        imgUrl: string;
        member: {
          email: string;
          image: string;
          nickname: string;
        };
      }[];
    };
    totalPages: number;
    totalElements: number;
  };
  perfumeId: string;
}

function TempReviewBox({ children, data }: Props) {
  const { data: userData } = useGetUser();
  const { perfumeId } = useParams() as { perfumeId: string };
  const [selectedReviewId, setSelectedReviewId] = useState(0);
  const [selectedReviewRate, setSelectedReviewRate] = useState(0);
  const [selectedReviewContent, setSelectedReviewContent] = useState("");
  const { isOpenModal, clickModal, closeModal } = useOpenModal();

  const deleteReview = useDeleteReview();
  const deleteReviewFunction = (
    perfumeId: number,
    reviewId: number,
    email: string,
    userEmail: string
  ) => {
    if (email === userEmail) {
      deleteReview.mutate({ perfumeId, reviewId });
      window.alert("리뷰 삭제가 완료되었습니다.");
    } else {
      window.alert("본인이 작성한 리뷰만 삭제할 수 있습니다.");
    }
  };

  const putReview = useUpdateReview();
  const putReviewFunction = (
    perfumeId: number,
    reviewId: number,
    rate: number,
    content: string
  ) => {
    putReview.mutate({ perfumeId, reviewId, rate, content });
    window.alert("리뷰 수정이 완료되었습니다.");
  };

  const openModalWithReview = (
    reviewId: number,
    content: string,
    rate: number,
    email: string
  ) => {
    if (email !== userData.data.email) {
      window.alert("본인이 작성한 리뷰만 수정할 수 있습니다.");
      return;
    }
    clickModal();
    setSelectedReviewId(reviewId);
    setSelectedReviewContent(content);
    setSelectedReviewRate(rate);
    // setIsOpenModal(true);
  };

  return (
    <SBoxContainer>
      {children}
      {data.data.content.map((item) => (
        <SReviewItem>
          <SDiv>
            <SBody1>{item.content}</SBody1>
            <SBtnModify
              onClick={() =>
                openModalWithReview(
                  item.id,
                  item.content,
                  item.rate,
                  item.member.email
                )
              }
            >
              수정
            </SBtnModify>
            <button
              onClick={() =>
                deleteReviewFunction(
                  Number(perfumeId),
                  item.id,
                  item.member.email,
                  userData.data.email
                )
              }
            >
              삭제
            </button>
          </SDiv>
          <div>
            <SStarRate>
              <StarDisplay rate={item.rate} />
            </SStarRate>
            {/* <SRate>{item.rate}</SRate> */}
            <SProfile>
              <SProfileCircle
                $ImgUrl={item.member.image || "/user.svg"}
              ></SProfileCircle>
              <SBody2>{item.member.nickname}</SBody2>
            </SProfile>
          </div>
        </SReviewItem>
      ))}
      {isOpenModal && selectedReviewId !== null && (
        <ModalUpdateForm
          closeModal={closeModal}
          actionModal={(perfumeId, reviewId, rate, content) =>
            putReviewFunction(Number(perfumeId), reviewId, rate, content)
          }
          title="리뷰 수정하기"
          perfumeId={Number(perfumeId)}
          reviewId={selectedReviewId}
          initialRate={selectedReviewRate}
          initialContent={selectedReviewContent}
          // alert={data.data?.nickname}
        />
      )}
    </SBoxContainer>
  );
}

// const SRate = styled.div`
//   position: absolute;
//   top: 3px;
//   right: 3px;
//   background-color: deepskyblue;
//   width: 1.5em;
//   text-align: center;
//   border-radius: 2em;
// `;

const SDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SBtnModify = styled.button`
  display: flex;
  justify-content: end;
`;

const SProfileCircle = styled.div<{ $ImgUrl: string }>`
  max-width: 30px;
  max-height: 30px;
  min-width: 10px;
  min-height: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  background-image: url(${(props) => props.$ImgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
`;

const SReviewItem = styled.div`
  background-color: #707070;
  border-radius: 5px;
  padding: 0.5em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const SBoxContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  height: 100%;
  padding: 0.5em;
  @media only screen and (min-width: 768px) {
    /* max-width: 300px; */
  }
`;

const SStarRate = styled.div`
  position: absolute;
  /* top: 3px; */
  bottom: 15px;
  right: 3px;
  /* background-color: deepskyblue; */
  width: 5em;
  display: flex;
  /* text-align: center; */
  /* border-radius: 2em; */
`;

export default TempReviewBox;
