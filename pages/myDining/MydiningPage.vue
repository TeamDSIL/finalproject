<template>
  <div>
    <v-container>
      <!-- <v-breadcrumbs class="ps-0" :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs> -->

      <div>
        <v-tabs v-model="tab" class="mb-8">
          <v-tab class="text-capitalize" href="#tab-1"> 예약현황 </v-tab>

          <v-tab class="text-capitalize" href="#tab-2"> 즐겨찾기 </v-tab>

          <v-tab class="text-capitalize" href="#tab-3"> 나의리뷰 </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item value="tab-1">
            <v-row>
              <v-col cols="12" xl="12">
                <div slot="boxContent">
                  <div class="px-8">
                    <v-row>
                      <v-col cols="12">
                        <h3 class="fw-bold">나의 예약현황</h3>
                      </v-col>
                      <v-col cols="12" v-for="(n, index) in 4" :key="index">
                        <div
                          class="d-flex justify-space-between align-center flex-wrap"
                        >
                          <div class="d-flex flex-wrap">
                            <v-avatar class="me-3" size="150" tile>
                              <img src="~/assets/images/4.png" alt="" />
                            </v-avatar>
                            <div>
                              <h5 class="f-600 mb-3">우리식당 서울관악점</h5>
                              <v-chip
                                class="text-uppercase mb-2"
                                text-color="secondary"
                                small
                                color="grey lighten-4"
                                >예약중</v-chip
                              >
                              <div>
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >시간: 17:00</span
                                >
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >인원수: 2명</span
                                >
                                <p class="text-14 primary--text mb-0">
                                  예약금: 30,000원
                                </p>


                           
                                  <nuxt-link
                                    to="/myDining/WriteReviewPage"
                                    class="text-decoration-none white--text"
                                  >
                                  <v-btn
                                  
                                  color="primary"
                                  small
                                  class="review-write-button">
                                    리뷰 쓰기
                                    <!-- <v-icon right small>mdi-plus</v-icon> -->
                                  </v-btn>
                                    
                                  </nuxt-link>
                           

                              </div>
                              <!-- <p class="text-14 grey--text text--darken-1">(4 Pcs mutton in chicken keema gravy)</p> -->
                            </div>
                          </div>

                          <div>
                            <v-btn
                              outlined
                              color="primary"
                              small
                              class="delete-button"
                            >
                              취소하기
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-row>
              <v-col cols="12" xl="12">
                <div slot="boxContent">
                  <div class="px-8">
                    <v-row>
                      <v-col cols="12">
                        <h3 class="fw-bold">나의 즐겨찾기</h3>
                      </v-col>
                      <v-col cols="12" v-for="(n, index) in 4" :key="index">
                        <div
                          class="d-flex justify-space-between align-center flex-wrap"
                        >
                          <div class="d-flex flex-wrap">
                            <v-avatar class="me-3" size="150" tile>
                              <img src="~/assets/images/4.png" alt="" />
                            </v-avatar>
                            <div>
                              <h5 class="f-600 mb-3">느그식당 창원점</h5>
                              <!-- <v-chip
                                  class="text-uppercase mb-2"
                                  text-color="secondary"
                                  small
                                  color="grey lighten-4"
                                  >Must Try</v-chip
                                > -->
                              <div class="d-flex mb-3">
                                <span v-for="(star, index) in 5" :key="index">
                      <div style="margin-left: 2px;">
            <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          </div>
                    </span>
                                <h6
                                  class="ms-3 grey--text text--darken-1 font-weight-light"
                                >
                                  (57)
                                </h6>
                              </div>
                              <div>
                                <!-- <p
                                    class="text-14 grey--text text--darken-1 text-decoration-line-through me-2 mb-0"
                                  >
                                    $25
                                  </p> -->
                                <p
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                >
                                  주소: 경남 창원시 의창구 감계로 123 45동 156호
                                </p>
                                <p
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                >
                                  전화번호: 055-249-1070
                                </p>
                                <v-btn
                        
                                  color="primary"
                                  small
                                  class="review-read-button"
                                >
                                  리뷰 보기
                                  <!-- <v-icon right small>mdi-plus</v-icon> -->
                                </v-btn>
                                <v-btn
                          
                                  color="primary"
                                  small
                                  class="detail-read-view"
                                >
                                  자세히 보기
                                </v-btn>
                              </div>
                            </div>
                          </div>
                          <div>
                            <v-btn
                              outlined
                              color="primary"
                              small
                              class="like-delete-button"
                            >
                              즐겨찾기 해제
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-row>
              <v-col cols="12">
                <h3 class="fw-bold">나의 리뷰</h3>
              </v-col>
              <v-col cols="12" lg="6">
                <!-- user-post  -->
                <div class="mb-6">
                  <div class="d-flex align-center flex-wrap mb-4">
                    <v-avatar size="48" class="me-4">
                      <img src="~/assets/images/restaurant_img.png" alt="" />
                    </v-avatar>
                    <div>
                      <h5 class="mb-0">우리식당 서울관악점</h5>
                      <p class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </p>
                    </div>
                    <v-btn
                              outlined
                              color="primary"
                              small
                              class="delete-button"
                              style="margin-left: 30px;"
                            >
                              삭제요청
                            </v-btn>
                  </div>
                  
                  <div class="d-flex align-center mb-2">
                    <span v-for="(star, index) in 5" :key="index">
                      <div style="margin-left: 2px;">
            <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          </div>
                    </span>
                    <span class="font-weight-bold text-14 ms-2">4.0</span>
                    <!-- <span class="grey--text text--darken-1 text-14 ms-2"
                      >3 Days Ago</span
                    > -->
                  </div>
                  <h5
                    class="grey--text text--darken-2 font-weight-regular mb-3"
                  >
                    식당이 깨끗하고 사장님이 맛있고 음식이 깨끗했어요.
                    강추합니다. 또 가고 싶지 않아요
                  </h5>
                  <div>
                    <div class="mt-4">
                      <v-btn
                        class="grey--text text--darken-2 text-capitalize"
                        text
                        elevation="0"
                        small
                      >
                        <v-icon left small>mdi-comment-text-outline</v-icon>
                        Comment
                      </v-btn>
                    </div>
                  </div>
                  <v-divider class="my-4"></v-divider>
                  <!-- comment  -->
                  <div class="mb-6">
                    <div>
                      <div class="text-14 grey--text text--darken-4 f-600">
                        사장님
                      </div>
                      <div class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </div>
                    </div>
                    <h5 class="grey--text text--darken-2 font-weight-regular">
                      이건 뭐 욕이가 칭찬이가 ㅋㅋㅋ 시켜줘서 감사합니데이
                    </h5>
                  </div>
                  <v-divider></v-divider>
                  <!-- end::comment -->
                </div>
                <!-- 두번째 리뷰 -->
                <div class="mb-6">
                  <div class="d-flex align-center flex-wrap mb-4">
                    <v-avatar size="48" class="me-4">
                      <img src="~/assets/images/restaurant_img.png" alt="" />
                    </v-avatar>
                    <div>
                      <h5 class="mb-0">느그식당 창원점</h5>
                      <p class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </p>
                    </div>
                    <v-btn
                              outlined
                              color="primary"
                              small
                              class="delete-button"
                              style="margin-left: 30px;"
                            >
                              삭제요청
                            </v-btn>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <span v-for="(star, index) in 5" :key="index">
                      <div style="margin-left: 2px;">
            <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          </div>
                    </span>
                    <span class="font-weight-bold text-14 ms-2">4.0</span>
                    <!-- <span class="grey--text text--darken-1 text-14 ms-2"
                      >3 Days Ago</span
                    > -->
                  </div>
                  <h5
                    class="grey--text text--darken-2 font-weight-regular mb-3"
                  >
                    맛있었어요 .. 근데 음식에서 똥이나와서 다시는 가고싶네요,,
                    즐거운 하루되세요 전 아니지만 나중에 친구 데려올게요!
                  </h5>
                  <div>
                    <div class="mt-4">
                      <v-btn
                        class="grey--text text--darken-2 text-capitalize"
                        text
                        elevation="0"
                        small
                      >
                        <v-icon left small>mdi-comment-text-outline</v-icon>
                        Comment
                      </v-btn>
                    </div>
                  </div>
                  <v-divider class="my-4"></v-divider>
                  <!-- comment  -->
                  <div class="mb-6">
                    <div>
                      <div class="text-14 grey--text text--darken-4 f-600">
                        사장님
                      </div>
                      <div class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </div>
                    </div>
                    <h5 class="grey--text text--darken-2 font-weight-regular">
                      감사합니다. 손님.
                    </h5>
                  </div>
                  <v-divider></v-divider>
                  <!-- end::comment -->
                </div>
                <!-- 세번째 리뷰 -->
                <div class="mb-6">
                  <div class="d-flex align-center flex-wrap mb-4">
                    <v-avatar size="48" class="me-4">
                      <img src="~/assets/images/restaurant_img.png" alt="" />
                    </v-avatar>

                    <div>
                      <h5 class="mb-0">느그식당 창원점</h5>
                      <p class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </p>
                    </div>
                    <v-btn
                              outlined
                              color="primary"
                              small
                              class="delete-button"
                              style="margin-left: 30px;"
                            >
                              삭제요청
                            </v-btn>
                  </div>
                  <div class="d-flex align-center mb-2">
                    <span v-for="(star, index) in 5" :key="index">
                      <div style="margin-left: 2px;">
            <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          </div>
                    </span>
                    <span class="font-weight-bold text-14 ms-2">4.0</span>
                    <!-- <span class="grey--text text--darken-1 text-14 ms-2"
                      >3 Days Ago</span
                    > -->
                  </div>
                  <h5
                    class="grey--text text--darken-2 font-weight-regular mb-3"
                  >
                    맛있었어요 .. 근데 음식에서 똥이나와서 다시는 가고싶네요,,
                    즐거운 하루되세요 전 아니지만 나중에 친구 데려올게요!
                  </h5>
                  <div>
                    <div class="mt-4">
                      <v-btn
                        class="grey--text text--darken-2 text-capitalize"
                        text
                        elevation="0"
                        small
                      >
                        <v-icon left small>mdi-comment-text-outline</v-icon>
                        Comment
                      </v-btn>
                    </div>
                  </div>
                  <v-divider class="my-4"></v-divider>
                  <!-- comment  -->
                  <div class="mb-6">
                    <div>
                      <div class="text-14 grey--text text--darken-4 f-600">
                        사장님
                      </div>
                      <div class="mb-0 text-14 grey--text text--darken-1">
                        2024-01-01
                      </div>
                    </div>
                    <h5 class="grey--text text--darken-2 font-weight-regular">
                      감사합니다. 손님.
                    </h5>
                  </div>
                  <v-divider></v-divider>
                  <!-- end::comment -->
                </div>
              </v-col>
              <v-col cols="12" lg="6">
                <v-img
                  class="mx-auto"
                  max-width="500px"
                  :src="require('~/assets/images/kiyeungichicken.jpg')"
                ></v-img>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-container>

    <!-- <Location /> -->
    <Footer />
  </div>
</template>

<script>
export default {
  // head: {
  //   title: "Food Menu",
  // },
  data: () => ({
    items: [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "New York",
        disabled: false,
        href: "/",
      },
      {
        text: "Resturants",
        disabled: true,
        href: "/",
      },
    ],
    formSelectItems: ["Foo", "Bar", "Fizz", "Buzz"],
    mobileItems: ["Order Online", "Book a Table", "Reviews"],
    text: "hello",
    tab: null,
    radioGroup: 1,
    value: [20, 40],
  }),
  methods: {

    submitReview() {
      // 리뷰 제출 로직
      console.log("Review submitted");
      this.dialog = false;  // 리뷰 제출 후 모달 닫기
    }
  },
};
</script>

<style lang="scss">
.review-write-button {
  margin-top: 10px;
}
.review-read-button {
  margin-top: 10px;
}
.detail-read-view {
  margin-top: 10px;
}
.like-delete-button {
  margin-right: 200px;
}
.delete-button {
  margin-right: 200px;
}
.food-menu-link {
  font-size: 14px;
  text-decoration: none;
  color: #4b566b !important;
  font-weight: 400;
  &:hover {
    color: #000 !important;
    border-right: 3px solid #d23f57;
  }
  &.active {
    color: #000 !important;
    border-right: 3px solid #d23f57;
  }
}
</style>
