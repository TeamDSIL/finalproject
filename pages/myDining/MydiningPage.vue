<template>
  <div>
    <v-container style="margin-bottom: 30px">
      <div
        class="ps-0 text-primary"
        style="font-size: larger; font-weight: bold"
      >
        마이다이닝
      </div>

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
                      <v-col
                        cols="12"
                        v-for="reservation in paginatedData"
                        :key="reservation.reservation_id"
                      >
                        <div
                          class="d-flex justify-space-between align-center flex-wrap"
                        >
                          <div class="d-flex flex-wrap">
                            <v-avatar class="me-3" size="150" tile>
                              <img :src="reservation.image" alt="" />
                            </v-avatar>
                            <div>
                              <div style="display: flex">
                                <h5
                                  class="f-600 mb-3"
                                  style="margin-right: 10px"
                                >
                                  {{ reservation.name }}
                                </h5>

                                <span style="display: flex">
                                  <span
                                    v-for="(
                                      star, index
                                    ) in reservation.babscore"
                                    :key="index"
                                  >
                                    <div style="margin-left: 2px">
                                      <v-img
                                        :src="
                                          require('~/assets/images/babscore.png')
                                        "
                                        width="20px"
                                        class="fixed-size"
                                      ></v-img>
                                    </div>
                                  </span>
                                  <span class="font-weight-bold text-14 ms-2"
                                    >{{ reservation.babscore }}.0</span
                                  >
                                  <h6
                                    class="ms-3 grey--text text--darken-1 font-weight-light"
                                  >
                                    ({{ reservation.baascoreCount }})
                                  </h6>
                                </span>
                              </div>
                              <v-chip
                                class="text-uppercase mb-2"
                                :class="{
                                  'green lighten-2':
                                    reservation.reservationState === '예약중',
                                  'blue-grey lighten-4':
                                    reservation.reservationState === '완료',
                                }"
                                text-color="secondary"
                                small
                              >
                                {{ reservation.reservationState }}
                              </v-chip>
                              <div>
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >시간: {{ reservation.time }}</span
                                >
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >인원수: {{ reservation.people }}명</span
                                >
                                <p class="text-14 primary--text mb-0">
                                  예약금: {{ reservation.deposit }}원
                                </p>

                                <nuxt-link
                                  :to="`/myDining/WriteReviewPage/${reservation.reservation_id}`"
                                  class="text-decoration-none white--text"
                                >
                                  <v-btn
                                    color="primary"
                                    small
                                    class="review-write-button"
                                  >
                                    리뷰 쓰기
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
                              @click="requestDeny"
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
            <v-pagination
              class="food-truck-pagination"
              v-model="currentPage"
              :length="pageCount"
              circle
              @input="scrollToTop"
            ></v-pagination>
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
                      <v-col
                        cols="12"
                        v-for="like in paginatedData1"
                        :key="like.reservation_id"
                      >
                        <div
                          class="d-flex justify-space-between align-center flex-wrap"
                        >
                          <div class="d-flex flex-wrap">
                            <v-avatar class="me-3" size="150" tile>
                              <img :src="like.image" alt="" />
                            </v-avatar>
                            <div>
                              <h5 class="f-600 mb-3">{{ like.name }}</h5>
                              <!-- <v-chip
                                  class="text-uppercase mb-2"
                                  text-color="secondary"
                                  small
                                  color="grey lighten-4"
                                  >Must Try</v-chip
                                > -->
                              <div class="d-flex mb-3">
                                <span
                                  v-for="(star, index) in like.babscore"
                                  :key="index"
                                >
                                  <div style="margin-left: 2px">
                                    <v-img
                                      :src="
                                        require('~/assets/images/babscore.png')
                                      "
                                      width="20px"
                                      class="fixed-size"
                                    ></v-img>
                                  </div>
                                </span>
                                <span class="font-weight-bold text-14 ms-2"
                                  >{{ like.babscore }}.0</span
                                >
                                <h6
                                  class="ms-3 grey--text text--darken-1 font-weight-light"
                                >
                                  ({{ like.baascoreCount }})
                                </h6>
                              </div>
                              <div>
                                <p
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                >
                                  주소: {{ like.address }}
                                </p>
                                <p
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                >
                                  전화번호: {{ like.phone }}
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
                              @click="requestNoLike"
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
            <v-pagination
              class="food-truck-pagination"
              v-model="currentPage1"
              :length="pageCount1"
              circle
              @input="scrollToTop"
            ></v-pagination>
          </v-tab-item>
          <v-tab-item value="tab-3">
            <v-row>
              <v-col cols="12">
                <h3 class="fw-bold">나의 리뷰</h3>
              </v-col>
              <v-col
                cols="12"
                lg="6"
                v-for="review in paginatedData2"
                :key="review.id"
              >
                <!-- user-post  -->
                <div class="mb-6">
                  <div class="d-flex align-center flex-wrap mb-4">
                    <v-avatar size="48" class="me-4">
                      <img :src="review.image" alt="" />
                    </v-avatar>
                    <div>
                      <h5 class="mb-0">{{ review.name }}</h5>
                      <p class="mb-0 text-14 grey--text text--darken-1">
                        {{ review.userdate }}
                      </p>
                    </div>
                    <v-btn
                      outlined
                      color="primary"
                      small
                      class="delete-button"
                      style="margin-left: 30px"
                      @click="requestDelete"
                    >
                      삭제요청
                    </v-btn>
                  </div>

                  <div class="d-flex align-center mb-2">
                    <span v-for="(star, index) in review.babscore" :key="index">
                      <div style="margin-left: 2px">
                        <v-img
                          :src="require('~/assets/images/babscore.png')"
                          width="20px"
                          class="fixed-size"
                        ></v-img>
                      </div>
                    </span>
                    <span class="font-weight-bold text-14 ms-2"
                      >{{ review.babscore }}.0</span
                    >
                    <!-- <span class="grey--text text--darken-1 text-14 ms-2"
                      >3 Days Ago</span
                    > -->
                  </div>
                  <h5
                    class="grey--text text--darken-2 font-weight-regular mb-3"
                  >
                    {{ review.usercontents }}
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
                    <div v-if="review.ownerdate || review.ownercontents">
                      <div>
                        <div class="text-14 grey--text text--darken-4 f-600">
                          사장님
                        </div>
                        <div class="mb-0 text-14 grey--text text--darken-1">
                          {{ review.ownerdate }}
                        </div>
                      </div>
                      <h5 class="grey--text text--darken-2 font-weight-regular">
                        {{ review.ownercontents }}
                      </h5>
                    </div>
                    <div v-else class="text-14 grey--text text--darken-1">
                      아직 사장님 댓글이 없어요.
                    </div>
                  </div>

                  <v-divider></v-divider>
                  <!-- end::comment -->
                </div>
              </v-col>
            </v-row>
            <div class="mb-4">
              <v-pagination
                class="food-truck-pagination"
                v-model="currentPage2"
                :length="pageCount2"
                circle
                @input="scrollToTop"
              ></v-pagination>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-container>
    <div class="mb-4"></div>
    <!-- <Location /> -->
    <Footer />
  </div>
</template>

<script>
import ReserveRestaurantList from "@/assets/database/myDiningReservation.js";
import LikeList from "@/assets/database/myDiningLikeLIst.js";
import ReviewList from "@/assets/database/myDiningReviewList.js";

export default {
  // head: {
  //   title: "Food Menu",
  // },
  data: () => ({
    reserveRestaurantList: ReserveRestaurantList,
    likeList: LikeList,
    reviewList: ReviewList,
    currentPage: 1,
    currentPage1: 1,
    currentPage2: 1,
    perPage: 5,
    perPage2: 4,
    text: "hello",
    tab: null,
    radioGroup: 1,
    value: [20, 40],
  }),
  computed: {
    paginatedData() {
      let start = (this.currentPage - 1) * this.perPage;
      let end = start + this.perPage;
      return this.reserveRestaurantList.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.reserveRestaurantList.length / this.perPage);
    },
    paginatedData1() {
      let start = (this.currentPage1 - 1) * this.perPage;
      let end = start + this.perPage;
      return this.likeList.slice(start, end);
    },
    pageCount1() {
      return Math.ceil(this.likeList.length / this.perPage);
    },
    paginatedData2() {
      let start = (this.currentPage2 - 1) * this.perPage2;
      let end = start + this.perPage2;
      return this.reviewList.slice(start, end);
    },
    pageCount2() {
      return Math.ceil(this.reviewList.length / this.perPage2);
    },
  },

  methods: {
    submitReview() {
      // 리뷰 제출 로직
      console.log("Review submitted");
      this.dialog = false; // 리뷰 제출 후 모달 닫기
    },
    requestDelete() {
      if (confirm("진짜 삭제하시겠습니까?")) {
        console.log("네");
      }
    },
    requestDeny() {
      if (confirm("진짜 취소하시겠습니까?")) {
        console.log("네");
      }
    },
    requestNoLike() {
      if (confirm("진짜 해제하시겠습니까?")) {
        console.log("네");
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0); // X 좌표, Y 좌표
    },
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
