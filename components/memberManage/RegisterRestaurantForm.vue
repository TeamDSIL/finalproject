<template>
    <v-container>


        <div>
            <v-tabs v-model="tab" class="mb-8">
                <v-tab class="text-capitalize" @click="goToRestaurantManageMain">
                    식당등록관리
                </v-tab>
            </v-tabs>

            <v-divider></v-divider>

            <v-row>
                <v-col cols="12">
                    <h3 class="fw-bold">식당 정보 등록</h3>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="5">
                    <!-- 식당 정보 수정 폼 -->
                    <v-form>
                        <!-- 식당 ID (읽기 전용) -->
                        <!-- <v-text-field v-model="restaurant.id" label="식당 ID" outlined readonly></v-text-field> -->

                        <!-- 식당명 (읽기 전용) -->
                        <v-text-field v-model="restaurant.name" label="식당명" outlined></v-text-field>

                        <!-- 식당 주소 (읽기 전용) -->
                        <v-text-field v-model="restaurant.address" label="식당 주소" outlined></v-text-field>

                        <!-- 식당 연락처 (수정 가능) -->
                        <v-text-field v-model="restaurant.contact" label="식당 연락처" outlined></v-text-field>

                        <!-- 식당 테이블 수 -->
                        <v-text-field v-model="restaurant.tableQuantity" label="테이블 수" outlined></v-text-field>

                        <!-- 예약금 설정 -->
                        <v-text-field v-model="restaurant.deposit" label="예약금 설정" outlined></v-text-field>

                        <!-- 식당 사진 -->
                        <v-file-input v-model="restaurant.image" label="식당 사진" prepend-icon="mdi-camera"
                            outlined></v-file-input>

                        <!-- 정보 등록 버튼 -->
                        <v-btn color="success" class="ma-2" @click="updateRestaurantInfo">
                            등록
                        </v-btn>
                    </v-form>
                </v-col>

                <v-col cols="7">
                    <v-card>
                        <v-card-title>
                            메뉴 등록
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <div v-for="(item, index) in menuItems" :key="index">
                                    <v-text-field v-model="item.name" label="메뉴 이름" outlined></v-text-field>
                                    <v-text-field v-model="item.price" label="메뉴 가격" type="number" prefix="₩"
                                        outlined></v-text-field>
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col cols="10">
                                                <v-file-input v-model="item.photo" label="메뉴 사진"
                                                    prepend-icon="mdi-camera" outlined></v-file-input></v-col>
                                            <v-col cols="2">
                                                <v-btn color="primary" @click="removeMenuItem(index)"
                                                    class="ma-2">삭제</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </div>
                                <v-btn color="primary" @click="addMenuItem" class="ma-2">메뉴 항목 추가</v-btn>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-col>


            </v-row>
            <br>
            <v-divider></v-divider>
        </div>
        <Footer />
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            showDialog: false, // 다이얼로그 표시 상태
            restaurant: {
                id: '', // 예시 ID
                name: '', // 예시 식당명
                address: '', // 예시 주소
                contact: '', // 수정 가능한 연락처
                deposit: '', // 수정 가능한 예약금
                tableQuantity: '',
                image: ''  // 수정 가능한 식당 사진
            },
            menuItems: [],
            page: 1,
            items: [
                {
                    text: 'Home',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'New York',
                    disabled: false,
                    href: '/',
                },
                {
                    text: 'Resturants',
                    disabled: true,
                    href: '/',
                },
            ],
            text: 'hello',
            tab: null,
            checkbox: true,
            radioGroup: 1,
            value: [20, 40],
            selected: null, // 현재 선택된 버튼을 저장
        };
    },
    methods: {
        goToRestaurantManageMain() {
            this.$router.push({ path: '/memberManage/AdminManageRestaurantPage' });
        },
        goToRestaurantReserveManage() {
            this.$router.push({ path: '/restaurant/RestaurantReserveManagePage' });
        },
        goToReviewManage() {
            this.$router.push({ path: '/restaurant/ReviewManagePage' });
        },
        toggleSelection(button) {
            // 선택된 버튼이 다시 클릭되면 선택 해제, 아니면 선택
            this.selected = this.selected === button ? null : button;
        },
        updateRestaurantInfo() {
            // 정보 업데이트 로직 추가
            console.log('업데이트된 정보:', this.restaurant);
        },
        saveMenu() {
            console.log('Menu saved:', this.menuItems);
            this.showDialog = false;
        },
        addMenuItem() {
            const newItem = {
                id: Date.now(), // 메뉴 ID는 현재 시간을 기반으로 자동 생성
                name: '',
                photo: '',
                price: 0
            };
            this.menuItems.push(newItem);
        },
        removeMenuItem(index) {
            this.menuItems.splice(index, 1);
        },
    }
};
</script>

<style>
/* 여기에 필요한 스타일 추가 */
</style>