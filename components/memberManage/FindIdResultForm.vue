<template>
    <v-card>
        <div class="px-3 px-md-10 py-8 ">
            <h3 class="mb-2 text-center">조회 결과</h3>
            <v-divider></v-divider>
            <br>
            <p class="text-14 mb-2 text-center">귀하의 연락처로 가입한 ID(이메일)입니다.</p>
            <br>

            <v-card elevation="0" class="border br-10 mb-4">
                <div class="pa-4 d-flex align-center flex-wrap">

                    <div class="flex-1 mr-3">
                        <h4 class="font-600 mb-0 ">이메일</h4>
                    </div>

                    <div class="flex-1 mr-3">
                        <p class="mb-0">dv****@naver.com</p>
                    </div>

                </div>
            </v-card>

            <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                    <nuxt-link to="/memberManage/LoginPage">
                        <v-btn block color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="text-capitalize font-600">
                            <span class="d-none d-sm-block">로그인하러 가기</span>
                        </v-btn>
                    </nuxt-link>
                </template>
            </v-dialog>


        </div>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            step: 1, // 초기 단계 설정
            email: '',
            tempPassword: '',
            newPassword: '',
            dialog: false,
        };
    }
}
</script>