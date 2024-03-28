import React, { useEffect } from "react";
import { MapContainer } from "./KakaoMap.styled";
import LocationBtn from "./LocationBtn";

declare global {
  interface Window {
    kakao: any;
  }
}

// 구현할 기능
// 1. 닫기 가능한 커스텀 오버레이 제작
// 2. 키워드로 장소 검색 -> 목록 표출
// 3. 현재 위치로 이동 (V)

function KakaoMap(): React.ReactElement {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 5,
        };

        window.kakao.obj = new window.kakao.maps.Map(mapContainer, mapOptions);

        // make map control
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        window.kakao.obj.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        // make zoom control
        const zoomControl = new window.kakao.maps.ZoomControl();
        window.kakao.obj.addControl(
          zoomControl,
          window.kakao.maps.ControlPosition.RIGHT
        );
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <MapContainer id="map" />;
      <LocationBtn />
    </>
  );
}

export default KakaoMap;
