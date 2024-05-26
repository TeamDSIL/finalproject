<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 이메일 표시 -->
            <p class="text-14 mb-1">이메일[ID]</p>
            <v-text-field outlined dense hide-details v-model="userInfo.email" class="mb-4" readonly></v-text-field>

            <!-- 이름 -->
            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="userInfo.name" outlined dense  hide-details placeholder="이름" class="mb-4"></v-text-field>


            <!-- 포인트 -->
            <p class="text-14 mb-1">포인트</p>
            <v-text-field v-model="userInfo.point.currentPoint" outlined dense hide-details placeholder="포인트" class="mb-4"></v-text-field>

            <!-- 연락처 -->
            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="userInfo.tel" outlined dense hide-details placeholder="연락처" class="mb-4"></v-text-field>

            <!-- 주소 -->
            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="userInfo.address" outlined dense hide-details placeholder="주소" class="mb-4"></v-text-field>

            <!-- 우편번호 -->
            <p class="text-14 mb-1">우편번호</p>
            <v-text-field v-model="userInfo.postcode" outlined dense hide-details placeholder="우편번호" class="mb-4"></v-text-field>

            <!-- 비밀번호 -->
            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="modifiedPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 비밀번호 재입력 -->
            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 수정 확인 버튼 -->
            <div id="modify-delete-btn">
                <v-btn id="modify-btn" @click="handleModify" color="rgb(255,84,82)" class="primary">수정</v-btn>
                <v-btn id="delete-btn" @click="handleDelete" color="rgb(255,84,82)" class="primary">삭제</v-btn>
            </div>
        </div>
    </v-card>

</template>

<script>
import axios from 'axios'; // axios를 import합니다.

export default {
    props: ['userInfo'], // userInfo prop 추가
    data() {
        return {
            modifiedPassword: '',           // 비밀번호
            confirmPassword: '',    // 비밀번호 확인
            name: '',               // 이름
            tel: '',              // 연락처
            address: '',            // 주소
            postcode: '',            // 우편번호
            point: '',
        };
    },
    methods: {
        // 수정 확인 버튼 클릭 시 실행될 메서드
        async handleModify() {
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

                // API 요청 보내기
                const response = await axios.post(`${process.env.API_URL}/memberManage/adminManageUserPage`, requestData);

                // 응답 처리
                console.log('수정 응답:', response.data);

                // 부모 컴포넌트로 수정된 정보를 전달
                this.$emit('modify-user', requestData);

                // 모달 창을 닫음
                this.$emit('close');

                // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.
                this.$router.push('/memberManage/AdminManageUserPage');

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
            }
        },
        async handleDelete() {
            try {
                const response = await axios.delete(`${process.env.API_URL}/memberManage/adminManageUserPage?email=${this.userInfo.email}`);

                // 생략
                this.$emit('close');
                // this.$router.push('/memberManage/AdminManageUserPage');

            } catch (error) {
                // 생략
                console.error('삭제 요청 실패:', error);
            }
        }
    }
}
</script>

<style scoped></style>