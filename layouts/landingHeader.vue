<template>
  <v-app>
    <div class="hero-section">
      <Header :class="toggleNavClass()" />
      <div id="navbar-hero">
        <v-container>
          <div class="d-flex align-center mt-6 mb-10 navbar-container">
            <nuxt-link to="/">
              <v-avatar tile>
                <img src="~/assets/images/dsillogoround.png" alt="" />
              </v-avatar>
            </nuxt-link>

            <v-spacer></v-spacer>

            <!-- 모달 다이얼로그  -->
            <v-dialog v-model="dsilModal" width="600">
              <v-card>
                <v-card-title>
                  <span class="headline">드실 선택</span>
                </v-card-title>
                <v-card-text>
                  <div
                    v-for="category in categories"
                    :key="category.name"
                    class="my-3"
                  >
                    <span class="headline">{{ category.name }}</span>
                    <div class="button-grid">
                      <v-btn
                        v-for="item in category.items"
                        :key="item"
                        :color="
                          category.selected.includes(item)
                            ? 'blue lighten-3'
                            : ''
                        "
                        text
                        @click="toggleSelection(category.selected, item)"
                      >
                        {{ item }}
                      </v-btn>
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="closeModal"
                    >취소</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="search">검색</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- 햄버거 버튼 요기부터 -->
            <v-app-bar-nav-icon
              class="rounded"
              tile
              color="red"
              @click="drawer = true"
            ></v-app-bar-nav-icon>
            <v-navigation-drawer width="320" v-model="drawer" fixed temporary>
              <NavbarList>
                <template v-slot:userDrawerCloseButton>
                  <v-btn icon color @click.stop="drawer = !drawer">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
              </NavbarList>
            </v-navigation-drawer>
            <!-- 요까지 -->
          </div>
        </v-container>
      </div>
      <v-container>
        <div class="mt-15">
          <v-row>
            <v-col cols="12" xl="5" class="mx-auto">
              <h1
                class="white--text text-center display-2 font-weight-regular mb-4"
              >
                실시간 식당 예약 <span class="font-weight-bold">DSIL</span>
              </h1>
              <h4
                class="text-h6 white--text text-center font-weight-light mb-5"
              >
                드실
              </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" lg="7" class="mx-auto mb-15">
              <div class="form-location d-flex white rounded flex-wrap">
                <div class="d-flex align-center ps-5">
                  <v-btn
                    x-large
                    text
                    class="text-capitalize rounded-0 btn-location"
                  >
                    <v-icon left>mdi-crosshairs-gps</v-icon>
                    <span
                      class="grey--text text--darken-4 font-weight-regular"
                      @click="dsilModal = true"
                      >드실</span
                    >
                  </v-btn>
                </div>

                <input
                  class="white flex-1 ps-5"
                  type="text"
                  placeholder="Search for restaurant "
                />
                <v-btn
                  to="/resturant/ResturantTwoColumn"
                  x-large
                  color="primary"
                  class="rounded-l-0 text-capitalize"
                >
                  Search
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
    <Nuxt class="content" />
    <GoToBtn />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    dsilModal: false,
    categories: [
      {
        name: "산업단지",
        items: [
          "여의도-마포",
          "용산(Y-밸리)",
          "양제",
          "수서",
          "홍릉",
          "마곡",
          "가산디지털단지(G-밸리)",
          "구로디지털단지(G-밸리)",
        ],
        selected: [],
      },
      {
        name: "국가별",
        items: [
          "한식",
          "중식",
          "일식",
          "양식",
          "베트남",
          "아메리칸",
          "인도",
          "기타세계",
        ],
        selected: [],
      },
      {
        name: "육류",
        items: ["소고기", "돼지고기", "스테이크", "곱창/막창"],
        selected: [],
      },
      {
        name: "해물",
        items: ["해물(탕/찜/볶음)", "회/사시미", "초밥", "굴/조개"],
        selected: [],
      },
      {
        name: "주류",
        items: ["맥주/호프", "전통주", "이자카야", "와인/칵테일"],
        selected: [],
      },
      {
        name: "누구랑",
        items: ["혼자", "친구", "단체모임", "데이트 가족"],
        selected: [],
      },
      {
        name: "시설",
        items: [
          "주차가능",
          "발렛가능",
          "콜키지 프리",
          "콜키지 가능",
          "웰컴키즈존",
          "대관 가능",
          "노키즈존",
          "전문 소믈리에",
          "장애인 편의시설",
          "반려동물 동반",
          "무료와이파이",
          "흡연구역",
        ],
        selected: [],
      },
    ],
  }),
  methods: {
    toggleNavClass() {
      return this.drawer ? "sticky-nav" : "nav";
    },
    toggleSelection(selectedArray, item) {
      const index = selectedArray.indexOf(item);
      if (index > -1) {
        selectedArray.splice(index, 1);
      } else {
        selectedArray.push(item);
      }
    },
    closeModal() {
      this.dsilModal = false;
      this.categories.forEach((category) => {
        category.selected = []; // 각 카테고리의 선택 배열을 초기화
      });
    },
    search() {
      // 다중 선택된 데이터를 기반으로 필터링 또는 검색 로직을 수행
      console.log(
        "검색 데이터:",
        this.categories.map((c) => ({
          category: c.name,
          selections: c.selected,
        }))
      );
      this.$router.push("/restaurant/RestaurantListPage"); // '검색' 버튼 클릭 시 어떠한 페이지로 리디렉션
      this.closeModal();
    },
  },
  mounted() {
    window.document.onscroll = () => {
      if (window.scrollY > 400) {
        this.active = true;
      } else {
        this.active = false;
      }
    };
  },
};
</script>

<style lang="scss">
.hero-section {
  background-image: url("@/assets/images/dsil-header-bg.png");
  background-size: cover;
  .nav {
    display: none;
  }
}
.button-grid .v-btn {
  margin: 4px;
}
</style>
