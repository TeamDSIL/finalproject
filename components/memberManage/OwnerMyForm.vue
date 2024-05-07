<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <Box class="dashboard-box">
            <div slot="boxSidebar">
              <OwnerDashboardSidebar />

              <v-card>
                <div id="select-userInfo-btn">
                  <h1 class="grey--text text-12 pa-5 text-uppercase font-weight-regular">My 매장</h1>
                  <ul>
                    <li v-for="(item, index) in ownerInfos" :key="index" @click="toggleItem(index)"
                      :class="{ 'selected': selectedItem === index, 'hover': hoverItem === index }"
                      class="mb-0 text--darken-1 text-14 mb-3 mb-sm-0 d-none d-sm-block" @mouseover="hoverItem = index"
                      @mouseleave="hoverItem = null">
                      {{ item.매장명 }}
                    </li>
                  </ul>
                </div>
              </v-card>
            </div>


            <div slot="boxContent">
              <div class="px-10">
                <v-row>
                  <v-col cols="12" id="header-info-position">
                    <h1>회원정보</h1>
                    <div id="position-set">
                      <v-dialog v-model="dialogModify" width="500">
                        <template v-slot:activator="{ on }">
                          <v-btn light text v-on="on" class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                            id="modify-ownerInfo-btn">
                            <span class="d-none d-sm-block">수정</span>
                          </v-btn>
                        </template>
                        <OwnerInfoModifyForm :selectedOwnerInfo="selectedOwnerInfo" :dialogModify="dialogModify"
                          @modify="handleModify" />
                      </v-dialog>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-card elevation="0" class="border br-10">
                      <div v-for="(item, key) in selectedOwnerInfo" :key="key">
                        <v-divider></v-divider>
                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                {{ key }}
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ item }}
                          </p>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <br>
                <div id="bottom-text">
                  <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">계약 해지를 원하시면 전화 문의 부탁드립니다. 고객 센터
                    010-6634-9023</p>
                </div>
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
import OwnerDashboardSidebar from "@/components/OwnerDashboardSidebar.vue";
import OwnerInfoModifyForm from "@/components/memberManage/OwnerInfoModifyForm.vue";

export default {
  components: {
    OwnerDashboardSidebar,
    OwnerInfoModifyForm,
  },
  data() {
    return {
      dialogModify: false,
      selectedItem: null,
      selectedOwnerInfo: null,
      hoverItem: null,
      ownerInfos: [
        {
          이메일: 'dvbf@naver.com',
          이름: '윤호상',
          매장명: '기영이 숯불 두마리 치킨',
          연락처: '+82 10-9677-7048',
          주소: '서울시 노원구 중계동 덕릉로 71길 30, 105동 405호',
          우편번호: '01709',
          사업자등록번호: '2170349086',
        },
        {
          이메일: 'fbvd@naver.com',
          이름: '윤윤윤',
          매장명: '봉구스 밥버거',
          연락처: '+82 10-7048-9677',
          주소: '얄ㅇ아라라이리',
          우편번호: '123523',
          사업자등록번호: '2948859035',
        }
      ]
    };
  },
  mounted() {
    // 컴포넌트가 마운트될 때 첫 번째 항목을 선택합니다.
    this.selectedItem = 0;
    this.selectedOwnerInfo = this.ownerInfos[0];
  },
  methods: {
    toggleItem(index) {
      this.selectedItem = index;
      this.selectedOwnerInfo = this.ownerInfos[index];
    },
    handleModify() {
      // 수정된 데이터 처리 로직
    },
  },
};
</script>

<style>
#position-set {
  margin-left: 80%;
}

#header-info-position {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#bottom-text {
  display: flex;
  justify-content: center;
}

#select-userInfo-btn {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  transition: background-color 0.3s ease;
  position: relative;
  /* 상대 위치 지정 */
}

li:hover {
  background-color: #f0f0f0;
  /* 마우스를 올렸을 때 회색 배경 */
}

li.selected {
  background-color: #e86253;
  /* 클릭 후 파란색 배경 */
  color: white;
}

li:hover p {
  color: red;
  /* 마우스를 올렸을 때 글씨 빨간색으로 변경 */
}

li:hover:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: red;
  /* 마우스를 올렸을 때 왼쪽 테두리 빨간색으로 추가 */
}

#modify-ownerInfo-btn {
  background-color: transparent !important;
  /* 버튼의 배경을 투명으로 설정 */
}
</style>
