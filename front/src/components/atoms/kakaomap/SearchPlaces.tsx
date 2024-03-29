import { useState } from "react";
import { SForm, SWrap } from "./KakaoMap.styled";
import { searchPlaces } from "./mapUtils";

function SearchPlaces() {
  const [value, setValue] = useState("");

  return (
    <SWrap id="places">
      <SForm
        onSubmit={(e) => {
          e.preventDefault();
          searchPlaces(value);
        }}
      >
        <p>키워드 :</p>
        <input
          type="text"
          id="keyword"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">검색하기</button>
      </SForm>
    </SWrap>
  );
}

export default SearchPlaces;
