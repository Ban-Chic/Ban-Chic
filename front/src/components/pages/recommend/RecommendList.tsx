import { useEffect, useState } from "react";
import { SSubTitle, STitle } from "../../../styles/Font";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import List from "../../atoms/list";
import { getRecommendedPerfumeList } from "../../../api/Api";

interface PerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
  brandName: string;
}

function RecommendList() {
  const [recommends, setRecommends] = useState<PerfumeData[]>();

  useEffect(() => {
    getRecommendedPerfumeList().then((data) => setRecommends(data.data));
  }, []);

  return (
    <main>
      <STitle>Ban:Chic</STitle>
      <SSubTitle>이런 향은 어떠세요</SSubTitle>
      <List>
        {recommends &&
          recommends.map((item: PerfumeData) => (
            <PerfumeListItem
              key={item.id}
              perfumeId={item.id}
              perfumeImg={item.perfumeImg}
              perfumeName={item.perfumeName}
              perfumeBrand={item.brandName}
            ></PerfumeListItem>
          ))}
      </List>
    </main>
  );
}

export default RecommendList;
