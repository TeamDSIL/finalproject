<template>
  <div>
    <v-container>

      <!-- Tabs for different management aspects -->
      <div class="d-flex justify-space-between flex-wrap flex-sm-nowrap mb-3">
        <v-tabs class="mb-3">
          <v-tab class="text-capitalize">식당관리</v-tab>
          <v-tab class="text-capitalize">예약관리</v-tab>
          <v-tab class="text-capitalize">리뷰관리</v-tab>
        </v-tabs>
      </div>

      <!-- Restaurant cards display -->
      <v-row>
        <v-col cols="12" xl="12">
          <v-row>
            <v-col cols="12">
              <h5 class="text-18 test-color">나의 식당</h5>
            </v-col>
            <v-col cols="12" sm="6" md="4" v-for="(item, index) in CardList.slice(0, 6)" :key="index">
              <v-card @click="goToRestaurantManagement(item.id)" class="ma-2">
                <v-img :src="item.img" heingt="50px"></v-img>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-text>{{ item.description }}</v-card-text>
                <v-card-text>{{ item.address }}</v-card-text>
                <v-card-text>{{ item.contact }}</v-card-text>
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
import { Restaurants } from '@/assets/database/RestaurantData.js';

export default {
  data: () => ({
    CardList: Restaurants
  }),
  methods: {
    goToRestaurantManagement(restaurantId) {
      this.$router.push({ name: 'RestaurantManagement', params: { restaurantId } });
    },
  },
}
</script>

<style>

</style>
