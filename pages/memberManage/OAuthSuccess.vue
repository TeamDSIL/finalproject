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
  background-color: #f0f0f0;
  /* 부드러운 배경색 */
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 8px solid transparent;
  /* 투명한 테두리 */
  border-top-color: #D23F57;
  /* 메인 색상 */
  border-left-color: #D23F57;
  /* 메인 색상 */
  animation: spin 1s ease-in-out infinite;
  position: relative;
}

.spinner::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  background-color: #D23F57;
  /* 메인 색상 */
  border-radius: 50%;
  transform: translate(-50%, -50%);
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
