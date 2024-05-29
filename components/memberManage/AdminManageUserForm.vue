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
                                        <h1>회원 정보 관리</h1>
                                    </v-col>

                                    <v-col cols="12">
                                        <div>
                                            <v-container>
                                                <!-- 검색 필드 -->
                                                <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined dense
                                                    clearable append-icon="mdi-magnify"
                                                    @keyup.enter="performSearch"></v-text-field>

                                                <!-- 일반 회원 정보 카드 -->

                                                <v-data-table :headers="headers" :items="displayedMembers"
                                                    hide-default-footer>
                                                    <template v-slot:item="{ item }" >
                                                        <tr>
                                                            <td>{{ item.id }}</td>
                                                            <td>{{ item.email }}</td>
                                                            <td>{{ item.point ? item.point.currentPoint : 'N/A' }}</td>
                                                            <td>{{ item.name }}</td>
                                                            <td>{{ item.tel }}</td>
                                                            <td>
                                                                <v-dialog max-width="500">
                                                                    <template v-slot:activator="{ on }">
                                                                        <v-btn color="primary"
                                                                            @click="openModifyUserForm(item)" v-on="on"
                                                                            :disabled="!item">상세정보</v-btn>
                                                                    </template>
                                                                    <!-- AdminModifyUserForm 컴포넌트에 selectedUserInfo 전달 -->
                                                                    <AdminModifyUserForm v-if="showDialog"
                                                                        :user-info="selectedUserInfo"
                                                                        @modify-user="handleModifyUser" />
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
import axios from 'axios'; // axios를 import합니다.

export default {
    head: {
        title: 'Order List'
    },
    components: {
        AdminModifyUserForm,
    },
    data() {
        return {
            user: null, // 사용자 정보를 저장할 변수
            page: 1,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 10,
            showDialog: {}, // 다이얼로그 표시 여부를 관리하는 변수 추가
            selectedUserInfo: {}, // 선택된 사용자 정보를 저장할 변수 추가
            members: [], // API로부터 받아온 회원 정보를 저장할 배열
            headers: [
                { text: 'ID', align: 'start', value: 'id' },
                { text: '이메일', value: 'email' },
                { text: '밥알', value: 'point' },
                { text: '이름', value: 'name' },
                { text: '전화번호', value: 'phone' },
                { text: '상세보기', value: '' },
            ],
        };
    },
    created() {
        // 페이지가 로드될 때 API를 호출하여 회원 정보를 받아옵니다.
        this.fetchMembers();
    },
    mounted() {
        this.fetchUserInfo();
    },
    computed: {
        // 필터링된 회원 목록 반환
        filteredMembers() {
            return this.members.filter(member =>
                member.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                member.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                member.tel.includes(this.searchQuery)
            )
        },
        // 현재 페이지에 해당하는 회원 목록 반환
        displayedMembers() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = this.currentPage * this.itemsPerPage;
            return this.filteredMembers.slice(startIndex, endIndex);
        },
        // 현재 페이지에 해당하는 첫 번째 아이템 인덱스 반환
        startItemIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        // 현재 페이지에 해당하는 마지막 아이템 인덱스 반환
        endItemIndex() {
            const endIndex = this.currentPage * this.itemsPerPage;
            return Math.min(endIndex, this.filteredMembers.length);
        },
        // 필터링된 회원 수에 따른 페이지 수 반환
        numberOfPages() {
            return Math.ceil(this.filteredMembers.length / this.itemsPerPage);
        },
    },
    methods: {
        async fetchUserInfo() {
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
                    console.log('User Info:', userInfo);
                    // 사용자 정보를 상태나 컴포넌트 데이터에 저장
                    this.user = userInfo;
                    console.log(this.user);
                    console.log(this.user.id);
                } else {
                    console.error('Failed to fetch user info:', response);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        // API를 호출하여 회원 정보를 받아오는 메소드입니다.
        async fetchMembers() {

            // API 통신을 통해 회원 정보를 받아옵니다.
            const response = await axios.get(`${process.env.API_URL}/memberManage/adminManageUserPage`)
                .then((response) => {
                    // 받아온 회원 정보를 members에 저장합니다.
                    this.members = response.data;
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
            // 실제 검색 로직 수행
        },
        openModifyUserForm(selectedUser) {
            // 선택된 사용자의 모든 정보 저장
            this.selectedUserInfo = {
                email: selectedUser.email,
                password: selectedUser.password,
                name: selectedUser.name,
                tel: selectedUser.tel,
                address: selectedUser.address,
                postcode: selectedUser.postcode,
                point: selectedUser.point,
            };
            // 다이얼로그 표시
            this.showDialog = true;
        },
        // AdminModifyUserForm 컴포넌트에서 발생한 수정된 정보 처리
        handleModifyUser(modifiedUserInfo) {
            // 수정된 사용자 정보 처리 로직
            console.log('수정된 사용자 정보:', modifiedUserInfo);
            // 다이얼로그 닫기
            this.showDialog = false;
            // 회원 정보 다시 불러오기
            this.fetchMembers();
        }
    },
};
</script>

<style lang="scss">
#text-nowrap {
    white-space: nowrap;
}

.search-container {
    margin-top: 20px;
}
</style>
