<template>
  <div>
    <!-- <header></header> -->
    <MainForm></MainForm>
    <!-- 카테고리 -->
    <div style="margin-top: -50px">
      <v-container class="py-15">
        <v-row>
          <v-col cols="12" style="display: flex">
            <v-img
              contain
              :src="require('~/assets/images/foodd.png')"
              width="20px"
              style="max-width: 30px; margin-right: 5px"
            ></v-img>
            <span style="font-size: x-large; font-weight: bold">드실 음식</span>
          </v-col>
          <v-row
            class="elevation-2"
            style="padding: 16px; border-radius: 8px; margin-top: 0px"
          >
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
                  <v-avatar size="200" class="mb-4">
                    <img :src="item.img" alt="" />
                  </v-avatar>
                  <h4 class="grey--text text--darken-2">
                    {{ item.displayName }}
                  </h4>
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-row>
        <!-- 주류 -->
        <v-row>
          <v-col cols="12" style="display: flex; margin-top: 20px">
            <v-img
              contain
              :src="require('~/assets/images/drink.png')"
              width="20px"
              style="max-width: 30px; margin-right: 5px"
            ></v-img>
            <span style="font-size: x-large; font-weight: bold">드실 주류</span>
          </v-col>
          <v-row
            class="elevation-2"
            style="padding: 16px; border-radius: 8px; margin-top: 0px"
          >
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
                  <v-avatar size="200" class="mb-4">
                    <img :src="item.img" alt="" />
                  </v-avatar>
                  <h4 class="grey--text text--darken-2">
                    {{ item.displayName }}
                  </h4>
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-row>
        <!-- 고객 맞춤형 -->
        <v-row>
          <v-col cols="12" style="display: flex; margin-top: 20px">
            <v-img
              contain
              :src="require('~/assets/images/peoples.png')"
              width="20px"
              style="max-width: 30px; margin-right: 5px"
            ></v-img>
            <span style="font-size: x-large; font-weight: bold">고객 맞춤</span>
          </v-col>
          <v-row
            class="elevation-2"
            style="padding: 16px; border-radius: 8px; margin-top: 0px"
          >
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
                  <v-avatar size="200" class="mb-4">
                    <img :src="item.img" alt="" />
                  </v-avatar>
                  <h4 class="grey--text text--darken-2">
                    {{ item.displayName }}
                  </h4>
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </div>
    <!-- section-2  4,8-->
    <div>
      <!-- <v-container class="py-15">
        <v-row> -->
      <Topten></Topten>
      <!-- </v-row>
      </v-container> -->
    </div>
    <!-- 랜덤 위치와 크기의 이미지, 클릭 이벤트 추가 -->
    <div :style="randomImageStyle" class="random-image" @click="openRoulette">
      <img src="@/assets/images/dsil_Characters.png" alt="Dynamic Character" />
      <div class="info-text">메뉴를 추천해 드릴게요.</div>
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
import Roulette from "../components/main/Roulette.vue";
import Topten from "../components/main/Topten.vue";
export default {
  components: { Roulette, Topten },
  layout: "Header",
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
          img: require("~/assets/images/mainCategory/KOREAN.webp"),
          name: "KOREAN",
          displayName: "한식",
        },
        {
          img: require("~/assets/images/mainCategory/CHINESE.webp"),
          name: "CHINESE",
          displayName: "중식",
        },
        {
          img: require("~/assets/images/mainCategory/JAPANESE.webp"),
          name: "JAPANESE",
          displayName: "일식",
        },
        {
          img: require("~/assets/images/mainCategory/WESTERN.webp"),
          name: "WESTERN",
          displayName: "양식",
        },
        {
          img: require("~/assets/images/mainCategory/VIETNAMESE.webp"),
          name: "VIETNAMESE",
          displayName: "베트남",
        },
        {
          img: require("~/assets/images/mainCategory/AMERICAN.webp"),
          name: "AMERICAN",
          displayName: "아메리칸",
        },
        {
          img: require("~/assets/images/mainCategory/INDIAN.webp"),
          name: "INDIAN",
          displayName: "인도",
        },
        {
          img: require("~/assets/images/mainCategory/OTHERGLOBALFOOD.webp"),
          name: "OTHERGLOBALFOOD",
          displayName: "기타 세계",
        },
      ],
      alcohol: [
        {
          img: require("~/assets/images/mainCategory/BEER.webp"),
          name: "BEER",
          displayName: "맥주/호프",
        },
        {
          img: require("~/assets/images/mainCategory/TRADITIONAL_ALCOHOL.webp"),
          name: "TRADITIONAL_ALCOHOL",
          displayName: "전통주",
        },
        {
          img: require("~/assets/images/mainCategory/IZAKAYA.webp"),
          name: "IZAKAYA",
          displayName: "이자카야",
        },
        {
          img: require("~/assets/images/mainCategory/WINE_COCKTAIL.webp"),
          name: "WINE_COCKTAIL",
          displayName: "와인/칵테일",
        },
      ],
      who: [
        {
          img: require("~/assets/images/mainCategory/SOLO.webp"),
          name: "SOLO",
          displayName: "혼밥",
        },
        {
          img: require("~/assets/images/mainCategory/WITH_FRIENDS.webp"),
          name: "WITH_FRIENDS",
          displayName: "친구",
        },
        {
          img: require("~/assets/images/mainCategory/GROUP_GATHERING.webp"),
          name: "GROUP_GATHERING",
          displayName: "모임/회식",
        },
        {
          img: require("~/assets/images/mainCategory/DATE.webp"),
          name: "DATE",
          displayName: "데이트",
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
      const minSize = 100;
      const maxSize = 150; // 최대 크기
      const size = Math.random() * (maxSize - minSize) + minSize; // 최소 크기에서 최대 크기 사이의 랜덤 크기
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
  position: absolute;
  height: 100vh; // 화면 전체 높이
  width: 100vw; // 화면 전체 너비
}
.random-image {
  position: relative;
  display: inline-block; // 이미지와 텍스트를 컨테이너에 맞게 배치
  cursor: pointer;
  width: 100%; // 폭을 명시적으로 지정
  min-height: 150px; // 최소 높이 지정
}
.random-image img {
  display: block; // 이미지 블록 레벨로 설정
  max-width: 100%; // 이미지 최대 너비 제한
  height: auto; // 비율 유지
}
/* 추가적인 컴포넌트 스코프드 스타일 */
.image-container {
  cursor: pointer;
  display: inline-block; // 이미지와 텍스트를 컨테이너에 맞게 배치
}
.image-container img {
  display: block;
  max-width: 100%;
  height: auto;
}
.info-text {
  position: absolute;
  top: 0; // 상단에 위치
  left: 50%; // 수평 중앙에 위치
  transform: translate(-50%, -100%); // 중앙에서 위로 이동
  padding: 8px 12px;
  background-color: #D23F57; // 말풍선 배경
  color: white; // 텍스트 색상
  border-radius: 8px; // 둥근 모서리
  z-index: 1000; // 높은 z-index
  visibility: hidden; // 초기에 숨김
  white-space: nowrap;
}
.random-image:hover .info-text {
  visibility: visible; // hover 시에만 텍스트 보이게 설정
}
</style>