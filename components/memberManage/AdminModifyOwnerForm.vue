<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">식당 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 매장명 표시 -->
            <p class="text-14 mb-1">매장명</p>
            <v-text-field outlined dense hide-details v-model="restaurantInfo.restaurantName" class="mb-4"
                readonly></v-text-field>

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
            <v-text-field v-model="restaurantInfo.name" outlined dense placeholder="이름" class="mb-4"></v-text-field>

            <!-- 연락처 -->
            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="restaurantInfo.phone" outlined dense placeholder="연락처" class="mb-4"></v-text-field>

            <!-- 주소 -->
            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="restaurantInfo.address" outlined dense placeholder="주소" class="mb-4"></v-text-field>

            <!-- 우편번호 -->
            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="restaurantInfo.zipcode" outlined dense placeholder="우편번호"
                class="mb-4"></v-text-field>

            <!-- 수정 확인 버튼 -->
            <div>
            <v-btn id="modify-btn" @click="handleModify" block color="rgb(255,84,82)" class="primary">수정</v-btn>
            <v-btn id="delete-btn" @click="handleModify" block color="rgb(255,84,82)" class="primary">해지</v-btn>
            </div>
        </div>
    </v-card>

</template>

<script>

export default {
    props: ['restaurantInfo'],
    data() {
        return {
            password: '',
            confirmPassword: '',
            name: '',
            phone: '',
            address: '',
            zipcode: '',
        };
    },
    methods: {
        handleModify() {
            console.log('수정된 비밀번호:', this.password);
            console.log('수정된 이름:', this.name);
            console.log('수정된 연락처:', this.phone);
            console.log('수정된 주소:', this.address);
            console.log('수정된 우편번호:', this.zipcode);

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
