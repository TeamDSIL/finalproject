<template>
    <div>
        <v-container>


            <v-row>
                <v-col cols="12" class="mb-10">
                    <v-img class="br-10 d-flex cover-img align-end" cover
                        :src="require('~/assets/images/cover-img.png')"
                        gradient="to top, rgba(0,0,0,.7), rgba(0,0,0,0)">

                        <div
                            class="d-flex justify-center justify-md-space-between align-center mx-10 cover-image-content ">
                            <div class="d-md-flex d-block align-center text-md-left text-center flex-wrap">
                                <label for="avatarUpload" class="me-4">
                                    <div class="avatar-upload">
                                        <v-avatar size="160">
                                            <img src="~/assets/images/faces/big-avatar.png" alt="">
                                        </v-avatar>
                                        <v-btn class="avatar-upload-btn" fab dark small color="grey lighten-4">
                                            <v-icon color="secondary" dark size="20">
                                                mdi-camera
                                            </v-icon>
                                        </v-btn>
                                        <input class="d-none" type="file" id="avatarUpload" />
                                    </div>

                                </label>
                                <div>
                                    <h2 class="white--text text-md-left text-center mb-1">드실 관리자 계정</h2>
                                    <div class="d-flex mb-1 justify-center justify-md-start">
                                        <v-icon size="15" class="me-2" color="white">mdi-map-marker</v-icon>
                                        <h6 class="font-weight-light white--text">서울특별시 강남구 도곡동 943-2 서한 빌딩 3층</h6>
                                    </div>
                                    <h6 class="font-weight-light white--text">이게 관리자 메인 페이지
                                    </h6>
                                </div>
                            </div>

                            <div class="d-none d-md-flex">
                                <div class="text-center">
                                    <h2 class="font-weight-bold white--text">24</h2>
                                    <h6 class="font-weight-regular white--text">뭘</h6>
                                </div>
                                <div class="mx-3">
                                    <v-divider vertical dark></v-divider>
                                </div>
                                <div class="text-center">
                                    <h2 class="font-weight-bold white--text">45</h2>
                                    <h6 class="font-weight-regular white--text">넣어야</h6>
                                </div>
                                <div class="mx-3">
                                    <v-divider vertical dark></v-divider>
                                </div>
                                <div class="text-center">
                                    <h2 class="font-weight-bold white--text">1.6k</h2>
                                    <h6 class="font-weight-regular white--text">될까요</h6>
                                </div>
                            </div>

                        </div>

                    </v-img>
                </v-col>
                <v-col cols="12">
                    <Box class="dashboard-box">
                        <div slot="boxSidebar">
                            <AdminDashBoardSideBar />

                        </div>
                        <div slot="boxContent">
                            <div class="px-10">
                                <v-row>
                                    <v-col cols="12">
                                        <div id="direction-btn">
                                            <h1>회원 정보 관리</h1>

                                            <div id="select-user-owner">
                                                <v-btn light text v-bind="attrs" v-on="on"
                                                    class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                    @click="displayUserInfo">
                                                    일반
                                                </v-btn>

                                                <v-btn light text v-bind="attrs" v-on="on"
                                                    class="mb-0 grey--text text--darken-1 text-14 mb-3 mb-sm-0"
                                                    @click="displayOwnerInfo">
                                                    식당
                                                </v-btn>
                                            </div>
                                        </div>
                                    </v-col>

                                    <v-col cols="12">

                                        <div v-if="step === 1">
                                            <v-col cols="12">
                                                <div>
                                                    <v-container>
                                                        <!-- 검색 필드 -->
                                                        <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined
                                                            dense clearable append-icon="mdi-magnify"
                                                            @keyup.enter="performSearch"></v-text-field>

                                                        <!-- 회원 정보 목록 테이블 -->
                                                        <v-data-table :headers="headers" :items="filteredMembers"
                                                            item-key="id" class="elevation-1">
                                                            <template v-slot:items="props">
                                                                <td>{{ props.item.id }}</td>
                                                                <td>{{ props.item.email }}</td>
                                                                <td>{{ props.item.name }}</td>
                                                                <td>{{ props.item.phone }}</td>
                                                            </template>
                                                        </v-data-table>
                                                    </v-container>
                                                </div>

                                            </v-col>
                                        </div>

                                        <div v-if="step === 2">
                                            <v-col cols="12">
                                                <div>
                                                    <v-container>
                                                        <!-- 검색 필드 -->
                                                        <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined
                                                            dense clearable append-icon="mdi-magnify"
                                                            @keyup.enter="performSearch"></v-text-field>

                                                        <!-- 회원 정보 목록 테이블 -->
                                                        <v-data-table :headers="headers" :items="filteredMembers"
                                                            item-key="id" class="elevation-1">
                                                            <template v-slot:items="props">
                                                                <td>{{ props.item.id }}</td>
                                                                <td>{{ props.item.email }}</td>
                                                                <td>{{ props.item.name }}</td>
                                                                <td>{{ props.item.phone }}</td>
                                                            </template>
                                                        </v-data-table>
                                                    </v-container>
                                                </div>

                                            </v-col>
                                        </div>
                                    </v-col>

                                    <v-col cols="12">
                                        <div
                                            class="d-flex justify-center align-center justify-sm-space-between flex-wrap">
                                            <div class="mb-4 me-3">
                                                <p class="font-weight-normal mb-0 text-14">Showing 1-12 of 29
                                                    Reviews
                                                </p>
                                            </div>
                                            <div class="mb-4">
                                                <v-pagination class="food-truck-pagination" v-model="page" :length="4"
                                                    circle></v-pagination>
                                            </div>
                                        </div>
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
export default {
    head: {
        title: 'Order List'
    },
    data() {
        return {
            page: 1,
            step: 1, // 초기 단계 설정
            searchQuery: '',
        }
    },
    methods: {
        displayUserInfo() {
            // 임시 비밀번호 전송 로직 처리
            console.log('일반 회원 정보 관리');
            this.step = 1; // 다음 단계로 이동
        },
        displayOwnerInfo() {
            // 임시 비밀번호 인증 로직 처리
            console.log('식당 관리자 정보 관리');
            this.step = 2; // 다음 단계로 이동
        },
        performSearch() {
            // 여기에 검색 로직을 구현합니다
            console.log('검색어:', this.searchQuery);
            // 실제 검색 로직을 수행하는 부분을 작성하세요
        },
    }
}

</script>
<style lang="scss">
#select-user-owner,
#direction-btn {
    display: flex;
    flex-direction: row;
}

#text-nowrap {
    white-space: nowrap;
}

.search-container {
    margin-top: 20px;
}
</style>