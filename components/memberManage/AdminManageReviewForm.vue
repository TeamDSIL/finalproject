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
                                        <h1>리뷰 및 댓글 삭제 관리</h1>
                                    </v-col>

                                    <v-col cols="12">
                                        <div>
                                            <v-container>
                                                <!-- 검색 필드 -->
                                                <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined dense
                                                    clearable append-icon="mdi-magnify"
                                                    @keyup.enter="performSearch"></v-text-field>

                                                <!-- 회원 정보 목록 테이블 -->
                                                <v-data-table :headers="headers" :items="displayedMembers"
                                                    hide-default-footer>
                                                    <template v-slot:item="{ item }">
                                                        <tr>
                                                            <td>{{ item.id }}</td>
                                                            <td>{{ item.restaurantName }}</td>
                                                            <td>{{ item.name }}</td>
                                                            <td>{{ item.phone }}</td>
                                                            <td>{{ item.address }}</td>
                                                            <td>
                                                                <nuxt-link to="/memberManage/RegisterRestaurantPage">
                                                                    <v-btn color="primary" dark v-on="on">이동</v-btn>
                                                                </nuxt-link>
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
                                                        filteredMembers.length }} Reviews</p>
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

import AdminModifyUserForm from '@/components/memberManage/AdminModifyUserForm.vue';
export default {
    head: {
        title: 'Order List'
    },
    components: {
        AdminModifyUserForm,
    },
    data() {
        return {
            page: 1,
            step: 1, // 초기 단계 설정
            searchQuery: '',
            currentPage: 1, // 현재 페이지 번호
            itemsPerPage: 10, // 페이지당 표시할 아이템 수
            members: [
                { id: 1, email: 'example1@mail.com', name: 'John Doe', phone: '+1 123-456-7890' },
                { id: 2, email: 'example2@mail.com', name: 'Jane Doe', phone: '+1 987-654-3210' },
                { id: 3, email: 'example3@mail.com', name: 'Emily Smith', phone: '+1 555-123-4567' },
                { id: 4, email: 'example4@mail.com', name: 'Michael Johnson', phone: '+1 555-987-6543' },
                { id: 5, email: 'example5@mail.com', name: 'Sophia Williams', phone: '+1 555-456-7890' },
                { id: 6, email: 'example6@mail.com', name: 'James Brown', phone: '+1 555-876-5432' },
                { id: 7, email: 'example7@mail.com', name: 'Olivia Davis', phone: '+1 555-234-5678' },
                { id: 8, email: 'example8@mail.com', name: 'William Miller', phone: '+1 555-678-9012' },
                { id: 9, email: 'example9@mail.com', name: 'Emma Wilson', phone: '+1 555-345-6789' },
                { id: 10, email: 'example10@mail.com', name: 'Alexander Moore', phone: '+1 555-789-0123' },
                { id: 11, email: 'example11@mail.com', name: 'Isabella Taylor', phone: '+1 555-456-7890' },
                { id: 12, email: 'example12@mail.com', name: 'Ethan Anderson', phone: '+1 555-890-1234' },
                { id: 13, email: 'example13@mail.com', name: 'Mia Thomas', phone: '+1 555-567-8901' },
                { id: 14, email: 'example14@mail.com', name: 'Daniel Jackson', phone: '+1 555-012-3456' },
                { id: 15, email: 'example15@mail.com', name: 'Ava White', phone: '+1 555-678-9012' },
                { id: 16, email: 'example16@mail.com', name: 'Matthew Harris', phone: '+1 555-234-5678' },
                { id: 17, email: 'example17@mail.com', name: 'Chloe Martin', phone: '+1 555-901-2345' },
                { id: 18, email: 'example18@mail.com', name: 'Charlotte Thompson', phone: '+1 555-345-6789' },
                { id: 19, email: 'example19@mail.com', name: 'Liam Garcia', phone: '+1 555-678-9012' },
                { id: 20, email: 'example20@mail.com', name: 'Amelia Martinez', phone: '+1 555-012-3456' },
                { id: 21, email: 'example21@mail.com', name: 'Benjamin Robinson', phone: '+1 555-234-5678' },
                { id: 22, email: 'example22@mail.com', name: 'Harper Clark', phone: '+1 555-345-6789' },
                { id: 23, email: 'example23@mail.com', name: 'Evelyn Hall', phone: '+1 555-456-7890' },
                { id: 24, email: 'example24@mail.com', name: 'Lucas Lewis', phone: '+1 555-567-8901' },
                { id: 25, email: 'example25@mail.com', name: 'Aiden Lee', phone: '+1 555-678-9012' },
            ],
            headers: [
                { text: 'ID', align: 'start', value: 'id' },
                { text: '이메일', value: 'email' },
                { text: '이름', value: 'name' },
                { text: '전화번호', value: 'phone' },
                { text: '상세보기', value: 'btn' },
            ],
        }
    },
    computed: {
        // 검색어를 기반으로 필터링된 회원 정보 반환
        filteredMembers() {
            return this.members.filter(member =>
                member.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                member.phone.includes(this.searchQuery)
            );
        },
        displayedMembers() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            return this.filteredMembers.slice(startIndex, endIndex);
        },
        startItemIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        // 현재 페이지에 해당하는 아이템의 끝 인덱스
        endItemIndex() {
            const endIndex = this.currentPage * this.itemsPerPage;
            return endIndex > this.filteredMembers.length ? this.filteredMembers.length : endIndex;
        },
        // 필터링된 회원 수에 따른 페이지 수
        numberOfPages() {
            return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
        },
        paginationOptions() {
            return {
                currentPage: this.currentPage,
                itemsPerPage: this.itemsPerPage,
                // 다른 페이지네이션 옵션들도 필요한 경우 추가할 수 있습니다.
            };

        },
    },
    methods: {
        navigateToPage(newPage) {
            this.currentPage = newPage;
            // 페이지가 변경될 때마다 현재 페이지에 해당하는 회원 목록을 설정합니다.
            const startIndex = (newPage - 1) * this.itemsPerPage;
            const endIndex = newPage * this.itemsPerPage;
            this.displayedMembers = this.filteredMembers.slice(startIndex, endIndex);
        },
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
        openDetailDialog(item) {
            this.selectedMember = item;
            this.dialogVisible = true; // 다이얼로그를 열기 위해 dialogVisible 값을 true로 설정
        },
        // 검색, 정렬 및 페이지 변경 시 실행되는 이벤트 핸들러
        updateFilteredMembers(newMembers) {
            this.filteredMembers = newMembers;
        },
    },
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