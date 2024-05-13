<template>
  <div>
    <MainForm></MainForm>
    <!-- 카테고리 -->
    <div>
      <v-container class="py-15">
        <v-row>
          <v-col cols="12">
            <h2>드실 음식</h2>
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
            <h2>드실 주류</h2>
          </v-col>
          <v-col
            v-for="(item, index) in alcohol"
            :key="item.name"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div class="text-center">
              <nuxt-link
                :to="`/restaurant/alcohol?category=${item.name}`"
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
        <!-- 고객 맞춤형 -->
        <v-row>
          <v-col cols="12">
            <h2>고객 맞춤형</h2>
          </v-col>
          <v-col
            v-for="(item, index) in who"
            :key="item.name"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <div class="text-center">
              <nuxt-link
                :to="`/restaurant/custom?category=${item.name}`"
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
      </v-container>
    </div>
    <!-- section-2  4,8-->
    <div>
      <v-container class="py-15">
        <v-row>
          <Topten></Topten>
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
import Topten from "../components/main/Topten.vue";

export default {
  components: { Roulette, Topten },

  layout: "landingHeader",
  head: {
    title: "Home",
  },
  data() {
    return {
      CardList: CardSection,
      food: [
        {
          img: require("~/assets/images/mainCategory/KOREAN.png"),
          name: "KOREAN",
          displayName: "한식",
        },
        {
          img: require("~/assets/images/mainCategory/CHINESE.jpg"),
          name: "CHINESE",
          displayName: "중식",
        },
        {
          img: require("~/assets/images/mainCategory/JAPANESE.jpg"),
          name: "JAPANESE",
          displayName: "일식",
        },
        {
          img: require("~/assets/images/mainCategory/WESTERN.jpg"),
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
          img: require("~/assets/images/food/9.png"),
          name: "BEER",
          displayName: "맥주/호프",
        },
        {
          img: require("~/assets/images/food/10.png"),
          name: "TRADITIONAL_ALCOHOL",
          displayName: "전통주",
        },
        {
          img: require("~/assets/images/food/11.png"),
          name: "IZAKAYA",
          displayName: "이자카야",
        },
        {
          img: require("~/assets/images/food/12.png"),
          name: "WINE_COCKTAIL",
          displayName: "와인/칵테일",
        },
      ],
      who: [
        {
          img: require("~/assets/images/food/9.png"),
          name: "SOLO",
          displayName: "혼밥",
        },
        {
          img: require("~/assets/images/food/10.png"),
          name: "WITH_FRIENDS",
          displayName: "친구",
        },
        {
          img: require("~/assets/images/food/11.png"),
          name: "GROUP_GATHERING",
          displayName: "모임/회식",
        },
        {
          img: require("~/assets/images/food/12.png"),
          name: "DATE",
          displayName: "데이트",
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
