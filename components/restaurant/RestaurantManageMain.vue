<template>
  <v-container>
    <div>
      <h1>식당관리</h1>

      <v-tabs v-model="tab" class="mb-8">

        <v-tab class="text-capitalize" href="#tab-1">
          식당관리

        </v-tab>

        <v-tab class="text-capitalize" href="#tab-2">
          예약전체현황

        </v-tab>

        <v-tab class="text-capitalize" href="#tab-3">
          전체리뷰보기

        </v-tab>
        <v-tab class="text-capitalize" href="#tab-4">
          예약통계보기

        </v-tab>

        <v-tab class="text-capitalize" href="#tab-5">
          리뷰분석

        </v-tab>



        <v-tab class="text-capitalize" @click="goToRestaurantManage">
          처음으로
        </v-tab>
      </v-tabs>
      <!-- <v-divider></v-divider> -->

      <!-- tab-1에 해당하는 화면 -->
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-row>
            <v-col cols="12" class="restaurant-title-img">
              <v-img contain :src="require('~/assets/images/restaurant_img.png')" width="20px"
                style="max-width: 20px; margin-right: 5px"></v-img>
              <h3 class="fw-bold">{{ restaurant.name }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <!-- 실시간 이용현황 버튼. 클릭시 컬러 변경되게 설정 -->
              <h4 class="silsigan-use-title">실시간 이용 현황</h4>
              <v-btn :color="restaurant.crowd === 'AVAILABLE' ? '#1DDB16' : ''" @click="toggleSelection('AVAILABLE')">
                여유
              </v-btn>
              <v-btn :color="restaurant.crowd === 'NORMAL' ? '#FFE400' : ''" @click="toggleSelection('NORMAL')">
                보통
              </v-btn>
              <v-btn :color="restaurant.crowd === 'BUSY' ? '#FF0000' : ''" @click="toggleSelection('BUSY')">
                혼잡
              </v-btn>
            </v-col>
          </v-row>
          <br />
          <br />
          <v-divider></v-divider>

          <br />


          <v-row>
            <v-col cols="12">
              <h4>예약 가능 시간 설정</h4>
              <br />
              <v-btn v-for="time in times" :key="time.id" class="ma-2" :style="{
                color: time.clicked ? 'white' : '',
                backgroundColor: time.clicked ? 'rgb(210, 63, 87)' : '',
              }" @click="toggleTime(time)">
                {{ time.label }}
              </v-btn>
            </v-col>
          </v-row>
          <br />
          <br />
          <v-divider></v-divider>
          <br />
          <v-row>
            <v-col cols="12">
              <h4>식당 정보 수정</h4>
              <br />
              <v-btn style="background-color: rgb(210, 63, 87); color: white"
                v-on:click="goToRestaurantModify(restaurant)">식당수정</v-btn>
            </v-col>
          </v-row>
          <br />
          <br />
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <h4 class="reserve-title">예약 신청 현황</h4>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left" style="width: 150px">예약 날짜</th>
                      <th class="text-left" style="width: 100px">예약 시간</th>
                      <th class="text-left" style="width: 100px">고객 이름</th>
                      <th class="text-left" style="width: 100px">예약 인원</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 5개의 예약만 보여줌 -->
                    <tr v-for="reservation in reservations.slice(0, 5)" :key="reservation.id">
                      <td>{{ reservation.reservationDate }}</td>
                      <td>
                        {{ formatReservationTime(reservation.reservationTime) }}
                      </td>
                      <td>{{ reservation.reservationName }}</td>
                      <td>{{ reservation.peopleCount }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <br />
          <br />
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" lg="12">
              <h4 class="review-title">최근 리뷰</h4>
              <v-simple-table class="review-table">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left" style="width: 150px">리뷰 날짜</th>
                      <!-- <th class="text-left" style="width: 100px;">고객</th> -->
                      <th class="text-left" style="width: 150px">리뷰 내용</th>
                      <th class="text-left" style="width: 150px">밥점</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 5개의 리뷰만 보여줌 -->
                    <tr v-for="review in reviews.slice(0, 5)" :key="review.id">
                      <td>{{ review.registerDate }}</td>
                      <!-- <td>{{ review.resrvation.memberId }}</td> -->
                      <td>{{ review.content }}</td>
                      <td>{{ review.score }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- tab-2에 해당하는 화면 -->
        <v-tab-item value="tab-2">
          <v-row>
            <v-col cols="12" style="display: flex">
              <v-img contain :src="require('~/assets/images/reserve-icon.png')" width="20px"
                style="max-width: 20px; margin-right: 5px"></v-img>
              <h3 class="fw-bold">예약 전체보기</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h4 class="restaurant-name-title">{{ restaurant.name }}</h4>
              <v-divider></v-divider>
              <v-col cols="12">
                <div slot="boxContent">
                  <div class="px-10">
                    <v-row>
                      <v-col cols="12">
                        <!-- <h4>Reservation List</h4> -->
                      </v-col>
                      <v-col cols="12">
                        <v-simple-table class="elevation-1">
                          <thead>
                            <tr>
                              <th>예약 날짜</th>
                              <th>예약 시간</th>
                              <th>고객 이름</th>
                              <th>예약 인원</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in paginatedReservations" :key="item.id">
                              <td>{{ item.reservationDate }}</td>
                              <td>
                                {{
                                  formatReservationTime(item.reservationTime)
                                }}
                              </td>
                              <td>{{ item.reservationName }}</td>
                              <td>{{ item.peopleCount }}</td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-col>

                      <!-- 페이지네이션 -->
                      <v-col cols="12" class="mb-15">
                        <v-row align="center">
                          <v-col cols="12" lg="6">
                            <div class="mb-4 me-3">
                              <p class="font-weight-normal mb-0 text-14">
                                Showing{{
                                  (pageReservation - 1) * pageSize + 1
                                }}
                                to
                                {{
                                  Math.min(
                                    pageReservation * pageSize,
                                    reservations.length
                                  )
                                }}
                                of {{ reservations.length }} Reservations
                              </p>
                            </div>
                          </v-col>
                          <v-col cols="12" lg="6">
                            <div class="mb-4">
                              <v-pagination class="food-truck-pagination" v-model="pageReservation"
                                :length="pageCountReservation" circle @input="srcollToTop"></v-pagination>
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </v-col>
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- tab-3에 해당하는 화면 -->
        <v-tab-item value="tab-3">
          <v-row>
            <!-- <v-col cols="12" class="mb-10">
        <h3 class="fw-bold">{{ restaurantName }}</h3>
      </v-col> -->
            <v-col cols="12" style="display: flex;">
              <v-img contain :src="require('~/assets/images/review-icon.png')" width="20px"
                style="max-width: 20px; margin-right: 5px;"></v-img>
              <h3 class="fw-bold"> 리뷰 전체보기</h3>
            </v-col>
            <v-col cols="12">
              <div class="review-all-title">
                <h4 class="fw-bold"> {{ restaurant.name }}</h4>
              </div>
              <v-divider style="margin-bottom: 20px;"></v-divider>
              <div slot="boxContent">
                <div class="px-10">
                  <!-- 리뷰 항목을 두 줄로 나누기 위해 cols="6"을 사용 -->
                  <v-row>
                    <v-col cols="12" lg="6" v-for="review in paginatedReviews" :key="review.id">
                      <div class="mb-6">
                        <div class="d-flex align-center flex-wrap mb-4">
                          <div>
                            <h5 class="mb-0">{{ review.reservationName }}</h5>
                          </div>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <span v-for="(star, index) in review.score" :key="index">
                            <div style="margin-left: 2px">
                              <v-img :src="require('~/assets/images/babscore.png')" width="20px"
                                class="fixed-size"></v-img>
                            </div>
                          </span>
                          <span class="font-weight-bold text-14 ms-2">{{ review.score }}</span>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">
                          {{ review.content }}
                        </h5>
                        <v-row class="mb-2">
                          <!-- 리뷰 사진의 크기를 조금 줄임 cols 3으로 -->
                          <v-avatar class="me-3" size="200" tile>
                            <img :src="review.img || require('~/assets/images/default-image.png')" alt="레스토랑 이미지" />
                          </v-avatar>
                          <!-- <v-col cols="8" style="height: 450x;">
                            <v-img style="height: 300px;" contain :src="review.img"></v-img>
                          </v-col> -->
                        </v-row>
                        <div>
                          <div class="mt-4">
                            <v-btn color="primary" small @click="toggleReplyForm(review.id)">
                              답글달기
                            </v-btn>
                            <div>
                              <v-form v-show="review.showReplyForm" @submit.prevent="submitReply(review.id)">
                                <v-text-field v-model="reply" label="답글 작성" outlined dense></v-text-field>
                                <v-btn color="primary" small type="submit">등록</v-btn>
                              </v-form>
                            </div>
                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small
                              @click="confirmDelete(review.id)">
                              <v-icon left small>mdi-delete</v-icon>
                              삭제요청
                            </v-btn>
                          </div>
                        </div>
                        <div class="mb-6">
                          <div class="d-flex align-center mb-3">
                            <v-avatar size="28" class="me-3">
                              <img :src="restaurant.img" alt="">
                            </v-avatar>
                            <div class="text-14 grey--text text--darken-4 f-600">
                              사장님의 답글
                            </div>
                          </div>
                          <p>{{ review.replyContent }}</p>
                        </div>
                        <v-divider></v-divider>
                      </div>
                    </v-col>
                  </v-row>
                  <!-- 페이지네이션 -->
                  <v-row>
                    <v-col cols="12" class="mb-15">
                      <v-row align="center">
                        <v-col cols="12" lg="6">
                          <div class="mb-4 me-3">
                            <p class="font-weight-normal mb-0 text-14">
                              Showing {{ (pageReview - 1) * pageSize + 1 }} to {{ Math.min(pageReview * pageSize,
                                reviews.length) }}
                              of {{ reviews.length }} Reviews
                            </p>
                          </div>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <div class="mb-4">
                            <v-pagination class="food-truck-pagination" v-model="pageReview" :length="pageCountReview"
                              circle @input="scrollToTop"></v-pagination>
                          </div>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-tab-item>

        <!-- 탭4에 해당하는화면 -->
        <v-tab-item value="tab-4">
          <v-container>
            <div class="reservation-stats">
              <v-row>

                <v-col cols="12" style="display: flex;">
                  <v-img contain :src="require('~/assets/images/reservationdata.png')" width="20px"
                    style="max-width: 20px; margin-right: 5px;"></v-img>
                  <h3 class="fw-bold mb-4">예약 통계</h3>
                </v-col>
                <v-col>
                  <v-btn @click="fetchMonthlyStats" color="primary" class="mb-4">월별 통계 보기</v-btn>
                  <v-btn @click="fetchWeeklyStats" color="primary" class="mb-4">주간 통계 보기</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="stats-container">
                    <div v-for="stat in stats" :key="stat.period" class="stat-card">
                      <div class="stat-period">{{ stat.period }}</div>
                      <v-progress-circular :value="stat.count" :size="100" :width="15" color="primary"
                        class="stat-progress">
                        <span class="stat-count">{{ stat.count }}건</span>
                      </v-progress-circular>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-tab-item>

        


        <!-- 감정분석 해보기 -->
        <v-tab-item value="tab-5">
          <v-container>
            <v-card>
              <v-img :src="restaurant.img" height="200px">
                <v-card-title class="headline">{{ restaurant.name }}</v-card-title>
              </v-img>

              <v-divider></v-divider>
              <v-card-actions>
                <v-btn @click="getRestaurantSentiment(restaurant.id)" color="primary">내 식당의 리뷰 분석</v-btn>
              </v-card-actions>

              <v-card-text>
                <p>총 {{ paginatedReviews.length }}개의 리뷰가 있습니다.</p>
                <v-divider></v-divider>
                <div class="d-flex align-center">
                  <v-icon color="blue" large>mdi-emoticon-happy</v-icon>
                  <h3 class="ml-3 font-weight-bold" style="font-size: 24px;">리뷰들의 전반적인 감정 평가: {{ sentiment }}</h3>
                </div>
                <v-progress-linear :value="sentimentScore" color="green" height="20"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-container>
        </v-tab-item>

      </v-tabs-items>
    </div>
    <Footer />
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    const restaurantId = this.$route.params.id;
    this.fetchRestaurantDetails(restaurantId);
    this.fetchReservations(restaurantId);
    this.fetchReviews(restaurantId);
    this.fetchAvailableTimes(restaurantId);
    this.year = new Date().getFullYear();
    this.fetchRestaurantDetails(this.$route.params.id);
  },

  data() {
    return {
      sentiment: '',
      sentimentScore: 0, // 추가된 감정 평가 점수
      
      // isClicked: false,
      stats: [],
      headers: [
        { text: "기간", value: "period" },
        { text: "예약 건수", value: "count" },
      ],
      restaurantId: null,
      year: null,
      tab: null,

      times: [
        { id: 1, label: "오후12:00", clicked: false, slot: "AFTERNOON_12" },
        { id: 2, label: "오후1:00", clicked: false, slot: "AFTERNOON_1" },
        { id: 3, label: "오후2:00", clicked: false, slot: "AFTERNOON_2" },
        { id: 4, label: "오후3:00", clicked: false, slot: "AFTERNOON_3" },
        { id: 5, label: "오후4:00", clicked: false, slot: "AFTERNOON_4" },
        { id: 6, label: "오후5:00", clicked: false, slot: "AFTERNOON_5" },
        { id: 7, label: "오후6:00", clicked: false, slot: "AFTERNOON_6" },
        { id: 8, label: "오후7:00", clicked: false, slot: "AFTERNOON_7" },
        { id: 9, label: "오후8:00", clicked: false, slot: "AFTERNOON_8" },
        { id: 10, label: "오후9:00", clicked: false, slot: "AFTERNOON_9" },
      ],
      buttonClicks: Array(9).fill(false),
      showReplyForm: false, // 입력 폼의 표시 상태를 제어하는 데이터 속성
      reply: "",

      restaurant: [],

      reservations: [],
      reviews: [],

      pageReview: 1,
      pageReservation: 1,
      pageSize: 10,
      pageCountReview: 0,
      pageCountReservation: 0,
      paginatedReviews: [],
      paginatedReservations: [],

      text: "hello",
      tab: null,
      checkbox: true,
      radioGroup: 1,
      value: [20, 40],
      selected: null, // 현재 선택된 버튼을 저장
    };
  },

  methods: {
    //감정분석 가져오는 메소드 입니다.

    async getRestaurantSentiment(id) {
      try {
        const response = await axios.get(`http://localhost:8000/restaurant/${id}/sentiment`);
        this.sentiment = response.data;
        this.calculateSentimentScore(); // 감정 평가 점수 계산
      } catch (error) {
        console.error(error);
      }
    },
    calculateSentimentScore() {
      if (this.sentiment === 'Positive') {
        this.sentimentScore = 80; // Positive 평가일 경우 점수 80
      } else if (this.sentiment === 'Neutral') {
        this.sentimentScore = 50; // Neutral 평가일 경우 점수 50
      } else {
        this.sentimentScore = 20; // Negative 평가일 경우 점수 20
      }
    },

    // 통계 데이터를 가져오는 메서드
    async fetchMonthlyStats() {
      const restaurantId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/monthly/${restaurantId}/${this.year}`
        );
        this.stats = Object.keys(response.data).map((month) => ({
          period: `${month}월`,
          count: response.data[month],
        }));
      } catch (error) {
        console.error("Failed to fetch monthly stats:", error);
      }
    },
    async fetchWeeklyStats() {
      const restaurantId = this.$route.params.id;
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/weekly/${restaurantId}/${this.year}`
        );
        this.stats = Object.keys(response.data).map((week) => {
          const month =
            new Date(this.year, 0, (week - 1) * 7 + 1).getMonth() + 1;
          const weekOfMonth = Math.ceil(((week - 1) * 7 + 1 - 1) / 7) + 1;
          return {
            period: `${this.year}년 ${weekOfMonth}주`,
            count: response.data[week],
          };
        });
      } catch (error) {
        console.error("Failed to fetch weekly stats:", error);
      }
    },

    async toggleTime(time) {
      const restaurantId = this.$route.params.id;
      if (time.clicked) {
        try {
          await axios.delete(
            `http://localhost:8000/restaurant/${restaurantId}/available-times`,
            {
              params: {
                slot: time.slot,
              },
            }
          );
          time.clicked = false;
        } catch (error) {
          console.error("Failed to delete available time:", error);
        }
      } else {
        try {
          const response = await axios.post(
            `http://localhost:8000/restaurant/${restaurantId}/available-times`,
            null,
            {
              params: {
                slot: time.slot,
              },
            }
          );
          time.clicked = true;
        } catch (error) {
          console.error("Failed to create available time:", error);
        }
      }
    },
    async fetchRestaurantDetails(restaurantId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/${restaurantId}`
        );
        this.restaurant = response.data;
        console.log("Restaurant details fetched successfully");
      } catch (error) {
        console.error("Failed to fetch restaurant details:", error);
      }
    },
    async fetchReservations(restaurantId) {
      console.log("예약목록을 불러올 식당의 아이디:", restaurantId);
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/${restaurantId}/reservations`
        );
        this.reservations = response.data;
        console.log("불러온 예약목록들: ", this.reservations);
        this.pageCountReservation = Math.ceil(
          this.reservations.length / this.pageSize
        );
        this.paginateReservations(); // 데이터 로드 후 페이지네이션 실행
      } catch (error) {
        console.error("예약 목록을 불러오는 데 실패했습니다.", error);
      }
    },

    async fetchAvailableTimes(restaurantId) {
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/${restaurantId}/available-times`
        );
        const availableTimes = response.data;

        // 'times' 배열의 각 요소에 대해 'clicked' 속성을 설정합니다.
        this.times.forEach((time) => {
          time.clicked = availableTimes.some(
            (at) => at.availableTime === time.slot
          );
        });

        console.log("예약가능시간 패치 성공");
        console.log("가져온 예약시간쓰:", availableTimes);
      } catch (error) {
        console.error("예약가능시간 패치 실패:", error);
      }
    },

    async fetchReviews(restaurantId) {
      console.log("리뷰목록을 불러올 식당의 아이디:", restaurantId);
      try {
        const response = await axios.get(
          `http://localhost:8000/restaurant/${restaurantId}/reviews`
        );
        this.reviews = response.data.map((review) => {
          return {
            ...review,
            showReplyForm: false,
            reply: "",
          };
        });
        console.log("불러온 리뷰목록들: ", this.reviews);
        this.pageCountReview = Math.ceil(this.reviews.length / this.pageSize);
        this.paginateReviews();
      } catch (error) {
        console.error("리뷰 목록을 불러오는 데 실패했습니다.", error);
      }
    },
    formatReservationTime(time) {
      const timeMap = {
        AFTERNOON_12: "오후12:00",
        AFTERNOON_1: "오후1:00",
        AFTERNOON_2: "오후2:00",
        AFTERNOON_3: "오후3:00",
        AFTERNOON_4: "오후4:00",
        AFTERNOON_5: "오후5:00",
        AFTERNOON_6: "오후6:00",
        AFTERNOON_7: "오후7:00",
        AFTERNOON_8: "오후8:00",
        AFTERNOON_9: "오후9:00",
      };
      return timeMap[time] || time;
    },

    getAvatar(avatarPath) {
      return require(`${avatarPath}`);
    },
    goToRestaurantManageMain() {
      this.$router.push({ path: "/restaurant/RestaurantManageMainPage" });
    },
    goToRestaurantManage() {
      this.$router.push({ path: "/restaurant/RestaurantManagePage" });
    },
    goToRestaurantReserveManage() {
      this.$router.push({ path: "/restaurant/RestaurantReserveManagePage" });
    },
    goToReviewManage() {
      this.$router.push({ path: "/restaurant/ReviewManagePage" });
    },
    goToRestaurantManage() {
      this.$router.push({ path: `/restaurant/RestaurantManagePage` });
    },
    goToRestaurantModify(restaurant) {
      this.$router.push({
        path: `/restaurant/RestaurantModifyPage/${restaurant.id}`,
        query: {
          name: restaurant.name,
          address: restaurant.address,
          tel: restaurant.tel,
          img: restaurant.img,
          tableCount: restaurant.tableCount,
          deposit: restaurant.deposit,
          crowd: restaurant.crowd,
        },
      });
    },
    async toggleSelection(crowd) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/restaurant/${this.restaurant.id}/crowd`,
          null,
          {
            params: {
              status: crowd,
            },
          }
        );
        this.restaurant.crowd = response.data.crowd;
        console.log("Crowd status updated successfully");
        console.log("변경된 혼잡도: ", this.restaurant.crowd);
      } catch (error) {
        console.error("식당 혼잡도 업데이트 실패:", error);
      }
    },

    confirmDelete(reviewId) {
      if (confirm("삭제 요청을 하시겠습니까?")) {
        this.deleteReview(reviewId);
      }
    },
    async deleteReview(reviewId) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/restaurant/reviews/${reviewId}/delete-status`,
          null,
          {
            params: {
              deleteStatus: true,
            },
          }
        );

        console.log("리뷰 삭제 요청 성공:", response.data);
        // 리뷰 목록을 새로 고침
        const restaurantId = this.$route.params.id;
        await this.fetchReviews(restaurantId);
      } catch (error) {
        console.error("리뷰 삭제 요청 실패:", error);
      }
    },

    toggleReplyForm(reviewId) {
      const review = this.reviews.find((r) => r.id === reviewId);
      console.log("방금 누른 리뷰 아이디:", reviewId);
      review.showReplyForm = !review.showReplyForm; // 해당 리뷰의 폼 표시 상태 토글
      this.reply = "";
    },
    async submitReply(reviewId) {
      try {
        const response = await axios.post(
          `http://localhost:8000/restaurant/reviews/${reviewId}`,
          { content: this.reply }
        );
        const reply = response.data;
        const review = this.reviews.find((r) => r.id === reviewId);
        review.reply = reply;
        review.showReplyForm = false;
        console.log("답글 작성 성공!:", reply);
        this.reply = ""; // 입력 필드 초기화
        // 답글 작성 후 리뷰 목록을 다시 불러옵니다.
        const restaurantId = this.$route.params.id;
        await this.fetchReviews(restaurantId);
      } catch (error) {
        console.error("답글 작성 실패!:", error);
      }
    },
    paginateReviews() {
      const startIndex = (this.pageReview - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
    },
    paginateReservations() {
      const startIndex = (this.pageReservation - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedReservations = this.reservations.slice(
        startIndex,
        endIndex
      );
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    toggleButton(index) {
      this.times[index].clicked = !this.times[index].clicked;
    },
  },
  mounted() {
    // this.pageCountReview = Math.ceil(this.reviews.length / this.pageSize);
    // this.paginateReviews();
    // this.pageCountReservation = Math.ceil(this.reservations.length / this.pageSize);
    // this.paginateReservations();
  },
  watch: {
    pageReview() {
      this.paginateReviews();
    },
    pageReservation() {
      this.paginateReservations();
    },
  },
};
</script>

<style>
/* 여기에 필요한 스타일 추가 */
.restaurant-title-img {
  display: flex;
}

.restaurant-name-title {
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5em;
  margin-bottom: 20px;
}

.review-all-title {
  margin-bottom: 20px;
}

.review-table {
  margin-bottom: 50px;
}

.review-title {
  margin-top: 20px;
  margin-bottom: 10px;
}

.reserve-title {
  margin-top: 20px;
  margin-bottom: 10px;
}

.silsigan-use-title {
  margin-bottom: 20px;
}

.info-edit-title {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 여기부터통계관련 */

.reservation-stats {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: calc(20% - 16px);
  /* 3 columns layout with 16px gap */
  box-sizing: border-box;
}

.stat-period {
  font-size: 1em;
  /* font-weight: bold; */
}

.stat-count {
  margin-top: 8px;
  font-size: 2em;
  color: #555;
  font-weight: bold;
  display: flex;
  justify-content: right;
}
</style>

<!-- 통계부분을 수정하고 있습니다......화이팅. -->
<!-- 여기서부터 chartjs를 사용해보도록 하겠다. 여기부터 차트제이에스여~~ -->
