<template>

  <div id="map" style="width: 100%; height: 350px"></div>

</template>
<script>
export default {
  name: "KakaoMap",

  beforeMount() {
    if (typeof kakao === "undefined") {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e";
      script.onload = () => kakao.maps.load(this.initializeMap);
      document.head.appendChild(script);
    } else {
      kakao.maps.load(this.initializeMap);
    }
  },
  methods: {
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

            // 현재 위치에 마커 생성
            const markerPosition = new kakao.maps.LatLng(lat, lng);
            const marker = new kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("This browser doesnt support geolocation");
      }
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

