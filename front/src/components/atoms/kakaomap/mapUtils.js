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
    console.log(data);
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
  placeName.style.fontWeight = "bold";
  placeName.style.fontSize = "16px";
  placeName.style.maxHeight = "24px";
  placeName.style.overflow = "hidden";

  let address = document.createElement("p");
  address.innerText = place.road_address_name;
  address.style.fontSize = "14px";

  let distance = document.createElement("p");
  distance.innerText = replaceDistance(place.distance);
  distance.style.fontSize = "14px";
  distance.style.color = "#288756";

  let wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.alignItems = "center";
  wrap.style.gap = "5px";

  wrap.appendChild(distance);
  wrap.appendChild(address);

  let phoneNumber = document.createElement("p");
  phoneNumber.innerText = place?.phone;
  phoneNumber.style.fontSize = "14px";

  let link = document.createElement("a");
  link.href = place.place_url;
  link.innerText = "상세보기";
  link.style.color = "#1f8cff";
  link.style.fontSize = "14px";

  let list = document.createElement("li");
  list.style.margin = "10px";
  list.style.padding = "10px";
  list.style.borderBottom = "2px solid black";
  list.style.backgroundColor = "white";

  list.appendChild(placeName);
  list.appendChild(wrap);
  list.appendChild(link);
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

function replaceDistance(meter) {
  return (meter / 1000).toFixed(1) + "km";
}

export { searchKakaoPlaces };
