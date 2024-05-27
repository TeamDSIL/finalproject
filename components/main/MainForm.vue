<template>
  <div>
    <v-container class="py-15">
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-tabs v-model="tab" class="mb-8">
              <v-tab href="#tab-1" style="font-weight: bold; font-size: large"
                >홈</v-tab
              >
              <v-tab href="#tab-2" style="font-weight: bold; font-size: large"
                >내주변찾기</v-tab
              >
              <v-spacer></v-spacer>
              <nuxt-link
                style="margin-top: 10px"
                :to="{ path: '/main/InformationPage' }"
                class="text-decoration-none"
              >
                <v-button
                  style="
                    font-size: large;
                    color: gray;
                    background-color: white;
                    font-weight: bold;
                    margin-top: 10px;
                    margin-right: 25px;
                  "
                  medium
                >
                  공지사항
                </v-button>
              </nuxt-link>
            </v-tabs>
          </v-row>

          <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
              <div class="carousel-container">
                <v-carousel
                  hide-delimiters
                  height="500px"
                  cycle
                  interval="2000"
                >
                  <v-carousel-item v-for="(item, i) in items" :key="i">
                    <div class="image-wrapper">
                      <div
                        class="image-background"
                        :style="{ backgroundImage: 'url(' + item.src + ')' }"
                      ></div>
                      <v-img
                        :src="item.src"
                        contain
                        @click.native="navigateTo(item.name)"
                        height="500px"
                        class="image-foreground"
                      ></v-img>
                    </div>
                  </v-carousel-item>
                </v-carousel>
              </div>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <div>
                <MainMap />
              </div>
            </v-tab-item>
            <v-tab-item value="tab-3">
              <div></div>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import MainMap from "../api/MainMap.vue";
export default {
  name: "App",
  components: { MainMap },
  data() {
    return {
      tab: "tab-1",
      items: [
        {
          src: require("@/assets/images/carousels_image.png"),
        },
        {
          src: require("@/assets/images/ad/adv3.jpg"),
        },
        {
          src: require("@/assets/images/ad/adv4.jpg"),
        },
        {
          src: require("@/assets/images/ad/adv2.jpg"),
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
.carousel-container {
  position: relative;
}

.carousel-container::before,
.carousel-container::after {
  content: "";
  position: absolute;
  top: 0;
  width: 15%;
  height: 100%;
  z-index: 3;
}

.carousel-container::before {
  left: 0;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.carousel-container::after {
  right: 0;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}

.image-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}

.image-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  z-index: 1;
}

.image-foreground {
  position: relative;
  z-index: 2;
}
</style>
