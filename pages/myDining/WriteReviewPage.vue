<template>
  <div
    class="bg-body d-flex flex-column justify-center align-center min-vh-100"
  >
    <div class="sign-up-card">
      <div class="sign-up-card-container">
        <div class="write-review-logo">
            <v-img :src="require('~/assets/images/logo.jpg')" class="review-logo"></v-img>

        </div>

        <div class="text-center mb-10">
          <h3 class="mb-3">리뷰 작성</h3>
          <h5 class="text-sm font-600 grey--text text--darken-4" style="font-weight: 500;">우리식당 창원점</h5>
        </div>
        <v-divider></v-divider>
        <div class="mb-4">
            <div class="divider"></div>
          <p class="text-14 mb-1" style="font-weight: bold;">예약한 식당은 어떠셨나요?</p>
          <div class="babscore">
            <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          <v-img :src="require('~/assets/images/babscore.png')" width="20px" class="fixed-size"></v-img>
          </div>


          <!-- <v-text-field
            placeholder="Ralph Awards"
            outlined
            dense
            hide-details=""
            class="mb-4"
          ></v-text-field> -->
        </div>


        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold;">작성날짜: 2024-01-01</p>
          <!-- <v-text-field
            placeholder="Ralph Awards"
            outlined
            dense
            hide-details=""
            class="mb-4"
          ></v-text-field> -->
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold;">내용</p>
          <v-textarea outlined dense hide-details="" class="mb-4"></v-textarea>
        </div>

        <div class="mb-4">
          <v-btn block color="primary" class="text-capitalize font-600">
            등록하기
          </v-btn>
        </div>
      </div>
      <div class="py-4 bg-grey-light">
        <div class="text-center">
          <div class="text-center">
            <div class="text-14 text-center my-3">
              <button
                @click="goBack"
                class="grey--text text--darken-4 font-600"
              >
                뒤로 가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "session",
  data() {
    return {
      checkbox: false,
    };
  },
  methods: {
    goBack() {
      window.history.back(); // 브라우저 이력에서 한 단계 뒤로 갑니다
    },
  },
};
</script>

<style lang="scss" scoped>
.review-logo{
    max-width: 150px; /* 최대 너비 고정 */
  max-height: 150px; /* 최대 높이 고정 */
}
.write-review-logo{
    display: flex;
    justify-content: center;
}
.divider{
    margin-top: 10px;
}
.babscore{
    display: flex; /* 이 속성을 추가하여 이미지들을 가로로 정렬 */
  justify-content: left; /* 가운데 정렬 */
  align-items: center; /* 세로축 기준으로 가운데 정렬 */
}
.fixed-size {
  max-width: 20px; /* 최대 너비 고정 */
  max-height: 20px; /* 최대 높이 고정 */
  margin-right: 3px;
  margin-top: 5px;
}
.sign-up-card {
  width: 500px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  margin: 2rem auto;
  box-shadow: rgb(3 0 71 / 9%) 0px 8px 45px;
  @media (max-width: 500px) {
    width: 100%;
  }
  .sign-up-card-container {
    padding: 3rem 3.75rem 0px;
    @media (max-width: 500px) {
      padding: 3rem 1rem 0px;
    }
  }
}
</style>
