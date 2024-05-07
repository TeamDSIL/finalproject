<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>{{ InformationName }} 게시판</h1>
        <v-btn icon @click="openModal()">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>공지사항 목록</h2>
        <v-data-table
          :headers="headers"
          :items="notices"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr @click="showDetails(item)">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.postDate }}</td>
              <td>
                <v-btn icon color="blue" @click.stop="editNotice(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click.stop="deleteNotice(item.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <Footer />

    <!-- Create and Edit Notice Modal -->
    <v-dialog v-model="showCreateNoticeModal" max-width="600px">
      <v-card>
        <v-card-title>{{
          editingNotice ? "공지사항 수정" : "공지사항 생성"
        }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="currentNotice.category"
                  :items="noticeCategorys"
                  label="공지사항 유형"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="currentNotice.title"
                  label="공지 제목"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="currentNotice.contents"
                  label="내용"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="currentNotice.filePath"
                  label="파일 첨부"
                  prepend-icon="mdi-paperclip"
                  accept="image/*, application/pdf"
                  @change="onFileChanged"
                ></v-file-input>
                <!-- 이미지 미리보기 -->
                <v-img v-if="imageUrl" :src="imageUrl" height="200"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="closeModal">취소</v-btn>
          <!-- <v-btn color="green" text @click="submitNotice">등록</v-btn> -->
          <!-- 등록 버튼 -->
          <v-btn
            color="green"
            text
            @click="editingNotice ? updateNotice() : createNotice()"
            >등록</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Details Modal -->
    <v-dialog v-model="showDetailsModal" max-width="600px">
      <v-card>
        <v-card-title>공지사항 상세 조회</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="detailsNotice.category"
                  label="공지 유형"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="detailsNotice.title"
                  label="제목"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="detailsNotice.contents"
                  label="내용"
                  readonly
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <!-- 이미지 파일이 있을 경우 이미지 미리보기를 표시 -->
                <v-img
                  v-if="
                    detailsNotice.filePath &&
                    detailsNotice.filePath.startsWith('data:image')
                  "
                  :src="detailsNotice.filePath"
                  alt="첨부 이미지"
                  height="200"
                >
                </v-img>
                <!-- 파일 이름을 표시 -->
                <v-text-field
                  v-if="
                    detailsNotice.filePath &&
                    !detailsNotice.filePath.startsWith('data:image')
                  "
                  v-model="detailsNotice.filePath"
                  label="첨부 파일"
                  readonly
                  prepend-icon="mdi-paperclip"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="showDetailsModal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      InformationName: "공지사항",
      headers: [
        { text: "공지사항 유형", value: "category" },
        { text: "공지 제목", value: "title" },
        { text: "게시 날짜", value: "postDate" },
      ],
      notices: [],
      currentNotice: {
        category: "",
        title: "",
        contents: "",
        filePath: null,
      },
      detailsNotice: {
        category: "",
        title: "",
        contents: "",
        filePath: null,
      },
      editingNotice: null,
      noticeCategorys: ["공지", "이벤트"],
      showCreateNoticeModal: false,
      showDetailsModal: false,
      imageUrl: null, // 이미지 미리보기 URL
    };
  },
  mounted() {
    this.fetchNotices(); // 컴포넌트 마운트 시 데이터를 불러옵니다.
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
          alert(
            `공지사항 생성 실패: ${error.response.status} ${error.response.statusText}`
          );
        });
    },
    openModal() {
      this.currentNotice = {
        category: "",
        title: "",
        contents: "",
        filePath: null,
      };
      this.editingNotice = null;
      this.showCreateNoticeModal = true;
      this.imageUrl = null; // 모달을 열 때 이미지 URL을 초기화
    },

    // 모달 창 닫기 및 데이터 초기화
    closeModal() {
      this.showCreateNoticeModal = false;
      this.editingNotice = null;
      this.currentNotice = {
        category: "",
        title: "",
        contents: "",
        filePath: null,
      };
      this.imageUrl = null; // 이미지 URL 초기화
    },

    // 공지사항 생성하기
    createNotice() {
      // 현재 날짜를 ISO 형식의 문자열로 설정
      this.currentNotice.postDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식

      axios
        .post("http://localhost:8000/informs/", this.currentNotice)
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

    editNotice(item) {
      // 현재 수정하고자 하는 공지사항의 정보를 currentNotice에 저장
      this.currentNotice = { ...item };
      this.editingNotice = item; // 수정 모드 활성화를 위해 저장
      this.showCreateNoticeModal = true; // 수정 모달 창 열기
    },

    // 공지사항 수정하기
    updateNotice() {
      axios
        .put(
          `http://localhost:8000/informs/${this.editingNotice.id}`,
          this.currentNotice
        )
        .then((response) => {
          const index = this.notices.findIndex(
            (n) => n.id === this.editingNotice.id
          );
          if (index !== -1) {
            this.$set(this.notices, index, response.data); // Vue.set 사용
          }
          this.closeModal();
          alert("공지사항이 성공적으로 업데이트되었습니다.");
        })
        .catch((error) => {
          console.error("Error updating the notice:", error);
          alert("공지사항 업데이트 실패: " + error.message);
        });
    },

    //공지사항 상세보기
    showDetails(item) {
      this.detailsNotice = item;
      this.showDetailsModal = true;
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
      const filePath = this.currentNotice.filePath; // v-model을 통해 연결된 파일 객체 직접 사용
      if (filePath && filePath.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result; // 이미지 URL을 데이터 속성에 저장
        };
        reader.readAsDataURL(filePath); // 파일 내용을 읽어 데이터 URL로 변환합니다.
      } else {
        this.imageUrl = null; // 선택된 파일이 이미지가 아닐 경우 URL을 null로 설정
      }
    },
  },
};
</script>

<style scoped>
/* 스타일은 컴포넌트의 UI와 레이아웃을 개선하기 위해 추가할 수 있습니다. */
</style>
