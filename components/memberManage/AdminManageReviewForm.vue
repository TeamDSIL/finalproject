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
                        <v-text-field
                          v-model="searchQuery"
                          label="검색어를 입력하세요"
                          outlined
                          dense
                          clearable
                          append-icon="mdi-magnify"
                          @keyup.enter="performSearch"
                        ></v-text-field>

                        <!-- 회원 정보 목록 테이블 -->
                        <v-data-table
                          :headers="headers"
                          :items="displayedMembers"
                          hide-default-footer
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.reviewId }}</td>
                              <td>{{ item.userEamil }}</td>
                              <td>
                                {{ truncateString(item.replyContent, 13) }}
                              </td>
                              <td>
                                {{ truncateString(item.reviewContent, 13) }}
                              </td>
                              <td>
                                <v-dialog
                                  max-width="500"
                                  :class="{ 'overlay-hidden': !showDialog }"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      color="primary"
                                      @click="openReviewInfoForm(item)"
                                      v-on="on"
                                      >상세정보</v-btn
                                    >
                                  </template>
                                  <ReviewInfoForm
                                    v-if="showDialog"
                                    :reviewInfo="reviewInfo"
                                    @close-dialog="handleCloseDialog"
                                  />
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
                      class="d-flex justify-center align-center justify-sm-space-between flex-wrap"
                    >
                      <div class="mb-4 me-3">
                        <p class="font-weight-normal mb-0 text-14">
                          Showing {{ startItemIndex }}-{{ endItemIndex }} of
                          {{ filteredMembers.length }} Reviews
                        </p>
                      </div>
                      <div class="mb-4">
                        <!-- 페이지네이션 -->
                        <v-pagination
                          v-model="currentPage"
                          :length="numberOfPages"
                          circle
                          @input="navigateToPage"
                        ></v-pagination>
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
import AdminModifyUserForm from "@/components/memberManage/AdminModifyUserForm.vue";
import ReviewInfoForm from "@/components/memberManage/ReviewInfoForm.vue";
import axios from "axios";

export default {
  head: {
    title: "Order List",
  },
  components: {
    AdminModifyUserForm,
    ReviewInfoForm,
  },
  data() {
    return {
      page: 1,
      step: 1, // 초기 단계 설정
      searchQuery: "",
      currentPage: 1, // 현재 페이지 번호
      itemsPerPage: 10, // 페이지당 표시할 아이템 수
      showDialog: false,
      reviewInfo: {}, // 리뷰 정보를 저장할 객체 추가
      reviewInfos: [],
      reviewsList: [],
      headers: [
        { text: "No", align: "start", value: "id" },
        { text: "이메일", value: "email" },
        { text: "댓글", value: "reply" },
        { text: "리뷰", value: "review" },
        { text: "상세보기", value: "" },
      ],
    };
  },
  created() {
    this.fetchReviews();
  },
  computed: {
    // 검색어를 기반으로 필터링된 회원 정보 반환
    filteredMembers() {
      return this.reviewInfos.filter(
        (review) =>
          review.userEamil
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          review.replyContent
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          review.reviewContent
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
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
      return endIndex > this.filteredMembers.length
        ? this.filteredMembers.length
        : endIndex;
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
    fetchReviews() {
      axios
        .get(`http://localhost:8000/memberManage/reviewManage`)
        .then((response) => {
          this.reviewInfos = response.data;
          console.log(this.reviewInfos);
        })
        .catch((error) => {
          console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
        });
    },
    truncateString(str, num) {
      if (!str) {
        // 입력 문자열이 비어있는 경우
        return "댓글이 없습니다.";
      } else if (str.length > num) {
        // 입력 문자열이 지정된 길이보다 길 경우
        return str.slice(0, num) + "...";
      } else {
        // 입력 문자열이 지정된 길이 이내인 경우
        return str;
      }
    },
    openReviewInfoForm(reviewInfo) {
      // 선택된 사용자의 모든 정보 저장
      this.reviewInfo = {
        userEamil: reviewInfo.userEamil,
        userId: reviewInfo.userId,
        reviewContent: reviewInfo.reviewContent,
        reviewId: reviewInfo.reviewId,
        reviewStatus: reviewInfo.reviewStatus,
        registerDate: reviewInfo.registerDate,
        replyContent: reviewInfo.replyContent,
        replyId: reviewInfo.replyId,
        replyStatus: reviewInfo.replyStatus,
      };
      // 다이얼로그 표시
      this.showDialog = true;
    },
    navigateToPage(newPage) {
      this.currentPage = newPage;
      // 페이지가 변경될 때마다 현재 페이지에 해당하는 회원 목록을 설정합니다.
      const startIndex = (newPage - 1) * this.itemsPerPage;
      const endIndex = newPage * this.itemsPerPage;
      this.displayedMembers = this.filteredMembers.slice(startIndex, endIndex);
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
};
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
