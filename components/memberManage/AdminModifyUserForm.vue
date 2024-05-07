<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 이메일 표시 -->
            <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details v-model="userInfo.email" class="mb-4" readonly></v-text-field>

            <!-- 비밀번호 -->
            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="password" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 비밀번호 재입력 -->
            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 이름 -->
            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="userInfo.name" outlined dense placeholder="이름" class="mb-4"></v-text-field>

            <!-- 연락처 -->
            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="userInfo.phone" outlined dense placeholder="연락처" class="mb-4"></v-text-field>

            <!-- 주소 -->
            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="userInfo.address" outlined dense placeholder="주소" class="mb-4"></v-text-field>

            <!-- 우편번호 -->
            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="userInfo.zipcode" outlined dense placeholder="우편번호" class="mb-4"></v-text-field>

            <!-- 수정 확인 버튼 -->
            <div id="modify-delete-btn">
                <v-btn id="modify-btn" @click="handleModify" block color="rgb(255,84,82)" class="primary">수정</v-btn>
                <v-btn id="delete-btn" @click="handleDelete" block color="rgb(255,84,82)" class="primary">삭제</v-btn>
            </div>
        </div>
    </v-card>

</template>

<script>

export default {
    props: ['userInfo'], // userInfo prop 추가
    data() {
        return {
            password: '',           // 비밀번호
            confirmPassword: '',    // 비밀번호 확인
            name: '',               // 이름
            phone: '',              // 연락처
            address: '',            // 주소
            zipcode: '',            // 우편번호
        };
    },
    methods: {
        // 수정 확인 버튼 클릭 시 실행될 메서드
        handleModify() {
            // 이 부분에서 수정된 데이터를 사용하거나 처리할 수 있음
            console.log('수정된 비밀번호:', this.password);
            console.log('수정된 이름:', this.name);
            console.log('수정된 연락처:', this.phone);
            console.log('수정된 주소:', this.address);
            console.log('수정된 우편번호:', this.zipcode);

            // 수정된 정보를 부모 컴포넌트로 전달
            this.$emit('modify-user', {
                password: this.password,
                confirmPassword: this.confirmPassword,
                name: this.name,
                phone: this.phone,
                address: this.address,
                zipcode: this.zipcode
            });


        }
    }
}
</script>

<style scoped>


</style>