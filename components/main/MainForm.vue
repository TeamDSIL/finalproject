<!-- <template>
    <div>
     메인페이지
    </div>
  </template>
  
  <script>

  
  
  export default {
    mounted() {

  }
  };
  </script>
  
  <style>

  </style>
   -->


   <template>
    <v-container>
      <!-- 검색 바와 필터 버튼 -->
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            @keyup.enter="searchRestaurants"
          ></v-text-field>
          <v-btn color="primary" @click="dialog = true">지역, 음식종류</v-btn>
      </v-col>
      </v-row>
      <!-- 모달 창 -->
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">필터 조건 선택</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" >
                  <v-checkbox
                    v-for="region in regions"
                    :key="region"
                    v-model="selectedRegions"
                    :label="`지역: ${region}`"
                    :value="region"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-for="type in foodTypes"
                    :key="type"
                    v-model="selectedFoodTypes"
                    :label="`음식 종류: ${type}`"
                    :value="type"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">취소</v-btn>
            <v-btn color="blue darken-1" text @click="applyFilters">적용</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <h2>메인페이지임</h2>
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          > <v-img :src="item.src" @click.native="navigateTo(item.name)"></v-img> <!-- 여기에 클릭 이벤트 추가 -->

          </v-carousel-item>
        </v-carousel>
      </v-row>

      </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: "",
        dialog: false,
        regions: [
          "양재",
          "동대문",
          "여의도",
          "마포",
          "수서",
          "구디",
          "가디",
          "마곡",
          "용산",
        ],
        foodTypes: ["한식", "중식", "일식", "양식"],
        selectedRegions: [],
        selectedFoodTypes: [],
        items: [
          {
            src: require("@/assets/images/dsilLogoCut.jpg"),
          },
          {
            src: require("@/assets/images/carousels_infor.png"),
            name: 'main-InformationPage'
          },
          {
            src: require("@/assets/images/carousels_roulette.png"),
          },
        ],
      };
    },
    methods: {
      navigateTo(name) {
      if (name === 'main-InformationPage') {
        this.$router.push('/main/InformationPage');
      }
    },
      searchRestaurants() {
        // 검색 로직을 구현
        console.log(
          `Searching for: ${this.search} in ${this.selectedRegions.join(
            ", "
          )} with ${this.selectedFoodTypes.join(", ")}`
        );
      },
      applyFilters() {
        this.dialog = false;
        this.searchRestaurants();
      },
    },
  };
  </script>
  
  <style>
  /* .btn {
      color: white;
    } */
  </style>
  