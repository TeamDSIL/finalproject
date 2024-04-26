<template>
    <div>
        <v-container>
            <v-breadcrumbs class="ps-0" :items="items">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <v-row dense>
                <v-col cols="12" xl="6" lg="6">
                    <v-img width="100%" height="100%" :src="require('~/assets/images/gallery/bigFood.png')"></v-img>
                </v-col>
                <v-col cols="12" xl="6" lg="6">
                    <v-row dense>
                        <v-col cols="6" xl="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodOne.png')"></v-img>
                        </v-col>
                        <v-col cols="6" xl="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodTwo.png')"></v-img>
                        </v-col>
                        <v-col cols="6" xl="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodThree.png')"></v-img>
                        </v-col>
                        <v-col cols="6" xl="6">
                            <v-img contain :src="require('~/assets/images/gallery/foodFour.png')"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="mt-4">
                    <div class="d-flex justify-space-between flex-wrap align-center mb-3">
                        <h1 class="me-2">스타벅스</h1>
                        <div class="mb-3">
                            <span v-for="(star, index) in 5" :key="index">
                                <v-icon small color="warning">mdi-star</v-icon>
                            </span>
                            <span class="text-14 me-1"> 4.5
                                <span class="grey--text">(1004)</span>
                            </span>
                        </div>
                    </div>
                    <p class="mb-5 text-14">커피, 시그니처 로스터, 가벼운 식사, 패스트 푸드</p>
                    <p class="mb-5 text-18">커피 한 잔에 담긴 작은 행복, 스타벅스</p>
                    <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                        <v-icon left small color="grey">mdi-map-marker</v-icon>
                        서울특별시 서초구 남부순환로 339길 53　
                        <nuxt-link to="" class="grey--text text--darken-3">매장 위치 보기</nuxt-link>
                    </div>
                    <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                        <v-icon left small color="grey">mdi-clock-outline</v-icon>
                        <span class="primary--text me-2">매장 오픈 시간</span> - Sun - Mon: 9am - 10pm
                    </div>
                    <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                        <v-icon left small color="grey">mdi-earth</v-icon>
                        <nuxt-link to=""
                            class="text-decoration-none grey--text text--darken-1">www.starbucks.com</nuxt-link>
                    </div>

                </v-col>
            </v-row>
            <!-- end::gallery  -->

            <div>
                <v-tabs v-model="tab" class="mb-8">


                    <v-tab class="text-capitalize" href="#tab-1">
                        홈

                    </v-tab>

                    <v-tab class="text-capitalize" href="#tab-2">
                        메뉴

                    </v-tab>

                    <v-tab class="text-capitalize" href="#tab-3">
                        리뷰

                    </v-tab>
                    <v-tab class="text-capitalize" href="#tab-4">
                        상세정보

                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item value="tab-1">
                        <h2>웨이팅 현황</h2>
                        <div class="roundstate">
                            <div class="roundstate-small">여유</div>
                            매장 식사 예약 시 바로 이용 가능합니다.
                        </div>
                        <h2>편의시설</h2>
                    </v-tab-item>
                    <v-tab-item value="tab-2">
                        <div>
                            <h1>메뉴</h1><br>
                            <table class="menutable">
                                <tbody>
                                    <tr v-for="item in menuItems" :key="item.name">
                                        <td>{{ item.name }}</td>
                                        <td class="menuprice">{{ item.priceRange }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <v-btn block color="error">
                                메뉴 전체보기 >
                            </v-btn>
                        </div>
                    </v-tab-item>

                    <v-tab-item value="tab-3">
                        <h1>리뷰</h1>
 
  <div class="ratings-container">
    <div class="ratings-container-sub">
        <img src="~/assets/images/babscore.png" alt="Bob's Score" class="score-image">
    <div class="score-value">{{ averageScore.toFixed(1)/2 }}</div></div>
    <div class="rating-bars">
      <div v-for="(count, index) in ratingsCount.slice().reverse()" :key="index" class="rating-bar-container">
        <span class="rating-score">{{ 5 - index }}점</span>
        <div class="rating-bar-background">
          <div class="rating-bar-fill" :style="{ width: getPercentage(count) + '%' }"></div>
        </div>
        <span class="rating-count">{{ count }}</span>
      </div>
    </div>
  </div>
  <br>
  <hr>


                            <v-col cols="18" lg="12">
                                <!-- user-post  -->
                                <div class="mb-6">
                                    <div class="d-flex align-center flex-wrap mb-4">
                                        <v-avatar size="48" class="me-4">
                                            <img src="~/assets/images/faces/8.png" alt="">
                                        </v-avatar>
                                        <div>
                                            <h5 class="mb-0">Abriella Bond</h5>
                                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-center mb-2">
                                        <span v-for="(star, index) in 5" :key="index">
                                            <v-icon small color="warning">mdi-star</v-icon>
                                        </span>
                                        <span class="font-weight-bold text-14 ms-2">4.0</span>
                                        <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                                    </div>
                                    <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit
                                        amet,
                                        consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida
                                        egestas ac
                                        account.</h5>
                                    <v-row class="mb-2">
                                        <v-col cols="6" lg="6">
                                            <v-img contain
                                                :src="require('~/assets/images/gallery/foodFive.png')"></v-img>
                                        </v-col>
                                        <v-col cols="6" lg="6">
                                            <v-img contain
                                                :src="require('~/assets/images/gallery/foodSix.png')"></v-img>
                                        </v-col>
                                    </v-row>
                                    <div>
                                        <span class="grey--text text--darken-1 text-14">4 Likes, 2 Comments</span>
                                        <div class="mt-4">
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-thumb-up-outline</v-icon>
                                                Like
                                            </v-btn>
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-comment-text-outline</v-icon>
                                                Comment
                                            </v-btn>
                                        </div>
                                    </div>
                                    <v-divider class="my-4"></v-divider>
                                    <!-- comment  -->
                                    <div class="mb-6">
                                        <div class="d-flex align-center mb-3">
                                            <v-avatar size="28" class="me-3">
                                                <img src="~/assets/images/faces/6.png" alt="">
                                            </v-avatar>
                                            <div class="text-14 grey--text text--darken-4 f-600">Emmet McDermott</div>
                                        </div>
                                        <h5 class="grey--text text--darken-2 font-weight-regular">Lorem ipsum dolor sit
                                            amet,
                                            consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae
                                            gravida egestas
                                            ac account.</h5>
                                    </div>
                                    <div class="mb-6">
                                        <div class="d-flex align-center mb-3">
                                            <v-avatar size="28" class="me-3">
                                                <img src="~/assets/images/faces/7.png" alt="">
                                            </v-avatar>
                                            <div class="text-14 grey--text text--darken-4 f-600">Emmet McDermott</div>
                                        </div>
                                        <h5 class="grey--text text--darken-2 font-weight-regular">Lorem ipsum dolor sit
                                            amet,
                                            consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae
                                            gravida egestas
                                            ac account.</h5>
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
                                            <h5 class="mb-0">Abriella Bond</h5>
                                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-center mb-2">
                                        <span v-for="(star, index) in 5" :key="index">
                                            <v-icon small color="warning">mdi-star</v-icon>
                                        </span>
                                        <span class="font-weight-bold text-14 ms-2">4.0</span>
                                        <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                                    </div>
                                    <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit
                                        amet,
                                        consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida
                                        egestas ac
                                        account.</h5>

                                    <div>
                                        <span class="grey--text text--darken-1 text-14">4 Likes, 2 Comments</span>
                                        <div class="mt-4">
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-thumb-up-outline</v-icon>
                                                Like
                                            </v-btn>
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-comment-text-outline</v-icon>
                                                Comment
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
                                            <h5 class="mb-0">Abriella Bond</h5>
                                            <p class="mb-0 text-14 grey--text text--darken-1">2 Reviews, 9 Followers</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-center mb-2">
                                        <span v-for="(star, index) in 5" :key="index">
                                            <v-icon small color="warning">mdi-star</v-icon>
                                        </span>
                                        <span class="font-weight-bold text-14 ms-2">4.0</span>
                                        <span class="grey--text text--darken-1 text-14 ms-2">3 Days Ago</span>
                                    </div>
                                    <h5 class="grey--text text--darken-2 font-weight-regular mb-3">Lorem ipsum dolor sit
                                        amet,
                                        consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida
                                        egestas ac
                                        account.</h5>

                                    <div>
                                        <span class="grey--text text--darken-1 text-14">4 Likes, 2 Comments</span>
                                        <div class="mt-4">
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-thumb-up-outline</v-icon>
                                                Like
                                            </v-btn>
                                            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0"
                                                small>
                                                <v-icon left small>mdi-comment-text-outline</v-icon>
                                                Comment
                                            </v-btn>
                                        </div>
                                    </div>
                                    <v-divider class="my-4"></v-divider>



                                </div>
                                <!-- end::user-post  -->
                            </v-col>
                    </v-tab-item>
                    <v-tab-item value="tab-4">
                        <div>
                            <h1>상세정보</h1><br>
                            <h4>전화번호</h4><br>
                            <v-icon color="green">mdi-phone</v-icon> 051-335-0415<br><br>
                            <h4>매장 소개</h4><br>
                            국내산 임실치즈를 사용해 만든 피자 전문점입니다. 적절한 도우와 여러가지 토핑이 어우러져 피자 고유의 맛을 느낄 수 있습니다.<br><br>
                            <h4>영업시간 및 정기 휴무</h4><br>
                            10:00 - 21:30<br>
                            20:30 라스트오더<br>
                            정기 휴무 : 매주 일<br><br>
                            <h4>매장 주소</h4><br>
                            서울특별시 서초구 남부순환로 339번길 53

                          
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        



        </v-container>
        <Location />
        <Footer />

    </div>
</template>
<script>
export default {
    head: {
        title: 'Food Menu'
    },
    data: () => ({
        ratingsCount:[1,1,3,6,20],
        menuItems: [
            { name: 'PIZZA', priceRange: '20,000 ~ 36,000원' },
            { name: 'SPAGHETTI', priceRange: '8,500 ~ 9,500원' },
            { name: 'PASTA', priceRange: '11,000 ~ 13,000원' },
            { name: 'RICE', priceRange: '11,000 ~ 13,000원' },
            { name: 'SALADE', priceRange: '6,000 ~ 9,000원' },
            { name: 'SIDE', priceRange: '500 ~ 2,000원' },
        ],
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
        formSelectItems: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        mobileItems: [
            'Order Online', 'Book a Table', 'Reviews',
        ],
        text: 'hello',
        tab: null,
        checkbox: true,
        radioGroup: 1,
        value: [20, 40],
        selected:null
    }),
    computed: {
    // 평균 별점을 계산합니다.
    averageScore() {
      const totalReviews = this.ratingsCount.length;
      const scoreSum = this.ratingsCount.reduce((sum, count, index) => {
        return sum + (count * (5 - index));
      }, 0);
      return scoreSum / totalReviews;
    }
  },
  methods: {
    // 비율을 계산하여 백분율로 변환합니다.
    getPercentage(count) {
      const total = this.ratingsCount.reduce((sum, count) => sum + count, 0);
      return (count / total) * 100;
    },
    toggleSelection(button) {
      // 선택된 버튼이 다시 클릭되면 선택 해제, 아니면 선택
      this.selected = this.selected === button ? null : button;
    }
  }
}
</script>
<style lang="scss">
.food-menu-link {
    font-size: 14px;
    text-decoration: none;
    color: #4B566B !important;
    font-weight: 400;

    &:hover {
        color: #000 !important;
        border-right: 3px solid #D23F57;
    }

    &.active {
        color: #000 !important;
        border-right: 3px solid #D23F57;

    }
}
hr{
    border-bottom: 1px solid #ddd;
}

.menutable {
    width: 100%;
    border-collapse: collapse;

}

.menutable td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-weight: border;
}

.menuprice {
    text-align: right;

}

.ratings-container {
  display: flex;
  flex-direction:row;
  align-items: center;
  width: 80%;
  padding-left: 20%;
}
.ratings-container-sub {
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
}

.score-image {
  width: 50px; /* 이미지 크기 조절 */
  height: auto;
  margin-right: 10px; /* 오른쪽 여백 추가 */
}

.score-value {
  font-size: 2em; /* 평균 점수 글씨 크기 */
  margin-bottom: 10px; /* 아래쪽 여백 추가 */
}

.rating-bars {
  width: 100%;
}

.rating-bar-container {
  display: flex;
  align-items: center;
  margin-bottom: 4px; /* 바 사이의 여백 */
}

.rating-score {
  min-width: 30px; /* 별점 점수 폭 고정 */
}

.rating-bar-background {
  flex-grow: 1; /* 가로 막대 배경을 가득 채우기 */
  background-color: #eee;
  margin: 0 10px; /* 가로 막대 여백 */
  height: 10px; /* 가로 막대 높이 */
}

.rating-bar-fill {
  background-color: #000;
  height: 100%;
  transition: width 0.5s ease;
}

.rating-count {
  min-width: 30px; /* 카운트 숫자 폭 고정 */
  text-align: right; /* 숫자를 오른쪽으로 정렬 */
}
.roundstate{
    display: flex;
    width: 60%;
    height: 50px;
    border-radius: 50px;
    border : 2px solid #000;
    color: FFFFFF;
    align-items: center;
    justify-content: center;
}
.roundstate-small{
    width: 50px;
    margin-right: 20px;
    border-radius: 50px;
    background-color: #1DDB16;
    text-align: center;
    color: #eee;
}
</style>