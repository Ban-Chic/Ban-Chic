import { useEffect, useState } from "react";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import List from "../../atoms/list";
import { getRecommendedPerfumeList } from "../../../api/Api";
import { SSubTitle, STitle } from "../../../styles/Font";
import styled from "styled-components";

interface PerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
  brandName: string;
  korName: string;
}

function RecommendList() {
  const [recommends, setRecommends] = useState<PerfumeData[]>();

  useEffect(() => {
    getRecommendedPerfumeList().then((data) => setRecommends(data.data));
  }, []);

  return (
    <>
      <SDiv>
        <STitle>Ban:Chic</STitle>
        <SSubTitle>이런 향은 어떠세요</SSubTitle>
      </SDiv>

      <main>
        <List>
          {recommends &&
            recommends.map((item: PerfumeData) => (
              <PerfumeListItem
                key={item.id}
                perfumeId={item.id}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeKorName={item.korName}
                perfumeBrand={item.brandName}
              ></PerfumeListItem>
            ))}
        </List>
      </main>
    </>
  );
}

const SDiv = styled.div`
  margin: 1em;
`;

export default RecommendList;
