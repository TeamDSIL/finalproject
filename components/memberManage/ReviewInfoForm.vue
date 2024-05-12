<template>
    <v-card class="pa-4">
        <h1>리뷰 및 댓글 삭제 관리</h1>
        <div class="d-flex align-center mt-3">
            <v-icon class="mr-2">mdi-calendar</v-icon>
            <span class="font-weight-bold mr-2">등록날짜:</span>
            <span>{{ reviewInfo.registDate }}</span>
        </div>
        <v-divider></v-divider>
        <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-email</v-icon>
            <span class="font-weight-bold mr-2">이메일:</span>
            <span>{{ reviewInfo.email }}</span>
        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-3" style="justify-content: flex-start;">
            <v-icon class="mr-2 align-baseline">mdi-message-text</v-icon>
            <span class="font-weight-bold mr-2">리뷰:</span>
            <v-text-field v-model="reviewInfo.review" outlined readonly></v-text-field>
        </div>
        <v-divider></v-divider>
        <div class="d-flex mt-3" style="justify-content: flex-start;">
            <v-icon class="mr-2 align-baseline">mdi-comment</v-icon>
            <span class="font-weight-bold mr-2">댓글:</span>
            <v-text-field v-model="reviewInfo.reply" outlined readonly></v-text-field>
        </div>

        <div class="mt-5 d-flex justify-end">
            <v-btn color="secondary" class="mr-4" @click="deleteReview">리뷰 삭제</v-btn>
            <v-btn color="error" class="mr-4" @click="deleteComment">댓글 삭제</v-btn>
            <v-btn color="success" class="mr-4" @click="processRequest">요청 처리</v-btn>
            <v-btn color="warning" @click="closeDialog">닫기</v-btn>
        </div>



    </v-card>
</template>

<script>
export default {
    props: {
        reviewInfo: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            showDialog: false // 다이얼로그의 표시 여부를 나타내는 데이터 속성 추가
        };
    },
    methods: {
        deleteReview() {
            // 리뷰 삭제 로직 추가
        },
        deleteComment() {
            // 댓글 삭제 로직 추가
        },
        processRequest() {
            // 요청 처리 로직을 여기에 추가
        },
        closeDialog() {
            this.showDialog = false; // 다이얼로그를 닫기 위해 showDialog 값을 false로 설정합니다.
        }
    }
}
</script>

<style>

</style>

