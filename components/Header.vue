<template>
  <div>
    <v-app-bar fixed color="white" elevate-on-scroll width="100%">
      <v-container class="d-flex align-center">
        <nuxt-link to="/">
          <div class="me-10" tile>
            <img
              src="~/assets/images/DSILnewLOGO.png"
              alt=""
              style="width: 100px"
            />
          </div>
        </nuxt-link>

        <v-dialog v-model="dsilModal" width="600">
          <v-card>
            <v-card-title>
              <span
                style="font-size: large; font-weight: bold; margin-top: 10px"
                >빠른 검색</span
              >
            </v-card-title>
            <v-card-text>
              <div
                v-for="category in categories"
                :key="category.name"
                class="my-3"
              >
                <div style="margin-bottom: 10px; display: flex">
                  <v-img
                    contain
                    :src="
                      require(`~/assets/images/clikCategory/${category.img}.png`)
                    "
                    width="20px"
                    style="max-width: 20px; margin-right: 5px"
                  ></v-img
                  ><span
                    style="font-weight: bold; font-size: large; color: black"
                    >{{ category.displayName }}</span
                  >
                </div>

                <div class="button-grid">
                  <v-btn
                    v-for="item in category.items"
                    :key="item.name"
                    :class="{
                      'btn-selected': category.selected.some(
                        (selected) => selected.name === item.name
                      ),
                      'btn-unselected': !category.selected.some(
                        (selected) => selected.name === item.name
                      ),
                    }"
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
              <v-btn color="blue darken-1" text @click="closeModal">취소</v-btn>
              <v-btn color="primary" text @click="search">검색</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div
          class="search-bar-container flex-grow-1 d-none d-md-flex border rounded"
        >
          <v-btn
            icon
            tile
            large
            text
            class="text-capitalize rounded-0"
            width="120px"
            style="background-color: rgb(210, 63, 87)"
            @click="dsilModal = true"
          >
            <!-- <v-icon small>mdi-crosshairs-gps</v-icon> -->
            <span style="color: white; font-weight: bold">빠른검색하기</span>
          </v-btn>
          <input
            class="white flex-grow-1 ps-5"
            type="text"
            placeholder="카테고리 및 음식이름을 입력해주세요"
            v-model="searchQuery"
            @keyup.enter="search"
          />
          <v-btn
            icon
            large
            tile
            class="rounded-l-0 text-capitalize"
            @click="search"
            width="100px"
            >Search
          </v-btn>
        </div>
        <v-spacer></v-spacer>

        <!-- <v-btn light text href="http://localhost:3000/memberManage/loginPage">
          <v-icon class="me-0 me-sm-3">mdi-account-circle-outline</v-icon>
          <span class="d-none d-sm-block">{{ user ? user.email : '' }}</span>
        </v-btn> -->

        <template v-if="user">
          <v-btn light text @click="logout">
            <span class="d-none d-sm-block">로그아웃</span>
          </v-btn>
          <v-btn
            v-if="user.permission.permission === 'USER'"
            light
            text
            href="http://localhost:3000/memberManage/userMyPage"
          >
            <v-icon class="me-0 me-sm-3">mdi-account-circle-outline</v-icon>
            <span class="d-none d-sm-block">{{ user.email }}</span>
          </v-btn>
          <v-btn
            v-else-if="user.permission.permission === 'OWNER'"
            light
            text
            href="http://localhost:3000/memberManage/ownerMyPage"
          >
            <v-icon class="me-0 me-sm-3">mdi-account-circle-outline</v-icon>
            <span class="d-none d-sm-block">{{ user.email }}</span>
          </v-btn>
          <v-btn
            v-else
            light
            text
            href="http://localhost:3000/memberManage/AdminManageUserPage"
          >
            <v-icon class="me-0 me-sm-3">mdi-account-circle-outline</v-icon>
            <span class="d-none d-sm-block">{{ user.email }}</span>
          </v-btn>
        </template>
        <template v-else>
          <v-btn light text href="http://localhost:3000/memberManage/loginPage">
            <v-icon class="me-0 me-sm-3">mdi-account-circle-outline</v-icon>
            <span class="d-none d-sm-block">로그인</span>
          </v-btn>
        </template>

        <!-- <v-btn @click="shoppingCartDrawer = true" light text tile class="me-2">
                <v-icon small>mdi-cart-outline</v-icon>(8)
              </v-btn> -->
        <v-app-bar-nav-icon
          text
          light
          @click="drawer = true"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>
    <!-- <v-navigation-drawer
      width="320"
      v-model="shoppingCartDrawer"
      fixed
      temporary
      right
    >
      <ShoppingCart>
        <template v-slot:userDrawerCloseButton>
          <v-btn
            icon
            color
            @click.stop="shoppingCartDrawer = !shoppingCartDrawer"
          >
            <v-icon color="primary">mdi-close</v-icon>
          </v-btn>
        </template>
</ShoppingCart>
<template v-slot:append>
        <div class="pa-2">
          <v-btn class="text-capitalize mb-3" block color="primary">
            Checkout Now ($ 220)
          </v-btn>
          <v-btn class="text-cappitalise" outlined block color="primary">
            View Cart
          </v-btn>
        </div>
      </template> -->
    <!-- </v-navigation-drawer> -->
    <v-navigation-drawer width="320" v-model="drawer" fixed temporary>
      <NavbarList>
        <template v-slot:userDrawerCloseButton>
          <v-btn icon color @click.stop="drawer = !drawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </NavbarList>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    user: null, // 사용자 정보를 저장할 변수
    drawer: false,
    dsilModal: false,
    searchQuery: "",
    dialog: false,
    categories: [
      {
        name: "INDUSTRIAL_DISTRICT",
        img: "location",
        displayName: "드실장소",
        items: [
          { name: "YEOUIDO_MAPO", displayName: "여의도-마포" },
          { name: "YONGSAN_VALLEY", displayName: "용산(Y-밸리)" },
          { name: "YANGJAE", displayName: "양재" },
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
        img: "forkknife",
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
        img: "meet",
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
        img: "seafood",
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
        img: "drink",
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
        img: "peoples",
        displayName: "고객 맞춤",
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
        img: "convinience",
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
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        // 토큰을 Authorization 헤더에 포함하여 요청 보내기
        const response = await axios.get("http://localhost:8000/userInfo/me", {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        });

        if (response.status === 200) {
          const userInfo = response.data;
          console.log("User Info:", userInfo);
          // 사용자 정보를 상태나 컴포넌트 데이터에 저장
          this.user = userInfo;
          console.log(this.user);
          console.log(this.user.id);
        } else {
          console.error("Failed to fetch user info:", response);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    async logout() {
      try {
        console.log("Sending logout request...");
        const response = await axios.post(
          "http://localhost:8000/memberManage/logout",
          {},
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log("Logout successful");
          localStorage.removeItem("token");
          this.user = null;
          this.$router.push("/memberManage/loginPage");
        } else {
          console.error("Failed to logout:", response);
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
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

  async mounted() {
    await this.fetchUserInfo();
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
<style scoped>
.button-grid .v-btn {
  margin: 4px;
}

.btn-selected {
  background-color: rgb(210, 63, 87) !important;
  color: white !important;
  border: 1px solid rgb(210, 63, 87) !important;
}

.btn-unselected {
  background-color: white !important;
  color: rgb(210, 63, 87) !important;
  border: 1px solid rgb(210, 63, 87) !important;
}
</style>
