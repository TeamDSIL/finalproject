<template>
    <div>
        <v-container>


            <v-row>
                <v-col cols="12">
                    <Box class="dashboard-box">
                        <div slot="boxSidebar">
                            <AdminDashBoardSideBar />

                        </div>
                        <div slot="boxContent">
                            <div class="px-10">
                                <v-row>
                                    <v-col cols="12">
                                        <h1>식당 등록 관리</h1>
                                    </v-col>

                                    <v-row>

                                        <v-col cols="12">
                                            <v-card>
                                                <v-card-title>
                                                    식당 정보
                                                </v-card-title>

                                                <v-container>
                                                    <!-- 식당 정보 수정 폼 -->
                                                    <v-form>
                                                        <v-row>
                                                            <v-col cols="6">
                                                                <v-container>
                                                                <!-- 회원 ID  -->
                                                                <v-text-field v-model="restaurant.id" label="회원 ID"
                                                                    outlined></v-text-field>

                                                                <!-- 회원 PW  -->
                                                                <v-text-field v-model="restaurant.pw" label="회원 PW"
                                                                    outlined></v-text-field>

                                                                <!-- 사업자등록번호  -->
                                                                <v-text-field v-model="restaurant.registerNum"
                                                                    label="사업자등록번호" outlined></v-text-field>

                                                                <!-- 식당명 (읽기 전용) -->
                                                                <v-text-field v-model="restaurant.name" label="식당명"
                                                                    outlined></v-text-field>

                                                                <!-- 식당 주소 (읽기 전용) -->
                                                                <v-text-field v-model="restaurant.address" label="식당 주소"
                                                                    outlined></v-text-field>

                                                                <input type="text" id="sample6_postcode"
                                                                    placeholder="우편번호">
                                                                <input type="button"
                                                                    onclick="sample6_execDaumPostcode()"
                                                                    value="우편번호 찾기"><br>
                                                                <input type="text" id="sample6_address"
                                                                    placeholder="주소"><br>
                                                                <input type="text" id="sample6_detailAddress"
                                                                    placeholder="상세주소">
                                                                <input type="text" id="sample6_extraAddress"
                                                                    placeholder="참고항목">
                                                                </v-container>
                                                            </v-col>

                                                            <v-col cols="6">
                                                                <v-container>
                                                                <!-- 식당 연락처 (수정 가능) -->
                                                                <v-text-field v-model="restaurant.contact"
                                                                    label="식당 연락처" outlined></v-text-field>

                                                                <!-- 식당 테이블 수 -->
                                                                <v-text-field v-model="restaurant.tableQuantity"
                                                                    label="테이블 수" outlined></v-text-field>

                                                                <!-- 예약금 설정 -->
                                                                <v-text-field v-model="restaurant.deposit"
                                                                    label="예약금 설정" outlined></v-text-field>

                                                                <!-- 식당 사진 -->
                                                                <v-file-input v-model="restaurant.image" label="식당 사진"
                                                                    prepend-icon="mdi-camera" outlined></v-file-input>

                                                                <!-- 카테고리 등록 -->
                                                                <v-text-field v-model="restaurant.category"
                                                                    label="카테고리 설정" outlined></v-text-field>

                                                                <!--편의시설 등록 -->
                                                                <v-text-field v-model="restaurant.facilities"
                                                                    label="편의시설 설정" outlined></v-text-field>
                                                                </v-container>
                                                            </v-col>
                                                        </v-row>

                                                        <v-container>
                                                        <div v-for="(item, index) in menuItems" :key="index">
                                                            <v-text-field v-model="item.name" label="메뉴 이름"
                                                                outlined></v-text-field>
                                                            <v-text-field v-model="item.price" label="메뉴 가격"
                                                                type="number" prefix="₩" outlined></v-text-field>
                                                            <v-col cols="12">
                                                                <v-row>
                                                                    <v-col cols="10">
                                                                        <v-file-input v-model="item.photo" label="메뉴 사진"
                                                                            prepend-icon="mdi-camera"
                                                                            outlined></v-file-input></v-col>
                                                                    <v-col cols="2">
                                                                        <v-btn color="primary"
                                                                            @click="removeMenuItem(index)"
                                                                            class="ma-2">삭제</v-btn>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                        </div>
                                                        <v-btn color="primary" @click="addMenuItem" class="ma-2">메뉴 항목
                                                            추가</v-btn>
                                                    </v-container>

                                                        <!-- 정보 등록 버튼 -->
                                                        <v-btn color="success" class="ma-2"
                                                            @click="updateRestaurantInfo">
                                                            등록
                                                        </v-btn>
                                                    </v-form>
                                                </v-container>
                                            </v-card>
                                        </v-col>
                                    </v-row>
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


function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}

export default {
    data() {
        return {
            showDialog: false, // 다이얼로그 표시 상태
            restaurant: {
                id: '', // 예시 ID
                pw: '',
                registerNum: '',
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
<style></style>