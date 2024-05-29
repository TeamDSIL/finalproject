// CheckUserDeleteForm.vue
<template>
    <v-card>
        <div class="px-3 px-md-10 py-8 ">
            <h3 class="mb-2 text-center">정말 탈퇴하시겠어요?</h3>
            <v-divider></v-divider>
            <p class="text-14 mb-2 text-center">탈퇴 시 유의사항을 충분히 확인해주세요.</p>

            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn block color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="primary" @click="handleDelete">
                        <span class="d-none d-sm-block">회원탈퇴</span>
                    </v-btn>
                </template>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';
import { EventBus } from '~/plugins/event-bus.js';


export default {
    props: {
        userInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        // 수정 확인 버튼 클릭 시 실행될 메서드
        async handleDelete() {
            await this.logout(); // 로그아웃 먼저 처리
            try {
                const response = await axios.delete(`${process.env.API_URL}/memberManage/userMyPage?email=${this.userInfo.email}`);
                EventBus.$emit('user-logged-out'); // 로그아웃 이벤트 발행
                this.$router.push('/');
            } catch (error) {
                alert('삭제 요청에 실패하였습니다.');
                this.$router.push('/memberManage/usermypage');
                console.error('삭제 요청 실패:', error);
            }
        },
        async logout() {
            try {
                console.log('Sending logout request...');
                const response = await axios.post(`${process.env.API_URL}/memberManage/logout`, {}, { withCredentials: true });
                if (response.status === 200) {
                    console.log('Logout successful');
                    localStorage.removeItem('token');
                    this.user = null;
                    this.$router.push('/memberManage/loginPage');
                } else {
                    console.error('Failed to logout:', response);
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        },
    },
}
</script>
