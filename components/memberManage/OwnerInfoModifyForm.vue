<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4" readonly
                v-model="selectedOwnerInfo.이메일"></v-text-field> -->

            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="selectedOwnerInfo.이름" outlined dense placeholder="이름" class="mb-4" readonly></v-text-field>

            <p class="text-14 mb-1">매장명</p>
            <v-text-field v-model="selectedOwnerInfo.매장명" outlined dense placeholder="매장명"
                class="mb-4" readonly></v-text-field>

            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="password" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="selectedOwnerInfo.연락처" outlined dense placeholder="연락처" class="mb-4"></v-text-field>

            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="selectedOwnerInfo.주소" outlined dense placeholder="주소"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="selectedOwnerInfo.우편번호" outlined dense placeholder="우편번호"
                class="mb-4"></v-text-field>

            <!-- <p class="text-14 mb-1">사업자등록번호</p>
            <v-text-field v-model="selectedOwnerInfo.사업자등록번호" outlined dense placeholder="사업자등록번호"
                class="mb-4" readonly></v-text-field> -->

            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정 확인</v-btn>
        </div>
    </v-card>

</template>
<script>

export default {
    props: {
        selectedOwnerInfo: Object,
        dialogModify: Boolean
    },
    data() {
        return {
            password: '',
            confirmPassword: '',
            hoverItem: null, // hoverItem 속성을 초기화합니다.
        };
    },
    watch: {
        dialogModify(val) {
            if (!val) {
                this.resetFields();
            }
        }
    },
    methods: {
        resetFields() {
            this.password = '';
            this.confirmPassword = '';
        },
        submitForm() {
            const modifiedData = {
                password: this.password,
                tel: this.selectedOwnerInfo.tel,
                address: this.selectedOwnerInfo.address,
                zipcode: this.selectedOwnerInfo.zipcode,
                ownerNo: this.selectedOwnerInfo.ownerNo
            };
            this.$emit('modify', modifiedData);
            this.resetFields();
            this.$emit('update:dialogModify', false);
            this.$router.push('/memberManage/OwnerMyPage');
        }
    }
}
</script>
