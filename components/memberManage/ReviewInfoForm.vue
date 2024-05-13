<template>
  <v-card class="pa-4">
    <h1>리뷰 및 댓글 삭제 관리</h1>
    <div class="d-flex align-center mt-3">
      <v-icon class="mr-2">mdi-calendar</v-icon>
      <span class="font-weight-bold mr-2">등록날짜:</span>
      <span>{{ reviewInfo.registerDate }}</span>
    </div>
    <v-divider></v-divider>
    <div class="d-flex align-center">
      <v-icon class="mr-2">mdi-email</v-icon>
      <span class="font-weight-bold mr-2">이메일:</span>
      <span>{{ reviewInfo.userEamil }}</span>
    </div>
    <v-divider></v-divider>
    <div class="d-flex mt-3" style="justify-content: flex-start">
      <v-icon class="mr-2 align-baseline">mdi-message-text</v-icon>
      <span class="font-weight-bold mr-2">리뷰:</span>
      <v-textarea
        v-model="reviewInfo.reviewContent"
        outlined
        readonly
        auto-grow
        rows="1"
      ></v-textarea>
    </div>
    <v-divider></v-divider>
    <div class="d-flex mt-3" style="justify-content: flex-start">
      <v-icon class="mr-2 align-baseline">mdi-comment</v-icon>
      <span class="font-weight-bold mr-2">댓글:</span>
      <!-- placeholder를 사용하여 "댓글이 없습니다." 표시 -->
      <v-textarea
        v-model="reviewInfo.replyContent"
        :placeholder="reviewInfo.replyContent ? '' : '댓글이 없습니다.'"
        outlined
        readonly
        auto-grow
        rows="1"
      ></v-textarea>
    </div>
    <div class="mt-5 d-flex justify-end">
      <v-btn color="secondary" class="mr-4" @click="removeReview(reviewInfo.reviewId)"
        >리뷰 삭제</v-btn
      >
      <v-btn
        color="error"
        class="mr-4"
        @click="removeReply(reviewInfo.replyId)"
        >댓글 삭제</v-btn
      >
      <!-- <v-btn color="success" class="mr-4" @click="processRequest">요청 처리</v-btn> -->
      <!-- <v-btn color="warning" @click="closeDialog">닫기</v-btn> -->
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    // reviewInfo: Object,
    reviewInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // showDialog: false // 다이얼로그의 표시 여부를 나타내는 데이터 속성 추가
    };
  },
  methods: {
    async removeReview(reviewId) {
          try {
        console.log(reviewId+"삭제할 리뷰아이디");
        const response = await axios.delete(
          `http://localhost:8000/memberManage/removeReview`,
          {
            data: {
              reviewId: reviewId, // bookmarkId를 reviewId로 전달
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("댓글이 삭제되었습니다.");

        location.reload();
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다.", error);
        alert("댓글 삭제에 실패했습니다.");
      }
      },
      async removeReply(reviewId) {
          try {
        console.log(reviewId+"삭제할 댓글아이디");
        const response = await axios.delete(
          `http://localhost:8000/memberManage/removeReply`,
          {
            data: {
                reviewId: reviewId, // bookmarkId를 reviewId로 전달
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("댓글이 삭제되었습니다.");

        location.reload();
      } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다.", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    },
  },
};
</script>

<style></style>
