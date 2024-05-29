<template>
    <div>
        <v-container>
            <v-breadcrumbs class="ps-0" :items="items">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
            <v-row class="rowspan">
                <v-col cols="6" xl="6" lg="6" class="tabContent">
                    <v-img :src="restaurantDetails.img"></v-img>
                    <div class="d-flex justify-space-between flex-wrap align-center mb-3">
                            <h1 class="me-2">{{ restaurantDetails.name }}</h1>

                            <div class="titleflex">
                                <div :class="{ 'favorite-dark': !isToggled, 'favorite-color': isToggled }"
                                    @click="toggleImage">
                                </div>
                            </div>
                            <v-alert v-if="alertMessage" :type="alertType" dismissible>
                                {{ alertMessage }}
                            </v-alert>
                        </div>
                        <div class="mb-3">
                            <span v-for="starIndex in 5" :key="starIndex">
                                <img v-if="starIndex <= restaurantReviews.averageScore" src="../../assets/images/babscore.png" width="16"
                                    height="16" />
                                <img v-else src="../../assets/images/graybab.png" width="16" height="16" />
                            </span>
                            <span class="text-14 me-1"> {{ restaurantReviews.averageScore }}
                                <span class="grey--text">({{ restaurantReviews.reviewCount }})</span>
                            </span>
                        </div>
                        <p class="mb-5 text-14">{{ formatCategories(restaurantDetails.categories) }}</p>
                        <p class="mb-5 text-18">{{ restaurantDetails.description }}</p>

                        <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                            <v-icon left small color="grey">mdi-map-marker</v-icon>
                            {{ restaurantDetails.address }}
                            <v-dialog ref="dialog" v-model="modal" width="500px" height="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on" text> 매장 위치 보기 </v-btn>
                                </template>
                                <v-card>
                                    <KakaoMap1 />
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="modal = false">닫기</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                        <div class="grey--text text--darken-1 align-middle text-14 mb-4 d-flex align-center flex-wrap">
                            <v-icon left small color="grey">mdi-clock-outline</v-icon>
                            <span class="primary--text me-2">매장 오픈 시간</span> - Sun - Mon: 9am - 10pm 영업중
                        </div>
                </v-col>
        
                        <v-col cols="12" xl="6" lg="6" class="tabContent1">
                            <v-tabs v-model="tab" class="mb-8">
                                <v-tab class="text-capitalize tabsize" href="#tab-1">홈</v-tab>
                                <v-tab class="text-capitalize tabsize" href="#tab-2">메뉴</v-tab>
                                <v-tab class="text-capitalize tabsize" href="#tab-3">리뷰</v-tab>
                                <v-tab class="text-capitalize tabsize" href="#tab-4">상세정보</v-tab>
                            </v-tabs>

                            <v-tabs-items v-model="tab">
                                <v-tab-item value="tab-1">
                                    <h2>예약 신청</h2>
                                    <DateTimePicker :restaurantName="restaurantDetails.name" /><br><br>
                                    <h2>식당 혼잡도</h2>
                                    <div class="roundstate">
                                        <div :class="crowdClass">
                                            <span v-if="restaurantDetails.crowd === 'BUSY'">혼잡</span>
                                            <span v-else-if="restaurantDetails.crowd === 'NORMAL'">보통</span>
                                            <span v-else-if="restaurantDetails.crowd === 'AVAILABLE'">여유</span>
                                        </div>
                                        <span v-if="restaurantDetails.crowd === 'BUSY'">웨이팅이 길게 발생할 수 있습니다.</span>
                                        <span v-else-if="restaurantDetails.crowd === 'NORMAL'">약간의 웨이팅이 발생할 수
                                            있습니다.</span>
                                        <span v-else-if="restaurantDetails.crowd === 'AVAILABLE'">매장 식사 이용 시 바로 입장
                                            가능합니다.</span>
                                    </div><br><br>
                                    <h2>편의시설</h2>
                                    <div class="icon-container">
    <template v-for="facility in allFacilities">
        <div v-if="facilities.includes(facility.name)" :key="facility.name" class="icon-center">
            <div class="icon-item">
                <img :src="facility.icon" width="50" height="50">
            </div>
            <div>{{ facility.label }}</div>
        </div>
    </template>
</div>

                                </v-tab-item>

                                <v-tab-item value="tab-2">
                                    <div>
                                        <h1>메뉴</h1><br>
                                        <table class="menutable">
                                            <tbody>
                                                <tr v-for="menu in menus" :key="menu.id">
                                                    <td><v-img contain :src="menu.img" width="100" height="100"></v-img></td>
                                                    <td colspan="3">
                                                        <tr class="menutitle">{{ menu.name }}</tr>
                                                        <tr class="menuinfo">{{ menu.menu_info }}</tr>
                                                        <tr class="menuprice">{{ menu.price }}원</tr>
                                                    </td>
                                                    <td></td><td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </v-tab-item>

                                <v-tab-item value="tab-3">
                                    <div>
                                        <h1>리뷰</h1>
                                        <div class="ratings-container">
                                            <div class="ratings-container-sub">
                                                <img src="~/assets/images/babscore.png" alt="Bob's Score"
                                                    class="score-image">
                                                <div class="score-value">{{ restaurantReviews.averageScore }}</div>
                                            </div>
                                            <div class="rating-bars">
                                                <div v-for="(count, index) in ratingsCount.slice().reverse()"
                                                    :key="index" class="rating-bar-container">
                                                    <span class="rating-score">{{ 5 - index }}점</span>
                                                    <div class="rating-bar-background">
                                                        <div class="rating-bar-fill"
                                                            :style="{ width: getPercentage(count) + '%' }">
                                                        </div>
                                                    </div>
                                                    <span class="rating-count">{{ count }}</span>
                                                </div>
                                            </div>
                                        </div><br>
                                        <hr>

                                        <v-col cols="12" xl="12" lg="12">
    <div v-for="review in reviews" :key="review.id" class="mb-6">
        <div class="d-flex align-center flex-wrap mb-4">
            <v-avatar size="48" class="me-4">
                <img src="../../assets/images/faces/review_person.png">
            </v-avatar>
            <div>
                <h5 class="mb-0">{{ review.name }}</h5>
                <p class="mb-0 text-14 grey--text text--darken-1">Gold Member</p>
            </div>
        </div>
        <div class="d-flex align-center mb-2">
            <span v-for="starIndex in 5" :key="starIndex">
                <img v-if="starIndex <= review.score" src="../../assets/images/babscore.png" width="16" height="16" />
                <img v-else src="../../assets/images/graybab.png" width="16" height="16" />
            </span>
            <span class="font-weight-bold text-14 ms-2">{{ review.score }}</span>
            <span class="grey--text text--darken-1 text-14 ms-2">{{ review.registerDate }}</span>
        </div>
        <h5 class="grey--text text--darken-2 font-weight-regular mb-3">{{ review.content }}</h5>
        <v-col cols="12" lg="6">
            <v-img contain :src="review.review_img"></v-img>
        </v-col>
        <div class="mt-4">
            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                <v-icon left small>mdi-thumb-up-outline</v-icon>
                Like
            </v-btn>
            <v-btn class="grey--text text--darken-2 text-capitalize" text elevation="0" small>
                <v-icon left small>mdi-comment-text-outline</v-icon>
                Comment
            </v-btn>
        </div>
        <v-divider class="my-4"></v-divider>
    </div>
</v-col>

                                    </div>
                                </v-tab-item>

                                <v-tab-item value="tab-4">
                                    <div>
                                        <h1>상세정보</h1><br>
                                        <h4>전화번호</h4>
                                        <v-icon color="green">mdi-phone</v-icon> {{ restaurantDetails.tel }}<br><br>
                                        <h4>매장 소개</h4>
                                        {{ restaurantDetails.description }}<br><br>
                                        <h4>영업시간 및 정기 휴무</h4>
                                        10:00 - 21:30<br>
                                        20:30 라스트오더<br>
                                        정기 휴무 : 매주 일<br><br>
                                        <h4>매장 주소</h4>
                                        {{ restaurantDetails.address }}
                                    </div>
                                </v-tab-item>
                            </v-tabs-items>
                        </v-col>
            </v-row>
            <div><Footer /></div>
        </v-container>
        
    </div>
    
</template>
<script>
import axios from 'axios';
import KakaoMap1 from '@/components/api/kakaoMap.vue'
import DateTimePicker from '@/components/restaurant/DateTimePicker.vue';

const categoryMappings = {
    "KOREAN": "한식",
    "CHINESE": "중식",
    "JAPANESE": "일식",
    "WESTERN": "양식",
    "VIETNAMESE": "베트남",
    "AMERICAN": "아메리칸",
    "INDIAN": "인도",
    "OTHERGLOBALFOOD": "기타세계",
    "BEEF": "소고기",
    "PORK": "돼지고기",
    "STEAK": "스테이크",
    "TRIPE": "곱창/막창",
    "SEAFOOD_STEW": "해물(탕/찜/볶음)",
    "SASHIMI": "회/사시미",
    "SUSHI": "초밥",
    "SHELLFISH": "굴/조개",
    "BEER": "맥주/호프",
    "TRADITIONAL_ALCOHOL": "전통주",
    "IZAKAYA": "이자카야",
    "WINE_COCKTAIL": "와인/칵테일",
    "SOLO": "혼밥",
    "WITH_FRIENDS": "친구",
    "GROUP_GATHERING": "단체모임",
    "DATE": "데이트",
    "FAMILY": "가족",
    "COST_EFFECTIVE": "가성비",
    "YEOUIDO_MAPO": "여의도-마포",
    "YONGSAN_VALLEY": "용산(Y-밸리)",
    "YANGJAE": "양재",
    "SUSEO": "수서",
    "HONGNEUNG": "홍릉",
    "MAGOK": "마곡",
    "GASAN_DIGITAL_VALLEY": "가산디지털단지",
    "GURO_DIGITAL_VALLEY": "구로디지털단지",
};
export default {
    name: 'App',
    components: {
        KakaoMap1,
        DateTimePicker
    },
    head: {
        title: 'Food Menu'
    },
    data: () => ({
        allFacilities: [     // 각 식당 별 편의시설 데이터바인딩
            { name: "PARKING_AVAILABLE", icon: require('@/assets/images/facility/parking.png'), label: "주차가능" },
            { name: "VALET_AVAILABLE", icon: require('@/assets/images/facility/valet-parking.png'), label: "발렛파킹" },
            { name: "SMOKING_ZONE", icon: require('@/assets/images/facility/smoking.png'), label: "흡연구역" },
            { name: "PET_FRIENDLY", icon: require('@/assets/images/facility/dog.png'), label: "애견동반" },
            { name: "CORKAGE_AVAILABLE", icon: require('@/assets/images/facility/cork.png'), label: "콜키지가능" },
            { name: "SOMMELIER_AVAILABLE", icon: require('@/assets/images/facility/wine-bottle.png'), label: "소믈리에" },
            { name: "WELCOME_KIDS_ZONE", icon: require('@/assets/images/facility/welcome.png'), label: "웰컴키즈존" },
            { name: "NO_KIDS_ZONE", icon: require('@/assets/images/facility/nokids.png'), label: "노키즈존" },
            { name: "FREE_WIFI_AVAILABLE", icon: require('@/assets/images/facility/freewifi.png'), label: "와이파이존" },
            { name: "DISABLED_FACILITIES_AVAILABLE", icon: require('@/assets/images/facility/disable.png'), label: "장애인편의시설" },
            { name: "RENTAL_AVAILABLE", icon: require('@/assets/images/facility/welcome.png'), label: "렌탈 가능" },
            { name: "CORKAGE_FREE", icon: require('@/assets/images/facility/cork-free.png'), label: "콜키지 프리" },
        ],
        items: [
            {
                text: '메인화면',
                disabled: false,
                href: '/',
            },
            {
                text: '식당 검색 리스트',
                disabled: false,
                href: `${process.env.FRONT_URL}/restaurant/list`,
            },
            {
                text: '식당 상세보기',
                disabled: false,
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
        reviews: [],
        ratingsCount: [],
        facilities: [],
        isToggled: false,
        alertMessage: '',
        alertType: '',
        user: null,
      restaurantId: null
    }),
    computed: {
        // 평균 별점을 계산합니다.
        // averageScore() {
        //     const totalReviews = this.ratingsCount.reduce((sum, count) => sum + count, 0);
        //     const scoreSum = this.ratingsCount.reduce((sum, count, index) => {
        //         return sum + (count * (5 - index));
        //     }, 0);
        //     return scoreSum / totalReviews;
        // },
        restaurantDetails() {
            const restaurantId = this.$route.params.id;
            const found = this.menus.find(menu => menu.restaurant_id === Number(restaurantId));
            return found ? {
                name: found.restaurant_name,
                address: found.restaurant_address,
                deposit: found.restaurant_deposit,
                tel: found.restaurant_tel,
                crowd: found.restaurant_crowd,
                img: found.restaurant_img,
                description: found.restaurant_description,
                categories: found.categories,
                menu_img : found.img
            } : {
                name: 'Restaurant not found',
                address: '',
                deposit: '',
                tel: '',
                crowd: '',
                img: ''
            };
        },
        restaurantReviews() {
            const restaurantId = this.$route.params.id;
            const found = this.reviews.find(review => review.restaurant_id === Number(restaurantId));
            return found ? {
                content: found.content,
                registerDate: found.registerDate,
                score: found.score,
                reviewCount: found.reviewCount,
                averageScore: found.averageScore,


            } : {
                content: 'Restaurant not found',
                registerDate: '',
                score: ''
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
        this.fetchReviews();
        this.fetchMenus();
        this.getUserInfo();
    },
    async mounted(){
        
    },
    methods: {  
        // 비율을 계산하여 백분율로 변환합니다.
        getPercentage(count) {
            const total = this.ratingsCount.reduce((sum, count) => sum + count, 0);
            return total === 0 ? 0 : (count / total) * 100;
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
            this.restaurantId = id; // 식당 ID 저장
            axios.get(`${process.env.API_URL}/restaurant/detail/${id}`)
                .then(response => {
                    this.menus = response.data;
                    console.log('식당 상세정보 불러왔음')
                    this.facilities = response.data[0].facilies;
                    console.log('편의시설 불러왔음')
                })
                .catch(error => {
                    console.log('메뉴 데이터를 불러올 수 없습니다.')
                });
        },
        fetchReviews() {
            const id = this.$route.params.id;
            axios.get(`${process.env.API_URL}/restaurant/detail/review/${id}`)
                .then(response => {
                    this.reviews = response.data;
                    console.log('리뷰 데이터 불러왔음');

                    // reviews 데이터에서 ratingsCount 리스트를 생성
                    const ratingsCount = [0, 0, 0, 0, 0];
                    this.reviews.forEach(review => {
                        if (review.score >= 1 && review.score <= 5) {
                            ratingsCount[review.score - 1]++;
                        }
                    });
                    this.ratingsCount = ratingsCount;
                })
                .catch(error => {
                    console.log('리뷰 데이터를 불러올 수 없습니다.', error);
                });
        },
        formatCategories(categories) {
            if (!categories) {
                return ''; // categories가 null 또는 undefined이면 빈 문자열 반환
            }
            return categories.map(category => `#${categoryMappings[category] || category}`).join(" ");
        },


        toggleImage() {
            this.isToggled = !this.isToggled;

            if (this.isToggled) {
                this.alertMessage = '즐겨찾기에 저장되었습니다.';
                this.alertType = 'success';
                this.saveToFavorites();
            } else {
                this.alertMessage = '즐겨찾기가 삭제되었습니다.';
                this.alertType = 'warning';
                this.removeFromFavorites();
            }

            // 일정 시간 후 알림 메시지 숨기기
            setTimeout(() => {
                this.alertMessage = '';
            }, 1000);
        },
        async saveToFavorites() {
      try {
        if (this.user && this.restaurantId) {
          const response = await axios.post(`${process.env.API_URL}/restaurant/bookmark`, {
            member_id: this.user.id,
            restaurant_id: this.restaurantId
          });

          if (response.status === 200) {
            console.log('즐겨찾기에 저장되었습니다.');
          } else {
            console.error('즐겨찾기 저장 실패:', response);
          }
        }
      } catch (error) {
        console.error('즐겨찾기 저장 중 오류 발생:', error);
      }
    },
    async removeFromFavorites() {
      try {
        if (this.user && this.restaurantId) {
          const response = await axios.delete(`${process.env.API_URL}/restaurant/bookmark`, {
            data: {
              member_id: this.user.id,
              restaurant_id: this.restaurantId
            }
          });

          if (response.status === 200) {
            console.log('즐겨찾기에서 삭제되었습니다.');
          } else {
            console.error('즐겨찾기 삭제 실패:', response);
          }
        }
      } catch (error) {
        console.error('즐겨찾기 삭제 중 오류 발생:', error);
      }
    },
        async getUserInfo() {     // 현재 로그인한 유저정보를 불러오는 메소드
      try {
        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error('No token found');
        }

        // 토큰을 Authorization 헤더에 포함하여 요청 보내기
        const response = await axios.get(`${process.env.API_URL}/userInfo/me`, {
          headers: {
            'Authorization': `${token}`
          },
          withCredentials: true
        });

        if (response.status === 200) {
          const userInfo = response.data;
          console.log('User Info:', userInfo);
          // 사용자 정보를 상태나 컴포넌트 데이터에 저장
          this.user = userInfo;
          console.log(this.user);
          console.log(this.user.id);
        } else {
          console.error('Failed to fetch user info:', response);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
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
    margin-right: 20px;
    /* 오른쪽 여백 추가 */
}

.score-value {
    font-size: 2em;
    /* 평균 점수 글씨 크기 */
    margin-bottom: 10px;
    /* 아래쪽 여백 추가 */
    margin-right: 20px;
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
    width: 100%;
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
    color: #000000;
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
    flex-wrap: wrap;
    gap: 20px;
    // align-items: center;
    // justify-content: space-around;

}

.icon-center {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
}

.icon-item {
    // display: flex;
    // justify-content: center;
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

.favorite-dark {
    width: 50px;
    height: 50px;
    background-image: url('../../assets/images/restaurants/favorit_dark.png');
    background-size: cover;
}

.favorite-color {
    width: 50px;
    height: 50px;
    background-image: url('../../assets/images/restaurants/favorit_color.png');
    background-size: cover;
}

.titleflex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.menuflex-container {
    display: flex;
    justify-content: space-between;
    /* 양 끝에 요소를 배치 */
    width: 100%;
    /* 컨테이너를 전체 너비로 확장 */
}

.left {
    text-align: left;
    /* 왼쪽 정렬 */
}

.right {
    text-align: right;
    /* 오른쪽 정렬 */
}

.sub {
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: left;
    /* 왼쪽 정렬 */
}

.imgcenter {
    display: flex;
    justify-content: center;
}

.tabContent {
    width: 100%;
    /* 컨테이너의 너비에 맞춤 */
    height: auto;
    /* 원본 비율 유지 */
    max-height: 500px;
    /* 최대 높이 설정 */
    object-fit: contain;
    /* 이미지가 잘리지 않고 비율을 유지하면서 컨테이너에 맞춰짐 */
}

.tabContent1 {
    padding-left: 70px;
}

.rowspan {
    min-height: 1000px;
}
.menutitle{
font-size: medium;
}
.menuinfo{
font-size: small;
color:gray;
}
.menuprice{
font-size: small;
font-weight:bold;
}
.tabsize{
    width: 25%;
}
</style>