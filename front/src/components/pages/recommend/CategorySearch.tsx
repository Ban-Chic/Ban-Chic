import { MouseEventHandler, useEffect, useState } from "react";
import {
  getPerfumeBrand,
  getPerfumeGender,
  getPerfumeSeason,
} from "../../../api/Api";
import PerfumeListItem from "../../atoms/item/perfumeListItem";
import styled from "styled-components";
import { brandMap, genderMap, seasonMap } from "./a";
import Perfume from "./Perfume";
import { Link } from "react-router-dom";
import Page_Url from "../../../router/Url";

interface Perfume {
  perfumeId: number;
  perfumeImg: string;
  originName: string;
  brand: string;
  korName: string;
}

function CategorySearch() {
  const [perfumes, setPerfumes] = useState([]);
  const [selected, setSelected] = useState("겨울");

  const [seasons] = useState(["봄", "여름", "가을", "겨울", "낮", "밤"]);
  const onClickSeasonHandler: MouseEventHandler = (e: any) => {
    setSelected(e.target.innerText);
    getPerfumeSeason(seasonMap[e.target.innerText], 1).then((data) =>
      setPerfumes(data.data.content)
    );
  };

  const [brands] = useState([
    "바이레도",
    "샤넬",
    "디올",
    "캘빈 클라인",
    "조 말론",
    "딥디크",
    "톰 포드",
    "크리드",
    "펜할리곤스",
  ]);
  const onClickBrandHandler: MouseEventHandler = (e: any) => {
    setSelected(e.target.innerText);
    getPerfumeBrand(brandMap[e.target.innerText], 1).then((data) =>
      setPerfumes(data.data.content)
    );
  };

  const [genders] = useState(["남자", "여자", "중성"]);
  const onClickGenderHandler: MouseEventHandler = (e: any) => {
    setSelected(e.target.innerText);
    getPerfumeGender(genderMap[e.target.innerText], 1).then((data) =>
      setPerfumes(data.data.content)
    );
  };

  useEffect(() => {
    getPerfumeSeason("winter", 1).then((data) =>
      setPerfumes(data.data.content)
    );
  }, []);

  return (
    <>
      <SCategoryWrap>
        <SFlexWrap>
          <Sh2>계절</Sh2>
          <SFlexUl>
            {seasons.map((season, index) => {
              return (
                <Perfume
                  key={index}
                  select={selected}
                  click={onClickSeasonHandler}
                >
                  {season}
                </Perfume>
              );
            })}
          </SFlexUl>
        </SFlexWrap>
        <SFlexWrap>
          <Sh2>브랜드</Sh2>
          <SFlexUl>
            {brands.map((brand, index) => {
              return (
                <Perfume
                  key={index}
                  select={selected}
                  click={onClickBrandHandler}
                >
                  {brand}
                </Perfume>
              );
            })}
          </SFlexUl>
        </SFlexWrap>
        <SFlexWrap>
          <Sh2>성별</Sh2>
          <SFlexUl>
            {genders.map((gender, index) => {
              return (
                <Perfume
                  key={index}
                  select={selected}
                  click={onClickGenderHandler}
                >
                  {gender}
                </Perfume>
              );
            })}
          </SFlexUl>
        </SFlexWrap>
        <Link to={Page_Url.Map}>가까운 매장 찾아보기</Link>
      </SCategoryWrap>
      <SWrap>
        {perfumes.map((perfume: Perfume) => {
          return (
            <PerfumeListItem
              key={perfume.perfumeId}
              perfumeId={perfume.perfumeId}
              perfumeImg={perfume.perfumeImg}
              perfumeName={perfume.originName}
              perfumeKorName={perfume.korName}
              perfumeBrand={perfume.brand}
            ></PerfumeListItem>
          );
        })}
      </SWrap>
      {/* <div ref={nextDiv}>loading more perfumes</div> */}
    </>
  );
}

const SCategoryWrap = styled.div`
  margin: 1em;
`;

const Sh2 = styled.h2`
  font-weight: bold;
  font-size: 16px;
`;

const SFlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SFlexUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SWrap = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 1em;
  gap: 10px;
`;

export default CategorySearch;
