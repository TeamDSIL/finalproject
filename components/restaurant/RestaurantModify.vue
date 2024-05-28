<template>
  <v-container>
    <div class="restaurant-manage">
      <v-tabs v-model="tab" class="tabs mb-4">
        <v-tab class="text-capitalize" @click="goToRestaurantManageMain(restaurant)">
          식당관리메인
        </v-tab>
      </v-tabs>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col cols="12">
          <h3 class="fw-bold mb-4">식당정보수정</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-form>
            <v-text-field
              v-model="restaurant.name"
              label="식당명"
              outlined
              readonly
              prepend-icon="mdi-store"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="restaurant.address"
              label="식당 주소"
              outlined
              readonly
              prepend-icon="mdi-map-marker"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="restaurant.tel"
              label="식당 연락처"
              outlined
              prepend-icon="mdi-phone"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="restaurant.tableCount"
              label="테이블 수"
              outlined
              prepend-icon="mdi-table"
              class="mb-4"
            ></v-text-field>
            <v-select
              v-model="restaurant.categories"
              :items="allCategories"
              label="카테고리 설정"
              multiple
              outlined
              attach
              chips
              small-chips
              class="mb-4"
            ></v-select>
            <v-select
              v-model="restaurant.facilities"
              :items="allFacilities"
              label="편의시설 선택"
              multiple
              outlined
              attach
              chips
              small-chips
              class="mb-4"
            ></v-select>
            <v-btn color="primary" @click="showDialog = true" class="mb-4">
              메뉴 수정
            </v-btn>
            <v-text-field
              v-model="restaurant.deposit"
              label="예약금 설정"
              outlined
              prepend-icon="mdi-cash"
              class="mb-4"
            ></v-text-field>
            <v-file-input
              v-model="restaurant.img"
              label="식당 사진"
              prepend-icon="mdi-camera"
              outlined
              class="mb-4"
            ></v-file-input>
            <v-btn color="rgb(255,207,2)" class="mb-4" @click="updateRestaurantInfo">
              수정 완료
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-dialog v-model="showDialog" persistent max-width="600px">
        <v-card>
          <v-card-title class="headline">메뉴 수정</v-card-title>
          <v-card-text>
            <v-container>
              <v-row v-for="(item, index) in menuItems" :key="index" class="menu-item mb-4">
                <v-col cols="12">
                  <v-text-field
                    v-model="item.name"
                    label="메뉴 이름"
                    outlined
                    prepend-icon="mdi-food"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.menuInfo"
                    label="메뉴 설명"
                    outlined
                    prepend-icon="mdi-information"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="item.price"
                    label="메뉴 가격"
                    type="number"
                    prefix="₩"
                    outlined
                    prepend-icon="mdi-currency-usd"
                    class="mb-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="item.img"
                    label="메뉴 사진"
                    prepend-icon="mdi-camera"
                    outlined
                    class="mb-2"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn color="red" @click="removeMenuItem(index)" class="ma-2">삭제</v-btn>
                </v-col>
              </v-row>
              <v-btn color="primary" @click="addMenuItem" class="ma-2">메뉴 항목 추가</v-btn>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="showDialog = false">취소</v-btn>
            <v-btn color="blue darken-1" text @click="saveMenu">저장</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <Footer />
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      allCategories: [],
      allFacilities: [],
      showDialog: false, // 다이얼로그(모달) 표시 상태
      restaurant: {
        id: this.$route.params.id, // 경로 매개변수에서 ID 가져오기
        name: this.$route.query.name,
        address: this.$route.query.address,
        tel: this.$route.query.tel,
        img: null,
        tableCount: this.$route.query.tableCount, // 문자열을 숫자로 변환
        deposit: this.$route.query.deposit,
        crowd: this.$route.query.crowd,
        categories: [],
        facilities: [],
      },
      menuItems: [],
      headers: [
        { text: '날짜', value: 'date' },
        { text: '시간', value: 'time' },
        { text: '고객 이름', value: 'customerName' },
      ],
      page: 1,
      text: 'hello',
      tab: null,
      checkbox: true,
      radioGroup: 1,
      value: [20, 40],
      selected: null, // 현재 선택된 버튼을 저장
    };
  },
  created() {
    const restaurantId = this.restaurant.id;
    this.fetchCategories(restaurantId);
    this.fetchFacilities(restaurantId);
    this.fetchMenus(restaurantId);
  },
  methods: {
    async fetchCategories(restaurantId) {
      try {
        const response = await axios.get(`${process.env.API_URL}/restaurant/${restaurantId}/categories`);
        const selectedCategories = response.data.map((category) => category.name);
        this.restaurant.categories = selectedCategories;
        this.allCategories = [
          { text: '한식', value: 'KOREAN' },
          { text: '중식', value: 'CHINESE' },
          { text: '일식', value: 'JAPANESE' },
          { text: '양식', value: 'WESTERN' },
          { text: '베트남식', value: 'VIETNAMESE' },
          { text: '미국식', value: 'AMERICAN' },
          { text: '인도식', value: 'INDIAN' },
          { text: '기타 글로벌 음식', value: 'OTHERGLOBALFOOD' },
          { text: '소고기', value: 'BEEF' },
          { text: '돼지고기', value: 'PORK' },
          { text: '스테이크', value: 'STEAK' },
          { text: '곱창/막창', value: 'TRIPE' },
          { text: '해물탕', value: 'SEAFOOD_STEW' },
          { text: '회', value: 'SASHIMI' },
          { text: '초밥', value: 'SUSHI' },
          { text: '조개류', value: 'SHELLFISH' },
          { text: '맥주', value: 'BEER' },
          { text: '전통주', value: 'TRADITIONAL_ALCOHOL' },
          { text: '이자카야', value: 'IZAKAYA' },
          { text: '와인/칵테일', value: 'WINE_COCKTAIL' },
          { text: '혼자', value: 'SOLO' },
          { text: '친구와 함께', value: 'WITH_FRIENDS' },
          { text: '단체', value: 'GROUP_GATHERING' },
          { text: '데이트', value: 'DATE' },
          { text: '가족', value: 'FAMILY' },
          { text: '가성비', value: 'COST_EFFECTIVE' },
          { text: '여의도/마포', value: 'YEOUIDO_MAPO' },
          { text: '용산 밸리', value: 'YONGSAN_VALLEY' },
          { text: '양재', value: 'YANGJAE' },
          { text: '수서', value: 'SUSEO' },
          { text: '홍릉', value: 'HONGNEUNG' },
          { text: '마곡', value: 'MAGOK' },
          { text: '가산 디지털 밸리', value: 'GASAN_DIGITAL_VALLEY' },
          { text: '구로 디지털 밸리', value: 'GURO_DIGITAL_VALLEY' },
        ];
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    async fetchFacilities(restaurantId) {
      try {
        const response = await axios.get(`${process.env.API_URL}/restaurant/${restaurantId}/facilities`);
        const selectedFacilities = response.data.map((facility) => facility.name);
        this.restaurant.facilities = selectedFacilities;
        this.allFacilities = [
          { text: '주차 가능', value: 'PARKING_AVAILABLE' },
          { text: '발렛 파킹', value: 'VALET_AVAILABLE' },
          { text: '콜키지 무료', value: 'CORKAGE_FREE' },
          { text: '콜키지 가능', value: 'CORKAGE_AVAILABLE' },
          { text: '어린이 놀이구역', value: 'WELCOME_KIDS_ZONE' },
          { text: '어린이 금지 구역', value: 'NO_KIDS_ZONE' },
          { text: '대관 가능', value: 'RENTAL_AVAILABLE' },
          { text: '소믈리에 서비스', value: 'SOMMELIER_AVAILABLE' },
          { text: '장애인 시설', value: 'DISABLED_FACILITIES_AVAILABLE' },
          { text: '반려동물 동반 가능', value: 'PET_FRIENDLY' },
          { text: '무료 와이파이', value: 'FREE_WIFI_AVAILABLE' },
          { text: '흡연 구역', value: 'SMOKING_ZONE' },
        ];
      } catch (error) {
        console.error('Failed to fetch facilities:', error);
      }
    },
    async fetchMenus(restaurantId) {
      try {
        const response = await axios.get(`${process.env.API_URL}/restaurant/${restaurantId}/menus`);
        this.menuItems = response.data.map((menu) => ({
          id: menu.id,
          name: menu.name,
          menuInfo: menu.menuInfo,
          price: menu.price,
          img: menu.img,
        }));
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    },
    goToRestaurantManageMain(restaurant) {
      this.$router.push({ path: `/restaurant/RestaurantManageMainPage/${restaurant.id}` });
    },
    goToRestaurantReserveManage() {
      this.$router.push({ path: '/restaurant/RestaurantReserveManagePage' });
    },
    goToReviewManage() {
      this.$router.push({ path: '/restaurant/ReviewManagePage' });
    },
    toggleSelection(button) {
      this.selected = this.selected === button ? null : button;
    },
    async updateRestaurantInfo() {
      const restaurantData = {
        id: this.restaurant.id,
        name: this.restaurant.name,
        address: this.restaurant.address,
        tel: this.restaurant.tel,
        tableCount: this.restaurant.tableCount,
        deposit: this.restaurant.deposit,
        crowd: this.restaurant.crowd,
        categories: this.restaurant.categories.map(category => ({
          name: category
        })),
        facilities: this.restaurant.facilities.map(facility => ({
          name: facility
        })),
        menus: this.menuItems.map(item => ({
          id: item.id,
          name: item.name,
          menuInfo: item.menuInfo,
          price: item.price,
          img: item.img instanceof File ? null : item.img,
        })),
      };
      console.log("restaurantData에 들어가는 메뉴이미지:", this.menuItems);
      const formData = new FormData();
      formData.append('restaurantData', JSON.stringify(restaurantData));
      if (this.restaurant.img instanceof File) {
        formData.append('image', this.restaurant.img);
      }
      this.menuItems.forEach((item) => {
        if (item.img instanceof File) {
          formData.append(`menuImages[${item.name}]`, item.img);
        }
      });
      try {
        const response = await axios.put(`${process.env.API_URL}/restaurant/${this.restaurant.id}`, formData);
        console.log('식당 정보가 성공적으로 업데이트되었습니다:', response.data);
        alert('식당 정보가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error('식당 정보 업데이트 중 오류가 발생했습니다:', error);
        alert('식당 정보 업데이트 중 오류가 발생했습니다.');
      }
    },
    saveMenu() {
      console.log('Menu saved:', this.menuItems);
      this.showDialog = false;
    },
    addMenuItem() {
      const newItem = {
        name: '',
        menuInfo: '',
        price: 0,
        img: '',
      };
      this.menuItems.push(newItem);
    },
    removeMenuItem(index) {
      this.menuItems.splice(index, 1);
    },
  },
};
</script>
<style>
.restaurant-manage {
  padding: 20px;
  background-color: #FFFFFF; /* 배경색을 하얀색으로 설정 */
  border-radius: 8px;
}
.tabs {
  background-color: #FFFFFF;
  border-bottom: 2px solid #ddd;
}
.v-text-field,
.v-select,
.v-file-input {
  margin-bottom: 16px;
  background-color: #FFFFFF; /* 수정 가능한 input 박스의 기본 배경색을 하얀색으로 설정 */
}
.v-text-field input,
.v-select input,
.v-file-input input {
  background-color: #FFFFFF;
}
.v-text-field input:focus,
.v-select input:focus,
.v-file-input input:focus {
  background-color: #FFFFFF; /* 커서 클릭 시 하얀색으로 변경 */
}
.v-btn {
  border-radius: 8px;
  font-weight: bold;
}
.v-btn.primary {
  background-color: #1976D2;
  color: #fff;
}
.v-btn.red {
  background-color: #E53935;
  color: #fff;
}
.v-btn.success {
  background-color: #43A047;
  color: #fff;
}
.v-dialog .v-card {
  border-radius: 12px;
}
.headline {
  font-size: 1.5rem;
  font-weight: bold;
}
.v-card-title {
  padding: 16px;
  background-color: #F5F5F5;
  font-weight: bold;
}
.v-card-text {
  padding: 16px;
}
.v-card-actions {
  padding: 16px;
  background-color: #F5F5F5;
}
</style>