import styled from "styled-components";
import KakaoMap from "../../atoms/kakaomap/KakaoMap";

function MapPage() {
  return (
    <>
      <SDiv>
        <KakaoMap />
      </SDiv>
    </>
  );
}

const SDiv = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
`;

export default MapPage;
