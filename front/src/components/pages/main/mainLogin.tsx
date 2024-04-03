import styled from "styled-components";
import { STitle } from "../../../styles/Font";
import List from "../../atoms/list";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import useRecommended from "../../../hooks/recommed/useRecommended";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import useCFRecommended from "../../../hooks/recommed/useCFRecommended";

interface PerfumeData {
  id: number;
  perfumeImg: string;
  perfumeName: string;
  brandName: string;
  korName: string;
}
function MainLoginPage() {
  const { data, isLoading } = useRecommended();
  const { data: cfdata, isLoading: isCFLoading } = useCFRecommended();

  return (
    <>
      <SMainContainer>
        <STitle>로컬 네비</STitle>
        <STitle>CF</STitle>
        <List>
          {cfdata &&
            cfdata?.data?.map((item: PerfumeData) => (
              <PerfumeListItem
                key={item.id}
                perfumeId={item.id}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeKorName={item.korName}
                perfumeBrand={item.brandName}
              ></PerfumeListItem>
            ))}
          {cfdata === null && <div>추천해드릴게 없네요!</div>}
          {isCFLoading && <LoadingSpinner />}
        </List>
        <STitle>CBF</STitle>
        <List>
          {data &&
            data?.data?.map((item: PerfumeData) => (
              <PerfumeListItem
                key={item.id}
                perfumeId={item.id}
                perfumeImg={item.perfumeImg}
                perfumeName={item.perfumeName}
                perfumeKorName={item.korName}
                perfumeBrand={item.brandName}
              ></PerfumeListItem>
            ))}
          {data?.data === null && <div>추천해드릴게 없네요!</div>}
          {isLoading && <LoadingSpinner />}
        </List>
        <STitle>페이지 이동</STitle>
      </SMainContainer>
    </>
  );
}

const SMainContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainLoginPage;
