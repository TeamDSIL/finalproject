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
                    <h1>공지사항 게시판</h1>
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

                        <!-- 공지사항 목록 테이블 -->
                        <v-data-table
                          :headers="headers"
                          :items="displayedNotices"
                          hide-default-footer
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.category }}</td>
                              <td @click="showDetails(item)" class="clickable">
                                {{ item.title }}
                              </td>
                              <td>{{ item.postDate }}</td>
                              <td>
                                <v-dialog
                                  max-width="500"
                                  :class="{ 'overlay-hidden': !showDialog }"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      color="primary"
                                      v-on="on"
                                      @click="editNotice(item)"
                                    >
                                      상세정보
                                    </v-btn>
                                  </template>
                                </v-dialog>
                              </td>
                              <td>
                                <v-btn
                                  icon
                                  color="red"
                                  @click.stop="deleteNotice(item.id)"
                                >
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
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
                          {{ filteredNotices.length }} Notices
                        </p>
                      </div>
                      <div class="d-flex mb-4 align-center">
                        <v-btn
                          @click="openModal"
                          style="color: rgb(210, 63, 87); border-radius: 10px"
                        >
                          <v-icon>mdi-plus</v-icon>글 등록
                        </v-btn>

                        <!-- 페이지네이션 -->
                        <v-pagination
                          v-model="currentPage"
                          :length="numberOfPages"
                          circle
                          @input="navigateToPage"
                          style="margin-left: 5px"
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

    <!-- Create and Edit Notice Modal -->
    <v-dialog v-model="showCreateNoticeModal" max-width="600px">
      <v-card
        class="pa-4"
        style="border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1)"
      >
        <v-card-title
          class="headline"
          :class="editingNotice ? 'notice-edit' : 'notice-create'"
          style="
            font-weight: bold;
            margin-left: 10px;
            font-size: larger;
            color: #333;
          "
        >
          {{ editingNotice ? "공지사항 수정" : "공지사항 작성" }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="currentNotice.category"
                  :items="noticeCategories"
                  label="공지사항 유형"
                  required
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="currentNotice.title"
                  label="공지 제목"
                  required
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="currentNotice.contents"
                  label="내용"
                  required
                  outlined
                  rows="6"
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="currentNotice.filePath"
                  label="파일 첨부"
                  prepend-icon="mdi-paperclip"
                  accept="image/*, application/pdf"
                  @change="onFileChanged"
                  outlined
                  dense
                ></v-file-input>
                <!-- 이미지 미리보기 -->
                <v-img
                  v-if="imageUrl"
                  :src="imageUrl"
                  height="200"
                  class="mt-4"
                  style="border-radius: 8px; object-fit: cover"
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeModal">취소</v-btn>
          <v-btn
            class="register-btn"
            :class="editingNotice ? 'update-btn' : 'create-btn'"
            @click="editingNotice ? updateNotice() : createNotice()"
            style="background-color: rgb(210, 63, 87); color: white"
          >
            등록
          </v-btn>
          <!--  -->
          <!--  -->
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Notice Details Modal -->
    <v-dialog v-model="showDetailsModal" max-width="600px">
      <v-card style="padding-top: 10px">
        <v-card-title style="font-weight: bold; margin-left: 10px">
          공지사항 상세 조회
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="detailsNotice.category"
                  label="공지 유형"
                  readonly
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="detailsNotice.title"
                  label="제목"
                  readonly
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="detailsNotice.contents"
                  label="내용"
                  readonly
                  outlined
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-img
                  v-if="
                    detailsNotice.filePath &&
                    detailsNotice.filePath.startsWith('http')
                  "
                  :src="detailsNotice.filePath"
                  alt="첨부 이미지"
                  height="200"
                ></v-img>
                <v-text-field
                  v-if="
                    detailsNotice.filePath &&
                    !detailsNotice.filePath.startsWith('http')
                  "
                  v-model="detailsNotice.filePath"
                  label="첨부 파일"
                  readonly
                  prepend-icon="mdi-paperclip"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeDetailsModal">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        { text: "공지사항 유형", value: "category" },
        { text: "공지 제목", value: "title" },
        { text: "게시 날짜", value: "postDate" },
        { text: "수정하기", value: "actions" },
        { text: "삭제", value: "actions" },
      ],
      notices: [],
      currentNotice: {
        category: "",
        title: "",
        contents: "",
        filePath: null,
        postDate: null,
      },
      detailsNotice: {
        category: "",
        title: "",
        contents: "",
        filePath: "",
      },
      editingNotice: null,
      noticeCategories: ["공지", "이벤트"],
      showCreateNoticeModal: false,
      showDetailsModal: false,
      imageUrl: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 10,
      showDialog: false,
    };
  },
  computed: {
    filteredNotices() {
      if (!this.notices) return [];
      return this.notices.filter(
        (notice) =>
          notice.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          notice.category
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          notice.contents.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    displayedNotices() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = this.currentPage * this.itemsPerPage;
      return this.filteredNotices.slice(startIndex, endIndex);
    },
    startItemIndex() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },
    endItemIndex() {
      const endIndex = this.currentPage * this.itemsPerPage;
      return endIndex > this.filteredNotices.length
        ? this.filteredNotices.length
        : endIndex;
    },
    numberOfPages() {
      return Math.ceil(this.filteredNotices.length / this.itemsPerPage);
    },
  },
  methods: {
    fetchNotices() {
      axios
        .get("http://localhost:8000/informs/")
        .then((response) => {
          this.notices = response.data;
        })
        .catch((error) => {
          console.error("Error fetching the notices:", error);
        });
    },
    openModal() {
      this.currentNotice = {
        category: "",
        title: "",
        contents: "",
        filePath: null,
        postDate: null,
      };
      this.editingNotice = null;
      this.showCreateNoticeModal = true;
      this.imageUrl = null;
    },
    editNotice(item) {
      this.currentNotice = { ...item };
      this.editingNotice = item;
      this.showCreateNoticeModal = true;
      this.imageUrl = item.filePath || null;
    },
    closeModal() {
      this.showCreateNoticeModal = false;
      this.editingNotice = null;
      this.currentNotice = {
        category: "",
        title: "",
        contents: "",
        filePath: null,
        postDate: null,
      };
      this.imageUrl = null;
    },
    async createNotice() {
      const formData = new FormData();
      const noticeData = {
        ...this.currentNotice,
        postDate: new Date().toISOString().split("T")[0],
      };
      formData.append(
        "inform",
        new Blob([JSON.stringify(noticeData)], { type: "application/json" })
      );
      if (this.currentNotice.filePath) {
        const resizedFile = await this.resizeImage(this.currentNotice.filePath);
        formData.append("file", resizedFile, this.currentNotice.filePath.name);
      }

      axios
        .post("http://localhost:8000/informs/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          this.notices.push(response.data);
          this.closeModal();
          alert("공지사항이 성공적으로 생성되었습니다.");
        })
        .catch((error) => {
          console.error("Error creating the notice:", error);
          alert("공지사항 생성 실패: " + error.message);
        });
    },
    async updateNotice() {
      const formData = new FormData();
      const noticeData = {
        ...this.currentNotice,
        postDate:
          this.currentNotice.postDate || new Date().toISOString().split("T")[0],
      };
      formData.append(
        "inform",
        new Blob([JSON.stringify(noticeData)], { type: "application/json" })
      );
      if (this.currentNotice.filePath) {
        const resizedFile = await this.resizeImage(this.currentNotice.filePath);
        formData.append("file", resizedFile, this.currentNotice.filePath.name);
      }

      axios
        .put(
          `http://localhost:8000/informs/${this.editingNotice.id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((response) => {
          const index = this.notices.findIndex(
            (n) => n.id === this.editingNotice.id
          );
          if (index !== -1) {
            this.$set(this.notices, index, response.data);
          }
          this.closeModal();
          alert("공지사항이 성공적으로 업데이트되었습니다.");
        })
        .catch((error) => {
          console.error("Error updating the notice:", error);
          alert("공지사항 업데이트 실패: " + error.message);
        });
    },
    // 공지사항 삭제하기
    deleteNotice(id) {
      if (confirm("진짜 삭제하시겠습니까?")) {
        // 사용자에게 삭제 확인 요청
        axios
          .delete(`http://localhost:8000/informs/${id}`)
          .then(() => {
            this.notices = this.notices.filter((notice) => notice.id !== id); // 성공적으로 삭제된 경우 클라이언트에서도 제거
            alert("공지사항이 성공적으로 삭제되었습니다."); // 성공 알림
          })
          .catch((error) => {
            console.error("Error deleting the notice:", error);
            alert("공지사항 삭제 실패: " + error.message); // 실패 알림
          });
      } else {
        console.log("삭제 취소됩니다."); // 사용자가 삭제를 취소한 경우
      }
    },

    onFileChanged() {
      const filePath = this.currentNotice.filePath;
      if (filePath && filePath.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(filePath);
      } else {
        this.imageUrl = null;
      }
    },
    showDetails(item) {
      this.detailsNotice = { ...item };
      this.showDetailsModal = true;
    },
    closeDetailsModal() {
      this.showDetailsModal = false;
    },
    navigateToPage(newPage) {
      this.currentPage = newPage;
    },
  },
  mounted() {
    this.fetchNotices();
  },
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
