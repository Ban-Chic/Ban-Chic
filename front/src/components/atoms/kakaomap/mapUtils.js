function searchKakaoPlaces(keyword) {
  if (!keyword.replace(/^\s+|\s+$/g, "")) {
    alert("키워드를 입력해주세요!");
    return false;
  }

  if (!window.kakao.ps) {
    window.kakao.ps = new window.kakao.maps.services.Places();
  }

  navigator.geolocation.getCurrentPosition(
    (data) => {
      window.kakao.ps.keywordSearch(keyword, placesSearchCB, {
        location: new window.kakao.maps.LatLng(
          data.coords.latitude,
          data.coords.longitude
        ),
        radius: 15000,
      });
    },
    () => {
      window.kakao.ps.keywordSearch(keyword, placesSearchCB);
    }
  );
}

function placesSearchCB(data, status, pagination) {
  if (status === window.kakao.maps.services.Status.OK) {
    displayPlaces(data);
    // displayPagination(pagination);
    console.log(pagination);
  } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
    alert("사용자의 위치 근처 15km 반경에 검색 결과가 존재하지 않습니다.");
    return;
  } else if (status === window.kakao.maps.services.Status.ERROR) {
    alert("검색 결과 중 오류가 발생했습니다.");
    return;
  }
}

function displayPlaces(places) {
  const bounds = new window.kakao.maps.LatLngBounds();

  const placelist = document.getElementById("places");
  const ul = document.createElement("ul");
  ul.id = "placeList";

  if (!window.kakao.markers || window.kakao.markers.length === 0)
    window.kakao.markers = [];

  const markers = window.kakao.markers;

  removePlaceList();
  removeMarker(markers);

  places.forEach((place, index) => {
    let position = new window.kakao.maps.LatLng(place.y, place.x);
    bounds.extend(position);

    let marker = addMarker(position, index, place.place_name);
    markers.push(marker);

    ul.appendChild(createPlaceLi(place, marker));
  });

  placelist.appendChild(ul);

  window.kakao.obj.setBounds(bounds);
}

function removePlaceList() {
  const placeList = document.getElementById("placeList");
  if (placeList) placeList.remove();
}

function createPlaceLi(place, marker) {
  let placeName = document.createElement("h2");
  placeName.innerText = place.place_name;

  let address = document.createElement("p");
  address.innerText = place.address_name;

  let phoneNumber = document.createElement("p");
  phoneNumber.innerText = place?.phone;

  let list = document.createElement("li");

  list.appendChild(placeName);
  list.appendChild(address);
  list.appendChild(phoneNumber);

  // mouse over / out이 잘 안되는 현상 수정해야 됨
  list.onmouseover = function () {
    displayInfowindow(marker, place.place_name);
  };

  list.onmouseout = function () {
    window.kakao.infowindow.close();
  };

  return list;
}

function addMarker(position, idx, title) {
  // set marker sprite image
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
  const imageSize = new window.kakao.maps.Size(36, 37);
  const imgOptions = {
    spriteSize: new window.kakao.maps.Size(36, 691),
    spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
    offset: new window.kakao.maps.Point(13, 37),
  };
  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imgOptions
  );

  // make marker
  const marker = new window.kakao.maps.Marker({
    position: position, // 마커의 위치
    image: markerImage,
  });

  // event
  window.kakao.maps.event.addListener(marker, "mouseover", function () {
    displayInfowindow(marker, title);
  });

  window.kakao.maps.event.addListener(marker, "mouseout", function () {
    window.kakao.infowindow.close();
  });

  // set marker
  marker.setMap(window.kakao.obj);
  return marker;
}

function removeMarker(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function displayInfowindow(marker, title) {
  var content =
    '<div style="padding:5px;z-index:1;color:black;">' + title + "</div>";

  window.kakao.infowindow.setContent(content);
  window.kakao.infowindow.open(window.kakao.obj, marker);
}

export { searchKakaoPlaces };
