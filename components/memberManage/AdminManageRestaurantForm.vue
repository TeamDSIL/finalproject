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
                                        <h1>식당 정보 관리</h1>
                                    </v-col>
                                    <v-col cols="12">
                                        <div>
                                            <v-container>
                                                <!-- 검색 필드 -->
                                                <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined dense
                                                    clearable append-icon="mdi-magnify"
                                                    @keyup.enter="performSearch"></v-text-field>

                                                <!-- 회원 정보 목록 테이블 -->
                                                <v-data-table :headers="headers" :items="displayedRestaurants"
                                                    hide-default-footer>
                                                    <template v-slot:item="{ item }" >
                                                        <tr>
                                                            <td>{{ item.id }}</td>
                                                            <td>{{ item.name }}</td>
                                                            <td>{{ item.ownerName }}</td>
                                                            <td>{{ item.tel }}</td>
                                                            <td>{{ item.address }}</td>
                                                            <td>
                                                                <v-dialog max-width="500">
                                                                    <template v-slot:activator="{ on }" >
                                                                        <v-btn color="primary" dark
                                                                            @click="openDetailDialog(item)"
                                                                            v-on="on">상세정보</v-btn>
                                                                    </template>
                                                                    <AdminModifyOwnerForm v-if="showDialog"
                                                                        :restaurant-info="selectedRestaurantInfo"
                                                                        @modify-user="handleModifyRestaurant" />
                                                                </v-dialog>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </v-data-table>
                                            </v-container>
                                        </div>

                                    </v-col>

                                    <v-col cols="12">
                                        <div
                                            class="d-flex justify-center align-center justify-sm-space-between flex-wrap">
                                            <div class="mb-4 me-3">
                                                <p class="font-weight-normal mb-0 text-14">Showing {{ startItemIndex
                                                    }}-{{ endItemIndex }} of {{
                                                        filteredRestaurants.length }} Reviews</p>
                                            </div>
                                            <div class="mb-4">
                                                <!-- 페이지네이션 -->
                                                <v-pagination v-model="currentPage" :length="numberOfPages" circle
                                                    @input="navigateToPage"></v-pagination>
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
import AdminModifyOwnerForm from '@/components/memberManage/AdminModifyOwnerForm.vue';
import axios from 'axios'; // axios를 import합니다.

export default {
    head: {
        title: 'Order List'
    },
    components: {
        AdminModifyOwnerForm,
    },
    data() {
        return {
            page: 1,
            step: 1, // 초기 단계 설정
            searchQuery: '',
            currentPage: 1, // 현재 페이지 번호
            itemsPerPage: 10, // 페이지당 표시할 아이템 수
            showDialog: {}, // 다이얼로그 표시 여부를 관리하는 변수 추가
            selectedRestaurantInfo: {}, // 선택된 사용자 정보를 저장할 변수 추가
            restaurants: [],
            headers: [
                { text: 'No', align: 'start', value: 'id' },
                { text: '상호명', value: 'name' },
                { text: '사업자명', value: 'ownerName' },
                { text: '연락처', value: 'phone' },
                { text: '주소', value: 'address' },
                { text: '상세보기', value: '' },
            ],
        }
    },
    created() {
        // 페이지가 로드될 때 API를 호출하여 회원 정보를 받아옵니다.
        this.fetchRestaurants();
    },
    computed: {
        // 검색어를 기반으로 필터링된 회원 정보 반환
        filteredRestaurants() {
            return this.restaurants.filter(restaurant =>
                restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.ownerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.tel.includes(this.searchQuery) ||
                restaurant.id.includes(this.searchQuery)
            );
        },
        displayedRestaurants() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            return this.filteredRestaurants.slice(startIndex, endIndex);
        },
        // 현재 페이지에 해당하는 첫 번째 아이템 인덱스 반환
        startItemIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        // 현재 페이지에 해당하는 마지막 아이템 인덱스 반환
        endItemIndex() {
            const endIndex = this.currentPage * this.itemsPerPage;
            return Math.min(endIndex, this.filteredRestaurants.length);
        },
        // 필터링된 회원 수에 따른 페이지 수 반환
        numberOfPages() {
            return Math.ceil(this.filteredRestaurants.length / this.itemsPerPage);
        },
    },
    methods: {
        // API를 호출하여 식당 정보를 받아오는 메서드입니다.
        async fetchRestaurants() {
            // API 통신을 통해 식당 정보를 받아옵니다.
            const response = await axios.get('http://localhost:8000/memberManage/adminManageRestaurantPage')
                .then((response) => {
                    // 받아온 식당 정보를 restaurants에 저장합니다.
                    this.restaurants = response.data;
                })
                .catch((error) => {
                    console.error('회원 정보를 불러오는 중 오류가 발생했습니다:', error);
                })
        },
        // 페이지 변경 시 실행되는 이벤트 핸들러
        navigateToPage(newPage) {
            this.currentPage = newPage;
        },
        // 검색 수행
        performSearch() {
            // 여기에 검색 로직을 구현
            console.log('검색어:', this.searchQuery);
            // 실제 검색 로직을 수행하는 부분을 작성하세요
        },
        // 다이얼로그 열기
        openDetailDialog(selectedRestaurant) {
            // 선택된 식당의 모든 정보 저장
            this.selectedRestaurantInfo = {
                id: selectedRestaurant.id,
                email: selectedRestaurant.email,
                name: selectedRestaurant.name,
                ownerName: selectedRestaurant.ownerName,
                tel: selectedRestaurant.tel,
                address: selectedRestaurant.address,
                // postcode: selectedRestaurant.postcode,
                registerNumber: selectedRestaurant.registerNumber
            };
            // 다이얼로그 표시
            this.showDialog = true;
        },
        // AdminModifyOwnerForm 컴포넌트에서 발생한 수정된 정보 처리
        handleModifyRestaurant(modifiedRestaurantInfo) {
            // 수정된 식당 정보 처리 로직
            console.log('수정된 식당 정보:', modifiedRestaurantInfo);
            // 다이얼로그 닫기
            this.showDialog = false;
            // 식당 정보 다시 불러오기
            this.fetchRestaurants();
        }

    },

}

</script>
<style lang="scss">
#text-nowrap {
    white-space: nowrap;
}

.search-container {
    margin-top: 20px;
}
</style>