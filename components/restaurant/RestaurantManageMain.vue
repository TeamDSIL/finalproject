<template>
  <v-container>


    <div>
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
              <h4 class="silsigan-use-title">실시간 이용 현황</h4>
              <v-btn :color="selected === 'free' ? '#1DDB16' : ''" @click="toggleSelection('free')">여유</v-btn>
              <v-btn :color="selected === 'normal' ? '#FFE400' : ''" @click="toggleSelection('normal')">보통</v-btn>
              <v-btn :color="selected === 'busy' ? '#FF0000' : ''" @click="toggleSelection('busy')">혼잡</v-btn>
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
                    <tr v-for="booking in bookings.slice(0, 5)" :key="booking.id">
                      <td>{{ booking.date }}</td>
                      <td>{{ booking.time }}</td>
                      <td>{{ booking.customerName }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <br>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12">
              <h4 class="review-title">최근 리뷰</h4>
              <v-simple-table class="review-table">
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
                      <td>{{ review.customerName }}</td>
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
                        <v-data-table :headers="headers" :items="bookings" :items-per-page="10" class="elevation-1">
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.date }}</td>
                              <td>{{ item.time }}</td>
                              <td>{{ item.customerName }}</td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-col>
                      <v-col cols="12">
                        <div class="d-flex justify-center align-center justify-sm-space-between flex-wrap">
                          <div class="mb-4 me-3">
                            <p class="font-weight-normal mb-0 text-14">Showing 1-10 of 30 Reservations
                            </p>
                          </div>
                          <div class="mb-4">
                            <v-pagination class="food-truck-pagination" v-model="page" :length="3"
                              circle></v-pagination>
                          </div>
                        </div>
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
                  <v-row>
                    <v-col cols="12" lg="12">
                      <!-- user-post  -->
                      <div class="mb-6">
                        <div class="d-flex align-center flex-wrap mb-4">
                          <v-avatar size="48" class="me-4">
                            <img src="~/assets/images/faces/8.png" alt="">
                          </v-avatar>
                          <div>
                            <h5 class="mb-0">윤호상</h5>
                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers
                            </p>
                          </div>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <span v-for="(star, index) in 5" :key="index">
                            <div style="margin-left: 2px;">
                              <v-img :src="require('~/assets/images/babscore.png')" width="20px"
                                class="fixed-size"></v-img>
                            </div>
                          </span>

                          <span class="font-weight-bold text-14 ms-2">4.0</span>
                          <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">역시 치킨 근본은 기영이네여
                          ㄷㄷ</h5>
                        <v-row class="mb-2">
                          <v-col cols="6" lg="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodFive.png')"></v-img>
                          </v-col>
                          <v-col cols="6" lg="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodSix.png')"></v-img>
                          </v-col>
                        </v-row>


                        <div>
                          <span class="grey--text text--darken-1 text-14">2 Comments</span>
                          <div class="mt-4">

                            <!-- 답글달기 버튼 클릭 시 입력 폼을 토글합니다! -->
                            <v-btn color="primary" small @click="toggleReplyForm">
                              <v-icon left small>mdi-comment-text-outline</v-icon>
                              답글달기
                            </v-btn>
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
                              <img src="~/assets/images/faces/kks.jpg" alt="">
                            </v-avatar>
                            <div class="text-14 grey--text text--darken-4 f-600">기영이 존맛치킨</div>
                          </div>
                          <h5 class="grey--text text--darken-2 font-weight-regular">오늘도 감사합니다</h5>
                        </div>

                        <v-divider></v-divider>
                        <!-- end::comment -->

                      </div>
                      <!-- end::user-post  -->
                      <!-- user-post  -->
                      <div class="mb-6">
                        <div class="d-flex align-center flex-wrap mb-4">
                          <v-avatar size="48" class="me-4">
                            <img src="~/assets/images/faces/13.jpg" alt="">
                          </v-avatar>
                          <div>
                            <h5 class="mb-0">윤잔상</h5>
                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers
                            </p>
                          </div>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <span v-for="(star, index) in 5" :key="index">
                            <div style="margin-left: 2px;">
                              <v-img :src="require('~/assets/images/babscore.png')" width="20px"
                                class="fixed-size"></v-img>
                            </div>
                          </span>
                          <span class="font-weight-bold text-14 ms-2">4.0</span>
                          <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">마늘이 맛있어요 닭고기가 튀기지
                          않고 구워서 좋아요</h5>

                        <div>
                          <span class="grey--text text--darken-1 text-14">2 Comments</span>
                          <div class="mt-4">

                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                              <v-icon left small>mdi-comment-text-outline</v-icon>
                              Comment
                            </v-btn>
                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small
                              @click="confirmDelete">
                              <v-icon left small>mdi-delete</v-icon>
                              삭제요청
                            </v-btn>
                          </div>
                        </div>
                        <v-divider class="my-4"></v-divider>



                      </div>
                      <!-- end::user-post  -->
                      <!-- user-post  -->
                      <div class="mb-6">
                        <div class="d-flex align-center flex-wrap mb-4">
                          <v-avatar size="48" class="me-4">
                            <img src="~/assets/images/faces/9.jpg" alt="">
                          </v-avatar>
                          <div>
                            <h5 class="mb-0">윤허상</h5>
                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers
                            </p>
                          </div>
                        </div>
                        <div class="d-flex align-center mb-2">
                          <span v-for="(star, index) in 5" :key="index">
                            <div style="margin-left: 2px;">
                              <v-img :src="require('~/assets/images/babscore.png')" width="20px"
                                class="fixed-size"></v-img>
                            </div>
                          </span>
                          <span class="font-weight-bold text-14 ms-2">4.0</span>
                          <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                        </div>
                        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">마싯서요</h5>

                        <div>
                          <span class="grey--text text--darken-1 text-14">2 Comments</span>
                          <div class="mt-4">

                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                              <v-icon left small>mdi-comment-text-outline</v-icon>
                              Comment
                            </v-btn>
                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small
                              @click="confirmDelete">
                              <v-icon left small>mdi-delete</v-icon>
                              삭제요청
                            </v-btn>
                          </div>
                        </div>
                        <v-divider class="my-4"></v-divider>



                      </div>
                      <!-- end::user-post  -->
                    </v-col>
                    <v-col cols="12" class="mb-15">

                      <v-row align="center">
                        <v-col cols="12" lg="6">
                          <div class="mb-4 me-3">
                            <p class="font-weight-normal mb-0 text-14">Showing 1-12 of 29 Reviews
                            </p>
                          </div>
                        </v-col>
                        <v-col cols="12" lg="6">
                          <div class="mb-4">
                            <v-pagination class="food-truck-pagination" v-model="page" :length="4"
                              circle></v-pagination>
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
  data() {
    return {
      showReplyForm: false, // 입력 폼의 표시 상태를 제어하는 데이터 속성
      replyText: {}, // 각 리뷰 ID별로 답글 입력 데이터를 저장장답글 내용을 바인딩할 데이터
      replies: [], //답글 목록을 저장하는 배열
      restaurant: {
        id: '123', // 예시 ID
        name: '기영이네 존맛치킨', // 예시 식당명
        address: '서울시 관악구', // 예시 주소
        contact: '02-1234-5678', // 수정 가능한 연락처
        deposit: '5000', // 수정 가능한 예약금
        image: ''  // 수정 가능한 식당 사진
      },
      headers: [
        { text: '날짜', value: 'date' },
        { text: '시간', value: 'time' },
        { text: '고객 이름', value: 'customerName' }
      ],
      bookings: [
        { id: 1, date: "2023-04-03", time: "18:00", customerName: "정휘제" },
        { id: 1, date: "2023-04-03", time: "17:00", customerName: "윤여빈" },
        { id: 1, date: "2023-04-02", time: "18:00", customerName: "문상현" },
        { id: 1, date: "2023-04-01", time: "18:00", customerName: "윤호상" },
        { id: 1, date: "2023-04-01", time: "17:00", customerName: "임태환" },
        { id: 1, date: "2023-03-31", time: "18:00", customerName: "이다혜" },
        { id: 1, date: "2023-03-30", time: "18:00", customerName: "아카자" },
        { id: 1, date: "2023-03-29", time: "18:00", customerName: "코주루" },
        { id: 1, date: "2023-03-28", time: "18:00", customerName: "유비" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "관우" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "장비" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민슥" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민쇽" },
        { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민샥" },
        // 예약 목록
      ],
      page: 1,
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


      reviews: [
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
        // 리뷰 목록
      ]
    };
  },
  methods: {
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
    toggleSelection(button) {
      // 선택된 버튼이 다시 클릭되면 선택 해제, 아니면 선택
      this.selected = this.selected === button ? null : button;
    },
    confirmDelete() {
      if (alert('이 삭제 요청은 되돌릴 수 없습니다. 취소시엔 관리자에게 문의하세요.')) {
        this.deleteReview();
      }
    },
    deleteReview() {
      //삭제요청하는 로직...구현예정
      console.log('리뷰 삭제 요청됨')
    },
    toggleReplyForm() {
      this.showReplyForm = !this.showReplyForm; // 입력 폼 표시 상태를 토글합니다
    },
    submitReply() {
      if (this.reply.trim() !== '') {
        console.log('답글:', this.reply); // 답글 내용을 콘솔에 출력 (나중에 실제 서버로 전송하는 로직으로 대체)
        this.reply = ''; // 답글 입력 필드 초기화
      } else {
        alert('답글을 입력해주세요.'); // 입력 필드가 비어있을 때 경고
      }
    },
  }
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
