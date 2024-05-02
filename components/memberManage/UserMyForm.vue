<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <Box class="dashboard-box">
                        <div slot="boxSidebar">
                            <DashboardSidebar />
                        </div>

                        <div slot="boxContent">
                            <div class="px-10">
                                <v-row>
                                    <v-col cols="12" id="header-info-position">
                                        <h1>회원정보</h1>
                                        <div id="position-set">

                                            <v-dialog v-model="dialogModify" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn light text v-bind="attrs" v-on="on"
                                                        class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                        id="modify-userInfo-btn" @click="submitForm">
                                                        <span class="d-none d-sm-block">수정</span>
                                                    </v-btn>
                                                </template>

                                                <UserInfoModifyForm @modify="handleModify" />
                                            </v-dialog>

                                            <v-dialog v-model="dialogDelete" width="500">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn light text v-bind="attrs" v-on="on"
                                                        class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                        id="delete-userInfo-btn">
                                                        <span class="d-none d-sm-block">탈퇴</span>
                                                    </v-btn>
                                                </template>

                                                <UserInfoDeleteForm />
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
                                                    dvbf@naver.com
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
                                                    윤호상
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
                                                    +82 10-9677-7048
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
                                                    서울시 노원구 중계동 덕릉로 71길 30, 105동 405호
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
                                                    01709
                                                </p>
                                            </div>
                                            <v-divider></v-divider>

                                        </v-card>
                                    </v-col>

                                    <v-col cols="5">
                                        <v-card class="rice-info-card">
                                            <div class="info-item justify-center">
                                                <h1>밥알이 몇개고??</h1>
                                            </div>
                                            <v-divider></v-divider>
                                            <div class="info-item">

                                                <v-img class="br-10 d-flex cover-img align-end" cover
                                                    :src="require('~/assets/images/bobal.jpg')" max-width="70px"
                                                    max-height="100px">
                                                </v-img>

                                                <span>현재 보유 밥알 : 6800 밥알</span>
                                            </div>
                                            <div class="info-item">

                                                <v-img class="br-10 d-flex cover-img align-end" cover
                                                    :src="require('~/assets/images/bobjeom.png')" max-width="50px"
                                                    max-height="50px">
                                                </v-img>

                                                <span>&nbsp; 지금까지 35.24공기 드셨어요.</span>
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


export default {
    components: {
        UserInfoModifyForm,
        UserInfoDeleteForm,
    },
    head: {
        title: 'Order History'
    },
    data() {
        return {
            page: 1,
            dialogModify: false, // 수정 다이얼로그 열기 여부를 관리하는 데이터 속성
            dialogDelete: false, // 삭제 다이얼로그 열기 여부를 관리하는 데이터 속성
            userInfo: {
                email: 'dvbf@naver.com',
                name: '윤호상',
                phone: '+82 10-9677-7048',
                address: '서울시 노원구 중계동 덕릉로 71길 30, 105동 405호',
                zipcode: '01709'
            }
        }
    },
    methods: {
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
        sendDataToForm() {
            // 수정 또는 삭제 다이얼로그가 열릴 때 해당 사용자 정보를 수정 또는 삭제 폼으로 전달
            return this.userInfo;
        },
        submitForm() {
            const modifiedData = {
                email: this.email,
                password: this.password,
                name: this.name,
                phone: this.phone,
                address: this.address,
                zipcode: this.zipcode
            };
            // 수정된 데이터를 부모 컴포넌트에 전달하는 이벤트 발생
            // handleModify(modifiedData);
            this.$emit('modify', modifiedData);
        },
        handleModify(modifiedData) {
            // 수정된 데이터를 처리하는 로직을 작성합니다.
            console.log('수정된 데이터:', modifiedData);
            // 예를 들어, 이제 이 데이터를 서버로 전송하거나 상태를 업데이트할 수 있습니다.
        }
    },
    watch: {
        dialogModify(val) {
            if (!val) {
                // 수정 다이얼로그가 닫힐 때 사용자 정보 초기화
                this.userInfo = {
                    email: '',
                    name: '',
                    phone: '',
                    address: '',
                    zipcode: ''
                };
            }
        },
        dialogDelete(val) {
            if (!val) {
                // 삭제 다이얼로그가 닫힐 때 사용자 정보 초기화
                this.userInfo = {
                    email: '',
                    name: '',
                    phone: '',
                    address: '',
                    zipcode: ''
                };
            }
        }
    }
}
</script>

<style lang="scss">
#position-set {
    margin-left: 80%;
}

#header-info-position {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
