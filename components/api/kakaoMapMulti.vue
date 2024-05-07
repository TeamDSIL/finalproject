<template>
    <div id="map" style="width: 500px; height: 500px;"></div>
  </template>
  
  <script>
export default {
  name: 'KakaoMap',
  data() {
    return {
      map: null,
      markers: []
    };
  },
  beforeMount() {
    if (typeof kakao === 'undefined') {
      const script = document.createElement('script');
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e";
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
        level: 3
      };
      this.map = new kakao.maps.Map(container, options);

      // 기본 마커를 추가합니다.
      this.addMarker(new kakao.maps.LatLng(33.450701, 126.570667));
      this.addMarker(new kakao.maps.LatLng(33.450701, 127.570667));
      this.addMarker(new kakao.maps.LatLng(33.450701, 128.570667));
    },
    // 마커를 추가로 지정합니다.
    addMarker(position) {
      const marker = new kakao.maps.Marker({
        position: position
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    },
    setMarkers(map) {
      this.markers.forEach(marker => {
        marker.setMap(map);
      });
    }
  },
  destroyed() {
    document.querySelectorAll('script[src*="dapi.kakao.com"]').forEach(script => {
      script.parentNode.removeChild(script);
    });
  }
}
</script>