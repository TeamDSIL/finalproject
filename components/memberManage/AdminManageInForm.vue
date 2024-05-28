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
                        <v-text-field v-model="searchQuery" label="검색어를 입력하세요" outlined dense clearable
                          append-icon="mdi-magnify" @keyup.enter="performSearch"></v-text-field>

                        <!-- 공지사항 목록 테이블 -->
                        <v-data-table :headers="headers" :items="displayedNotices" hide-default-footer>
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.category }}</td>
                              <td @click="showDetails(item)" class="clickable">
                                {{ item.title }}
                              </td>
                              <td>{{ item.postDate }}</td>
                              <td>
                                <v-btn color="primary" @click="editNotice(item)">
                                  상세정보
                                </v-btn>
                              </td>
                              <td>
                                <v-btn icon color="red" @click.stop="deleteNotice(item.id)">
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
                    <div class="d-flex justify-center align-center justify-sm-space-between flex-wrap">
                      <div class="mb-4 me-3" style="margin-left: 10px">
                        <v-btn @click="openModal" style="color: rgb(210, 63, 87); border-radius: 10px">
                          <v-icon>mdi-plus</v-icon>글 등록
                        </v-btn>
                      </div>
                      <div class="d-flex mb-4 align-center">
                        <!-- 페이지네이션 -->
                        <v-pagination v-model="currentPage" :length="numberOfPages" circle @input="navigateToPage"
                          :total-visible="10" style="margin-left: 5px"></v-pagination>
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
      <v-card class="pa-4" style="border-radius: 12px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1)">
        <v-card-title class="headline" :class="editingNotice ? 'notice-edit' : 'notice-create'" style="
            font-weight: bold;
            margin-left: 10px;
            font-size: larger;
            color: #333;
          ">
          {{ editingNotice ? "공지사항 수정" : "공지사항 작성" }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model="currentNotice.category" :items="noticeCategories" label="공지사항 유형" required outlined
                  dense></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="currentNotice.title" label="공지 제목" required outlined dense></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="currentNotice.contents" label="내용" required outlined rows="6" dense></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input v-model="currentNotice.filePath" label="파일 첨부" prepend-icon="mdi-paperclip"
                  accept="image/*, application/pdf" @change="onFileChanged" outlined dense></v-file-input>
                <!-- 이미지 미리보기 -->
                <v-img v-if="imageUrl" :src="imageUrl" height="200" class="mt-4"
                  style="border-radius: 8px; object-fit: cover"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeModal">취소</v-btn>
          <v-btn class="register-btn" :class="editingNotice ? 'update-btn' : 'create-btn'"
            @click="editingNotice ? updateNotice() : createNotice()"
            style="background-color: rgb(210, 63, 87); color: white">
            등록
          </v-btn>
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
                <v-text-field v-model="detailsNotice.category" label="공지 유형" readonly outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="detailsNotice.title" label="제목" readonly outlined></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea v-model="detailsNotice.contents" label="내용" readonly outlined></v-textarea>
              </v-col>
              <v-col cols="12">
                <!-- 이미지 파일이 있을 경우 이미지 미리보기를 표시 -->
                <v-img v-if="
                  detailsNotice.img && detailsNotice.img.startsWith('http')
                " :src="detailsNotice.img" alt="첨부 이미지" height="200"></v-img>
                <!-- 파일 이름을 표시 -->
                <v-text-field v-if="
                  detailsNotice.img && !detailsNotice.img.startsWith('http')
                " v-model="detailsNotice.img" label="첨부 파일" readonly prepend-icon="mdi-paperclip"
                  outlined></v-text-field>
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
        { text: "삭제", value: "delete" },
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
        img: "",
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
        .get(`${process.env.API_URL}/informs/`)
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
      // 파일 첨부가 있고, 이미지 파일인 경우에만 리사이징을 시도
      if (
        this.currentNotice.filePath &&
        this.currentNotice.filePath.type.startsWith("image/")
      ) {
        try {
          const resizedImage = await this.resizeImage(
            this.currentNotice.filePath
          );
          formData.append("file", resizedImage, "resized_image.jpg");
        } catch (error) {
          console.error("Error resizing image:", error);
          alert("이미지 리사이징에 실패했습니다.");
          return;
        }
      } else if (this.currentNotice.filePath) {
        // 이미지 파일이 아니라면 원본 파일을 그대로 사용
        formData.append("file", this.currentNotice.filePath);
      }

      axios
        .post(`${process.env.API_URL}/informs/`, formData, {
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
        try {
          const resizedImage = await this.resizeImage(
            this.currentNotice.filePath
          );
          formData.append(
            "file",
            resizedImage,
            this.currentNotice.filePath.name
          );
        } catch (error) {
          console.error("Error resizing image:", error);
          alert("이미지 리사이징에 실패했습니다.");
          return;
        }
      }

      axios
        .put(`${process.env.API_URL}/${this.editingNotice.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
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
    deleteNotice(id) {
      if (confirm("진짜 삭제하시겠습니까?")) {
        axios
          .delete(`http://localhost:8000/informs/${id}`)
          .then(() => {
            this.notices = this.notices.filter((notice) => notice.id !== id);
            alert("공지사항이 성공적으로 삭제되었습니다.");
          })
          .catch((error) => {
            console.error("Error deleting the notice:", error);
            alert("공지사항 삭제 실패: " + error.message);
          });
      } else {
        console.log("삭제 취소됩니다.");
      }
    },

    async onFileChanged() {
      const filePath = this.currentNotice.filePath;
      if (filePath && filePath.type.startsWith("image/")) {
        try {
          const resizedImage = await this.resizeImage(filePath);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(resizedImage);
        } catch (error) {
          console.error("Error resizing image:", error);
          alert("이미지 리사이징에 실패했습니다.");
        }
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
    // 이미지 리사이징 함수
    resizeImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxWidth = 800; // 최대 너비 설정
            const maxHeight = 800; // 최대 높이 설정
            let width = img.width;
            let height = img.height;

            // 이미지 비율을 유지하면서 리사이징
            if (width > height) {
              if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
              }
            } else {
              if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
              }
            }

            // 캔버스 크기를 조정하고 이미지를 그립니다.
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // 리사이징된 이미지를 Blob 형태로 변환
            canvas.toBlob(
              (blob) => {
                resolve(blob);
              },
              "image/jpeg",
              0.8 // 품질을 0.8로 설정하여 용량 줄이기
            );
          };
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
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
