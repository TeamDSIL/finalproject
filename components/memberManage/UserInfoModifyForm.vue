<template>
    <v-card>
    <div class="px-3 px-md-10 py-8">
        <h3 class="mb-2 text-center">회원 정보 수정</h3>
        <v-divider></v-divider>
        <br>

        <p class="text-14 mb-1">이메일[ID]</p>
        <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4" readonly></v-text-field>

        <p class="text-14 mb-1">비밀번호</p>
        <v-text-field v-model="password" outlined dense type="password" hide-details placeholder="********" class="mb-4"></v-text-field>

        <p class="text-14 mb-1">비밀번호 재입력</p>
        <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********" class="mb-4"></v-text-field>

        <p class="text-14 mb-1">이름</p>
        <v-text-field v-model="name" outlined dense placeholder="이름" class="mb-4"></v-text-field>

        <p class="text-14 mb-1">연락처</p>
        <v-text-field v-model="phone" outlined dense placeholder="연락처" class="mb-4"></v-text-field>

        <p class="text-14 mb-1">주소</p>
        <v-text-field v-model="address" outlined dense placeholder="주소" class="mb-4"></v-text-field>

        <p class="text-14 mb-1">우편번호</p>
        <v-text-field v-model="zipcode" outlined dense placeholder="우편번호" class="mb-4"></v-text-field>

        <v-btn @click="handleModify" block color="rgb(255,84,82)" class="primary">수정 확인</v-btn>
        <v-col cols="10" lg="8" class="mx-auto">
            <div class="d-flex align-center my-1">

            </div>
        </v-col>
    </div>
</v-card>

</template>

<script>

export default ({
    
})
</script>
