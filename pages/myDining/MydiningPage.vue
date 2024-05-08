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
                        :key="reservation.reservationId"
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
                                    v-for="index in Math.floor(
                                      reservation.averageReviewScore
                                    )"
                                    :key="'full-' + index"
                                  >
                                    <v-img
                                      :src="
                                        require('~/assets/images/babscore.png')
                                      "
                                      width="20px"
                                      class="fixed-size"
                                      alt="Full Star"
                                    ></v-img>
                                  </span>
                                  <!-- 소수점이 있으면 반 별 추가 -->
                                  <span
                                    v-if="
                                      hasHalfStar(
                                        reservation.averageReviewScore
                                      )
                                    "
                                  >
                                    <v-img
                                      :src="
                                        require('~/assets/images/half-babscore.png')
                                      "
                                      width="10px"
                                      class="fixed-size"
                                      alt="Half Star"
                                    ></v-img>
                                  </span>
                                  <span class="font-weight-bold text-14 ms-2">
                                    {{
                                      reservation.averageReviewScore.toFixed(1)
                                    }}
                                  </span>

                                  <h6
                                    class="ms-3 grey--text text--darken-1 font-weight-light"
                                  >
                                    ({{ reservation.reviewCount }})
                                  </h6>
                                </span>
                              </div>
                              <v-chip
                                class="text-uppercase mb-2"
                                :class="{
                                  'green lighten-2':
                                    reservation.reservationState === 'RESERVED',
                                  'blue-grey lighten-4':
                                    reservation.reservationState ===
                                    'COMPLETED',
                                  'red lighten-2':
                                    reservation.reservationState === 'CANCELED',
                                }"
                                text-color="secondary"
                                small
                              >
                                {{ reservation.reservationState }}
                              </v-chip>
                              <div>
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >시간:
                                  {{
                                    formatTime(reservation.reservationTime)
                                  }}</span
                                >

                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >인원수: {{ reservation.peopleCount }}명</span
                                >
                                <p class="text-14 primary--text mb-0">
                                  예약금: {{ reservation.deposit }}원
                                </p>

                                <nuxt-link
                                  :to="`/myDining/WriteReviewPage/${reservation.reservationId}`"
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
                              @click="
                                requestDeny(
                                  reservation.reservationId,
                                  reservation.reservationState
                                )
                              "
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
                        :key="like.bookmarkId"
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
                              <div class="d-flex mb-3">
                                <span style="display: flex">
                                  <span
                                    v-for="index in Math.floor(
                                      like.averageReviewScore
                                    )"
                                    :key="'full-' + index"
                                  >
                                    <v-img
                                      :src="
                                        require('~/assets/images/babscore.png')
                                      "
                                      width="20px"
                                      class="fixed-size"
                                      alt="Full Star"
                                    ></v-img>
                                  </span>
                                  <!-- 소수점이 있으면 반 별 추가 -->
                                  <span
                                    v-if="
                                      hasHalfStar(
                                        like.averageReviewScore
                                      )
                                    "
                                  >
                                    <v-img
                                      :src="
                                        require('~/assets/images/half-babscore.png')
                                      "
                                      width="10px"
                                      class="fixed-size"
                                      alt="Half Star"
                                    ></v-img>
                                  </span>
                                  <span class="font-weight-bold text-14 ms-2">
                                    {{
                                      like.averageReviewScore.toFixed(1)
                                    }}
                                  </span>

                                  <h6
                                    class="ms-3 grey--text text--darken-1 font-weight-light"
                                  >
                                    ({{ like.reviewCount }})
                                  </h6>
                                </span>

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
                                  전화번호: {{ like.tel }}
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
                              @click="requestNoLike(like.bookmarkId)"
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
                :key="review.reviewId"
              >
                <!-- user-post  -->
                <div class="mb-6">
                  <div class="d-flex align-center flex-wrap mb-4">
                    <v-avatar size="48" class="me-4">
                      <img :src="review.image" alt="" />
                    </v-avatar>
                    <div>
                      <h5 class="mb-0">{{ review.restaurantName }}</h5>
                      <p class="mb-0 text-14 grey--text text--darken-1">
                        {{ review.registerDate }}
                      </p>
                    </div>
                    <v-btn
                      outlined
                      color="primary"
                      small
                      class="delete-button"
                      style="margin-left: 30px"
                      @click="requestDelete(review.reviewId)"
                    >
                      삭제요청
                    </v-btn>
                  </div>

                  <div class="d-flex align-center mb-2">
                    <span v-for="(star, index) in review.score" :key="index">
                      <div style="margin-left: 2px">
                        <v-img
                          :src="require('~/assets/images/babscore.png')"
                          width="20px"
                          class="fixed-size"
                        ></v-img>
                      </div>
                    </span>
                    <span class="font-weight-bold text-14 ms-2"
                      >{{ review.score }}.0</span
                    >
                    <!-- <span class="grey--text text--darken-1 text-14 ms-2"
                      >3 Days Ago</span
                    > -->
                  </div>
                  <h5
                    class="grey--text text--darken-2 font-weight-regular mb-3"
                  >
                    {{ review.reviewContent }}
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
                    <div v-if="review.replyRegisterDate || review.replyContent">
                      <div>
                        <div class="text-14 grey--text text--darken-4 f-600">
                          사장님
                        </div>
                        <div class="mb-0 text-14 grey--text text--darken-1">
                          {{ review.replyRegisterDate }}
                        </div>
                      </div>
                      <h5 class="grey--text text--darken-2 font-weight-regular">
                        {{ review.replyContent }}
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
import axios from "axios";

export default {
  data: () => ({
    reserveRestaurantList: [],
    bookmarksList: [],
    reviewsList: [],
    reservations: [],
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
      return this.bookmarksList.slice(start, end);
    },
    pageCount1() {
      return Math.ceil(this.bookmarksList.length / this.perPage);
    },
    paginatedData2() {
      let start = (this.currentPage2 - 1) * this.perPage2;
      let end = start + this.perPage2;
      return this.reviewsList.slice(start, end);
    },
    pageCount2() {
      return Math.ceil(this.reviewsList.length / this.perPage2);
    },
  },

  methods: {
    async bookmarkCancle(bookmarkId) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/myDining/bookmark-cancel/${bookmarkId}`,
        );
        alert("즐겨찾기가 해제되었습니다.");
        this.fetchBookmarks();
      }
      catch (error) {
        console.error("즐겨찾기 취소 중 오류가 발생했습니다.", error);
        alert("즐겨찾기 해제에 실패했습니다.");
      }
    },
    async requestRemeveReview(reviewId) {
      console.log(reviewId + "삭제할 리뷰아이디");
      try {
        const response = await axios.put(
          `http://localhost:8000/myDining/reviewRemoveRequest/${reviewId}`
        );
      } catch (error){
        console.error("리뷰 취소 신청 중 오류가 발생했습니다.", error);
        alert("예약 취소에 실패했습니다.");
      }
    },
    async reservationDeny(reservationId) {
      console.log(reservationId + " 여기");
      try {
        const response = await axios.put(
          `http://localhost:8000/myDining/reservation-cancel/${reservationId}`,
          {
            reservationState: "CANCELED",
          }
        );
        alert("예약이 성공적으로 취소되었습니다.");
        this.fetchReservations();
      } catch (error) {
        console.error("예약 취소 중 오류가 발생했습니다:", error);
        alert("예약 취소에 실패했습니다.");
      }
    },
    formatTime(time) {
      // 정규식을 사용하여 숫자만 추출
      const match = time.match(/\d+/);
      if (match) {
        const hour = parseInt(match[0], 10); // 숫자로 변환
        return `오후 ${hour}시`; // "오후 X시" 형식으로 반환
      }
      return time; // 매칭되는 숫자가 없으면 원래 문자열 반환
    },
    hasHalfStar(score) {
      // 소수 부분이 0이 아니면 true 반환
      return score % 1 !== 0;
    },
    fetchReviews() {
      const id = this.$route.params.id;
      console.log(id+"리뷰");
      axios
        .get(`http://localhost:8000/myDining/reviews/${id}`)
        .then((response) => {
          this.reviewsList = response.data;
          console.log(this.reviewsList);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      })
    },
    // 예약 리스트 불러오기
    fetchReservations() {
      // URL의 id 파라미터를 가져옵니다
      const id = this.$route.params.id;

      axios
        .get(`http://localhost:8000/myDining/reservations/${id}`)
        .then((response) => {
          // 응답 데이터를 reservations 배열에 저장합니다
          this.reserveRestaurantList = response.data;
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        });
    },
    // 즐겨찾기 리스트 불러오기
    fetchBookmarks() {
      // URL의 id 파라미터를 가져옵니다
      const id = this.$route.params.id;

      axios
        .get(`http://localhost:8000/myDining/bookmarks/${id}`)
        .then((response) => {
          // 응답 데이터를 reservations 배열에 저장합니다
          this.bookmarksList = response.data;
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        });
    },
    submitReview() {
      // 리뷰 제출 로직
      console.log("Review submitted");
      this.dialog = false; // 리뷰 제출 후 모달 닫기
    },
    requestDelete(reviewId) {
      if (confirm("진짜 삭제하시겠습니까?")) {
        this.requestRemeveReview(reviewId);
      }
    },
    requestDeny(reservationId, reservationState) {
      if (confirm("진짜 취소하시겠습니까?")) {
        if (reservationState === "RESERVED") {
          console.log("네, 예약 ID:", reservationId); // 확인을 위해 예약 ID 로깅
          this.reservationDeny(reservationId); // reservationDeny 호출
        }
        else {
          alert("예약중인 건만 취소가 가능합니다.")
        }
      }
    },
    requestNoLike(bookmarkId) {
      if (confirm("진짜 해제하시겠습니까?")) {
        this.bookmarkCancle(bookmarkId)
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0); // X 좌표, Y 좌표
    },
  },
  created() {
    this.fetchReservations();
    this.fetchBookmarks();
    this.fetchReviews();
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
