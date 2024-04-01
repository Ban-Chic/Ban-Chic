import { SImg } from "./KakaoMap.styled";
import locationImg from "/now_locations.png";

function LocationBtn() {
  const onClickHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (geolocation: GeolocationPosition) => {
        const { latitude, longitude } = geolocation.coords;
        window.kakao.obj.setCenter(
          new window.kakao.maps.LatLng(latitude, longitude)
        );
      },
      () => {
        window.kakao.obj.setCenter(
          new window.kakao.maps.LatLng(33.450701, 126.570667)
        );
      }
    );
  };
  return (
    <SImg src={locationImg} alt="현재 위치로 이동" onClick={onClickHandler} />
  );
}

export default LocationBtn;
