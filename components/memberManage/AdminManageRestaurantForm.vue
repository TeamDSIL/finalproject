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
                                                    <template v-slot:item="{ item }">
                                                        <tr>
                                                            <td>{{ item.id }}</td>
                                                            <td>{{ item.restaurantName }}</td>
                                                            <td>{{ item.name }}</td>
                                                            <td>{{ item.phone }}</td>
                                                            <td>{{ item.address }}</td>
                                                            <td>
                                                                <v-dialog max-width="500">
                                                                    <template v-slot:activator="{ on }">
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
            restaurants: [
                { id: 1, restaurantName: 'Restaurant 1', name: 'John Doe', phone: '+1 123-456-7890', address: 'Address 1' },
                { id: 2, restaurantName: 'Restaurant 2', name: 'Jane Doe', phone: '+1 987-654-3210', address: 'Address 2' },
                { id: 3, restaurantName: 'Restaurant 3', name: 'Emily Smith', phone: '+1 555-123-4567', address: 'Address 3' },
                { id: 4, restaurantName: 'Restaurant 4', name: 'Michael Johnson', phone: '+1 555-987-6543', address: 'Address 4' },
                { id: 5, restaurantName: 'Restaurant 5', name: 'Sophia Williams', phone: '+1 555-456-7890', address: 'Address 5' },
                { id: 6, restaurantName: 'Restaurant 6', name: 'James Brown', phone: '+1 555-876-5432', address: 'Address 6' },
                { id: 7, restaurantName: 'Restaurant 7', name: 'Olivia Davis', phone: '+1 555-234-5678', address: 'Address 7' },
                { id: 8, restaurantName: 'Restaurant 8', name: 'William Miller', phone: '+1 555-678-9012', address: 'Address 8' },
                { id: 9, restaurantName: 'Restaurant 9', name: 'Emma Wilson', phone: '+1 555-345-6789', address: 'Address 9' },
                { id: 10, restaurantName: 'Restaurant 10', name: 'Alexander Moore', phone: '+1 555-789-0123', address: 'Address 10' },
                { id: 11, restaurantName: 'Restaurant 11', name: 'Isabella Taylor', phone: '+1 555-456-7890', address: 'Address 11' },
                { id: 12, restaurantName: 'Restaurant 12', name: 'Ethan Anderson', phone: '+1 555-890-1234', address: 'Address 12' },
                { id: 13, restaurantName: 'Restaurant 13', name: 'Mia Thomas', phone: '+1 555-567-8901', address: 'Address 13' },
                { id: 14, restaurantName: 'Restaurant 14', name: 'Daniel Jackson', phone: '+1 555-012-3456', address: 'Address 14' },
                { id: 15, restaurantName: 'Restaurant 15', name: 'Ava White', phone: '+1 555-678-9012', address: 'Address 15' },
                { id: 16, restaurantName: 'Restaurant 16', name: 'Matthew Harris', phone: '+1 555-234-5678', address: 'Address 16' },
                { id: 17, restaurantName: 'Restaurant 17', name: 'Chloe Martin', phone: '+1 555-901-2345', address: 'Address 17' },
                { id: 18, restaurantName: 'Restaurant 18', name: 'Charlotte Thompson', phone: '+1 555-345-6789', address: 'Address 18' },
                { id: 19, restaurantName: 'Restaurant 19', name: 'Liam Garcia', phone: '+1 555-678-9012', address: 'Address 19' },
                { id: 20, restaurantName: 'Restaurant 20', name: 'Amelia Martinez', phone: '+1 555-012-3456', address: 'Address 20' },
                { id: 21, restaurantName: 'Restaurant 21', name: 'Benjamin Robinson', phone: '+1 555-234-5678', address: 'Address 21' },
                { id: 22, restaurantName: 'Restaurant 22', name: 'Harper Clark', phone: '+1 555-345-6789', address: 'Address 22' },
                { id: 23, restaurantName: 'Restaurant 23', name: 'Evelyn Hall', phone: '+1 555-456-7890', address: 'Address 23' },
                { id: 24, restaurantName: 'Restaurant 24', name: 'Lucas Lewis', phone: '+1 555-567-8901', address: 'Address 24' },
                { id: 25, restaurantName: 'Restaurant 25', name: 'Aiden Lee', phone: '+1 555-678-9012', address: 'Address 25' }
            ],
            headers: [
                { text: 'No', align: 'start', value: 'id' },
                { text: '상호명', value: 'restaurantName' },
                { text: '사업자명', value: 'name' },
                { text: '연락처', value: 'phone' },
                { text: '주소', value: 'address' },
                { text: '상세보기', value: '' },
            ],
        }
    },
    computed: {
        // 검색어를 기반으로 필터링된 회원 정보 반환
        filteredRestaurants() {
            return this.restaurants.filter(restaurant =>
                restaurant.restaurantName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                restaurant.phone.includes(this.searchQuery)
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
        navigateToPage(newPage) {
            this.currentPage = newPage;
            // 페이지가 변경될 때마다 현재 페이지에 해당하는 회원 목록을 설정합니다.
            const startIndex = (newPage - 1) * this.itemsPerPage;
            const endIndex = newPage * this.itemsPerPage;
            this.displayedRestaurants = this.filteredRestaurants.slice(startIndex, endIndex);
        },
        performSearch() {
            // 여기에 검색 로직을 구현합니다
            console.log('검색어:', this.searchQuery);
            // 실제 검색 로직을 수행하는 부분을 작성하세요
        },
        // 다이얼로그 열기
        openDetailDialog(selectedRestaurant) {
            // 선택된 식당의 모든 정보 저장
            this.selectedRestaurantInfo = {
                restaurantName: selectedRestaurant.restaurantName,
                name: selectedRestaurant.name,
                phone: selectedRestaurant.phone,
                address: selectedRestaurant.address
            };
            // 다이얼로그 표시
            this.showDialog = true;
        },
        // 검색, 정렬 및 페이지 변경 시 실행되는 이벤트 핸들러
        updateFilteredMembers(newMembers) {
            this.filteredRestaurants = newMembers;
        },
        // AdminModifyOwnerForm 컴포넌트에서 발생한 수정된 정보 처리
        handleModifyRestaurant(modifiedRestaurantInfo) {
            // 수정된 식당 정보 처리 로직
            console.log('수정된 식당 정보:', modifiedRestaurantInfo);
            // 다이얼로그 닫기
            this.showDialog = false;
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