<template>
  <div>
    <v-container>

      <!-- Tabs for different management aspects -->
      <div class="d-flex justify-space-between flex-wrap flex-sm-nowrap mb-3">
        <v-tabs class="mb-3">
          <v-tab class="text-capitalize">식당관리</v-tab>
          <v-tab class="text-capitalize">예약전체현황</v-tab>
          <v-tab class="text-capitalize">전체리뷰보기</v-tab>
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
                <v-img :src="restaurant.image" style="height: auto;"></v-img>
                <v-card-title>{{ restaurant.name }}</v-card-title>
                <v-card-text>{{ restaurant.description }}</v-card-text>
                <v-card-actions>
                  <v-btn text color="primary">Manage</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import { Restaurants } from '~/assets/database/RestaurantData.js';
import RestaurantManageMain from './RestaurantManageMain.vue';


export default {
  data() {
    return {
      restaurants: Restaurants,
    };
  },

  components: {
    RestaurantManageMain,
  },
  methods: {
    goToRestaurantManagement(restaurant) {
    this.$router.push({
      path: `/restaurant/RestaurantManageMainPage/${restaurant.id}`,
      query: {
        name: restaurant.name,
        address: restaurant.address,
        tel: restaurant.tel,
        description: restaurant.description,
        image: restaurant.image,
        chip: restaurant.chip,
        table: restaurant.table,
        deposit: restaurant.deposit,
        crowd: restaurant.crowd,
      }
    });
  },
  takeMyPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
    console.log("위도: " + position.coords.latitude);
    console.log("경도: " + position.coords.longitude);
    alert('위도: ' + position.coords.latitude + ', 경도: ' + position.coords.longitude);
    const latitudePosition = position.coords.latitude;

  }, function(error) {
    console.error("Error Code = " + error.code + " - " + error.message);
  });
},
  }
}
</script>

<style></style>
