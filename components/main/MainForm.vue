<template>
  <div>
    <v-container class="py-15">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-tabs v-model="tab" class="mb-8">
              <v-tab href="#tab-1">홈</v-tab>
              <v-tab href="#tab-2">내주변</v-tab>
            </v-tabs>
          </v-row>
          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <div>
                <h1>Home Content</h1>
                <!-- 추가적인 컨텐츠 -->
                <!-- <div style="width: 100%; height: 350px"> -->
                  <v-carousel hide-delimiters height="350px" >
                    <v-carousel-item v-for="(item, i) in items" :key="i">
                      <v-img
                        :src="item.src"
                        contain
                        @click.native="navigateTo(item.name)"
                        height="350px"
                      ></v-img>
                      <!-- 클릭 이벤트를 이미지에 추가합니다. -->
                    </v-carousel-item>
                  </v-carousel>
                <!-- </div> -->
              </div>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <div>
                <h1>지도</h1>
                <!-- 추가적인 컨텐츠 -->
                <KakaoMap />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import KakaoMap from "../api/MainMap.vue";

export default {
  name: "App",
  components: { KakaoMap },
  data() {
    return {
      tab: "tab-1",
      items: [
        {
          src: require("@/assets/images/dsilLogoCut.jpg"),
        },
        {
          src: require("@/assets/images/carousels_infor.png"),
          name: "main-InformationPage",
        },
        {
          src: require("@/assets/images/carousels_roulette.png"),
        },
        {
          src: require("@/assets/images/carousels_image.png"),
        },
      ],
    };
  },
  methods: {
    navigateTo(name) {
      if (name === "main-InformationPage") {
        this.$router.push("/main/InformationPage");
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* 스타일 설정은 필요에 따라 추가 */
</style>
