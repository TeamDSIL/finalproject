<template>
  <div>
    <h1>Top 10 조회</h1>
    <ul>
      <li v-for="item in topViews" :key="item.restaurantId">
        {{ item.name }}
        <img :src="item.img" alt="Restaurant image" style="width: 100px" />
      </li>
    </ul>

    <h1>Top 10 북마크</h1>
    <ul>
      <li v-for="item in topBookmarks" :key="item.restaurantId">
        {{ item.name }}
        <img :src="item.img" alt="Restaurant image" style="width: 100px" />
      </li>
    </ul>

    <h1>Top 10 예약</h1>
    <ul>
      <li v-for="item in topReservations" :key="item.restaurantId">
        {{ item.name }}
        <img :src="item.img" alt="Restaurant image" style="width: 100px" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      topViews: [],
      topReservations: [],
      topBookmarks: [],
    };
  },
  created() {
    this.fetchTopViews();
    this.fetchTopReservations();
    this.fetchTopBookmarks();
  },
  methods: {
    fetchTopViews() {
      axios
        .get("http://localhost:8000/main/topten/views")
        .then((response) => {
          this.topViews = response.data;
        })
        .catch((error) => {
          console.error("Error fetching top :", error);
        });
    },
    fetchTopReservations() {
      axios
        .get("http://localhost:8000/main/topten/reservations")
        .then((response) => {
          this.topReservations = response.data;
        })
        .catch((error) => {
          console.error("Error fetching top reservations:", error);
        });
    },
    fetchTopBookmarks() {
      axios
        .get("http://localhost:8000/main/topten/bookmarks")
        .then((response) => {
          this.topBookmarks = response.data;
        })
        .catch((error) => {
          console.error("Error fetching top bookmarks:", error);
        });
    },
  },
};
</script>
