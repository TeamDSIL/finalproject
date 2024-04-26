<template>
  <div
    class="bg-body d-flex flex-column justify-center align-center min-vh-100"
  >
    <form @submit.prevent="submitForm" class="sign-up-card">
      <div class="sign-up-card-container">
        <div class="write-review-logo">
          <v-img
            :src="require('~/assets/images/logo.jpg')"
            class="review-logo"
          ></v-img>
        </div>

        <div class="text-center mb-3">
          <h3 class="mb-3">리뷰 작성</h3>
      선택한식당아이디:{{ nowId }}선택점수:  {{ babscore }}
          <h5
            class="text-sm font-600 grey--text text--darken-4"
            style="font-weight: 500"
          >
            {{ selectName }}
          </h5>
        </div>
        <v-divider></v-divider>
        <div class="mb-4">
          <div class="divider"></div>
          <p class="text-14 mb-1" style="font-weight: bold">
            예약한 식당은 어떠셨나요?
          </p>
          <div class="babscore">
            <span v-for="(isActive, index) in stars" :key="index">
              <div
                style="margin-left: 2px; cursor: pointer"
                @click="setRating(index)"
              >
                <v-img
                  :src="
                    isActive
                      ? require('~/assets/images/babscore.png')
                      : require('~/assets/images/graybab.png')
                  "
                  class="fixed-size"
                ></v-img>
              </div>
            </span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold">
            작성날짜: {{ today }}
          </p>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold">사진 첨부</p>
          <v-file-input
            v-model="file"
            accept="image/*"
            outlined
            dense
            show-size
            class="mb-4"
            label="사진 선택"
            style="margin-top: 10px"
          ></v-file-input>
        </div>
        <div style="margin-top: -30px">
          <div class="mb-4">
            <p class="text-14 mb-1" style="font-weight: bold">내용</p>
            <v-textarea
              outlined
              dense
              hide-details=""
              class="mb-4"
              v-model="UserReviewContents"
            ></v-textarea>
          </div>
        </div>
        <div class="mb-4">
          <v-btn
            block
            color="primary"
            type="submit"
            class="text-capitalize font-600"
          >
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
    </form>
  </div>
</template>

<script>
export default {
  layout: "session",
  data() {
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    return {
      checkbox: false,
      file: null,
      stars: [true, false, false, false, false],
      UserReviewContents: "",
      nowId: this.$route.params.id,
      selectName: "우리식당 창원점",
      today: formattedDate,
      babscore: '',
    };
  },
  methods: {
    async created() {
      const id = this.$route.params.id;
      // const { data } = await fetchPost(id);
      // this.title = data.title;
      // this.contents = data.contents;
    },
    setRating(selectedIndex) {
      // 모든 별을 초기 상태로 설정
      this.stars = this.stars.map((_, index) => index <= selectedIndex);
      this.babscore = this.stars.filter(star => star).length;
    },
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          UserReviewContents: this.UserReviewContents,
        };
        // await this.$store.dispatch('LOGIN', userData);
        this.$router.push("/myDining/MydiningPage");
        // this.goBack();
      } catch (error) {
        // 에러 핸들링할 코드
        // console.log(error.response.data);
        // this.logMessage = error.response.data;
      } finally {
        // this.initForm();
      }
    },
    goBack() {
      window.history.back(); // 브라우저 이력에서 한 단계 뒤로 갑니다
    },
  },
};
</script>

<style lang="scss" scoped>
.review-logo {
  max-width: 150px; /* 최대 너비 고정 */
  max-height: 150px; /* 최대 높이 고정 */
}
.write-review-logo {
  display: flex;
  justify-content: center;
}
.divider {
  margin-top: 10px;
}
.babscore {
  display: flex; /* 이 속성을 추가하여 이미지들을 가로로 정렬 */
  justify-content: center; /* 가운데 정렬 */
  align-items: center; /* 세로축 기준으로 가운데 정렬 */
}
.fixed-size {
  max-width: 40px; /* 최대 너비 고정 */
  max-height: 40px; /* 최대 높이 고정 */
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
