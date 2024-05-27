<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4" readonly
                v-model="selectedOwnerInfo.email"></v-text-field>

            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="selectedOwnerInfo.ownerName" outlined dense hide-details placeholder="이름"
                class="mb-4" readonly></v-text-field>

            <p class="text-14 mb-1">사업자등록번호</p>
            <v-text-field v-model="selectedOwnerInfo.registerNumber" outlined dense hide-details placeholder="사업자등록번호"
                class="mb-4" readonly></v-text-field>

            <p class="text-14 mb-1">매장명</p>
            <v-text-field v-model="selectedOwnerInfo.name" outlined dense hide-details placeholder="매장명" class="mb-4"
                readonly></v-text-field>

            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="selectedOwnerInfo.tel" outlined dense hide-details placeholder="연락처"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="selectedOwnerInfo.address" outlined dense hide-details placeholder="주소"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="modifiedPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="selectedOwnerInfo.우편번호" outlined dense placeholder="우편번호"
                class="mb-4"></v-text-field> -->

            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정</v-btn>
        </div>
    </v-card>

</template>
<script>
import axios from 'axios';

export default {
    props: {
        selectedOwnerInfo: Object,
        dialogModify: Boolean
    },
    data() {
        return {
            modifiedPassword: '',
            confirmPassword: '',

            hoverItem: null, // hoverItem 속성을 초기화합니다.
        };
    },

    methods: {
        submitForm() {
            // 비밀번호와 비밀번호 확인 값이 일치하는지 확인합니다.
            if (this.modifiedPassword !== this.confirmPassword) {
                // 비밀번호와 비밀번호 확인 값이 일치하지 않으면 사용자에게 메시지를 보여줍니다.
                alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
                return; // 함수 실행 종료
            }

            // 수정된 데이터를 객체로 만듭니다.
            const modifiedData = {
                password: this.modifiedPassword, // 수정된 비밀번호
                tel: this.selectedOwnerInfo.tel, // 수정된 연락처
                address: this.selectedOwnerInfo.address, // 수정된 주소
                registerNumber: this.selectedOwnerInfo.registerNumber, // 수정된 사업자등록번호
                // 나머지 값들은 수정되지 않았으므로 그대로 사용합니다.
                email: this.selectedOwnerInfo.email,
                ownerName: this.selectedOwnerInfo.ownerName,
                name: this.selectedOwnerInfo.name
                // 필요에 따라 다른 값들도 추가할 수 있습니다.
            };

            // axios를 사용하여 POST 요청을 보냅니다.
            axios.post(`${process.env.API_URL}/memberManage/ownerMyPage`, modifiedData)
                .then(response => {
                    // 요청이 성공하면 사용자에게 메시지를 보여줍니다.
                    alert("회원 정보가 성공적으로 수정되었습니다.");

                    this.$router.push('/memberManage/ownerMyPage');
                    // 예: window.location.reload();
                    // 예: this.$router.push('/some/path');
                })
                .catch(error => {
                    // 요청이 실패하면 오류를 콘솔에 기록합니다.
                    console.error('회원 정보 수정 중 오류가 발생했습니다:', error);
                    // 사용자에게 오류 메시지를 보여줄 수도 있습니다.
                    alert("회원 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
                });
        },
        resetFields() {
            // 필요하다면 필드를 초기화할 수 있습니다.
            this.modifiedPassword = '';
            this.confirmPassword = '';
        }
    }
}
</script>
