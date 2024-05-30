<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div style="display: flex"></div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div style="display: flex">
          <v-img
            contain
            :src="require('~/assets/images/list.png')"
            width="20px"
            style="max-width: 20px; margin-right: 5px; margin-bottom: 20px"
          ></v-img>
          <div
            style="font-size: larger; font-weight: bold; margin-bottom: 20px"
          >
            공지사항 게시판
          </div>
        </div>

        <v-data-table
          :headers="headers"
          :items="notices"
          :items-per-page="10"
          class="elevation-1"
          style="margin-bottom: 30px"
        >
          <template v-slot:item="{ item }">
            <tr @click="showDetails(item)">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.postDate }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Details Modal -->
    <v-dialog v-model="showDetailsModal" max-width="600px">
      <v-card style="padding-top: 10px">
        <v-card-title style="font-weight: bold; margin-left: 10px"
          >공지사항 상세 조회</v-card-title
        >
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
                <!-- 이미지 파일이 있을 경우 이미지 미리보기를 표시 -->
                <v-img
                  v-if="
                    detailsNotice.img && detailsNotice.img.startsWith('http')
                  "
                  :src="detailsNotice.img"
                  alt="첨부 이미지"
                  :aspect-ratio="aspectRatio"
                ></v-img>
                <!-- 파일 이름을 표시 -->
                <v-text-field
                  v-if="
                    detailsNotice.img && !detailsNotice.img.startsWith('http')
                  "
                  v-model="detailsNotice.img"
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
      detailsNotice: {
        category: "",
        title: "",
        contents: "",
        img: "",
        postDate: "",
      },
      showDetailsModal: false,
      aspectRatio: 1,
    };
  },
  mounted() {
    this.fetchNotices(); // 컴포넌트 마운트 시 데이터를 불러옵니다.
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
          alert(
            `공지사항 가져오기 실패: ${error.response.status} ${error.response.statusText}`
          );
        });
    },

    showDetails(item) {
      this.detailsNotice = { ...item };
      this.showDetailsModal = true;
      if (item.img && item.img.startsWith("http")) {
        const img = new Image();
        img.onload = () => {
          this.aspectRatio = img.width / img.height;
        };
        img.src = item.img;
      }
    },
  },
};
</script>

<style scoped>
/* 여기에 스타일을 추가할 수 있습니다. */
.clickable {
  cursor: pointer;
}
</style>
