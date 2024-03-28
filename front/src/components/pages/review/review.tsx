import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPerfumeReviews } from "../../../api/Api";
import { useParams } from "react-router-dom";
import useIntersectionObserver from "./hook";

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

function ReviewPage() {
  const { perfumeId } = useParams() as { perfumeId: string };
  const [isLoaded, seetIsLoaded] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState<Props["data"]>(null);

  const testFetch = (delay = 1000) =>
    new Promise((response) => setTimeout(response, delay));

  useEffect(() => {
    getPerfumeReviews(perfumeId).then((response) => {
      setData(response.data.data.content);
    });
  }, []);

  const onIntersect: IntersectionObserverCallback = async (
    [entry],
    observer
  ) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getPerfumeReviews(perfumeId);
      observer.observe(entry.target);
    }
  };

  const {setTarget} =useIntersectionObserver({
    root:null,
    rootMargin: "0px",
    threshold: 0.5,
    onIntersect,
  });

  return (
    <SReivewContainer>
      {/* <SEachReview> */}
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
            </SWriterInfo>
          </SReviewCard>
        ))}
      <div ref={setTarget}>{isLoaded && <div>Loading...</div>}</div>

      {/* </SEachReview> */}
    </SReivewContainer>
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

const SEachReview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const SReviewCard = styled.div`
  border-radius: 15px;
  background-color: pink;
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
