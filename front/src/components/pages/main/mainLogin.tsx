import styled from "styled-components";
import { STitle } from "../../../styles/Font";
import List from "../../atoms/list";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import useRecommended from "../../../hooks/recommed/useRecommended";
import LoadingSpinner from "../../../utils/LoadingSpinner";
import useCFRecommended from "../../../hooks/recommed/useCFRecommended";
import LocalNav from "../../molecules/common/localnav";
import ParallaxTextforUse from "../../atoms/framer/ParallaxTextforUse";

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
        <LocalNav />

        <STitle>분명 {localStorage.getItem("nickname")}님 취향일거에요</STitle>
        <SMax>
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
            {cfdata == null && <div>추천해드릴게 없네요!</div>}
            {isCFLoading && <LoadingSpinner />}
          </List>
        </SMax>
        <SMax>
          <ParallaxTextforUse xx={0} yy={0} zz={1} deg={0} baseVelocity={0.25}>
            BABABA EDGE
          </ParallaxTextforUse>
          <ParallaxTextforUse
            xx={0}
            yy={0}
            zz={-1}
            deg={0}
            baseVelocity={-0.25}
          >
            BABABA EDGE
          </ParallaxTextforUse>
        </SMax>
        <STitle>
          {localStorage.getItem("nickname")}님과 잘 어울리는 향수들
        </STitle>
        <SMax>
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
        </SMax>
      </SMainContainer>
    </>
  );
}

const SMax = styled.div`
  max-width: 1200px;
  &:nth-child(4) {
    opacity: 0.05;
  }
`;

const SMainContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainLoginPage;
