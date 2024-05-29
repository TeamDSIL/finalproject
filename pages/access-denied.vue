<template>
    <v-container class="d-flex flex-column align-center justify-center error-page">
        <v-row>
            <v-col cols="12" class="text-center">
                <v-img contain :src="require('~/assets/images/access-denied.jpg')" width="400px"
                    style="margin-bottom: 20px"></v-img>
                <h1 class="error-title">권한이 없습니다</h1>
                <p class="error-message">이 페이지에 접근할 권한이 없습니다.</p>
                <v-btn color="primary" class="back-button" @click="goToMainPage">
                    메인 페이지로 이동하기
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    methods: {
        goToMainPage() {
            this.$router.push('/');
        }
    }
};
</script>

<style scoped>
.error-page {
    min-height: 100vh;
    background-color: #f8f9fa;
    text-align: center;
    padding: 20px;
}

.error-title {
    color: #D23F57;
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.error-message {
    font-size: 1.25rem;
    margin-bottom: 30px;
}

.back-button {
    background-color: #D23F57;
    border: none;
    color: #fff;
    padding: 15px 30px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.back-button:hover {
    background-color: darken(#D23F57, 10%);
}
</style>