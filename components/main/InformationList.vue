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
              <td>{{ item.type }}</td>
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
                  v-model="currentNotice.type"
                  :items="noticeTypes"
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
                  v-model="currentNotice.content"
                  label="내용"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="currentNotice.file"
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
          <v-btn color="green" text @click="submitNotice">등록</v-btn>
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
                  v-model="detailsNotice.type"
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
                  v-model="detailsNotice.content"
                  label="내용"
                  readonly
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <!-- 이미지 파일이 있을 경우 이미지 미리보기를 표시 -->
                <v-img
                  v-if="
                    detailsNotice.file &&
                    detailsNotice.file.startsWith('data:image')
                  "
                  :src="detailsNotice.file"
                  alt="첨부 이미지"
                  height="200"
                >
                </v-img>
                <!-- 파일 이름을 표시 -->
                <v-text-field
                  v-if="
                    detailsNotice.file &&
                    !detailsNotice.file.startsWith('data:image')
                  "
                  v-model="detailsNotice.file"
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
export default {
  data() {
    return {
      InformationName: "공지사항",
      headers: [
        { text: "공지사항 분류", value: "type" },
        { text: "공지 제목", value: "title" },
        { text: "게시 날짜", value: "postDate" },
      ],
      notices: [
        // 예제 데이터
        {
          id: 1,
          type: "공지",
          title: "새로운 메뉴 업데이트",
          postDate: "2023-04-03",
          content: "새로운 메뉴가 추가되었습니다!",
          file: "menu.pdf",
        },
        {
          id: 2,
          type: "이벤트",
          title: "오픈 기념 할인 이벤트",
          postDate: "2023-04-01",
          content: "오픈 기념으로 모든 메뉴 20% 할인!",
          file: "event.jpg",
        },
      ],
      currentNotice: {
        type: "",
        title: "",
        content: "",
        file: null,
      },
      detailsNotice: {
        type: "",
        title: "",
        content: "",
        file: null,
      },
      editingNotice: null,
      noticeTypes: ["공지", "이벤트"],
      showCreateNoticeModal: false,
      showDetailsModal: false,
      imageUrl: null, // 이미지 미리보기 URL
    };
  },
  methods: {
    openModal() {
      this.currentNotice = { type: "", title: "", content: "", file: null };
      this.editingNotice = null;
      this.showCreateNoticeModal = true;
      this.imageUrl = null; // 모달을 열 때 이미지 URL을 초기화
    },
    editNotice(item) {
      this.editingNotice = item;
      this.currentNotice = { ...item };
      this.imageUrl =
        item.file && item.file.startsWith("data:image") ? item.file : null;
      this.showCreateNoticeModal = true;
    },
    deleteNotice(id) {
      this.notices = this.notices.filter((notice) => notice.id !== id);
    },
    submitNotice() {
      if (this.editingNotice) {
        const index = this.notices.findIndex(
          (n) => n.id === this.editingNotice.id
        );
        if (index !== -1) {
          this.notices[index] = {
            ...this.currentNotice,
            id: this.editingNotice.id,
            file: this.imageUrl || this.currentNotice.file,
          };
        }
      } else {
        const newId = this.notices.length
          ? this.notices[this.notices.length - 1].id + 1
          : 1;
        this.notices.push({
          ...this.currentNotice,
          id: newId,
          postDate: new Date().toISOString().split("T")[0],
          file: this.imageUrl || this.currentNotice.file,
        });
      }
      this.closeModal();
    },
    closeModal() {
      this.showCreateNoticeModal = false;
      this.currentNotice = { type: "", title: "", content: "", file: null };
      this.imageUrl = null;
    },
    showDetails(item) {
      this.detailsNotice = item;
      this.showDetailsModal = true;
    },
    onFileChanged() {
      const file = this.currentNotice.file; // v-model을 통해 연결된 파일 객체 직접 사용
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result; // 이미지 URL을 데이터 속성에 저장
        };
        reader.readAsDataURL(file); // 파일 내용을 읽어 데이터 URL로 변환합니다.
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
