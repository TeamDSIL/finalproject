<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <Box class="dashboard-box">
            <div slot="boxSidebar">
              <AdminDashBoardSideBar />
            </div>
            <div slot="boxContent">
              <div class="px-10">
                <v-row>
                  <v-col cols="12">
                    <h1>식당 등록 관리</h1>
                  </v-col>

                  <v-row>
                    <v-col cols="12">
                      <v-card>
                        <v-card-title> 식당 정보 </v-card-title>

                        <v-container>
                          <!-- 식당 정보 수정 폼 -->
                          <v-form>
                            <v-row>
                              <v-col cols="6">
                                <v-container>
                                  <!-- 회원 ID  -->
                                  <v-text-field
                                    v-model="restaurant.email"
                                    label="회원 ID"
                                    outlined
                                  ></v-text-field>

                                  <!-- 회원 PW  -->
                                  <v-text-field
                                    v-model="restaurant.password"
                                    label="회원 PW"
                                    outlined
                                  ></v-text-field>

                                  <!-- 사업자등록번호  -->
                                  <v-text-field
                                    v-model="restaurant.registerNumber"
                                    label="사업자등록번호"
                                    outlined
                                  ></v-text-field>

                                  <!-- 식당명 (읽기 전용) -->
                                  <v-text-field
                                    v-model="restaurant.restaurantName"
                                    label="식당명"
                                    outlined
                                  ></v-text-field>

                                  <v-btn
                                    @click="sample6_execDaumPostcode"
                                    style="margin-bottom: 20px"
                                    small
                                    color="primary"
                                    >식당주소 찾기</v-btn
                                  >
                                  <v-text-field
                                    v-model="restaurant.postcode"
                                    label="우편번호"
                                    type="text"
                                    placeholder="우편번호"
                                  ></v-text-field>

                                  <v-text-field
                                    v-model="restaurant.dynamicAddress"
                                    label="주소"
                                    type="text"
                                    placeholder="주소"
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="restaurant.detailAddress"
                                    label="상세주소"
                                    type="text"
                                    placeholder="상세주소 입력"
                                    ref="detailAddress"
                                  ></v-text-field>

                                  <v-text-field
                                    v-model="restaurant.extraAddress"
                                    label="참고항목"
                                    type="text"
                                    placeholder="참고항목"
                                  ></v-text-field>
                                </v-container>
                                <!--편의시설 등록 -->
                                <v-select
                                  style="margin-top: 12px"
                                  v-model="restaurant.facilities"
                                  :items="facilities"
                                  label="편의시설 선택"
                                  multiple
                                  outlined
                                  attach
                                  chips
                                  small-chips
                                ></v-select>
                              </v-col>

                              <v-col cols="6">
                                <v-container>
                                  <v-text-field
                                    v-model="restaurant.userName"
                                    label="이름"
                                    outlined
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="restaurant.userTel"
                                    label="사용자 전화번호"
                                    outlined
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="restaurant.userAddress"
                                    label="사용자 주소"
                                    outlined
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="restaurant.restaurantTel"
                                    label="식당 연락처"
                                    outlined
                                  ></v-text-field>

                                  <!-- 식당 테이블 수 -->
                                  <v-text-field
                                    v-model="restaurant.tableCount"
                                    label="테이블 수"
                                    outlined
                                  ></v-text-field>

                                  <!-- 예약금 설정 -->
                                  <v-text-field
                                    v-model="restaurant.deposit"
                                    label="예약금 설정"
                                    outlined
                                  ></v-text-field>
                                  <!-- 식당 설명 설정 -->
                                  <v-textarea
                                    v-model="restaurant.description"
                                    label="식당 설명"
                                    outlined
                                    rows="5"
                                    auto-grow
                                    placeholder="식당에 대한 설명을 입력하세요."
                                  ></v-textarea>

                                  <!-- 식당 사진 -->
                                  <v-file-input
                                  v-model="restaurant.img"
                                  accept="image/*"
                                    label="식당 사진"
                                    prepend-icon="mdi-camera"
                                    outlined
                                  ></v-file-input>

                                  <!-- 카테고리 등록 -->
                                  <v-select
                                    v-model="restaurant.category"
                                    :items="categories"
                                    label="카테고리 선택"
                                    multiple
                                    outlined
                                    attach
                                    chips
                                    small-chips
                                  ></v-select>
                                </v-container>
                              </v-col>
                            </v-row>

                            <v-container>
                              <div
                                v-for="(item, index) in restaurant.menuItems"
                                :key="index"
                              >
                                <v-text-field
                                  v-model="item.name"
                                  label="메뉴 이름"
                                  outlined
                                ></v-text-field>
                                <v-text-field
                                  v-model="item.menuInfo"
                                  label="메뉴 설명"
                                  outlined
                                ></v-text-field>
                                <v-text-field
                                  v-model="item.price"
                                  label="메뉴 가격"
                                  type="number"
                                  prefix="₩"
                                  outlined
                                ></v-text-field>
                                <v-col cols="12">
                                  <v-row>
                                    <v-col cols="10">
                                      <v-file-input
                                        v-model="item.photo"
                                        label="메뉴 사진"
                                        prepend-icon="mdi-camera"
                                        outlined
                                      ></v-file-input
                                    ></v-col>
                                    <v-col cols="2">
                                      <v-btn
                                        color="primary"
                                        @click="removeMenuItem(index)"
                                        class="ma-2"
                                        >삭제</v-btn
                                      >
                                    </v-col>
                                  </v-row>
                                </v-col>
                              </div>
                              <v-btn
                                color="primary"
                                @click="addMenuItem"
                                small
                                class="ma-2"
                                >메뉴 항목 추가</v-btn
                              >
                            </v-container>

                            <!-- 정보 등록 버튼 -->
                            <v-btn
                              color="rgb(255,207,2)"
                              class="ma-2"
                              @click="SubmitForm"
                            >
                              등록
                            </v-btn>
                          </v-form>
                        </v-container>
                      </v-card>
                    </v-col>
                  </v-row>
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
import axios from "axios";

export default {
  data() {
    return {
      showDialog: false, // 다이얼로그 표시 상태
      restaurant: {
        file: null,
        email: "",
        password: "",
        userName: "",
        userTel: "",
        userAddress: "",

        restaurantName: "",
        registerNumber: "",
        restaurantTel: "",
        restaurantAddress: "",
        tableCount: "",
        deposit: "",
        img: null,
        description: "",
        category: [],
        facilities: [],
        postcode: "",
        dynamicAddress: "",
        detailAddress: "",
        extraAddress: "",
        menuItems: [],
      },

      categories: [
        { text: "한식", value: "KOREAN" },
        { text: "중식", value: "CHINESE" },
        { text: "일식", value: "JAPANESE" },
        { text: "양식", value: "WESTERN" },
        { text: "베트남식", value: "VIETNAMESE" },
        { text: "미국식", value: "AMERICAN" },
        { text: "인도식", value: "INDIAN" },
        { text: "기타 글로벌 음식", value: "OTHERGLOBALFOOD" },
        { text: "소고기", value: "BEEF" },
        { text: "돼지고기", value: "PORK" },
        { text: "스테이크", value: "STEAK" },
        { text: "곱창/막창", value: "TRIPE" },
        { text: "해물탕", value: "SEAFOOD_STEW" },
        { text: "회", value: "SASHIMI" },
        { text: "초밥", value: "SUSHI" },
        { text: "조개류", value: "SHELLFISH" },
        { text: "맥주", value: "BEER" },
        { text: "전통주", value: "TRADITIONAL_ALCOHOL" },
        { text: "이자카야", value: "IZAKAYA" },
        { text: "와인/칵테일", value: "WINE_COCKTAIL" },
        { text: "혼자", value: "SOLO" },
        { text: "친구와 함께", value: "WITH_FRIENDS" },
        { text: "단체", value: "GROUP_GATHERING" },
        { text: "데이트", value: "DATE" },
        { text: "가족", value: "FAMILY" },
        { text: "가성비", value: "COST_EFFECTIVE" },
        { text: "여의도/마포", value: "YEOUIDO_MAPO" },
        { text: "용산 밸리", value: "YONGSAN_VALLEY" },
        { text: "양재", value: "YANGJAE" },
        { text: "수서", value: "SUSEO" },
        { text: "홍릉", value: "HONGNEUNG" },
        { text: "마곡", value: "MAGOK" },
        { text: "가산 디지털 밸리", value: "GASAN_DIGITAL_VALLEY" },
        { text: "구로 디지털 밸리", value: "GURO_DIGITAL_VALLEY" },
      ],
      facilities: [
        { text: "주차 가능", value: "PARKING_AVAILABLE" },
        { text: "발렛 파킹", value: "VALET_AVAILABLE" },
        { text: "콜키지 무료", value: "CORKAGE_FREE" },
        { text: "콜키지 가능", value: "CORKAGE_AVAILABLE" },
        { text: "어린이 놀이구역", value: "WELCOME_KIDS_ZONE" },
        { text: "어린이 금지 구역", value: "NO_KIDS_ZONE" },
        { text: "대관 가능", value: "RENTAL_AVAILABLE" },
        { text: "소믈리에 서비스", value: "SOMMELIER_AVAILABLE" },
        { text: "장애인 시설", value: "DISABLED_FACILITIES_AVAILABLE" },
        { text: "반려동물 동반 가능", value: "PET_FRIENDLY" },
        { text: "무료 와이파이", value: "FREE_WIFI_AVAILABLE" },
        { text: "흡연 구역", value: "SMOKING_ZONE" },
      ],

      page: 1,
      items: [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
        {
          text: "New York",
          disabled: false,
          href: "/",
        },
        {
          text: "Resturants",
          disabled: true,
          href: "/",
        },
      ],
      text: "hello",
      tab: null,
      checkbox: true,
      radioGroup: 1,
      value: [20, 40],
      selected: null, // 현재 선택된 버튼을 저장
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(script);
  },
  methods: {
    async SubmitForm() {
  try {
    this.restaurant.restaurantAddress = `${this.restaurant.dynamicAddress} ${this.restaurant.detailAddress}`;
    console.log(this.restaurant.restaurantAddress);

    // Create a FormData object
    const formData = new FormData();
    formData.append('email', this.restaurant.email);
    formData.append('password', this.restaurant.password);
    formData.append('userName', this.restaurant.userName);
    formData.append('userTel', this.restaurant.userTel);
    formData.append('userAddress', this.restaurant.userAddress);
    formData.append('restaurantName', this.restaurant.restaurantName);
    formData.append('registerNumber', this.restaurant.registerNumber);
    formData.append('restaurantTel', this.restaurant.restaurantTel);
    formData.append('restaurantAddress', this.restaurant.restaurantAddress);
    formData.append('postcode', this.restaurant.postcode);
    formData.append('tableCount', this.restaurant.tableCount);
    formData.append('deposit', this.restaurant.deposit);
    formData.append('img', this.restaurant.img); // Assuming img is a File object
    formData.append('description', this.restaurant.description);
    formData.append('categories', this.restaurant.category); // Convert to JSON string if it's an array or object
    formData.append('facilities', this.restaurant.facilities); // Convert to JSON string if it's an array or object

    // Append menu items
    this.restaurant.menuItems.forEach((item, index) => {
      formData.append(`menuDTOs[${index}].name`, item.name);
      formData.append(`menuDTOs[${index}].price`, item.price);
      formData.append(`menuDTOs[${index}].img`, item.photo); // Assuming photo is a File object
      formData.append(`menuDTOs[${index}].menuInfo`, item.menuInfo);
    });

    const token = this.$store.state.token || localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    alert('토큰을 찾을 수 없습니다.');
                    return;
                }

    // Send the form data
    const response = await axios.post(
      `${process.env.API_URL}/memberManage/registerRestaurant`,
      formData,
      {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );

    console.log("서버 응답:", response);
    alert("식당 정보가 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error("서버로부터 에러 응답:", error);
    alert("식당 정보 등록에 실패하였습니다.");
  }
},
    sample6_execDaumPostcode() {
      new daum.Postcode({
        oncomplete: (data) => {
          // 데이터를 Vue 인스턴스의 데이터에 직접 할당
          this.restaurant.postcode = data.zonecode;
          this.restaurant.dynamicAddress =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;
          this.restaurant.detailAddress = ""; // 상세 주소는 사용자 입력을 위해 초기화
          this.restaurant.extraAddress =
            data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : "";

          // 포커스를 상세 주소 필드로 이동
          this.$nextTick(() => {
            this.$refs.detailAddress.focus();
          });
        },
      }).open();
    },
    goToRestaurantManageMain() {
      this.$router.push({ path: "/memberManage/AdminManageRestaurantPage" });
    },
    goToRestaurantReserveManage() {
      this.$router.push({ path: "/restaurant/RestaurantReserveManagePage" });
    },
    goToReviewManage() {
      this.$router.push({ path: "/restaurant/ReviewManagePage" });
    },
    toggleSelection(button) {
      // 선택된 버튼이 다시 클릭되면 선택 해제, 아니면 선택
      this.selected = this.selected === button ? null : button;
    },
    updateRestaurantInfo() {
      // 정보 업데이트 로직 추가
      console.log("업데이트된 정보:", this.restaurant);
    },
    saveMenu() {
      console.log("Menu saved:", this.restaurant.menuItems);
      this.showDialog = false;
    },
    addMenuItem() {
      const newItem = {
        id: Date.now(), // 메뉴 ID는 현재 시간을 기반으로 자동 생성
        name: "",
        photo: null,
        price: 0,
      };
      this.restaurant.menuItems.push(newItem);
    },
    removeMenuItem(index) {
      this.restaurant.menuItems.splice(index, 1);
    },
  },
};
</script>
<style></style>
