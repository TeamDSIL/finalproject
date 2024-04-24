<template>
    <div class="px-8">
                    <v-row>
                      <v-col cols="12">
                        <h3 class="fw-bold">나의 예약현황</h3>
                      </v-col>
                      <v-col cols="12" v-for="(n, index) in 4" :key="index">
                        <div
                          class="d-flex justify-space-between align-center flex-wrap"
                        >
                          <div class="d-flex flex-wrap">
                            <v-avatar class="me-3" size="150" tile>
                              <img src="~/assets/images/4.png" alt="" />
                            </v-avatar>
                            <div>
                              <h5 class="f-600 mb-3">우리식당 서울관악점</h5>
                              <v-chip
                                class="text-uppercase mb-2"
                                text-color="secondary"
                                small
                                color="grey lighten-4"
                                >예약중</v-chip
                              >
                              <div>
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >시간: 17:00</span
                                >
                                <span
                                  class="text-14 grey--text text--darken-4 me-2 mb-0"
                                  >인원수: 2명</span
                                >
                                <p class="text-14 primary--text mb-0">
                                  예약금: 30,000원
                                </p>


                           
                                  <nuxt-link
                                    to="/myDining/WriteReviewPage"
                                    class="text-decoration-none white--text"
                                  >
                                  <v-btn
                                  outlined
                                  color="primary"
                                  small
                                  class="review-write-button">
                                    리뷰 쓰기
                                    <v-icon right small>mdi-plus</v-icon>
                                  </v-btn>
                                    
                                  </nuxt-link>
                                  <v-btn outlined color="primary" small class="review-write-button" @click="dialog = true">
      리뷰 쓰기2
      <v-icon right small>mdi-plus</v-icon>
    </v-btn>

    <!-- 모달 창 -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>리뷰 작성</v-card-title>
        <v-card-text>
          <v-textarea auto-grow label="리뷰 내용"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">취소</v-btn>
          <v-btn color="blue darken-1" text @click="submitReview">제출</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
                           

                              </div>
                              <!-- <p class="text-14 grey--text text--darken-1">(4 Pcs mutton in chicken keema gravy)</p> -->
                            </div>
                          </div>

                          <div>
                            <v-btn
                              outlined
                              color="primary"
                              small
                              class="delete-button"
                            >
                              삭제 요청
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
  </template>
  
  <script>
export default {
    data() {
        return {
    dialog: false,

        }
    }
  }
  
  </script>
  
  <style>
  /* .btn {
    color: white;
  } */
  </style>
  