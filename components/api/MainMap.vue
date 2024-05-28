<template>
  <div id="MainKakaomap" style="width: 100%; height: 500px"></div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainMap",
  data() {
    return {
      imageSrc: require("@/assets/images/mainMap.png"),
      restaurantAddresses: [],
    };
  },
  beforeMount() {
    this.loadRestaurantData();
    if (typeof kakao === "undefined") {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e&libraries=services";
      script.onload = () => kakao.maps.load(this.initializeMap);
      script.onerror = () => console.error("Kakao Map script load failed.");
      document.head.appendChild(script);
    } else {
      kakao.maps.load(this.initializeMap);
    }
  },
  methods: {
    loadRestaurantData() {
      axios
        .get(`${process.env.API_URL}/api/restaurants`)
        .then((response) => {
          this.restaurantAddresses = response.data.map((item) => {
            return { name: item.name, address: item.address };
          });
        })
        .catch((error) => console.error("Data load failed:", error));
    },
    //�� �ʱ�ȭ�� ����� ��ġ ����� ���� ���� ����
    initializeMap() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const container = this.$el;
            const options = {
              center: new kakao.maps.LatLng(lat, lng),
              level: 3,
            };
            const map = new kakao.maps.Map(container, options);
            const geocoder = new kakao.maps.services.Geocoder();

            const markerImage = new kakao.maps.MarkerImage(
              this.imageSrc,
              new kakao.maps.Size(64, 69),
              { offset: new kakao.maps.Point(27, 69) }
            );

            new kakao.maps.Marker({
              position: new kakao.maps.LatLng(lat, lng),
              image: markerImage,
              map: map,
            });

            this.restaurantAddresses.forEach((restaurant) => {
              geocoder.addressSearch(restaurant.address, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                  const restaurantLat = result[0].y;
                  const restaurantLng = result[0].x;
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
                    new kakao.maps.Marker({
                      position: coords,
                      map: map,
                    });

                    const content = `<div style="padding:5px;background:white;border:1px solid black;border-radius:4px;">${restaurant.name}</div>`;
                    new kakao.maps.CustomOverlay({
                      content: content,
                      position: coords,
                      yAnchor: 1.5,
                    }).setMap(map);
                  }
                } else {
                  console.error("�ּ� �˻� ����:", restaurant.address);
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
    // �� ��ǥ ������ �Ÿ� ��� �޼���
    calculateDistance(lat1, lng1, lat2, lng2) {
      function toRad(x) {
        return (x * Math.PI) / 180;
      }
      var R = 6371;
      var dLat = toRad(lat2 - lat1);
      var dLng = toRad(lng2 - lng1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
    },
  },
  destroyed() {
    const scripts = document.querySelectorAll("script");
    for (let script of scripts) {
      if (script.src.includes("dapi.kakao.com")) {
        script.parentNode.removeChild(script);
      }
    }
  },
};
</script>

<style scoped></style>
