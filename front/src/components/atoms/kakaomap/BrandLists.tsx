import { searchKakaoPlaces } from "./mapUtils";

import styled from "styled-components";

function BrandLists() {
  const onClickHandler = (e: any) => {
    searchKakaoPlaces(e.target.innerText);
  };

  const brands = [
    "바이레도", // byredo
    "르 라보", // le labo
    "이솝", // aesop
    "조 말론", // jo malone
    "딥디크", // diptyque
    "톰 포드", // tom ford
    "메종 마르지엘라", // maison margiela
    "크리드", // creed
    "펜할리곤스", // penhaligon's
  ];

  return (
    <>
      <nav>
        <SUL>
          {brands.map((brand, index) => {
            return (
              <SLi key={index} onClick={onClickHandler}>
                {brand}
              </SLi>
            );
          })}
        </SUL>
      </nav>
    </>
  );
}

const SUL = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
  flex-wrap: wrap;
`;

const SLi = styled.li`
  font-size: 18px;
  cursor: pointer;
  font-family: "pretendard", sans-serif;
`;

export default BrandLists;
