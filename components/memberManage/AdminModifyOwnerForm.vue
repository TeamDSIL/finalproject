<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">식당 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 이메일 표시 -->
            <p class="text-14 mb-1">email</p>
            <v-text-field outlined dense hide-details v-model="restaurantInfo.email" placeholder="email" class="mb-4"
                readonly></v-text-field>

            <!-- 매장명 표시 -->
            <p class="text-14 mb-1">매장명</p>
            <v-text-field outlined dense hide-details v-model="restaurantInfo.name" placeholder="매장명" class="mb-4"
                readonly></v-text-field>

            <!-- 사업자명 -->
            <p class="text-14 mb-1">사업자명</p>
            <v-text-field v-model="restaurantInfo.ownerName" outlined dense hide-details placeholder="사업자명" readonly
                class="mb-4"></v-text-field>

            <!-- 사업자등록번호 표시 -->
            <p class="text-14 mb-1">사업자등록번호</p>
            <v-text-field outlined dense hide-details v-model="restaurantInfo.registerNumber" placeholder="사업자등록번호"
                class="mb-4" readonly></v-text-field>

            <!-- 연락처 -->
            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="restaurantInfo.tel" outlined dense hide-details placeholder="연락처" class="mb-4"></v-text-field>

            <!-- 주소 -->
            <p class="text-14 mb-1">주소</p>
            <v-text-field v-model="restaurantInfo.address" outlined dense hide-details placeholder="주소" class="mb-4"></v-text-field>

            <!-- 비밀번호 -->
            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="modifiedPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 비밀번호 재입력 -->
            <p class="text-14 mb-1">비밀번호 재입력</p>
            <v-text-field v-model="confirmPassword" outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>

            <!-- 수정 확인 버튼 -->
            <div>
                <v-btn id="modify-btn" @click="handleModify" color="rgb(255,84,82)" class="primary">수정</v-btn>
                <v-btn id="delete-btn" @click="handleDelete" color="rgb(255,84,82)" class="primary">해지</v-btn>
            </div>
        </div>
    </v-card>

</template>

<script>
import axios from 'axios'; // axios를 import합니다.

export default {
    props: ['restaurantInfo'],
    data() {
        return {
            id: '',
            email: '',
            modifiedPassword: '',
            confirmPassword: '',
            name: '',
            registerNumber: '',
            ownerName: '',
            tel: '',
            address: '',
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
                    id: this.restaurantInfo.id,
                    email: this.restaurantInfo.email,
                    password: this.modifiedPassword,
                    ownerName: this.restaurantInfo.ownerName,
                    name: this.restaurantInfo.name,
                    registerNumber: this.restaurantInfo.registerNumber,
                    tel: this.restaurantInfo.tel,
                    address: this.restaurantInfo.address,
                };

                console.log(requestData);
                console.log('왔어?');
                // API 요청 보내기~
                const response = await axios.post('http://localhost:8000/memberManage/adminManageRestaurantPage', requestData);

                // 응답 처리
                console.log('수정 응답:', response.data);

                // 부모 컴포넌트로 수정된 정보를 전달
                this.$emit('modify-user', requestData);

                // 모달 창을 닫음
                this.$emit('close');

                // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.
                this.$router.push('/memberManage/adminManageRestaurantPage');

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
            }
        },
        async handleDelete() {
            try {
                const response = await axios.delete(`http://localhost:8000/memberManage/adminManageRestaurantPage?restaurantName=${this.restaurantInfo.name}`);

                // 생략
                this.$emit('close');
                this.$router.push('/memberManage/adminManageRestaurantPage');

            } catch (error) {
                // 생략
                console.error('삭제 요청 실패:', error);
            }
        }
    }
}

</script>
