<template>
  <div id="MainKakaomap" style="width: 100%; height: 500px"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainMap",
  data() {
    return {
      imageSrc: require("@/assets/images/mainMap.png"), // 현재 위치 이미지 경로
      restaurantImageSrc:
        "https://tistory2.daumcdn.net/tistory/3056305/skin/images/map-marker-red.png", // 새로운 식당 이미지 경로
      restaurantAddresses: [],
    };
  },
  beforeMount() {
    this.loadRestaurantData();
    if (typeof kakao === "undefined") {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e&libraries=services";
      script.onload = () => {
        console.log("Kakao Map script loaded");
        kakao.maps.load(this.initializeMap);
      };
      script.onerror = () => console.error("Kakao Map script load failed.");
      document.head.appendChild(script);
    } else {
      console.log("Kakao is already defined");
      kakao.maps.load(this.initializeMap);
    }
  },
  methods: {
    loadRestaurantData() {
      axios
        .get(`${process.env.API_URL}/api/restaurants`)
        .then((response) => {
          this.restaurantAddresses = response.data.map((item) => {
            return { id: item.id, name: item.name, address: item.address };
          });
          console.log("Restaurant data loaded:", this.restaurantAddresses);
          if (typeof kakao !== "undefined") {
            kakao.maps.load(this.initializeMap);
          }
        })
        .catch((error) => console.error("Data load failed:", error));
    },
    initializeMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            console.log("User location:", lat, lng);
            const container = this.$el;
            const options = {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            const geocoder = new kakao.maps.services.Geocoder();

            // 현재 위치 마커 이미지
            const currentLocationMarkerImage = new kakao.maps.MarkerImage(
              this.imageSrc,
              new kakao.maps.Size(64, 69),
              { offset: new kakao.maps.Point(27, 69) }
            );

            // 현재 위치 마커 생성
            new kakao.maps.Marker({
              position: new kakao.maps.LatLng(lat, lng),
              image: currentLocationMarkerImage,
              map: map,
            });

            // 식당 마커 이미지
            const restaurantMarkerImage = new kakao.maps.MarkerImage(
              this.restaurantImageSrc,
              new kakao.maps.Size(35, 35),
              { offset: new kakao.maps.Point(17, 40) }
            );

            // 식당 마커 생성
            this.restaurantAddresses.forEach((restaurant) => {
              console.log(
                "Processing restaurant:",
                restaurant.name,
                restaurant.address
              );
              geocoder.addressSearch(restaurant.address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const restaurantLat = result[0].y;
                  const restaurantLng = result[0].x;
                  console.log(
                    "Restaurant location:",
                    restaurantLat,
                    restaurantLng
                  );

                  if (
                    this.calculateDistance(
                      lat,
                      lng,
                      restaurantLat,
                      restaurantLng
                    ) <= 1
                  ) {
                    const coords = new kakao.maps.LatLng(
                      restaurantLat,
                      restaurantLng
                    );
                    const marker = new kakao.maps.Marker({
                      position: coords,
                      image: restaurantMarkerImage,
                      map: map,
                    });

                    const content = `
                      <div style="padding:5px;background:white;border:2px solid red;border-radius:4px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;cursor:pointer;"
                        onclick="window.vueInstance.goToRestaurantDetail(${restaurant.id})">
                        ${restaurant.name}
                      </div>`;
                    const overlay = new kakao.maps.CustomOverlay({
                      content: content,
                      position: coords,
                      yAnchor: 2.2, // 마커 위에 위치하도록 yAnchor 조정
                    });

                    // 처음부터 식당 이름을 보이도록 설정
                    overlay.setMap(map);
                  }
                } else {
                  console.error("Address search failed:", restaurant.address);
                }
              });
            });
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("This browser doesn't support geolocation");
      }
    },
    calculateDistance(lat1, lng1, lat2, lng2) {
      function toRad(x) {
        return (x * Math.PI) / 180;
      }
      const R = 6371; // 지구의 반경 (단위: km)
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d;
    },
    goToRestaurantDetail(restaurantId) {
      this.$router.push(`/restaurant/detail/${restaurantId}`);
    },
  },
  mounted() {
    window.vueInstance = this; // 글로벌 변수에 Vue 인스턴스 저장
  },
  destroyed() {
    const scripts = document.querySelectorAll("script");
    for (let script of scripts) {
      if (script.src.includes("dapi.kakao.com")) {
        script.parentNode.removeChild(script);
      }
    }
    delete window.vueInstance; // 글로벌 변수 정리
  },
};
</script>

<style scoped></style>
