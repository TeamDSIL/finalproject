<template>


    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4" readonly
                v-model="userInfo.email"></v-text-field>

            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="password" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="userInfo.name" outlined dense placeholder="이름" class="mb-4"></v-text-field>

            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="userInfo.tel" outlined dense placeholder="연락처" class="mb-4"></v-text-field>

            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="userInfo.address" outlined dense placeholder="주소" class="mb-4"></v-text-field>

            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="userInfo.zipcode" outlined dense placeholder="우편번호" class="mb-4"></v-text-field>


            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정 확인</v-btn>
        </div>
    </v-card>
</template>

<script>

export default ({

    props: {
        userInfo: Object,
        dialogModify: Boolean
    },
    data() {
        return {
            password: '', // 수정 필요
            confirmPassword: '', // 수정 필요
            name: '', // 수정 필요
            tel: '', // 수정 필요
            address: '', // 수정 필요
            zipcode: '' // 수정 필요
        };
    },
    watch: {
        dialogModify(val) {
            if (!val) {
                // 다이얼로그가 닫힐 때 입력 필드 초기화
                this.resetFields();
            }
        }
    },
    methods: {
        resetFields() {
            // 입력 필드 초기화
            this.password = '';
            this.confirmPassword = '';
            this.name = '';
            this.tel = '';
            this.address = '';
            this.zipcode = '';
        },
        submitForm() {
            const modifiedData = {
                password: this.password,
                name: this.name,
                tel: this.tel,
                address: this.address,
                zipcode: this.zipcode
            };
            this.$emit('modify', modifiedData);
            this.resetFields(); // 입력 필드 초기화

            // 다이얼로그를 닫는 부분을 추가
            this.$emit('update:dialogModify', false); // 다이얼로그를 닫습니다.

            this.$router.push('/memberManage/UserMyPage');
        }
    }

})
</script>
