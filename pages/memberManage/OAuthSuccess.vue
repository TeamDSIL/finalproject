<template>
    <div>
      OAuth Success. Redirecting...
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
  