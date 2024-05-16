<template>
  <div>
    <h1>Top 10 Reservations</h1>
    <ul>
      <li v-for="item in topReservations" :key="item.restaurantId">
        {{ item.name }}
        <img :src="item.img" alt="Restaurant image" style="width: 100px" />
      </li>
    </ul>

    <h1>Top 10 Bookmarks</h1>
    <ul>
      <li v-for="item in topBookmarks" :key="item.restaurantId">
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
      topReservations: [],
      topBookmarks: [],
    };
  },
  created() {
    this.fetchTopReservations();
    this.fetchTopBookmarks();
  },
  methods: {
    fetchTopReservations() {
      axios
        .get("http://localhost:8000/topten/reservations")
        .then((response) => {
          this.topReservations = response.data;
        })
        .catch((error) => {
          console.error("Error fetching top reservations:", error);
        });
    },
    fetchTopBookmarks() {
      axios
        .get("http://localhost:8000/topten/bookmarks")
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
