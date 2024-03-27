import React, { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMap: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      new window.naver.maps.Map("map", mapOptions);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <MapContainer id="map" />;
};

const MapContainer = styled.div`
  height: 100%;
`;

export default NaverMap;
