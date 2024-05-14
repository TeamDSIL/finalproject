<template>


    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4" readonly
                v-model="userInfo.email"></v-text-field>

            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="userInfo.name" outlined dense hide-details placeholder="이름"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="userInfo.tel" outlined dense hide-details placeholder="연락처"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="userInfo.address" outlined dense hide-details placeholder="주소"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="userInfo.postcode" outlined dense hide-details placeholder="우편번호"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="modifiedPassword" outlined dense hide-details type="password" placeholder="********"
                class="mb-4"></v-text-field>

            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense hide-details type="password" placeholder="********"
                class="mb-4"></v-text-field>

            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정</v-btn>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'; // axios를 import합니다.

export default ({

    props: {
        userInfo: Object,
        dialogModify: Boolean
    },
    data() {
        return {
            modifiedPassword: '',           // 비밀번호
            confirmPassword: '',    // 비밀번호 확인
            name: '', // 수정 필요
            tel: '', // 수정 필요
            address: '', // 수정 필요
            postcode: '', // 수정 필요
            point: '',
        };
    },
    methods: {

        async submitForm() {
            try {
                // API 요청을 보내기 전에 비밀번호가 일치하는지 확인
                if (this.modifiedPassword !== this.confirmPassword) {
                    // 비밀번호가 일치하지 않으면 에러 메시지를 표시하고 함수 종료
                    alert('비밀번호가 일치하지 않습니다.');
                    return;
                }

                // API 요청을 보내기 전에 데이터 유효성 검사를 수행할 수 있습니다.

                // API 요청을 보낼 데이터 생성
                const requestData = {
                    email: this.userInfo.email,
                    password: this.modifiedPassword,
                    name: this.userInfo.name,
                    tel: this.userInfo.tel,
                    address: this.userInfo.address,
                    postcode: this.userInfo.postcode,
                    point: {
                        id: this.userInfo.point.id,
                        accmulatePoint: this.userInfo.point.accmulatePoint,
                        currentPoint: this.userInfo.point.currentPoint,
                    }
                };

                // API 요청 보내기~
                const response = await axios.post('http://localhost:8000/memberManage/userMyPage', requestData);

                // 응답 처리
                console.log('수정 응답:', response.data);
                alert('회원 정보가 수정되었습니다.');
                this.$router.push('/memberManage/userMyPage');
                // 부모 컴포넌트로 수정된 정보를 전달
                this.$emit('modify-user', requestData);

                // 모달 창을 닫음
                this.$emit('close');

                // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
                alert('회원 정보 수정 실패했습니다.');
            }
        },
    }

})
</script>
