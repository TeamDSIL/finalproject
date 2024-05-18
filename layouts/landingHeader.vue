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
                    <span class="headline">{{ category.displayName }}</span>
                    <div class="button-grid">
                      <v-btn
                        v-for="item in category.items"
                        :key="item.name"
                        :color="
                          category.selected.some(
                            (selected) => selected.name === item.name
                          )
                            ? 'blue lighten-3'
                            : ''
                        "
                        text
                        @click="toggleSelection(category.selected, item)"
                      >
                        {{ item.displayName }}
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
                  v-model="searchQuery"
                />
                <v-btn
                  x-large
                  color="primary"
                  class="rounded-l-0 text-capitalize"
                  @click="search"
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
    searchQuery: "",
    categories: [
      {
        name: "INDUSTRIAL_DISTRICT",
        displayName: "드실장소",
        items: [
          { name: "YEOUIDO_MAPO", displayName: "여의도-마포" },
          { name: "YONGSAN_VALLEY", displayName: "용산(Y-밸리)" },
          { name: "YANGJAE", displayName: "양제" },
          { name: "SUSEO", displayName: "수서" },
          { name: "HONGNEUNG", displayName: "홍릉" },
          { name: "MAGOK", displayName: "마곡" },
          {
            name: "GASAN_DIGITAL_VALLEY",
            displayName: "가산디지털단지(G-밸리)",
          },
          {
            name: "GURO_DIGITAL_VALLEY",
            displayName: "구로디지털단지(G-밸리)",
          },
        ],
        selected: [],
      },
      {
        name: "BY_COUNTRY",
        displayName: "드실 음식",
        items: [
          { name: "KOREAN", displayName: "한식" },
          { name: "CHINESE", displayName: "중식" },
          { name: "JAPANESE", displayName: "일식" },
          { name: "WESTERN", displayName: "양식" },
          { name: "VIETNAMESE", displayName: "베트남" },
          { name: "AMERICAN", displayName: "아메리칸" },
          { name: "INDIAN", displayName: "인도" },
          { name: "OTHERGLOBALFOOD", displayName: "기타세계" },
        ],
        selected: [],
      },
      {
        name: "MEAT",
        displayName: "드실 고기",
        items: [
          { name: "BEEF", displayName: "소고기" },
          { name: "PORK", displayName: "돼지고기" },
          { name: "STEAK", displayName: "스테이크" },
          { name: "TRIPE", displayName: "곱창/막창" },
        ],
        selected: [],
      },
      {
        name: "SEAFOOD",
        displayName: "드실 해물",
        items: [
          { name: "SEAFOOD_STEW", displayName: "해물(탕/찜/볶음)" },
          { name: "SASHIMI", displayName: "회/사시미" },
          { name: "SUSHI", displayName: "초밥" },
          { name: "SHELLFISH", displayName: "굴/조개" },
        ],
        selected: [],
      },
      {
        name: "ALCOHOL",
        displayName: "드실 주류",
        items: [
          { name: "BEER", displayName: "맥주/호프" },
          { name: "TRADITIONAL_ALCOHOL", displayName: "전통주" },
          { name: "IZAKAYA", displayName: "이자카야" },
          { name: "WINE_COCKTAIL", displayName: "와인/칵테일" },
        ],
        selected: [],
      },
      {
        name: "WITH_WHO",
        displayName: "뭘까",
        items: [
          { name: "SOLO", displayName: "혼밥" },
          { name: "WITH_FRIENDS", displayName: "친구" },
          { name: "GROUP_GATHERING", displayName: "단체모임" },
          { name: "DATE", displayName: "데이트" },
          { name: "FAMILY", displayName: "가족" },
          { name: "COST_EFFECTIVE", displayName: "가성비" },
        ],
        selected: [],
      },
      {
        name: "FACILITIES",
        displayName: "편의시설",
        items: [
          { name: "PARKING_AVAILABLE", displayName: "주차가능" },
          { name: "VALET_AVAILABLE", displayName: "발렛가능" },
          { name: "CORKAGE_FREE", displayName: "콜키지 프리" },
          { name: "CORKAGE_ALLOWED", displayName: "콜키지 가능" },
          { name: "WELCOME_KIDS_ZONE", displayName: "웰컴키즈존" },
          { name: "PRIVATE_DINING_AVAILABLE", displayName: "대관 가능" },
          { name: "NO_KIDS_ZONE", displayName: "노키즈존" },
          { name: "SOMMELIER_AVAILABLE", displayName: "전문 소믈리에" },
          { name: "ACCESSIBILITY", displayName: "장애인 편의시설" },
          { name: "PET_FRIENDLY", displayName: "반려동물 동반" },
          { name: "FREE_WIFI", displayName: "무료와이파이" },
          { name: "SMOKING_AREA", displayName: "흡연구역" },
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
      const index = selectedArray.findIndex(
        (selected) => selected.name === item.name
      );
      if (index > -1) {
        selectedArray.splice(index, 1);
      } else {
        selectedArray.push(item);
      }
    },
    closeModal() {
      this.dsilModal = false;
      this.categories.forEach((category) => {
        category.selected = [];
      });
    },
    search() {
      // 쿼리 파라미터를 담을 객체를 생성합니다.
      let queryParams = {};

      // 입력된 검색어 처리
      if (this.searchQuery.trim() !== "") {
        queryParams["search"] = [encodeURIComponent(this.searchQuery.trim())]; // 배열로 저장
      }

      // 카테고리별로 쿼리 파라미터를 생성합니다.
      this.categories.forEach((category) => {
        category.selected.forEach((item) => {
          // 시설 관련 카테고리는 'facility' 파라미터로, 나머지는 'category' 파라미터로 추가합니다.
          const paramKey =
            category.name === "FACILITIES" ? "facility" : "category";
          // 해당 키에 대한 배열이 없으면 생성합니다.
          if (!queryParams[paramKey]) {
            queryParams[paramKey] = [];
          }
          // 해당 카테고리 키 배열에 아이템 이름을 추가합니다.
          queryParams[paramKey].push(item.name);
        });
      });

      // 쿼리 파라미터 문자열로 변환합니다.
      let queryString = Object.keys(queryParams)
        .map(
          (key) => queryParams[key].map((value) => `${key}=${value}`).join("&") // 배열을 이용해 join 함수 호출
        )
        .join("&");

      // 생성된 쿼리 파라미터를 포함하는 URL을 생성합니다.
      const searchUrl = `http://localhost:3000/restaurant/list?${queryString}`;

      // URL로 리디렉션합니다.
      window.location.href = searchUrl;

      // 모달 창을 닫습니다.
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







