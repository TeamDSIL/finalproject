<template>
    <v-container>


        <div>
            <v-tabs v-model="tab" class="mb-8">


                <v-tab class="text-capitalize" @click="goToRestaurantManageMain">
                    식당관리메인
                </v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-row>
                <v-col cols="12">
                    <h3 class="fw-bold">식당정보수정</h3>
                </v-col>
            </v-row>
            <v-row>
                <!-- 식당 정보 수정 폼 -->
                <v-form>

                    <!-- 식당명 (읽기 전용) -->
                    <v-text-field v-model="restaurant.name" label="식당명" outlined readonly></v-text-field>

                    <!-- 식당 주소 (읽기 전용) -->
                    <v-text-field v-model="restaurant.address" label="식당 주소" outlined readonly></v-text-field>

                    <!-- 식당 연락처 (수정 가능) -->
                    <v-text-field v-model="restaurant.contact" label="식당 연락처" outlined></v-text-field>

                    <!-- 식당 테이블 수(수정가능) -->
                    <v-text-field v-model="restaurant.table" label="테이블 수" outlined></v-text-field>

                    <!-- 메뉴 수정 버튼 -->
                    <v-btn color="rgb(255,205,2)" @click="showDialog = true" class="ma-2">
                        메뉴 수정
                    </v-btn>

                    <!-- 메뉴 수정 모달 -->
                    <v-dialog v-model="showDialog" persistent max-width="600px">
                        <v-card>
                            <v-card-title>
                                메뉴 수정
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <div v-for="(item, index) in menuItems" :key="index">
                                        <v-text-field v-model="item.name" label="메뉴 이름" outlined></v-text-field>
                                        <v-text-field v-model="item.price" label="메뉴 가격" type="number" prefix="₩"
                                            outlined></v-text-field>
                                        <v-file-input v-model="item.photo" label="메뉴 사진" prepend-icon="mdi-camera"
                                            outlined></v-file-input>
                                        <v-btn color="red" @click="removeMenuItem(index)" class="ma-2">삭제</v-btn>
                                    </div>
                                    <v-btn color="primary" @click="addMenuItem" class="ma-2">메뉴 항목 추가</v-btn>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="showDialog = false">취소</v-btn>
                                <v-btn color="blue darken-1" text @click="saveMenu">저장</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <!-- 예약금 설정 (수정 가능) -->
                    <v-text-field v-model="restaurant.deposit" label="예약금 설정" outlined></v-text-field>

                    <!-- 식당 사진 (수정 가능) -->
                    <v-file-input v-model="restaurant.image" label="식당 사진" prepend-icon="mdi-camera"
                        outlined></v-file-input>

                    <!-- 정보 수정 버튼 -->
                    <v-btn color="success" class="ma-2" @click="updateRestaurantInfo">
                        정보 수정
                    </v-btn>
                </v-form>


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
            showDialog: false, // 다이얼로그(모달) 표시 상태
            restaurant: {
                id: this.$route.params.id, // 경로 매개변수에서 ID 가져오기
                name: this.$route.query.name,
                address: this.$route.query.address,
                contact: this.$route.query.contact,
                description: this.$route.query.description,
                image: this.$route.query.image,
                chip: this.$route.query.chip === 'true', // Boolean으로 변환
                table: parseInt(this.$route.query.table), // 문자열을 숫자로 변환
                deposit: this.$route.query.deposit,
                crowd: this.$route.query.crowd,
            },
            menuItems: [],
            restaurantName: "기영이네 존맛치킨",
            headers: [
                { text: '날짜', value: 'date' },
                { text: '시간', value: 'time' },
                { text: '고객 이름', value: 'customerName' }
            ],
            bookings: [
                { id: 1, date: "2023-04-03", time: "18:00", customerName: "정휘제" },
                { id: 1, date: "2023-04-03", time: "17:00", customerName: "윤여빈" },
                { id: 1, date: "2023-04-02", time: "18:00", customerName: "문상현" },
                { id: 1, date: "2023-04-01", time: "18:00", customerName: "윤호상" },
                { id: 1, date: "2023-04-01", time: "17:00", customerName: "임태환" },
                { id: 1, date: "2023-03-31", time: "18:00", customerName: "이다혜" },
                { id: 1, date: "2023-03-30", time: "18:00", customerName: "아카자" },
                { id: 1, date: "2023-03-29", time: "18:00", customerName: "코주루" },
                { id: 1, date: "2023-03-28", time: "18:00", customerName: "유비" },
                { id: 1, date: "2023-03-27", time: "18:00", customerName: "관우" },
                { id: 1, date: "2023-03-27", time: "18:00", customerName: "장비" },
                { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민슥" },
                { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민쇽" },
                { id: 1, date: "2023-03-27", time: "18:00", customerName: "구민샥" },
                // 예약 목록
            ],
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


            reviews: [
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                { id: 1, date: "2023-04-03", customerName: "삼기영", content: "맛있어요!" },
                // 리뷰 목록
            ]
        };
    },
    methods: {
        goToRestaurantManageMain() {
            this.$router.push({ path: '/restaurant/RestaurantManageMainPage' });
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