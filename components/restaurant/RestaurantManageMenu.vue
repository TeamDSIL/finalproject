<template>
  <div>
    <v-container>
      <!-- Tabs for different management aspects -->
      <div class="d-flex justify-space-between flex-wrap flex-sm-nowrap mb-3">
        <v-tabs class="mb-3">
          <v-tab class="text-capitalize">식당관리</v-tab>
          
        </v-tabs>
      </div>

      <!-- Restaurant cards display -->
      <v-row class="justify-start">
        <v-col cols="12">
          <v-row>
            <v-col cols="12">
              <h5 class="text-18 test-color">나의 식당</h5>
            </v-col>
            <v-col cols="12" sm="6" md="3" v-for="restaurant in restaurants" :key="restaurant.id">
              <v-card @click="goToRestaurantManagement(restaurant)" class="ma-2">
                <v-img :src="restaurant.img" height="300px" class="restaurant-image"></v-img>
                <v-card-title style="font-weight: bold;">{{ restaurant.name }}</v-card-title>
                <v-card-actions>
                  <v-btn text color="primary">Manage</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <br>
    <br>
    <br>
    <Footer />
  </div>
</template>

<script>
import RestaurantManageMain from './RestaurantManageMain.vue';
import axios from 'axios';

export default {
  data() {
    return {
      restaurants: [],
      user: null, // 사용자 정보를 저장할 변수
    };
  },
  components: {
    RestaurantManageMain,
  },
  methods: {
    //memberID를 해당 페이지에 적용하는 메소드
    async fetchUserInfo() {
            try {
                const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
                if (!token) {
                    throw new Error('No token found');
                }
                // 토큰을 Authorization 헤더에 포함하여 요청 보내기
                console.log('access token', token);
                const response = await axios.get('http://localhost:8000/userInfo/me', {
                    headers: {
                        'Authorization': `${token}`
                    },
                    withCredentials: true
                });
                if (response.status === 200) {
                    const userInfo = response.data;
                    console.log('User Info:', userInfo);
                    // 사용자 정보를 상태나 컴포넌트 데이터에 저장
                    this.user = userInfo;
                    console.log("UserInfo를 담은 user: ",this.user);
                } else {
                    console.error('Failed to fetch user info:', response);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },

    async fetchRestaurants() {
      console.log("restaurant목록을 불러올 멤버: ",this.user);
      const memberId = this.user.id;
      console.log("유저번호",memberId);
      await axios.get(`http://localhost:8000/restaurant/${memberId}/restaurants`)
        .then(response => {
          this.restaurants = response.data;
          console.log(this.restaurants);
        })
        .catch(error => {
          console.error('식당 정보를 불러오는 데 실패했습니다.', error);
        });
    },

    goToRestaurantManagement(restaurant) {
      this.$router.push({ path: `/restaurant/RestaurantManageMainPage/${restaurant.id}` });
    },

    takeMyPosition() {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("위도: " + position.coords.latitude);
        console.log("경도: " + position.coords.longitude);
        alert('위도: ' + position.coords.latitude + ', 경도: ' + position.coords.longitude);
        const latitudePosition = position.coords.latitude;

      }, function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    },

  },
  async created() {
    await this.fetchUserInfo();
    this.fetchRestaurants();
  },
}
</script>

<style>
.restaurant-manage {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.tabs {
  background-color: #ffffff;
  border-bottom: 2px solid #ddd;
}

.v-card {
  height: 100%;
}

.restaurant-image {
  object-fit: cover;
}
</style>


<!-- 여기도 지금 스타일을 약간 변경했다. 식당사진의 크기를 균일하게 바꾸는 작업을 했다. -->