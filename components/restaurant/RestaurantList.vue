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
                <br>
                <v-expansion-panels accordion>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="panel-header">
                      지역별
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox v-for="clusterarea in clusterareas" :key="clusterarea.id" class="changecheckbox"
                        :label="clusterarea.name" color="secondary" :value="clusterarea.value"
                        v-model="selectedCategories"></v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="panel-header">
                      음식 종류별
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox v-for="foodType in foodTypes" :key="foodType.id" class="mt-2 changecheckbox" :label="foodType.name"
                        color="secondary" :value="foodType.value" v-model="selectedCategories"></v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="panel-header">
                      편의 시설
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-checkbox v-for="sortType in sortTypes" :key="sortType.id" class="mt-2 changecheckbox" :label="sortType.name"
                        color="secondary" :value="sortType.value" v-model="selectedCategories"></v-checkbox>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <div class="btn-right">
                <v-btn color="primary" class="btn-css" @click="submitData">적용</v-btn></div>
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
      </v-row>
</div>
</div>
  </Box>
  <div class="pagelocation">
    <div class="mb-4 me-3">
      <p class="font-weight-normal mb-0 text-14">Showing {{ startItemIndex
        }}-{{ endItemIndex }} of {{
        CardList.length }} Reviews</p>
    </div>
    <div class="mb-4">
      <!-- 페이지네이션 -->
      <v-pagination v-model="currentPage" :length="numberOfPages" circle @input="navigateToPage"></v-pagination>
    </div>
  </div>
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
    foodTypes: [
      { id: 1, name: '한식', value: 'KOREAN' },
      { id: 2, name: '중식', value: 'CHINESE' },
      { id: 3, name: '일식', value: 'JAPANESE' },
      { id: 4, name: '양식', value: 'WESTERN' },
      { id: 5, name: '베트남', value: 'VIETNAMESE' },
      { id: 6, name: '아메리칸', value: 'AMERICAN' },
      { id: 7, name: '인도', value: 'INDIAN' },
      { id: 8, name: '기타세계', value: 'OTHERGLOBALFOOD' }
    ],
    clusterareas: [
      { id: 1, name: '여의도-마포', value: 'YEOUIDO_MAPO' },
      { id: 2, name: '용산(Y밸리)', value: 'YONGSAN_VALLEY' },
      { id: 3, name: '양재', value: 'YANGJAE' },
      { id: 4, name: '수서', value: 'SUSEO' },
      { id: 5, name: '홍릉', value: 'HONGNEUNG' },
      { id: 6, name: '마곡', value: 'MAGOK' },
      { id: 7, name: '가산디지털단지(G밸리1)', value: 'GASAN_DIGITAL_VALLEY' },
      { id: 8, name: '구로디지털단지(G밸리2)', value: 'GURO_DIGITAL_VALLEY' }
    ],
    sortTypes: [
      { id: 1, name: '주차가능', value: 'PARKING_AVAILABLE' },
      { id: 2, name: '발렛가능', value: 'VALET_AVAILABLE' },
      { id: 3, name: '콜키지 프리', value: 'CORKAGE_FREE' },
      { id: 4, name: '콜키지 가능', value: 'CORKAGE_AVAILABLE' },
      { id: 5, name: '웰컴키즈존', value: 'WELCOME_KIDS_ZONE' },
      { id: 6, name: '노키즈존', value: 'NO_KIDS_ZONE' },
      { id: 7, name: '대관 가능', value: 'RENTAL_AVAILABLE' },
      { id: 8, name: '전문 소믈리에', value: 'SOMMELIER_AVAILABLE' },
      { id: 9, name: '장애인 편의시설', value: 'DISABLED_FACILITIES_AVAILABLE' },
      { id: 10, name: '반려동물 동반', value: 'PET_FRIENDLY' },
      { id: 11, name: '무료와이파이', value: 'FREE_WIFI_AVAILABLE' },
      { id: 12, name: '흡연구역', value: 'SMOKING_ZONE' },
    ],
    CardList: [],
    cardSection: [],
    selectedCategories: [],
    page: 1,
    step: 1,
    currentPage: 1,
    itemsPerPage: 12,
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
    displayedCardCount() {
      return this.CardList.length;
    },
    startItemIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItemIndex() {
      const endIndex = this.currentPage * this.itemsPerPage;
      return Math.min(endIndex, this.CardList.length);
    },
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
        detail: cardSection.categoryNames
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
    this.fetchList();
  },
  methods: {
    fetchList() {
      const categories = this.$route.query.category;
      const facilities = this.$route.query.facility;
      const search = this.$route.query.search;
      const params = new URLSearchParams();
      if (categories) {
        if (Array.isArray(categories)) {
          categories.forEach(category => params.append('categoryNames', category));
        } else {
          params.append('categoryNames', categories);
        }
      }
      if (facilities) {
        if (Array.isArray(facilities)) {
          facilities.forEach(facility => params.append('facilityNames', facility));
        } else {
          params.append('facilityNames', facilities);
        }
      }
      if (search) {
        params.append('search', search);
      }
      axios.get(`http://localhost:8000/restaurant/list?${params.toString()}`)
        .then(response => {
          this.CardList = response.data;
          console.log('식당 정보 불러옴');
        })
        .catch(error => {
          console.log('데이터를 불러올 수 없습니다.');
        });
    },
    submitData() {
      const params = new URLSearchParams();
      this.selectedCategories.forEach(category => params.append('categoryNames', category));
      window.location.href = `http://localhost:3000/restaurant/list?${params.toString()}`;
    },
    sendRestaurantLink(restaurant_id) {
      window.location.href = `http://localhost:3000/restaurant/detail/${restaurant_id}`;
    },
    navigateToPage() {
      this.fetchList();
    }
  },
  watch: {
    '$route.query': 'fetchList'
  }
}
</script>
<style lang="scss">
.pagelocation {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.cursor-pointer {
  cursor: pointer;
}
.btn-right{
  display: flex;
  justify-content: end;
}
.btn-css{
  margin: 15px;
  width: 100px;
}
.panel-header{
  font-size : 16px;
  font-weight : bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.changecheckbox{
  margin-top: 10px;
  font-size: 20px;
}
</style>