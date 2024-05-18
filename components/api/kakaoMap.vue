<template>
  <div id="map" style="width: 500px; height: 500px"></div>
</template>

<script>
import axios from 'axios';
export default {
  name: "kakaoMap",
  data() {
    return {
      restaurantAddresses: [] // 데이터베이스에서 불러온 주소 목록
    };
  },
  mounted(){
    this.loadRestaurantData();
  }
  ,
  beforeMount() {
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
    loadRestaurantData(){
      const id = this.$route.params.id;
      axios.get(`http://localhost:8000/restaurant/detail/${id}`)
      .then(response => {
        this.restaurantAddresses = response.data.map(item => item.restaurant_address);
        console.log(this.restaurantAddresses);
        this.initializeMap();
      });
    },
    initializeMap() {
      if (typeof kakao !== 'undefined' && kakao.maps) {
        const mapContainer = document.getElementById('map'),
      mapOptions = {
        center: new kakao.maps.LatLng(37.499267, 127.026337),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOptions);
      const geocoder = new kakao.maps.services.Geocoder();

      this.restaurantAddresses.forEach(address => {
      geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new kakao.maps.Marker({
            map : map,
            position : coords
          });
          console.log(coords);
          map.setCenter(coords);
        } else {
          console.error('주소 검색 실패 : 유효하지않은 주소', address);
        }
      });
    });
  }else {
    console.log('카카오 지도 API 로드 실패...');
  }
}
  }
}
</script>
