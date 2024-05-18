<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <Box class="dashboard-box">
                        <div slot="boxSidebar">
                            <UserDashboardSidebar />
                        </div>

                        <div slot="boxContent">
                            <div class="px-10">
                                <v-row>
                                    <v-col cols="12">
                                        <div id="position-set">
                                            <h1>회원정보</h1>

                                            <v-dialog v-model="dialogModify" width="500">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn light text v-on="on"
                                                        class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                        id="modify-userInfo-btn">
                                                        <span class="d-none d-sm-block">수정</span>
                                                    </v-btn>
                                                </template>

                                                <UserInfoModifyForm :userInfo="userInfo" :dialogModify="dialogModify" />
                                            </v-dialog>


                                            <v-dialog v-model="dialogDelete" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn light text v-bind="attrs" v-on="on"
                                                        class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                        id="delete-userInfo-btn">
                                                        <span class="d-none d-sm-block">탈퇴</span>
                                                    </v-btn>
                                                </template>

                                                <UserInfoDeleteForm :userInfo="userInfo" />
                                            </v-dialog>

                                        </div>
                                    </v-col>

                                    <v-col cols="7">
                                        <v-card elevation="0" class="border br-10">


                                            <div
                                                class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">
                                                            이메일
                                                        </div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0 ">
                                                    {{ userInfo.email }}
                                                </p>
                                            </div>

                                            <v-divider></v-divider>

                                            <div
                                                class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">
                                                            이름
                                                        </div>
                                                    </div>

                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.name }}
                                                </p>

                                            </div>
                                            <v-divider></v-divider>

                                            <div
                                                class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">
                                                            연락처
                                                        </div>
                                                    </div>

                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.tel }}
                                                </p>


                                            </div>
                                            <v-divider></v-divider>


                                            <div
                                                class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">
                                                            주소
                                                        </div>
                                                    </div>

                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.address }}
                                                </p>


                                            </div>
                                            <v-divider></v-divider>

                                            <div
                                                class=" d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10  pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">

                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">
                                                            우편번호
                                                        </div>
                                                    </div>
                                                </div>

                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0 ">
                                                    {{ userInfo.postcode }}
                                                </p>
                                            </div>
                                            <v-divider></v-divider>

                                        </v-card>
                                    </v-col>

                                    <v-col cols="5">
                                        <v-card class="rice-info-card">
                                            <div class="info-item justify-center">
                                                <h2>밥알이 몇개고??</h2>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="info-item">

                                                <v-img class="br-10 d-flex cover-img align-end" cover
                                                    :src="require('~/assets/images/bobal.jpg')" max-width="70px"
                                                    max-height="100px">
                                                </v-img>

                                                <span v-if="userInfo.point">현재 보유 밥알 : {{ userInfo.point.currentPoint }}
                                                    밥알</span>

                                            </div>
                                            <div class="info-item">

                                                <v-img class="br-10 d-flex cover-img align-end" cover
                                                    :src="require('~/assets/images/bobjeom.png')" max-width="50px"
                                                    max-height="50px">
                                                </v-img>

                                                <span v-if="userInfo.point">&nbsp; 지금까지 {{
                                                    (userInfo.point.accumulatePoint / 100).toFixed(2)
                                                    }}공기 드셨어요.</span>
                                            </div>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </Box>
                </v-col>
            </v-row>
        </v-container>
        <Footer />

    </div>
</template>
<script>
import UserInfoModifyForm from '@/components/memberManage/UserInfoModifyForm.vue';
import UserInfoDeleteForm from '@/components/memberManage/UserInfoDeleteForm.vue';
import axios from 'axios';

export default {
    components: {
        UserInfoModifyForm,
        UserInfoDeleteForm,
    },
    head: {
        title: 'Order History'
    },
    created() {
        // 페이지가 로드될 때 API를 호출하여 회원 정보를 받아옵니다.
        this.fetchUserInfo();
    },
    data() {
        return {
            page: 1,
            dialogModify: false, // 수정 다이얼로그 열기 여부를 관리하는 데이터 속성
            dialogDelete: false, // 삭제 다이얼로그 열기 여부를 관리하는 데이터 속성
            userInfo: {
                modifiedPassword: '',           // 비밀번호
                confirmPassword: '',    // 비밀번호 확인
                name: '',               // 이름
                tel: '',              // 연락처
                address: '',            // 주소
                postcode: '',            // 우편번호
                point: {
                    id: '',
                    currentPoint: '',
                    accumulatePoint:'',
                },
            }
        };
    },
    methods: {
        // API를 호출하여 식당 정보를 받아오는 메서드입니다.
        async fetchUserInfo() {
            // API 통신을 통해 식당 정보를 받아옵니다.
            const email = 'dvbf@naver.com';
            const response = await axios.get(`http://localhost:8000/memberManage/userMyPage?email=${email}`)
            // ${this.userInfo.email}
                .then((response) => {
                    // 받아온 식당 정보를 restaurants에 저장합니다.
                    this.userInfo = response.data;
                })
                .catch((error) => {
                    console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
                })
        },
        openModifyDialog() {
            this.dialogModify = true; // 수정 다이얼로그 열기
        },
        openDeleteDialog() {
            this.dialogDelete = true; // 삭제 다이얼로그 열기
        },
        closeDialogs() {
            this.dialogModify = false;
            this.dialogDelete = false;
        },
    },

}
</script>

<style lang="scss">
#header-info-position {
    display: flex;
    white-space: nowrap;
    align-items: center;
}

.rice-info-card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        v-img {
            margin-right: 10px; // 이미지와 텍스트 사이 간격 조정
        }

        span {
            font-size: 16px;
            color: #333;
        }
    }
}
</style>
