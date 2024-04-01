import React, { useEffect } from "react";
import { MapContainer } from "./KakaoMap.styled";
import LocationBtn from "./LocationBtn";
import SearchPlaces from "./SearchPlaces";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap(): React.ReactElement {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
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

        // make info window
        window.kakao.infowindow = new window.kakao.maps.InfoWindow({
          zIndex: 1,
        });

        navigator.geolocation.getCurrentPosition(
          (data) => {
            const position = [data.coords.latitude, data.coords.longitude];
            window.kakao.obj.setCenter(
              new window.kakao.maps.LatLng(...position)
            );
          },
          () => {
            alert(
              "위치 권한 설정을 허용으로 변경해주세요!\n현재 위치 기반으로 검색 결과를 반환해드립니다."
            );
          }
        );
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <MapContainer id="map">
        <SearchPlaces />
        <LocationBtn />
      </MapContainer>
    </>
  );
}

export default KakaoMap;
