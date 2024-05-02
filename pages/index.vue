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
    
    <Footer />
  </div>
</template>
<script>
import { CardSection } from "@/assets/database/data.js";
export default {
  layout: "landingHeader",

  head: {
    title: "Home",
  },
 
  data() {
    return {
      CardList: CardSection,
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
          img: require("~/assets/images/food/9.png"),
          name: "베트남",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "아메리칸",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "인도",
        },
        {
          img: require("~/assets/images/food/14.png"),
          name: "기타 세계",
        },
      ],
      alcohol: [
        {
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
