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

                                                <UserInfoModifyForm :userInfo="userInfo" @modify-user="updateUserInfo"
                                                    @close="dialogModify = false" />
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
                                                class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">이름</div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.name }}
                                                </p>
                                            </div>

                                            <v-divider></v-divider>

                                            <div
                                                class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">이메일</div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.email }}
                                                </p>
                                            </div>

                                            <v-divider></v-divider>

                                            <div
                                                class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">연락처</div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.tel }}
                                                </p>
                                            </div>

                                            <v-divider></v-divider>

                                            <div
                                                class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">주소</div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.address }}
                                                </p>
                                            </div>

                                            <v-divider></v-divider>

                                            <div
                                                class="d-flex align-center flex-column flex-sm-row justify-space-between flex-wrap px-4 px-sm-10 pa-4">
                                                <div class="d-flex flex-column flex-sm-row align-center flex-wrap me-4">
                                                    <div class="text-center text-sm-left">
                                                        <div class="text-14 f-600 mb-2 mb-sm-0">우편번호</div>
                                                    </div>
                                                </div>
                                                <p class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0">
                                                    {{ userInfo.postcode }}
                                                </p>
                                            </div>
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
                                                    max-height="100px"></v-img>

                                                <span v-if="userInfo.point">
                                                    현재 보유 밥알 : {{ formatNumber(userInfo.point.currentPoint) }}
                                                    밥알
                                                </span>
                                            </div>
                                            <div class="info-item">
                                                <v-img class="br-10 d-flex cover-img align-end" cover
                                                    :src="require('~/assets/images/bobjeom.png')" max-width="50px"
                                                    max-height="50px"></v-img>

                                                <span v-if="userInfo.point">
                                                    &nbsp; 지금까지 {{ userInfo.point.accumulatePoint ?
                                                        formatNumber((userInfo.point.accumulatePoint /
                                                            100).toFixed(2)) : 0 }} 공기 드셨어요.
                                                </span>
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
    async created() {
        if (process.client) {
            await this.getUserInfo();
            this.fetchUserInfo();
        }
    },
    data() {
        return {
            page: 1,
            dialogModify: false,
            dialogDelete: false,
            user: null,
            userInfo: {
                modifiedPassword: '',
                confirmPassword: '',
                name: '',
                tel: '',
                address: '',
                postcode: '',
                point: {
                    id: '',
                    currentPoint: '',
                    accumulatePoint: '',
                },
            },
        };
    },
    methods: {

        async getUserInfo() {
            if (typeof window !== 'undefined') {
                try {
                    const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
                    if (!token) {
                        throw new Error('No token found');
                    }

                    // 토큰을 Authorization 헤더에 포함하여 요청 보내기
                    const response = await axios.get(`${process.env.API_URL}/userInfo/me`, {
                        headers: {
                            'Authorization': `${token}`
                        },
                        withCredentials: true
                    });

                    if (response.status === 200) {
                        const userInfo = response.data;
                        console.log('유저 User Info:', userInfo);
                        // 사용자 정보를 상태나 컴포넌트 데이터에 저장
                        this.user = userInfo;
                    } else {
                        console.error('Failed to fetch user info:', response);
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            } else {
                console.error('localStorage is not defined');
            }
        },
        
        async fetchUserInfo() {
            if (this.user && this.user.email) {
                const email = this.user.email;
                try {
                    const token = localStorage.getItem('token'); // 저장된 토큰 가져오기
                    if (!token) {
                        throw new Error('No token found');
                    }

                    // 토큰을 Authorization 헤더에 포함하여 요청 보내기
                    const response = await axios.get(`${process.env.API_URL}/memberManage/userMyPage?email=${email}`, {
                        headers: {
                            'Authorization': `${token}`
                        },
                        withCredentials: true
                    });

                    if (response.status === 200) {
                        this.userInfo = response.data;
                        console.log(this.userInfo, '중간점검');
                    } else {
                        console.error('Failed to fetch user info:', response);
                    }
                } catch (error) {
                    console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
                }
            } else {
                console.error('User information is not available');
            }
        },
        updateUserInfo(updatedUserInfo) {
            this.userInfo = { ...this.userInfo, ...updatedUserInfo };
            this.dialogModify = false;
            this.$router.push('/memberManage/userMyPage');
        },
        openModifyDialog() {
            this.dialogModify = true;
        },
        openDeleteDialog() {
            this.dialogDelete = true;
        },
        closeDialogs() {
            this.dialogModify = false;
            this.dialogDelete = false;
        },
        formatNumber(value) {
            if (typeof value === 'number') {
                return value.toLocaleString();
            } else if (!isNaN(value)) {
                return Number(value).toLocaleString();
            }
            return value;
        },
    },
};
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
            margin-right: 10px;
        }

        span {
            font-size: 16px;
            color: #333;
        }
    }
}
</style>
