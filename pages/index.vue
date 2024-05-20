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
          <v-col cols="12">
            <!-- 예약 -->
            <div class="d-flex justify-space-between align-end flex-wrap">
              <div>
                <h2>예약 TOP 10</h2>
                <h6 class="grey--text grey--lighten-3 font-weight-regular">
                  최근 7일간 예약 TOP 10의 식당 리스트를 제공합니다.
                </h6>
              </div>
              <div>
                <nuxt-link to="" class="text-decoration-none"
                  >View all collections</nuxt-link
                >
              </div>
            </div>
          </v-col>
          <v-col
            v-for="(item, index) in reservation"
            :key="`reservation-${index}`"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <nuxt-link
              to="/resturant/SearchResturant"
              class="text-decoration-none"
            >
              <v-card class="br-10">
                <v-img
                  :src="item.img"
                  gradient="to bottom, rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 1)"
                  class="p-relative"
                >
                  <div class="p-absolute bottom-0 pa-5">
                    <h5 class="white--text">{{ item.name }}</h5>
                    <div class="d-flex">
                      <p class="text-sm white--text mb-0">30 Places</p>
                      <v-icon small color="white">mdi-chevron-right</v-icon>
                    </div>
                  </div>
                </v-img>
              </v-card>
            </nuxt-link>
          </v-col>
          <!-- 조회 -->
          <v-col cols="12">s
            <div class="d-flex justify-space-between align-end flex-wrap">
              <div>
                <h2>조회 TOP 10</h2>
                <h6 class="grey--text grey--lighten-3 font-weight-regular">
                  최근 1일간 조회 TOP 10의 식당 리스트를 제공합니다.
                </h6>
              </div>
              <div>
                <nuxt-link to="" class="text-decoration-none"
                  >View all collections</nuxt-link
                >
              </div>
            </div>
          </v-col>
          <v-col
            v-for="(item, index) in read"
            :key="`read-${index}`"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <nuxt-link
              to="/resturant/SearchResturant"
              class="text-decoration-none"
            >
              <v-card class="br-10">
                <v-img
                  :src="item.img"
                  gradient="to bottom, rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 1)"
                  class="p-relative"
                >
                  <div class="p-absolute bottom-0 pa-5">
                    <h5 class="white--text">{{ item.name }}</h5>
                    <div class="d-flex">
                      <p class="text-sm white--text mb-0">30 Places</p>
                      <v-icon small color="white">mdi-chevron-right</v-icon>
                    </div>
                  </div>
                </v-img>
              </v-card>
            </nuxt-link>
          </v-col>
          <!-- 즐겨찾기 -->
          <v-col cols="12">
            <div class="d-flex justify-space-between align-end flex-wrap">
              <div>
                <h2>즐겨찾기 TOP 10</h2>
                <h6 class="grey--text grey--lighten-3 font-weight-regular">
                  최근 7일간 즐겨찾기 TOP 10의 식당 리스트를 제공합니다.
                </h6>
              </div>
              <div>
                <nuxt-link to="" class="text-decoration-none"
                  >View all collections</nuxt-link
                >
              </div>
            </div>
          </v-col>
          <v-col
            v-for="(item, index) in favorites"
            :key="`favorites-${index}`"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <nuxt-link
              to="/resturant/SearchResturant"
              class="text-decoration-none"
            >
              <v-card class="br-10">
                <v-img
                  :src="item.img"
                  gradient="to bottom, rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 0), rgba(0,0,0, 1)"
                  class="p-relative"
                >
                  <div class="p-absolute bottom-0 pa-5">
                    <h5 class="white--text">{{ item.name }}</h5>
                    <div class="d-flex">
                      <p class="text-sm white--text mb-0">30 Places</p>
                      <v-icon small color="white">mdi-chevron-right</v-icon>
                    </div>
                  </div>
                </v-img>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- 모달 창 -->
    <v-dialog
      v-model="isRouletteOpen"
      max-width="600px"
      @click:outside="isRouletteOpen = false"
    >
      <roulette @close="isRouletteOpen = false"></roulette>
    </v-dialog>
    <Footer />
  </div>
</template>
<script>
import axios from "axios";
import { CardSection } from "@/assets/database/data.js";
import Roulette from '../components/main/Roulette.vue';
export default {
  components: { Roulette, Topten },

  layout: "landingHeader",
  head: {
    title: "Home",
  },
  data() {
    return {
      CardList: CardSection,
      isRouletteOpen: false, // 모달 상태
      randomImageStyle: {}, // 랜덤 이미지 스타일
      food: [
        {
          img: require("~/assets/images/food/9.png"),
          name: "한식",
        },
        {
          img: require("~/assets/images/food/10.png"),
          name: "중식",
        },
        {
          img: require("~/assets/images/food/11.png"),
          name: "일식",
        },
        {
          img: require("~/assets/images/food/12.png"),
          name: "양식",
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
          name: "데이트",
        },
      ],
      reservation: [
        {
          img: require("~/assets/images/food/5.png"),
          name: "Most Searched of 2020",
        },
        {
          img: require("~/assets/images/food/6.png"),
          name: "Best Openings of 2020",
        },
        {
          img: require("~/assets/images/food/7.png"),
          name: "Trending This Week",
        },
        {
          img: require("~/assets/images/food/7.png"),
          name: "Best Of New York",
        },
      ],
      read: [
        {
          img: require("~/assets/images/food/5.png"),
          name: "Most Searched of 2020",
        },
        {
          img: require("~/assets/images/food/6.png"),
          name: "Best Openings of 2020",
        },
        {
          img: require("~/assets/images/food/7.png"),
          name: "Trending This Week",
        },
        {
          img: require("~/assets/images/food/8.png"),
          name: "Best Of New York",
        },
      ],
      favorites: [
        {
          img: require("~/assets/images/food/5.png"),
          name: "Most Searched of 2020",
        },
        {
          img: require("~/assets/images/food/6.png"),
          name: "Best Openings of 2020",
        },
        {
          img: require("~/assets/images/food/7.png"),
          name: "Trending This Week",
        },
        {
          img: require("~/assets/images/food/8.png"),
          name: "Best Of New York",
        },
      ],
    };
  },
  mounted() {
    this.applyRandomStyle();
  },
  methods: {
    openRoulette() {
      this.isRouletteOpen = true;
    },
    applyRandomStyle() {
      const maxSize = 150; // 최대 크기
      const size = Math.random() * maxSize; // 랜덤 크기
      this.randomImageStyle = {
        position: "absolute",
        top: `${Math.random() * 100}%`, // 화면의 범위 내에서 랜덤 위치
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        transform: "translate(-50%, -50%)", // 중심을 기준으로 위치 조정
      };
    },
  },
};
</script>

<style lang="scss">
/* 전역 스타일 */
.bg-transparent {
  background-color: transparent !important;
}
.o-hidden {
  overflow: hidden !important;
}

/* 전역 스타일로도 컴포넌트 스타일 정의 가능하지만 스코프드 스타일 권장 */
.image-container {
  position: relative;
  height: 100vh; // 화면 전체 높이
  width: 100vw; // 화면 전체 너비
}
.random-image img {
  display: block; // 이미지 블록 레벨로 설정
  max-width: 100%; // 이미지 최대 너비 제한
  height: auto; // 비율 유지
}
</style>
