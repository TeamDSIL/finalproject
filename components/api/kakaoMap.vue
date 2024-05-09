<template>
  <div id="map" style="width: 500px; height: 500px"></div>
</template>
<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
    };
  },
  beforeMount() {
    if (typeof kakao === "undefined") {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e";
      script.onload = () => kakao.maps.load(this.initializeMap);
      document.head.appendChild(script);
    } else {
      this.initializeMap();
    }
  },
  methods: {
    initializeMap() {
      const container = this.$el;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch("남부순환로 339길 53", function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          console.log(coords);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            position: coords,
          });
          this.map.setCenter(coords);
          marker.setMap(this.map);
        } else {
          console.error(status);
        }
      });
    },
  },
  destroyed() {
    document
      .querySelectorAll('script[src*="dapi.kakao.com"]')
      .forEach((script) => {
        script.parentNode.removeChild(script);
      });
  },
};
</script>
