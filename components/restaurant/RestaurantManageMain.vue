<template>
  <v-container>


    <div>
      <h1>식당관리</h1>
      <p>식당의 ID: {{ restaurant.id }}</p>

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
      </v-tabs>
      <!-- <v-divider></v-divider> -->

      <!-- tab-1에 해당하는 화면 -->
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-row>
            <v-col cols="12" class="restaurant-title-img">
              <v-img contain :src="require('~/assets/images/restaurant_img.png')" width="20px"
                style="max-width: 20px; margin-right: 5px;"></v-img>
              <h3 class="fw-bold">{{ restaurant.name }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <!-- 실시간 이용현황 버튼. 클릭시 컬러 변경되게 설정 -->
              <h4 class="silsigan-use-title">실시간 이용 현황: {{ restaurant.crowd }}</h4>
              <v-btn 
      :color="restaurant.crowd === 'free' ? '#1DDB16' : ''" 
      @click="toggleSelection('free')"
    >
      여유
    </v-btn>
    <v-btn 
      :color="restaurant.crowd === 'normal' ? '#FFE400' : ''" 
      @click="toggleSelection('normal')"
    >
      보통
    </v-btn>
    <v-btn 
      :color="restaurant.crowd === 'busy' ? '#FF0000' : ''" 
      @click="toggleSelection('busy')"
    >
      혼잡
    </v-btn>
            </v-col>
          </v-row>
          <br>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <h3>식당 정보 수정</h3>
              <v-btn style="background-color: rgb(210,63,87); color: white;"
                v-on:click="goToRestaurantModify">식당수정</v-btn>
            </v-col>
          </v-row>
          <br>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <h4 class="reserve-title">예약 신청 현황</h4>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">날짜</th>
                      <th class="text-left">시간</th>
                      <th class="text-left">고객 이름</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 5개의 예약만 보여줌 -->
                    <tr v-for="reservation in reservations.slice(0, 5)" :key="reservation.id">
                      <td>{{ reservation.date }}</td>
                      <td>{{ reservation.time }}</td>
                      <td>{{ reservation.customerName }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <br>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" lg="12">
              <h4 class="review-title">최근 리뷰</h4>
              <v-simple-table class="review-table" :header="header">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">리뷰 날짜</th>
                      <th class="text-left">고객</th>
                      <th class="text-left">리뷰 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 5개의 리뷰만 보여줌 -->
                    <tr v-for="review in reviews.slice(0, 5)" :key="review.id">
                      <td>{{ review.date }}</td>
                      <td>{{ review.author }}</td>
                      <td>{{ review.content }}</td>
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
            <v-col cols="12" style="display: flex;">
              <v-img contain :src="require('~/assets/images/reserve-icon.png')" width="20px"
                style="max-width: 20px; margin-right: 5px;"></v-img>
              <h3 class="fw-bold"> 예약 전체보기</h3>
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
                              <th>Date</th>
                              <th>Time</th>
                              <th>Customer Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="item in paginatedReservations" :key="item.id">
                              <td>{{ item.date }}</td>
                              <td>{{ item.time }}</td>
                              <td>{{ item.customerName }}</td>
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
                                Showing{{ (pageReservation - 1) * pageSize + 1 }} to {{ Math.min(pageReservation *
                                  pageSize,
                                  reservations.length)
                                }}
                                of {{
                                  reservations.length }} Reservations
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
                <h4 class="fw-bold"> {{ $route.query.name }}</h4>

              </div>


              <v-divider style="margin-bottom: 20px;"></v-divider>

              <div slot="boxContent">
                <div class="px-10">
                  <v-row>
                    <v-col cols="12" lg="12">



                      <!-- user-post  -->
                      <div class="mb-6" v-for="review in paginatedReviews" :key="review.id">
                        <div class="d-flex align-center flex-wrap mb-4">
                          <v-avatar size="48" class="me-4">
                            <v-img :src="review.avatar" alt=""></v-img>
                          </v-avatar>
                          <div>
                            <h5 class="mb-0">{{ review.author }}</h5>
                          </div>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <span v-for="(star, index) in 5" :key="index">
                            <div style="margin-left: 2px;">
                              <v-img :src="review.babscore" width="20px" class="fixed-size"></v-img>
                            </div>
                          </span>

                          <span class="font-weight-bold text-14 ms-2">{{ review.stars }}</span>
                          <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">{{ review.content }}</h5>
                        <v-row class="mb-2">
                          <!-- 리뷰 사진의 크기를 조금 줄임 cols 3으로 -->
                          <v-col cols="3" lg="3">
                            <v-img contain :src="review.image"></v-img>
                          </v-col>
                        </v-row>


                        <div>
                          <span class="grey--text text--darken-1 text-14">{{ review.replies.length }}개의 답글</span>
                          <div class="mt-4">


                            <!-- 답글달기 버튼 클릭 시 입력 폼을 토글! -->
                            <v-btn color="primary" small @click="toggleReplyForm(review.id)">
                              답글달기
                            </v-btn>
                            <div>

                              <v-form v-show="review.showReplyForm" @submit.prevent="submitReply(review.id)">
                                <v-text-field v-model="reply" label="답글 작성" outlined dense></v-text-field>
                                <v-btn color="primary" small type="submit">등록</v-btn>
                              </v-form>
                            </div>

                            <div v-if="showReplyForm">
                              <v-form @submit.prevent="submitReply">
                                <v-text-field v-model="reply" label="답글 작성" outlined dense class="mb-2"></v-text-field>
                                <!-- 답글 등록 버튼 -->
                                <v-btn color="primary" small type="submit">
                                  <v-icon left small>mdi-send</v-icon>
                                  등록
                                </v-btn>
                              </v-form>
                            </div>
                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small
                              @click="confirmDelete">
                              <v-icon left small>mdi-delete</v-icon>
                              삭제요청
                            </v-btn>
                          </div>
                        </div>
                        <!-- 답글  -->
                        <div class="mb-6">
                          <div class="d-flex align-center mb-3">
                            <v-avatar size="28" class="me-3">
                              <!-- 사장님 프사 -->
                              <img src="~/assets/images/faces/kks.jpg" alt="">
                            </v-avatar>
                            <div class="text-14 grey--text text--darken-4 f-600">사장님의 답글</div>
                          </div>

                          <div v-for="reply in review.replies" :key="reply.id">

                            <p>{{ reply.content }}</p>
                          </div>
                        </div>

                        <v-divider></v-divider>
                        <!-- end::comment -->

                      </div>
                      <!-- end::user-post  -->

                    </v-col>

                    <!-- 페이지네이션 -->
                    <v-col cols="12" class="mb-15">
                      <v-row align="center">
                        <v-col cols="12" lg="6">
                          <div class="mb-4 me-3">
                            <p class="font-weight-normal mb-0 text-14">
                              Showing{{ (pageReview - 1) * pageSize + 1 }} to {{ Math.min(pageReview * pageSize,
                                reviews.length)
                              }}
                              of {{
                                reviews.length }} Reviews
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
      </v-tabs-items>
    </div>
    <Footer />
  </v-container>
</template>

<script>

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  },
  created() {

  },
  data() {
    return {
      currentStatus: '',
      showReplyForm: false, // 입력 폼의 표시 상태를 제어하는 데이터 속성
      reviews: [
        {
          id: 1,
          date: "2024.04.05",
          author: "윤호상",
          content: "역시 치킨 근본은 기영이네여 ㄷㄷ 제가 여지껏 먹어본 치킨중에 정말 손에 꼽습니다요 앞으로도 번창하시고 맛있는 치킨 많이많이 팔아주세요 우헤헤헤헿헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤헤",
          avatar: require("@/assets/images/faces/9.jpg"), // 상대 경로를 저장
          stars: 4.0,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodFive.png'),
          timestamp: "3 Days Ago",
          replies: [
            { id: 1, content: "오늘도 감사합니다" }
          ],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "윤호하",
          content: "중남자 특 기영이 안먹음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "윤호중",
          content: "좌남자 특 기영이 먹음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "윤호좌",
          content: "하남자 특 기영이 매우 많이 먹음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "윤호우",
          content: "우남자 특 기영이 많이 먹음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "유비",
          content: "유비 특 기영이 많이 먹음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "관우",
          content: "너무 맛있어요요",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "장비",
          content: "하하하 존맛이군요 ㅠㅠ",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "마초",
          content: "맛있습니다",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "황충",
          content: "잘먹었네요 많이파세요",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "조운",
          content: "맛있음",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "정휘제",
          content: "어머니 맛있습니다 저 기영이에요",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "이다혜",
          content: "섭섭해요",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "임태환",
          content: "맛없는게 아니라 열받은겁니다",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "문상현",
          content: "오니가 싫어~ 오니가 싫어~",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },
        {
          id: 2,
          date: "2024.04.05",
          author: "손혜지",
          content: "안먹으면 개손해지",
          avatar: require('~/assets/images/faces/13.jpg'),
          stars: 3.5,
          babscore: require('~/assets/images/babscore.png'),
          image: require('~/assets/images/gallery/foodSix.png'),
          timestamp: "1 Week Ago",
          replies: [],
          showReplyForm: false
        },

      ],
      reply: '',

      restaurant: {
      id: this.$route.params.id, // 경로 매개변수에서 ID 가져오기
      name: this.$route.query.name,
      address: this.$route.query.address,
      contact: this.$route.query.contact,
      description: this.$route.query.description,
      image: this.$route.query.image,
      chip: this.$route.query.chip === 'true', // Boolean으로 변환
      table: parseInt(this.$route.query.table), // 문자열을 숫자로 변환
      deposit: this.$route.query.deposit,
      crowd: this.$route.query.crowd,
    },
      headers: [
        {
          width: '200px'
        },
        { text: '날짜', value: 'date' },
        { text: '시간', value: 'time' },
        { text: '고객 이름', value: 'customerName' }
      ],
      reservations: [
        { id: 1, date: "2023-04-03", time: "18:00", customerName: "정휘제" },
        { id: 2, date: "2023-04-03", time: "17:00", customerName: "윤여빈" },
        { id: 3, date: "2023-04-02", time: "18:00", customerName: "문상현" },
        { id: 4, date: "2023-04-01", time: "18:00", customerName: "윤호상" },
        { id: 5, date: "2023-04-01", time: "17:00", customerName: "임태환" },
        { id: 6, date: "2023-03-31", time: "18:00", customerName: "이다혜" },
        { id: 7, date: "2023-03-30", time: "18:00", customerName: "아카자" },
        { id: 8, date: "2023-03-29", time: "18:00", customerName: "코주루" },
        { id: 9, date: "2023-03-28", time: "18:00", customerName: "유비" },
        { id: 10, date: "2023-03-27", time: "18:00", customerName: "관우" },
        { id: 11, date: "2023-03-27", time: "18:00", customerName: "장비" },
        { id: 12, date: "2023-03-27", time: "18:00", customerName: "구민슥" },
        { id: 13, date: "2023-03-27", time: "18:00", customerName: "구민쇽" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민샥" },
        // 예약 목록
      ],
      pageReview: 1,
      pageReservation: 1,
      pageSize: 10,
      pageCountReview: 0,
      pageCountReservation: 0,
      paginatedReviews: [],
      paginatedReservations: [],

      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'New York',
          disabled: false,
          href: '/',
        },
        {
          text: 'Resturants',
          disabled: true,
          href: '/',
        },
      ],
      // formSelectItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      // mobileItems: [
      //   'Order Online', 'Book a Table', 'Reviews',
      // ],
      text: 'hello',
      tab: null,
      checkbox: true,
      radioGroup: 1,
      value: [20, 40],
      selected: null, // 현재 선택된 버튼을 저장

    };
  },
  mounted() {
    this.pageCountReview = Math.ceil(this.reviews.length / this.pageSize);
    this.paginateReviews();
    this.pageCountReservation = Math.ceil(this.reservations.length / this.pageSize);
    this.paginateReservations();
  },
  methods: {
    getAvatar(avatarPath) {
      return require(`${avatarPath}`);
    },
    goToRestaurantManageMain() {
      this.$router.push({ path: '/restaurant/RestaurantManageMainPage' });
    },
    goToRestaurantReserveManage() {
      this.$router.push({ path: '/restaurant/RestaurantReserveManagePage' });
    },
    goToReviewManage() {
      this.$router.push({ path: '/restaurant/ReviewManagePage' });
    },
    goToRestaurantModify() {
      this.$router.push({ path: '/restaurant/RestaurantModifyPage' });
    },
    toggleSelection(crowd) {
    this.restaurant.crowd = crowd;  // 선택된 상태 업데이트
  },
    confirmDelete() {
      if (confirm('삭제 요청을 하시겠습니까?')) {
        this.deleteReview();
      }
    },
    deleteReview() {
      //삭제요청하는 로직...구현예정
      console.log('리뷰 삭제 요청됨')
    },
    toggleReplyForm(reviewId) {
      const review = this.reviews.find(r => r.id === reviewId);
      review.showReplyForm = !review.showReplyForm;  // 해당 리뷰의 폼 표시 상태 토글
      this.reply = '';
    },
    submitReply(reviewId) {
      const review = this.reviews.find(r => r.id === reviewId);
      if (this.reply.trim()) {
        review.replies.push({
          id: review.replies.length + 1,
          content: this.reply,
          timestamp: new Date().toLocaleDateString()
        });
        console.log('답글:', this.reply); // 답글 내용을 콘솔에 출력 (나중에 실제 서버로 전송하는 로직으로 대체)
        this.reply = ''; // 답글 입력 필드 초기화
      } else {
        alert('답글을 입력해주세요.'); // 입력 필드가 비어있을 때 경고
      };
      review.showReplyForm = false;
    },
    paginateReviews() {
      const startIndex = (this.pageReview - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
    },
    paginateReservations() {
      const startIndex = (this.pageReservation - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedReservations = this.reservations.slice(startIndex, endIndex);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  watch: {
    pageReview() {
      this.paginateReviews();
    },
    pageReservation() {
      this.paginateReservations();
    }
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
</style>
