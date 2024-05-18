<template>
  <div>
    <MainForm></MainForm>
    <!-- 카테고리 -->
    <div>
      <v-container class="py-15">
        <v-row>
          <v-col cols="12">
            <h2>어떤 나라 드실 ?</h2>
          </v-col>
          <v-col
            v-for="(item, index) in food"
            :key="item.name"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div class="text-center">
              <nuxt-link
                :to="`/restaurant/list?category=${item.name}`"
                class="text-decoration-none"
              >
                <v-avatar size="150" class="mb-4">
                  <img :src="item.img" alt="" />
                </v-avatar>
                <h4 class="grey--text text--darken-2">
                  {{ item.displayName }}
                </h4>
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
        <!-- 주류 -->
        <v-row>
          <v-col cols="12">
            <h2>어떤 주류 드실 ?</h2>
          </v-col>
          <v-col
            v-for="(item, index) in alcohol"
            :key="index"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div class="text-center">
              <nuxt-link to="/resturant/FoodMenu" class="text-decoration-none">
                <v-avatar size="150" class="mb-4">
                  <img :src="item.img" alt="" />
                </v-avatar>
                <h4 class="grey--text text--darken-2">{{ item.name }}</h4>
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
        <!-- 고객 맞춤형 -->
        <v-row>
          <v-col cols="12">
            <h2>고객 맞춤형 드실</h2>
          </v-col>
          <v-col
            v-for="(item, index) in who"
            :key="index"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div class="text-center">
              <nuxt-link to="/resturant/FoodMenu" class="text-decoration-none">
                <v-avatar size="150" class="mb-4">
                  <img :src="item.img" alt="" />
                </v-avatar>
                <h4 class="grey--text text--darken-2">{{ item.name }}</h4>
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <!-- section-2  4,8-->
    <div>
      <v-container class="py-15">
        <v-row>
         
        </v-row>
      </v-container>
    </div>
    <roulette></roulette>
    <Footer />
  </div>
</template>
<script>
import axios from "axios";
import { CardSection } from "@/assets/database/data.js";
import Roulette from "../components/main/Roulette.vue";
export default {
  components: { Roulette },
  layout: "landingHeader",
  head: {
    title: "Home",
  },
  data() {
    return {
      CardList: CardSection,
      food: [
        {
          img: require("~/assets/images/food/14.png"),
          name: "KOREAN",
          displayName: "한식",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "CHINESE",
          displayName: "중식",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "JAPANESE",
          displayName: "일식",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "WESTERN",
          displayName: "양식",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "VIETNAMESE",
          displayName: "베트남",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "AMERICAN",
          displayName: "아메리칸",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "INDIAN",
          displayName: "인도",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "OTHERGLOBALFOOD",
          displayName: "기타 세계",
        },
      ],
      alcohol: [
        {
          id: 9,
          img: require("~/assets/images/food/9.png"),
          name: "맥주/호프",
        },
        {
          img: require("~/assets/images/food/10.png"),
          name: "전통주",
        },
        {
          img: require("~/assets/images/food/11.png"),
          name: " 이자카야",
        },
        {
          img: require("~/assets/images/food/12.png"),
          name: " 와인/칵테일",
        },
      ],
      who: [
        {
          img: require("~/assets/images/food/9.png"),
          name: "혼밥",
        },
        {
          img: require("~/assets/images/food/10.png"),
          name: " 친구",
        },
        {
          img: require("~/assets/images/food/11.png"),
          name: "모임/회식",
        },
        {
          img: require("~/assets/images/food/12.png"),
          name: "데이트",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.bg-transparent {
  background-color: transparent !important;
}
.o-hidden {
  overflow: hidden !important;
}
</style>