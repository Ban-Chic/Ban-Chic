import { useEffect, useState } from "react";
import { SSubTitle, STitle } from "../../../styles/Font";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import List from "../../molecules/list";
import styled from "styled-components";

interface PerfumeData {
  perfumeId: number;
  perfumeImg: string;
  perfumeName: string;
  perfumeBrand: string;
}

function RecommendPage() {
  const [data, setData] = useState<PerfumeData[] | null>();
  useEffect(() => {
    fetch("/recommend/top")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      });
  }, []);
  return (
    <>
      <SContainer>
        <STitle>Ban:Chic</STitle>
        <SSubTitle>이런 향을 좋아하시더라구요</SSubTitle>
        <List>
          {data &&
            data.map((item: PerfumeData) => (
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
          {data &&
            data.map((item: PerfumeData) => (
              <PerfumeListItem
                perfumeId={item.perfumeId}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeBrand={item.perfumeBrand}
                key={item.perfumeId}
              ></PerfumeListItem>
            ))}
        </List>
      </SContainer>
    </>
  );
}

const SContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default RecommendPage;
