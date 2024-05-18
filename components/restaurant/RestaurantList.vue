<template>
  <div>
    <v-container>
      <v-breadcrumbs class="ps-0" :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-row>
        <v-col cols="12" xl="12">
          <Box>
            <div slot="boxSidebar">
              <div>
                <div class="mb-6">
                  <h6>지역별 카테고리</h6>
                  <v-checkbox v-for="clusterarea in clusterareas" :key="clusterarea.id" class="mt-2"
                    :label="clusterarea.name" color="secondary" :value="clusterarea.value"
                    v-model="selectedCategories"></v-checkbox>
                </div>
                <div class="mb-6">
                  <h6>음식 종류별 카테고리</h6>
                  <v-checkbox v-for="foodType in foodTypes" :key="foodType.id" class="mt-2" :label="foodType.name"
                    color="secondary" :value="foodType.value" v-model="selectedCategories"></v-checkbox>
                </div>
                <div class="mb-6">
                  <h6 class="mt-6">TOP 10</h6>
                  <v-checkbox v-for="sortType in sortTypes" :key="sortType.id" class="mt-2" :label="sortType.name"
                    color="secondary" :value="sortType.value" v-model="selectedCategories"></v-checkbox>
                </div>
                <v-btn color="primary" class="mb-3" @click="submitData">적용</v-btn>
              </div>
            </div>
            <div slot="boxContent">
              <div class="px-8">
                <v-row>
                  <v-col cols="12">
                    <h5 class="text-18 test-color">{{ displayedCardCount }} 개의 매장이 검색됨</h5>
                  </v-col>
                  <v-col cols="12" xl="4" lg="4" md="4" sm="6"
                    v-for="(item, index) in CardList.slice(startItemIndex - 1, endItemIndex)" :key="index"
                    @click="sendRestaurantLink(item.restaurant_id)" class="cursor-pointer">
                    <Card :cardSection="item" />
                  </v-col>
                  <div class="pagelocation">
                    <div class="mb-4 me-3">
                      <p class="font-weight-normal mb-0 text-14">Showing {{ startItemIndex
                        }}-{{ endItemIndex }} of {{
        CardList.length }} Reviews</p>
                    </div>
                    <div class="mb-4">
                      <!-- 페이지네이션 -->
                      <v-pagination v-model="currentPage" :length="numberOfPages" circle
                        @input="navigateToPage"></v-pagination>

                    </div>
                  </div>
                </v-row>
              </div>
            </div>
          </Box>

        </v-col>
      </v-row>

    </v-container>
    <Footer />

  </div>
</template>
<script>
import axios from 'axios';

export default {
  components: {
    Card: () => import('@/components/Card.vue')
  },
  head: {
    title: 'Resturant Column'
  },
  data: () => ({
    foodTypes: [{ id: 1, name: '한식', value: 'KOREAN' }, { id: 2, name: '중식', value: 'CHINESE' }, { id: 3, name: '일식', value: 'JAPANESE' }, { id: 4, name: '양식', value: 'WESTERN' }, { id: 5, name: '베트남', value: 'VIETNAMESE' }, { id: 6, name: '아메리칸', value: 'AMERICAN' }, { id: 7, name: '인도', value: 'INDIAN' }, { id: 8, name: '기타세계', value: 'OTHERGLOBALFOOD' }],
    clusterareas: [{ id: 1, name: '여의도-마포', value: 'YEOUIDO_MAPO' }, { id: 2, name: '용산(Y밸리)', value: 'YONGSAN_VALLEY' }, { id: 3, name: '양재', value: 'YANGJAE' }, { id: 4, name: '수서', value: 'SUSEO' }, { id: 5, name: '홍릉', value: 'HONGNEUNG' }, { id: 6, name: '마곡', value: 'MAGOK' }, { id: 7, name: '가산디지털단지(G밸리1)', value: 'GASAN_DIGITAL_VALLEY' }, { id: 8, name: '구로디지털단지(G밸리2)', value: 'GURO_DIGITAL_VALLEY' }],
    sortTypes: [{ id: 1, name: '즐겨찾기순', value: '1' }, { id: 2, name: '조회많은순', value: '2' }, { id: 3, name: '예약많은순', value: '3' }],
    CardList: [],
    cardSection: [],
    categories: [],
    selectedCategories: [],
    page: 1,
    step: 1, // 초기 단계 설정
    currentPage: 1, // 현재 페이지 번호
    itemsPerPage: 12, // 페이지당 표시할 아이템 수
    items: [
      {
        text: '메인화면',
        disabled: true,
        href: 'http://localhost:3000/',
      },
      {
        text: '식당 검색 리스트',
        disabled: false,
        href: '/',
      }
    ],
    checkbox: true,
    radioGroup: 1
  }),
  computed: {
    // n개의 매장이 검색되었습니다. 표시
    displayedCardCount() {
      return this.CardList.slice(0, 9999).length;
    },
    // 현재 페이지에 해당하는 첫 번째 아이템 인덱스 반환
    startItemIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    // 현재 페이지에 해당하는 마지막 아이템 인덱스 반환
    endItemIndex() {
      const endIndex = this.currentPage * this.itemsPerPage;
      return Math.min(endIndex, this.CardList.length);
    },
    //필터링된 회원 수에 따른 페이지 수 반환
    numberOfPages() {
      return Math.ceil(this.CardList.length / this.itemsPerPage);
    },
    listRestaurant() {
      const restaurantId = this.$route.params.id;
      const cardSection = this.CardList.find(list => list.restaurant_id === Number(restaurantId));
      return cardSection ? {
        img: cardSection.restaurant_img,
        name: cardSection.restaurant_name,
        chip: false,
        price: cardSection.price,
        waitTime: cardSection.restaurant_deposit,
        detail: cardSection.categories
      } : {
        img: '',
        name: 'Restaurant not found',
        chip: '',
        price: '',
        waitTime: '',
        detail: ''
      };
    },
    translatedCategories() {
      const categoryMap = {
        KOREAN: "한식",
        OTHERGLOBALFOOD: "기타 세계 음식",
        TRIPE: "곱창/막창",
        YONGSAN_VALLEY: "용산 밸리"
      };
      return this.categories.map(cat => categoryMap[cat] || cat);
    }
  },
  created() {
    this.fetchMenus();
    this.fetchList();
  },
  methods: {
    fetchMenus() {
      const id = this.$route.params.id;
      axios.get(`http://localhost:8000/restaurant/list/${id}`)
        .then(response => {
          this.CardList = response.data;
          console.log(this.CardList)

        })
        .catch(error => {
          console.log('데이터를 불러올 수 없습니다.1')
        });
    },
    fetchList() {
      const categories = this.$route.query.category;
      const params = new URLSearchParams();
      if (categories) {
        if (Array.isArray(categories)) {
          categories.forEach(category => params.append('categoryNames', category));
        } else {
          params.append('categoryNames', categories);
        }
      }
      axios.get(`http://localhost:8000/restaurant/list?${params.toString()}`)
        .then(response => {
          this.CardList = response.data;
          console.log(this.CardList);
        })
        .catch(error => {
          console.log('데이터를 불러올 수 없습니다.');
        });
    },
    submitData() {
      const params = new URLSearchParams();
      this.selectedCategories.forEach(category => params.append('category', category));
      window.location.href = `http://localhost:3000/restaurant/list?${params.toString()}`;
    },
    sendRestaurantLink(restaurant_id) {
      window.location.href = `http://localhost:3000/restaurant/detail/${restaurant_id}`;
    },
    navigateToPage() {
    this.fetchList();
  }
}
}
</script>
<style lang="scss">
.pagelocation {
  display: flex;

  flex-direction: row;
  align-items: center;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
