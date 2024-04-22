<template>
    <div>
        <h1 >식당 검색 리스트</h1>
    <RestaurantList></RestaurantList>
    </div>
  
</template>

<script>
import RestaurantList from '@/components/restaurant/RestaurantList.vue';

export default {
  components: {
    RestaurantList,
  },
};
</script>

<style></style>
