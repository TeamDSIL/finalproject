<template>
  <div>
    <h1>{{ categoryName }} 식당 목록</h1>
    <div v-if="restaurants.length > 0">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>이 카테고리에 해당하는 식당이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params, $axios }) {
    console.log("패칭 데이터:", params.category);
    try {
      const response = await $axios.get(
        `http://localhost:8000/restaurants/category/${encodeURIComponent(
          params.category
        )}`
      );
      console.log("성공로그:", response.data);

      return { restaurants: response.data, categoryName: params.category };
    } catch (e) {
      console.error("Error fetching data:", e);

      return { restaurants: [], categoryName: params.category };
    }
  },
  data() {
    return {
      restaurants: [],
      categoryName: "",
    };
  },
};
</script>

<style>
/* 스타일 추가 */
</style>
