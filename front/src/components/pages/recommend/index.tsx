import { useEffect, useState } from "react";
import { SSubTitle, STitle } from "../../../styles/Font";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import List from "../../atoms/list";
import styled from "styled-components";
import { getLikes, getRecommendedPerfumeList } from "../../../api/Api";

interface PerfumeData {
  perfumeId: number;
  perfumeImg: string;
  perfumeName: string;
  perfumeBrand: string;
}

function RecommendPage() {
  const [likes, setLikes] = useState<PerfumeData[]>();
  const [recommends, setRecommends] = useState<PerfumeData[]>();

  useEffect(() => {
    const uid: string | null = localStorage.getItem("uid");
    if (uid !== null) {
      getLikes(parseInt(uid)).then((data) => setLikes(data.data));
    } else {
      alert("UID가 없습니다. 로그인하세요.");
    }
    getRecommendedPerfumeList().then((data) => console.log(data));
  }, []);

  return (
    <>
      <SContainer>
        <STitle>Ban:Chic</STitle>
        <SSubTitle>이런 향을 좋아하시더라구요</SSubTitle>
        <List>
          {likes &&
            likes.map((item: PerfumeData) => (
              <PerfumeListItem
                perfumeId={item.perfumeId}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeBrand={item.perfumeBrand}
                key={item.perfumeId}
              ></PerfumeListItem>
            ))}
        </List>
        <SSubTitle>이런 향은 어떠세요</SSubTitle>
        <List>
          {/* {recommends &&
            recommends.map((item: PerfumeData) => (
              <PerfumeListItem
                perfumeId={item.perfumeId}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeBrand={item.perfumeBrand}
                key={item.perfumeId}
              ></PerfumeListItem>
            ))} */}
        </List>
      </SContainer>
    </>
  );
}

const SContainer = styled.main`
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
`;

export default RecommendPage;
