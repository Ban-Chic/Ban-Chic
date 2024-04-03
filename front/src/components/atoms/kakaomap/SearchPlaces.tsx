import { useState } from "react";
import { SForm, SWrap } from "./KakaoMap.styled";
import { searchKakaoPlaces } from "./mapUtils";
import styled from "styled-components";

function SearchPlaces() {
  const [value, setValue] = useState("");

  return (
    <SWrap id="places">
      <SForm
        onSubmit={(e) => {
          e.preventDefault();
          searchKakaoPlaces(value);
        }}
      >
        <SInputWrap>
          <SInput
            type="text"
            id="keyword"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="검색어를 입력해주세요."
          />
          <button type="submit">
            <img src="/mapImg/search.png" alt="#" />
          </button>
        </SInputWrap>
      </SForm>
    </SWrap>
  );
}

const SInputWrap = styled.div`
  padding: 5px 10px;
  border-radius: 5px;

  display: flex;
  align-items: center;
  gap: 5px;

  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const SInput = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
`;

export default SearchPlaces;
