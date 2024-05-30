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
        async handleDelete() {
            try {
                const token = this.$store.state.auth.token || localStorage.getItem('token'); // Vuex 스토어 또는 로컬 스토리지에서 토큰 가져오기
                if (!token) {
                    throw new Error('No token found');
                }
                console.log('Token:', token); // 토큰 값 확인
                const response = await axios.delete(
                    `${process.env.API_URL}/memberManage/userMyPage?email=${this.userInfo.email}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}` // Bearer 접두어 추가
                        },
                        withCredentials: true // 쿠키를 포함하여 요청
                    }
                );
                console.log('Delete response:', response); // 응답 확인
                await this.logout(); // 삭제 요청 후 로그아웃 처리
                this.$router.push('/');
            } catch (error) {
                alert('삭제 요청에 실패하였습니다.');
                this.$router.push('/');
                console.error('삭제 요청 실패:', error);
            }
        },
        async logout() {
            try {
                console.log('Sending logout request...');
                const token = this.$store.state.auth.token || localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                console.log('Token:', token); // 토큰 값 확인
                const response = await axios.post(
                    `${process.env.API_URL}/memberManage/logout`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}` // Bearer 접두어 추가
                        },
                        withCredentials: true
                    }
                );
                if (response.status === 200) {
                    console.log('Logout successful');
                    localStorage.removeItem('token');
                    EventBus.$emit('user-logged-out'); // 로그아웃 이벤트 발행
                    this.user = null;
                    this.$router.push('/memberManage/loginPage');
                } else {
                    console.error('Failed to logout:', response);
                }
            } catch (error) {
                console.error('Error logging out:', error);
            }
        },
    }
}
</script>
