<template>
    <div class="mb-4">
      <p class="text-14 mb-1" style="font-weight: bold">사진 첨부</p>
      <v-file-input
        v-model="file"
        accept="image/*"
        outlined
        dense
        show-size
        class="mb-4"
        label="사진 선택"
        style="margin-top: 10px"
      ></v-file-input>
      <v-btn @click="uploadFile" color="primary">업로드</v-btn>
      <div v-if="uploadedFileUrl" class="mt-4">
        <p class="text-14 mb-1" style="font-weight: bold">업로드된 파일</p>
        <img :src="uploadedFileUrl" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        file: null,
        uploadedFileUrl: null // 업로드된 파일의 URL을 저장하기 위한 데이터 속성
      };
    },
    methods: {
      async uploadFile() {
        if (!this.file) {
          alert('파일을 선택하세요.');
          return;
        }
  
        const formData = new FormData();
        formData.append('files', this.file);
  
        try {
          const response = await axios.post('http://localhost:8000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          if (response.status === 200) {
            alert('파일 업로드 성공');
            console.log(response.data);
            this.uploadedFileUrl = response.data[0].uploadFileUrl; // 업로드된 파일의 URL을 저장
            this.file = null; // 파일 업로드 성공 후 v-file-input 초기화
          } else {
            alert('파일 업로드 실패');
          }
        } catch (error) {
          console.error('파일 업로드 중 오류 발생:', error);
          alert('파일 업로드 중 오류 발생');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  