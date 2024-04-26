<template>
  <div>
    <h1>식당관리자 페이지</h1>
    <v-container>
      <v-row>
        <v-col cols="12" class="mb-10">
          <v-img class="br-10 d-flex cover-img align-end" cover :src="require('~/assets/images/cover-img.png')"
            gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,0)">

            <div class="d-flex justify-center justify-md-space-between align-center mx-10 cover-image-content ">
              <div class="d-md-flex d-block align-center text-md-left text-center flex-wrap">
                <label for="avatarUpload" class="me-4">
                  <div class="avatar-upload">
                    <v-avatar size="160">
                      <img src="~/assets/images/faces/big-avatar.png" alt="">
                    </v-avatar>
                    <v-btn class="avatar-upload-btn" fab dark small color="grey lighten-4">
                      <v-icon color="secondary" dark size="20">
                        mdi-camera
                      </v-icon>
                    </v-btn>
                    <input class="d-none" type="file" id="avatarUpload" />
                  </div>

                </label>
                <div>
                  <h2 class="white--text text-md-left text-center mb-1">윤호상</h2>
                  <div class="d-flex mb-1 justify-center justify-md-start">
                    <v-icon size="15" class="me-2" color="white">mdi-map-marker</v-icon>
                    <h6 class="font-weight-light white--text">서울시 노원구</h6>
                  </div>
                  <h6 class="font-weight-light white--text">먹고 자는 게 최고</h6>
                </div>
              </div>

              <div class="d-none d-md-flex">
                <div class="text-center">
                  <h2 class="font-weight-bold white--text">24</h2>
                  <h6 class="font-weight-regular white--text">리뷰</h6>
                </div>
                <div class="mx-3">
                  <v-divider vertical dark></v-divider>
                </div>
                <div class="text-center">
                  <h2 class="font-weight-bold white--text">45</h2>
                  <h6 class="font-weight-regular white--text">사진</h6>
                </div>
                <div class="mx-3">
                  <v-divider vertical dark></v-divider>
                </div>
                <div class="text-center">
                  <h2 class="font-weight-bold white--text">1.6k</h2>
                  <h6 class="font-weight-regular white--text">팔로워</h6>
                </div>
              </div>

            </div>

          </v-img>
        </v-col>
        <v-col cols="12">
          <Box class="dashboard-box">
            <div slot="boxSidebar">
              <DashboardSidebar />

            </div>
            
            <div slot="boxContent">
              <div class="px-10">
                <v-row>
                  <v-col cols="12" id="header-info-position">
                    <h1>회원정보</h1>


                    <div id="position-set">

                      <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn light text v-bind="attrs" v-on="on"
                            class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0" id="modify-userInfo-btn">
                            <span class="d-none d-sm-block">수정</span>
                          </v-btn>
                        </template>

                        <OwnerInfoModifyForm />
                      </v-dialog>

                      <!-- <div id="delete-userInfo-btn">    본인이 갖고 있는 매장 토글
                        <ul>
                          <li v-for="(item, index) in items" :key="index" @click="toggleItem(index)"
                            :class="{ 'selected': selectedItem === index }">
                            {{ item.name }}
                          </li>
                        </ul>
                        <p v-if="selectedItem !== null">Selected: {{ items[selectedItem].name }}</p>
                      </div> -->

                      <v-btn text color="" class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                        id="delete-userInfo-btn">매장 선택</v-btn>
                    </div>
                  </v-col>

                  <v-col cols="12">
                    <v-card elevation="0" class="border br-10">


                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              이메일
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          dvbf@naver.com
                        </p>
                        
                      </div>

                      <v-divider></v-divider>

                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              이름
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          윤호상
                        </p>
                        
                      </div>
                      <v-divider></v-divider>

                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              매장명
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          기영이 숯불 두마리 치킨
                        </p>
                        
                      </div>
                      <v-divider></v-divider>

                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              연락처
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          +82 10-9677-7048
                        </p>
                       
                      </div>
                      <v-divider></v-divider>


                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              주소
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          서울시 노원구 중계동 덕릉로 71길 30, 105동 405호
                        </p>
                        
                      </div>
                      <v-divider></v-divider>

                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              우편번호
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          01709
                        </p>
                        
                      </div>
                      <v-divider></v-divider>

                      <div
                        class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                        <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                          <div class="text-center text-sm-left">
                            <div class="text-14 f-600 mb-2 mb-sm-0">
                              사업장 등록번호
                            </div>
                          </div>
                        </div>
                        <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                          217-03-49086
                        </p>
                        
                      </div>
                      <v-divider></v-divider>
                    </v-card>
                  </v-col>
                </v-row>
                <br>
                
              <div id="bottom-text">
                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">계약 해지를 원하시면 전화 문의 부탁드립니다. 고객 센터 010-6634-9023</p>
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
import OwnerInfoModifyForm from '@/components/memberManage/OwnerInfoModifyForm.vue';

export default {
    components:{
      OwnerInfoModifyForm,
        
    },
    data() {
        return {
            page: 1,

        }
    },
}
</script>

<style>
#id-modify-btn,
#post-modify-btn,
#address-modify-btn,
#tel-modify-btn,
#name-modify-btn {
  visibility: hidden;
}

#position-set {
  margin-left: 80%;
}

#header-info-position {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#bottom-text{
  display: flex;
  justify-content: center;
}
</style>