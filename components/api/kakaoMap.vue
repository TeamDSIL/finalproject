<template>
  <div>
  <div id="map" style="width: 100%; height: 350px"></div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <p>해당 주소와 일치하는 가게를 찾을 수 없습니다.</p>
      <p>웹 검색으로 이동하시겠습니까?</p>
      <button @click="confirmSearch(true)">　　　예　　　　　</button>
      <button @click="confirmSearch(false)">　　　아니오　　　　　　</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "kakaoMap",
  data() {
    return {
      restaurantAddresses: [], // 데이터베이스에서 불러온 주소 목록
      showModal: false, // 모달 창 표시 여부
      searchAddress: '' // 검색할 주소
    };
  },
  mounted(){
    this.loadRestaurantData();
  },
  beforeMount() {
    if (typeof kakao === "undefined") {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=14990ceeda7bda522ce249ebea04a26e&libraries=services";
      script.onload = () => {
        kakao.maps.load(() => {
          this.initializeMap();
          this.addMarkers(); // 지도가 로드된 후에 마커를 추가
        });
      };
      script.onerror = () => console.error("Kakao Map script load failed.");
      document.head.appendChild(script);
    } else {
      kakao.maps.load(() => {
        this.initializeMap();
        this.addMarkers(); // 지도가 로드된 후에 마커를 추가
      });
    }
  },
  methods: {
    loadRestaurantData(){
      const id = this.$route.params.id;
      axios.get(`${process.env.API_URL}/restaurant/detail/${id}`)
      .then(response => {
        this.restaurantAddresses = response.data.map(item => item.restaurant_address);
        console.log(this.restaurantAddresses);
        this.addMarkers(); // 데이터 로드 후에 마커를 추가
      })
      .catch(error => {
        console.error('Error fetching restaurant data:', error);
      });
    },
    initializeMap() {
      if (typeof kakao !== 'undefined' && kakao.maps) {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(37.499267, 127.026337),
          level: 3,
        };
        this.map = new kakao.maps.Map(mapContainer, mapOptions);
        this.geocoder = new kakao.maps.services.Geocoder();
      } else {
        console.log('카카오 지도 API 로드 실패...');
      }
    },
    addMarkers() {
      if (this.restaurantAddresses.length && this.map && this.geocoder) {
        this.restaurantAddresses.forEach(address => {
          this.geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              const marker = new kakao.maps.Marker({
                map: this.map,
                position: coords
              });
              console.log(coords);
              this.map.setCenter(coords);
            } else {
              console.error('주소 검색 실패 : 유효하지 않은 주소', address);
              this.searchAddress = address; // 검색할 주소 설정
              this.showModal = true; // 모달 창 표시
            }
          });
        });
      }
    },
    confirmSearch(confirmed) {
      if (confirmed) {
        // "예"를 눌렀을 때 네이버 검색으로 이동
        const query = encodeURIComponent(this.searchAddress);
        window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${query}`, '_blank');
      }
      this.showModal = false; // 모달 창 닫기
    }
  }
}
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* z-index를 높게 설정하여 모달이 앞으로 나오도록 함 */
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>