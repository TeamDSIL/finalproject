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
                      :class="{ 'selected': selectedItem === index, 'hover': hoverItem === index, 'my-maechang': true }"
                      class="mb-0 text--darken-1 text-14 mb-3 mb-sm-0 d-none d-sm-block" @mouseover="hoverItem = index"
                      @mouseleave="hoverItem = null">
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </v-card>
            </div>

            <div slot="boxContent">
              <div class="px-10">
                <v-row>
                  <v-col cols="12">
                    <div id="position-set">
                      <h1>회원정보</h1>
                      <v-dialog v-model="dialogModify" width="500">
                        <template v-slot:activator="{ on }">
                          <v-btn light text v-on="on" class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                            id="modify-ownerInfo-btn">
                            <span class="d-none d-sm-block">수정</span>
                          </v-btn>
                        </template>
                        <OwnerInfoModifyForm :selectedOwnerInfo="selectedOwnerInfo" :dialogModify="dialogModify" />
                      </v-dialog>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-card elevation="0" class="border br-10">
                      <div v-if="selectedOwnerInfo">
                        <v-divider></v-divider>
                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                이메일
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.email }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                매장명
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.name }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                사업자명
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.ownerName }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                사업자등록번호
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.registerNumber }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                연락처
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.tel }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                        <div
                          class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                          <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                            <div class="text-center text-sm-left">
                              <div class="text-14 f-600 mb-2 mb-sm-0">
                                주소
                              </div>
                            </div>
                          </div>
                          <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                            {{ selectedOwnerInfo.address }}
                          </p>
                        </div>
                        <v-divider></v-divider>

                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                <br>
                <div id="bottom-text">
                  <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">계약 해지를 원하시면 전화 문의 부탁드립니다. 고객 센터
                    010-2687-0737</p>
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
import axios from "axios";

export default {
  components: {
    OwnerDashboardSidebar,
    OwnerInfoModifyForm,
  },
  async created() {
    await this.fetchUserInfo();
    this.fetchOwnerInfos();
  },
  data() {
    return {
      dialogModify: false,
      selectedItem: null,
      selectedOwnerInfo: null,
      hoverItem: null,
      user: null,
      ownerInfos: [
        {
          id: '',
          email: '',
          modifiedPassword: '',           // 비밀번호
          confirmPassword: '',    // 비밀번호 확인
          name: '',               // 매장명
          ownerName: '',        // 사업자명
          tel: '',              // 연락처
          address: '',            // 주소
          registerNumber: '',     // 사업자등록번호
        },
      ],

    };
  },
  methods: {
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error('No token found');
        }

        // 토큰을 Authorization 헤더에 포함하여 요청 보내기
        const response = await axios.get('http://localhost:8000/userInfo/me', {
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
    async fetchOwnerInfos() {
      // API 통신을 통해 식당 정보를 받아옵니다.
      const email = this.user.email;
      const response = await axios.get(`http://localhost:8000/memberManage/ownerMyPage?email=${email}`)
        // this.selectedOwnerInfo.email
        .then((response) => {
          // 받아온 식당 정보를 restaurants에 저장합니다.
          console.log(response.data);
          this.ownerInfos = response.data;
          // 데이터를 성공적으로 가져온 후에 첫 번째 항목을 선택합니다.
          this.selectedItem = 0;
          this.selectedOwnerInfo = this.ownerInfos[0];

        })
        .catch((error) => {
          console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
        })
    },
    toggleItem(index) {
      this.selectedItem = index;
      this.selectedOwnerInfo = this.ownerInfos[index];
    },
  },
}
</script>

<style>
#position-set {
  display: flex;
  white-space: nowrap;
  align-items: center;
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
  background-color: #da1600da;
  /* 클릭 후 파란색 배경 */
  color: white;
}

li:hover p {
  color: red;
  /* 마우스를 올렸을 때 글씨 빨간색으로 변경 */
}

.my-maechang:hover:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background-color: red;
}

#modify-ownerInfo-btn {
  background-color: transparent !important;
  /* 버튼의 배경을 투명으로 설정 */
}
</style>
