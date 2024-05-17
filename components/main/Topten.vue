<template>
  <v-container>
    <!-- Top 10 조회 -->
    <h1>Top 10 조회</h1>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(item, index) in currentTopViews"
        :key="item.restaurantId"
      >
        <v-card>
          <v-img :src="item.img" height="200px" />
          <v-card-title>{{ item.rank }}위 {{ item.name }}</v-card-title>
          <v-card-text>여기에 설명이 들어갈 수 있습니다.</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top 10 북마크 -->
    <h1>Top 10 북마크</h1>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(item, index) in currentTopBookmarks"
        :key="item.restaurantId"
      >
        <v-card>
          <v-img :src="item.img" height="200px" />
          <v-card-title>{{ item.rank }}위 {{ item.name }}</v-card-title>
          <v-card-text>여기에 설명이 들어갈 수 있습니다.</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top 10 예약 -->
    <h1>Top 10 예약</h1>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
        v-for="(item, index) in currentTopReservations"
        :key="item.restaurantId"
      >
        <v-card>
          <v-img :src="item.img" height="200px" />
          <v-card-title>{{ item.rank }}위 {{ item.name }}</v-card-title>
          <v-card-text>여기에 설명이 들어갈 수 있습니다.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      topViews: [],
      currentTopViews: [],
      topBookmarks: [],
      currentTopBookmarks: [],
      topReservations: [],
      currentTopReservations: [],
      currentIndex: 0,
      itemsPerGroup: 4,
    };
  },
  created() {
    this.fetchTopViews();
    this.fetchTopBookmarks();
    this.fetchTopReservations();
    this.startRotation();
  },
  methods: {
    fetchTopViews() {
      axios
        .get("http://localhost:8000/main/topten/views")
        .then((response) => {
          this.topViews = this.addRanks(response.data);
          this.currentTopViews = this.getCircularItems(
            this.topViews,
            0,
            this.itemsPerGroup
          );
        })
        .catch((error) => console.error("Error fetching top views:", error));
    },
    fetchTopBookmarks() {
      axios
        .get("http://localhost:8000/main/topten/bookmarks")
        .then((response) => {
          this.topBookmarks = this.addRanks(response.data);
          this.currentTopBookmarks = this.getCircularItems(
            this.topBookmarks,
            0,
            this.itemsPerGroup
          );
        })
        .catch((error) =>
          console.error("Error fetching top bookmarks:", error)
        );
    },
    fetchTopReservations() {
      axios
        .get("http://localhost:8000/main/topten/reservations")
        .then((response) => {
          this.topReservations = this.addRanks(response.data);
          this.currentTopReservations = this.getCircularItems(
            this.topReservations,
            0,
            this.itemsPerGroup
          );
        })
        .catch((error) =>
          console.error("Error fetching top reservations:", error)
        );
    },
    startRotation() {
      setInterval(() => {
        this.currentIndex =
          (this.currentIndex + this.itemsPerGroup) % this.topViews.length;
        this.currentTopViews = this.getCircularItems(
          this.topViews,
          this.currentIndex,
          this.itemsPerGroup
        );
        this.currentTopBookmarks = this.getCircularItems(
          this.topBookmarks,
          this.currentIndex,
          this.itemsPerGroup
        );
        this.currentTopReservations = this.getCircularItems(
          this.topReservations,
          this.currentIndex,
          this.itemsPerGroup
        );
      }, 3000);
    },
    getCircularItems(dataArray, startIndex, numItems) {
      let totalItems = dataArray.length;
      let items = [];
      for (let i = 0; i < numItems; i++) {
        let itemIndex = (startIndex + i) % totalItems;
        items.push(dataArray[itemIndex]);
      }
      return items;
    },
    addRanks(dataArray) {
      return dataArray.map((item, index) => {
        item.rank = index + 1;
        return item;
      });
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-bottom: 40px; /* 각 섹션의 하단 여백을 40px로 설정 */
}

.v-card {
  max-width: 100%;
  margin-bottom: 20px; /* 카드 간의 간격을 20px로 설정 */
}

.v-img {
  width: 100%; /* 이미지가 카드 너비에 맞도록 설정 */
}
</style>
