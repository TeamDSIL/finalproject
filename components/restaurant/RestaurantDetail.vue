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
                        <h1 class="me-2">{{restaurantDetails.name}}</h1>

                        <div class="mb-3">
                            <span v-for="(star, index) in 5" :key="index">
                                <img src="../../assets/images/babscore.png" width="16" height="16">
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
                        {{restaurantDetails.address}}
                        <v-dialog ref="dialog" v-model="modal" width="500px" height="500px">
                            <!-- 버튼을 클릭하면 모달을 열 수 있음 -->
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text> 매장 위치 보기 </v-btn>
                            </template>
                            <v-card>
                                <KakaoMap />
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" text @click="modal = false">닫기</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <!-- <nuxt-link to="" class="grey--text text--darken-3">매장 위치 보기</nuxt-link> -->
                    </div>
                    <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                        <v-icon left small color="grey">mdi-clock-outline</v-icon>
                        <span class="primary--text me-2">매장 오픈 시간</span> - Sun - Mon: 9am - 10pm 영업중
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
                        <h2>예약 신청</h2>
                        <DateTimePicker :restaurantName="restaurantDetails.name"/><br><br><br>
                        <h2>식당 혼잡도</h2>
                        <div class="roundstate">
                            <div :class="crowdClass">
                                <span v-if="restaurantDetails.crowd === 'BUSY'">혼잡</span>
      <span v-else-if="restaurantDetails.crowd === 'NORMAL'">보통</span>
      <span v-else-if="restaurantDetails.crowd === 'AVAILABLE'">여유</span>
    </div>
    <span v-if="restaurantDetails.crowd === 'BUSY'">웨이팅이 길게 발생할 수 있습니다.</span>
      <span v-else-if="restaurantDetails.crowd === 'NORMAL'">약간의 웨이팅이 발생할 수 있습니다.</span>
      <span v-else-if="restaurantDetails.crowd === 'AVAILABLE'">매장 식사 이용 시 바로 입장 가능합니다.</span>
                        </div><br><br>
                        <h2>편의시설</h2>
                        <div class="icon-container">
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/parking.png" width="50" height="50">
                                </div>
                                <div>주차가능</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/valet-parking.png" width="50" height="50">
                                </div>
                                <div>발렛파킹</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/smoking.png" width="50" height="50">
                                </div>
                                <div>흡연구역</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/dog.png" width="50" height="50">
                                </div>
                                <div>애견동반</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/cork.png" width="50" height="50">
                                </div>
                                <div>콜키지가능</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/wine-bottle.png" width="50" height="50">
                                </div>
                                <div>소믈리에</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/welcome.png" width="50" height="50">
                                </div>
                                <div>웰컴키즈존</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/nokids.png" width="50" height="50">
                                </div>
                                <div>노키즈존</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/freewifi.png" width="50" height="50">
                                </div>
                                <div>와이파이존</div>
                            </div>
                            <div class="icon-center">
                                <div class="icon-item">
                                    <img src="../../assets/images/facility/disable.png" width="50" height="50">
                                </div>
                                <div>장애인편의시설</div>
                            </div>
                        </div>
                    </v-tab-item>
                    <v-tab-item value="tab-2">
                        <div>
                            <h1>메뉴</h1><br>
                            <table class="menutable">
                                <tbody>
                                    <tr v-for="menu in menus" :key="menu.id">
                                        <td>{{ menu.name }}</td>
                                        <td class="menuprice">{{ menu.price }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <v-dialog ref="dialog" v-model="showModal" width="400px">
                                <!-- 버튼을 클릭하면 모달을 열 수 있음 -->
                                <template v-slot:activator="{ on }">
                                    <v-btn block color="error" v-on="on"> 메뉴 전체보기 > </v-btn>
                                </template>
                                <v-card>
                                    <!-- 여기에 사진 삽입 -->
                                    <img src="../../assets/images/food/pizza.png" width="400px"></img>
                                    <!-- 메뉴 리스트 드롭다운 -->
                                    <v-list>
                                        <v-list-group v-for="item in menuItems" :key="item.name" v-model="item.active"
                                            no-action>
                                            <template v-slot:activator>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ item.priceRange }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                            <v-list-item v-for="subItem in item.items" :key="subItem.name">
                                                <v-list-item-content class="space">
                                                    <v-list-item-title>{{ subItem.name }}</v-list-item-title>
                                                    <v-list-item-title>{{ subItem.price }}</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-group>
                                    </v-list>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="showModal = false">닫기</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-tab-item>

                    <v-tab-item value="tab-3">
                        <h1>리뷰</h1>

                        <div class="ratings-container">
                            <div class="ratings-container-sub">
                                <img src="~/assets/images/babscore.png" alt="Bob's Score" class="score-image">
                                <div class="score-value">{{ averageScore.toFixed(1) / 2 }}</div>
                            </div>
                            <div class="rating-bars">
                                <div v-for="(count, index) in ratingsCount.slice().reverse()" :key="index"
                                    class="rating-bar-container">
                                    <span class="rating-score">{{ 5 - index }}점</span>
                                    <div class="rating-bar-background">
                                        <div class="rating-bar-fill" :style="{ width: getPercentage(count) + '%' }">
                                        </div>
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
                                        <v-img contain :src="require('~/assets/images/gallery/foodFive.png')"></v-img>
                                    </v-col>
                                    <v-col cols="6" lg="6">
                                        <v-img contain :src="require('~/assets/images/gallery/foodSix.png')"></v-img>
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
                            <v-icon color="green">mdi-phone</v-icon> {{restaurantDetails.tel}}<br><br>
                            <h4>매장 소개</h4><br>
                            국내산 임실치즈를 사용해 만든 피자 전문점입니다. 적절한 도우와 여러가지 토핑이 어우러져 피자 고유의 맛을 느낄 수 있습니다.<br><br>
                            <h4>영업시간 및 정기 휴무</h4><br>
                            10:00 - 21:30<br>
                            20:30 라스트오더<br>
                            정기 휴무 : 매주 일<br><br>
                            <h4>매장 주소</h4><br>
                            {{restaurantDetails.address}}


                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </div>




        </v-container>
        <Footer />
    </div>
</template>
<script>
import axios from 'axios';
import KakaoMap from '@/components/api/KakaoMap.vue'
import DateTimePicker from '@/components/restaurant/DateTimePicker.vue';
export default {
    name: 'App',
    components: {
        KakaoMap,
        DateTimePicker
    },
    head: {
        title: 'Food Menu'
    },
    data: () => ({
        ratingsCount: [1, 1, 3, 6, 20],
        // menuItems: [
        //     {
        //         name: 'PIZZA', priceRange: '20,000 ~ 36,000원', active: false,
        //         items: [
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '페퍼로니', price: '18,000' },
        //             { name: '포테이토', price: '22,000' },
        //         ]
        //     },
        //     {
        //         name: 'SPAGHETTI', priceRange: '8,500 ~ 9,500원', active: false,
        //         items: [
        //             { name: '치즈오븐스파게티', price: '8,500' },
        //             { name: '매콤로제스파게티', price: '9,000' },
        //             { name: '크림베이컨스파게티', price: '9,500' },
        //         ]
        //     },
        //     {
        //         name: 'RICE', priceRange: '11,000 ~ 13,000원', active: false,
        //         items: [
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //         ]
        //     },
        //     {
        //         name: 'SALADE', priceRange: '6,000 ~ 9,000원', active: false,
        //         items: [
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //         ]
        //     },
        //     {
        //         name: 'SIDE', priceRange: '500 ~ 2,000원', active: false,
        //         items: [
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //             { name: '콤비네이션', price: '20,000' },
        //         ]
        //     },
        // ],
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
        tab: null,
        checkbox: true,
        radioGroup: 1,
        value: [20, 40],
        selected: null,
        showModal: false,
        modal: false,
        depositAmount: false,
        menus: [],
    }),
    computed: {
        // 평균 별점을 계산합니다.
        averageScore() {
            const totalReviews = this.ratingsCount.length;
            const scoreSum = this.ratingsCount.reduce((sum, count, index) => {
                return sum + (count * (5 - index));
            }, 0);
            return scoreSum / totalReviews;
        },
        restaurantDetails() {
            const restaurantId = this.$route.params.id;
      const found = this.menus.find(menu => menu.restaurant_id === Number(restaurantId));
      return found ? {
        name: found.restaurant_name,
        address: found.restaurant_address,
        deposit: found.restaurant_deposit,
        tel : found.restaurant_tel,
        crowd : found.restaurant_crowd
      } : {
        name: 'Restaurant not found',
        address: '',
        deposit: '',
        tel : '',
        crowd : ''
      };
    },
    crowdClass() {
      // crowd 값에 따라 다른 클래스 이름을 반환
      switch (this.restaurantDetails.crowd) {
        case 'BUSY':
          return 'busy';
        case 'NORMAL':
          return 'normal';
        case 'AVAILABLE':
          return 'available';
        default:
          return ''; // 기본적으로 아무 클래스도 적용하지 않음
      }
    }
    },
    created() {
        this.fetchMenus();
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
        },
        closeModal() {
            this.modal = false;
        },
        fetchMenus() {
            const id = this.$route.params.id;
            axios.get(`http://localhost:8000/restaurant/detail/${id}`)
                .then(response => {
                    this.menus = response.data;
                    console.log(this.menus)

                })
                .catch(error => {
                    console.log('메뉴 데이터를 불러올 수 없습니다.')
                });
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

hr {
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
    flex-direction: row;
    align-items: center;
    width: 80%;
    padding-left: 20%;
}

.ratings-container-sub {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.score-image {
    width: 50px;
    /* 이미지 크기 조절 */
    height: auto;
    margin-right: 10px;
    /* 오른쪽 여백 추가 */
}

.score-value {
    font-size: 2em;
    /* 평균 점수 글씨 크기 */
    margin-bottom: 10px;
    /* 아래쪽 여백 추가 */
}

.rating-bars {
    width: 100%;
}

.rating-bar-container {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    /* 바 사이의 여백 */
}

.rating-score {
    min-width: 30px;
    /* 별점 점수 폭 고정 */
}

.rating-bar-background {
    flex-grow: 1;
    /* 가로 막대 배경을 가득 채우기 */
    background-color: #eee;
    margin: 0 10px;
    /* 가로 막대 여백 */
    height: 10px;
    /* 가로 막대 높이 */
}

.rating-bar-fill {
    background-color: #000;
    height: 100%;
    transition: width 0.5s ease;
}

.rating-count {
    min-width: 30px;
    /* 카운트 숫자 폭 고정 */
    text-align: right;
    /* 숫자를 오른쪽으로 정렬 */
}

.roundstate {
    display: flex;
    width: 35%;
    height: 50px;
    border-radius: 50px;
    border: 3px solid #000;
    color: FFFFFF;
    align-items: center;
    justify-content: left;
}

.available {
    width: 50px;
    margin-right: 20px;
    border-radius: 50px;
    background-color: #1DDB16;
    text-align: center;
    color: #eee;
    margin-left: 20px;
}
.normal {
    width: 50px;
    margin-right: 20px;
    border-radius: 50px;
    background-color: #ffee01;
    text-align: center;
    color: #eee;
    margin-left: 20px;
}
.busy {
    width: 50px;
    margin-right: 20px;
    border-radius: 50px;
    background-color: #db1616;
    text-align: center;
    color: #eee;
    margin-left: 20px;
}
.icon-container {
    display: flex;
    align-items: center;
    justify-content: space-around;

}

.icon-center {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.icon-item {
    display: flex;
    justify-content: center;
    border: 3.5px solid #000;
    border-radius: 15%;
    padding: 5px;
    width: 70px;
}

.space {
    display: flex;
    /* Flexbox layout을 활성화 */
    flex-direction: row-reverse;
    justify-content: right;
    /* 양쪽 끝에 자식 요소를 배치 */
    align-items: center;
}
</style>