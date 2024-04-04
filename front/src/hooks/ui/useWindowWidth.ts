import { useState, useEffect } from "react";

/** 윈도우 너비를 반환하는 커스텀 훅 */
function useWindowWidth() {
  // 윈도우 너비를 상태로 저장
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 너비를 설정하는 핸들러 함수
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // 윈도우 resize 이벤트에 핸들러를 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트되거나 업데이트되기 전에 이벤트 리스너를 정리(clean up)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

export default useWindowWidth;
