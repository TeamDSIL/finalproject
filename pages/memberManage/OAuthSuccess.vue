<template>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async created() {
    if (process.client) {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get('accessToken');

      if (accessToken) {
        localStorage.setItem('token', accessToken); // Access Token 저장
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Axios 인터셉터에 토큰 설정
        console.log('OAuth 토큰이 저장되었습니다:', accessToken);
        this.$router.push('/'); // '/' 로 리디렉트
      } else {
        console.log('Access Token이 URL 파라미터에 포함되어 있지 않습니다.');
        this.$router.push('/memberManage/loginPage'); // 로그인 페이지로 리디렉트
      }
    }
  }
}
</script>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  /* 따뜻한 배경색 */
  border-radius: 12px;
  /* 부드러운 테두리 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  /* 부드러운 그림자 */
}

.spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 6px solid #fde8c8;
  /* 부드러운 외곽선 색상 */
  border-top: 6px solid #f6ad55;
  /* 따뜻한 주황색 */
  animation: spin 1s ease-in-out infinite;
  /* 부드러운 애니메이션 */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
