<template>
  <div>
    <v-container style="margin-bottom: 30px">
      <v-col cols="12" class="restaurant-title-img">
        <v-img
          contain
          :src="require('~/assets/images/mydiningRestaurant.png')"
          width="20px"
          style="max-width: 20px; margin-right: 5px"
        ></v-img>
        <div
          class="ps-0 text-primary"
          style="font-size: larger; font-weight: bold"
        >
          마이다이닝
        </div>
      </v-col>
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
                              <img :src="reservation.restaurantImg" alt="" />
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

                                <template
                                  v-if="
                                    reservation.review === false &&
                                    reservation.reservationState === 'COMPLETED'
                                  "
                                >
                                  <nuxt-link
                                    :to="{
                                      path: '/myDining/WriteReviewPage',
                                      query: {
                                        reservationId:
                                          reservation.reservationId,
                                        name: reservation.name,
                                      },
                                    }"
                                    class="text-decoration-none"
                                  >
                                    <v-btn
                                      color="primary"
                                      small
                                      class="review-write-button"
                                    >
                                      리뷰 쓰기
                                    </v-btn>
                                  </nuxt-link>
                                </template>
                                <template v-else>
                                  <div>
                                    <v-btn
                                      color="primary"
                                      small
                                      class="review-write-button"
                                      disabled
                                    >
                                      리뷰 쓰기
                                    </v-btn>
                                  </div>
                                </template>
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
                              <img
                                :src="like.restaurantImg"
                                alt="레스토랑 이미지"
                              />
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
                                    v-if="hasHalfStar(like.averageReviewScore)"
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
                                    {{ like.averageReviewScore.toFixed(1) }}
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

                                <nuxt-link
                                  :to="`/restaurant/detail/${like.restaurantId}`"
                                >
                                  <v-btn
                                    color="primary"
                                    small
                                    class="detail-read-view"
                                  >
                                    자세히 보기
                                  </v-btn>
                                </nuxt-link>
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
                      <img :src="review.restaurantImg" alt="식당사진" />
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
                  <v-avatar class="me-3" size="200" tile>
                    <img :src="review.reviewImg" alt="레스토랑 이미지" />
                  </v-avatar>
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
                    <div v-if="review.replyContent">
                      <div class="text-14 grey--text text--darken-4 f-600">
                        사장님
                      </div>
                      <div class="mb-0 text-14 grey--text text--darken-1">
                        {{ review.replyRegisterDate }}
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
    user: null,
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
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }
        // 토큰을 Authorization 헤더에 포함하여 요청 보내기
        const response = await axios.get(`${process.env.API_URL}/userInfo/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (response.status === 200) {
          const userInfo = response.data;
          console.log("User Info:", userInfo);
          // 사용자 정보를 상태나 컴포넌트 데이터에 저장
          this.user = userInfo;
        } else {
          console.error("Failed to fetch user info:", response);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    async bookmarkCancle(bookmarkId) {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.delete(
          `${process.env.API_URL}/myDining/bookmark-cancel/${bookmarkId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        alert("즐겨찾기가 해제되었습니다.");
        this.fetchBookmarks();
      } catch (error) {
        console.error("즐겨찾기 취소 중 오류가 발생했습니다.", error);
        alert("즐겨찾기 해제에 실패했습니다.");
      }
    },
    async requestRemeveReview(reviewId) {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.put(
          `${process.env.API_URL}/myDining/reviewRemoveRequest/${reviewId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("리뷰 취소 신청 중 오류가 발생했습니다.", error);
        alert("리뷰 삭제 요청에 실패했습니다.");
      }
    },
    async reservationDeny(reservationId) {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.post(
          `${process.env.API_URL}/myDining/reservation-cancel/${reservationId}`,
          {
            reservationState: "CANCELED",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
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
    async fetchReviews() {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        const id = this.user.id;
        const response = await axios.get(
          `${process.env.API_URL}/myDining/reviews/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        this.reviewsList = response.data;
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    },
    // 예약 리스트 불러오기
    async fetchReservations() {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        // URL의 id 파라미터를 가져옵니다
        const id = this.user.id;
        const response = await axios.get(
          `${process.env.API_URL}/myDining/reservations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        // 응답 데이터를 reservations 배열에 저장합니다
        this.reserveRestaurantList = response.data;
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    },
    // 즐겨찾기 리스트 불러오기
    async fetchBookmarks() {
      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        // URL의 id 파라미터를 가져옵니다
        const id = this.user.id;
        const response = await axios.get(
          `${process.env.API_URL}/myDining/bookmarks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        // 응답 데이터를 bookmarksList 배열에 저장합니다
        this.bookmarksList = response.data;
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
      }
    },
    submitReview() {
      // 리뷰 제출 로직
      console.log("Review submitted");
      this.dialog = false; // 리뷰 제출 후 모달 닫기
    },
    requestDelete(reviewId) {
      if (confirm("진짜 삭제하시겠습니까?")) {
        this.requestRemeveReview(reviewId);
        alert("삭제 요청되었습니다.");
      }
    },
    requestDeny(reservationId, reservationState) {
      if (confirm("진짜 취소하시겠습니까?")) {
        if (reservationState === "RESERVED") {
          console.log("네, 예약 ID:", reservationId); // 확인을 위해 예약 ID 로깅
          this.reservationDeny(reservationId); // reservationDeny 호출
        } else {
          alert("예약중인 건만 취소가 가능합니다.");
        }
      }
    },
    requestNoLike(bookmarkId) {
      if (confirm("진짜 해제하시겠습니까?")) {
        this.bookmarkCancle(bookmarkId);
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0); // X 좌표, Y 좌표
    },
  },
  async created() {
    if (process.client) {
      await this.fetchUserInfo();
      this.fetchReservations();
      this.fetchBookmarks();
      this.fetchReviews();
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
