import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPerfumeReviews, postPerfumeReview } from "../../../api/Api";

interface Props {
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

function CRUDTest() {
  //리뷰 등록
  const [board, setBoard] = useState({
    rate: 0,
    content: "",
    pefumeId: 1,
  });

  const [reviewImg, setReviewImg] = useState(new File([], "", { type: "" }));
  const onChange = (event: any) => {
    const { value, name } = event.target;
    if (name === "rate") {
      setBoard({
        ...board,
        [name]: Number(value),
      });
    } else {
      setBoard({
        ...board,
        [name]: value,
      });
    }
    console.log(board);
  };

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files) {
      setReviewImg({
        ...reviewImg,
        [name]: files[0],
      });
    }
  };

  //리뷰 조회
  const perfumeId = "1";
  const [data, setData] = useState<Props["data"]>(null);
  useEffect(() => {
    getPerfumeReviews(perfumeId)
      .then((response) => {
        setData(response.data.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        <div>등록zone</div>
        <span>content</span>
        <SInput type="text" name="content" onChange={onChange} />
        <span>rating</span>
        <SInput type="number" name="rate" onChange={onChange} />
        <span>perfumeId</span>
        <SInput type="number" name="perfumeId" value="1" onChange={onChange} />
        <input
          type="file"
          name="file"
          accept="image/*"
          onInput={onChangeFile}
        />
        <button
          onClick={() => {
            postPerfumeReview(perfumeId, board.rate, board.content).catch(
              (error) => {
                console.log(error);
              }
            );
          }}
        >
          등록버튼
        </button>
      </div>
      <div>조회 zone</div>
      <SContainer>
        {data &&
          data.content.map((item, index: number) => (
            <SDiv key={index}>
              <img src={item.imgUrl} alt="" />
              <div>
                <p>{item.content}</p>
              </div>
              <div>
                <img src={item.member.image} alt="" />
                <p>{item.member.nickname}</p>
              </div>
            </SDiv>
          ))}
      </SContainer>
    </>
  );
}

const SInput = styled.input`
  background-color: black;
`;

const SDiv = styled.div`
  width: 150px;
`;

const SContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: gray;
`;

export default CRUDTest;
