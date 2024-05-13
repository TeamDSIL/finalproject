<template>
    <v-card>
        <div class="px-3 px-md-10 py-8 ">
            <h3 class="mb-2 text-center">정말 탈퇴하시겠어요?</h3>
            <v-divider></v-divider>
            <p class="text-14 mb-2 text-center">탈퇴 시 유의사항을 충분히 확인해주세요.</p>

            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <nuxt-link to="/memberManage/userMyPage">
                        <v-btn block color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="primary" @click="handleDelete">
                            <span class="d-none d-sm-block">회원탈퇴</span>
                        </v-btn>
                    </nuxt-link>
                </template>
            </v-dialog>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        userInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        // 수정 확인 버튼 클릭 시 실행될 메서드
        async handleDelete() {
            try {
                const response = await axios.delete(`http://localhost:8000/memberManage/userMyPage?email=${this.userInfo.email}`);
                console.log('딜리트 성공!');

            } catch (error) {
                // 생략
                console.error('삭제 요청 실패:', error);
            }
        },
    },
}
</script>