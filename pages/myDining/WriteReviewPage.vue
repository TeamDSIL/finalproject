<template>
  <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
    <form @submit.prevent="submitForm" class="sign-up-card">
      <div class="sign-up-card-container">
        <div class="write-review-logo" style="margin-bottom: 20px">
          <v-img :src="require('~/assets/images/DSILnewLOGO.png')" class="review-logo"></v-img>
        </div>

        <div class="text-center mb-3">
          <h3 class="mb-3">리뷰 작성</h3>
          <h5 class="text-sm font-600 grey--text text--darken-4" style="font-weight: bold; font-size: small">
            {{ selectName }}
          </h5>
        </div>
        <v-divider></v-divider>
        <div class="mb-4">
          <div class="divider"></div>
          <p class="text-14 mb-1" style="font-weight: bold">예약한 식당은 어떠셨나요?</p>
          <div class="babscore">
            <span v-for="(isActive, index) in stars" :key="index">
              <div style="margin-left: 2px; cursor: pointer" @click="setRating(index)">
                <v-img :src="isActive ? require('~/assets/images/babscore.png') : require('~/assets/images/graybab.png')
                  " class="fixed-size"></v-img>
              </div>
            </span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold">작성날짜: {{ today }}</p>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1" style="font-weight: bold">사진 첨부</p>
          <v-file-input v-model="file" accept="image/*" outlined dense show-size class="mb-4" label="사진 선택"
            style="margin-top: 10px"></v-file-input>
        </div>
        <div style="margin-top: -15px">
          <div class="mb-4">
            <p class="text-14 mb-1" style="font-weight: bold">내용</p>
            <v-textarea outlined dense hide-details="" class="mb-4" v-model="UserReviewContents"></v-textarea>
          </div>
        </div>
        <div class="mb-4">
          <v-btn block color="primary" type="submit" class="text-capitalize font-600">
            등록하기
          </v-btn>
        </div>
      </div>

      <div class="py-4 bg-grey-light">
        <div class="text-center">
          <div class="text-center">
            <div class="text-14 text-center my-3">
              <button @click="goBack" class="grey--text text--darken-4 font-600" type="button">
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
import axios from "axios";

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
      nowReservationId: this.$route.query.reservationId,
      selectName: this.$route.query.name,
      today: formattedDate,
      babscore: 1,
      userEmail: "user02@example.com",
    };
  },
  methods: {
    setRating(selectedIndex) {
      // 모든 별을 초기 상태로 설정
      this.stars = this.stars.map((_, index) => index <= selectedIndex);
      this.babscore = this.stars.filter((star) => star).length;
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("reviewContents", this.UserReviewContents);
      formData.append("reservationId", this.nowReservationId);
      formData.append("registerDate", this.today);
      formData.append("reviewScore", this.babscore);
      formData.append("userEmail", this.userEmail);

      if (this.file) {
        try {
          // 파일이 이미지인 경우 리사이징 처리
          if (this.file.type.startsWith("image/")) {
            const resizedImage = await this.resizeImage(this.file);
            formData.append("file", resizedImage, "resized_image.jpg");
          } else {
            // 이미지 파일이 아닌 경우 원본 파일을 그대로 사용
            formData.append("file", this.file);
          }
        } catch (error) {
          console.error("이미지 리사이징 중 오류 발생:", error);
          alert("이미지 리사이징 중 오류 발생");
          return;
        }
      }

      try {
        const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.post(
          `${process.env.API_URL}/myDining/registerReview`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("등록 및 파일 업로드 성공");
          console.log(response.data);
          this.file = null; // 파일 업로드 성공 후 v-file-input 초기화
          window.history.back();
        } else {
          alert("등록 또는 파일 업로드 실패");
        }
      } catch (error) {
        console.error("등록 또는 파일 업로드 중 오류 발생:", error);
        alert("등록 또는 파일 업로드 중 오류 발생");
      }
    },
    goBack() {
      window.history.back(); // 브라우저 이력에서 한 단계 뒤로 갑니다
    },
    // 이미지 리사이징 함수
    resizeImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxWidth = 800; // 최대 너비 설정
            const maxHeight = 800; // 최대 높이 설정
            let width = img.width;
            let height = img.height;

            // 이미지 비율을 유지하면서 리사이징
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            // 캔버스 크기를 조정하고 이미지를 그립니다.
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // 리사이징된 이미지를 Blob 형태로 변환
            canvas.toBlob(
              (blob) => {
                resolve(blob);
              },
              "image/jpeg",
              0.8 // 품질을 0.8로 설정하여 용량 줄이기
            );
          };
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.review-logo {
  max-width: 150px;
  /* 최대 너비 고정 */
  max-height: 150px;
  /* 최대 높이 고정 */
}

.write-review-logo {
  display: flex;
  justify-content: center;
}

.divider {
  margin-top: 10px;
}

.babscore {
  display: flex;
  /* 이 속성을 추가하여 이미지들을 가로로 정렬 */
  justify-content: center;
  /* 가운데 정렬 */
  align-items: center;
  /* 세로축 기준으로 가운데 정렬 */
}

.fixed-size {
  max-width: 40px;
  /* 최대 너비 고정 */
  max-height: 40px;
  /* 최대 높이 고정 */
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
