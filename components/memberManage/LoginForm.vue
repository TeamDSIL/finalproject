<template>
  <div class="log-in-form">
    <div class="log-in-form-container">
      <div class="px-3 px-md-10 py-8 ">
        <h3 class="mb-2 text-center">드실에 오신 걸 환영합니다.</h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">이메일과 비밀번호를 입력해주세요.</h5>
        <p class="text-14 mb-1">이메일</p>
        <v-text-field outlined dense hide-details placeholder="이메일을 입력" class="mb-4" v-model="email"></v-text-field>
        <p class="text-14 mb-1">비밀번호</p>
        <v-text-field outlined dense type="password" hide-details placeholder="비밀번호 입력" class="mb-4"
          v-model="password"></v-text-field>
        <v-btn block color="rgb(255,84,82)" class="primary" @click="loginButton">로그인</v-btn>
        <v-col cols="10" lg="8" class="mx-auto">
          <div class="d-flex align-center my-1">
            <v-divider></v-divider>
            <span class="mx-4">또는</span>
            <v-divider></v-divider>
          </div>
        </v-col>

        <div class="icon-align">
          <a href="http://localhost:8000/oauth2/authorization/naver">
            <img class="custom-btn icon-btn" src="~/assets/images/login/naverIcon.png" alt="네이버 아이콘">
          </a>

          <a href="http://localhost:8000/oauth2/authorization/kakao">
            <img class="custom-btn icon-btn" src="~/assets/images/login/kakaoIcon.png" alt="카카오 아이콘">
          </a>

          <a href="http://localhost:8000/oauth2/authorization/google">
            <img class="icon-img icon-btn" src="~/assets/images/login/googleIcon.png" alt="구글 아이콘">
          </a>
        </div>

        <div class="text-14 text-center my-3">아직 드실 회원이 아니신가요? <nuxt-link to="/memberManage/SignupPage"
            class=" grey--text text--darken-4 font-600">회원가입</nuxt-link>
        </div>

        <div class="py-4 bg-grey-light" id="find-idpw">
          <div class="text-center">
            <nuxt-link to="/memberManage/FindIdPage" class="ms-2 grey--text text--darken-4 font-600">아이디 찾기</nuxt-link>
          </div>

          <div class="text-center">
            <nuxt-link to="/memberManage/FindPwPage" class="ms-2 grey--text text--darken-4 font-600">비밀번호 찾기</nuxt-link>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async loginButton() {
      try {
        const loginDTO = { email: this.email, password: this.password };
        console.log(loginDTO);
        const response = await axios.post('http://localhost:8000/memberManage/loginPage', loginDTO, { withCredentials: true });
        console.log('post 요청');

        // && response.config.url.includes('login') && response.config.method === 'post'
        if (response.status === 200) {
          const token = response.headers['authorization'];
          localStorage.setItem('token', token); // 액세스 토큰 저장
          axios.defaults.headers.common['Authorization'] = token; // Axios 인터셉터에 토큰 설정
          console.log('토큰이 찍혔는지');
          console.log('Response Headers:', response.headers);
          console.log('Extracted Token:', token);
          alert('로그인 성공');
          this.$router.push('/'); // '/' 로 리디렉트
        } else {
          // if (response.status !== 200) 
          // 에러 응답이 왔을 때 해당 에러 페이지로 리디렉션
          const errorUrl = response.headers['location'];
          this.$router.push(errorUrl);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('로그인 실패:', error.response.data);
          alert('로그인 실패: ' + error.response.data);
          if (error.response.headers['location']) {
            this.$router.push(error.response.headers['location']);
          }
        } else {
          console.error('로그인 실패:', error);
          alert('로그인 실패: 서버에 문제가 있습니다.');
        }
      }
    },
    
    async checkOAuthToken() {
      try {
    // 클라이언트 측에서 리디렉션 후에도 응답 헤더에서 액세스 토큰을 추출
    const response = await axios.get('http://localhost:8000/memberManage/oauth2/success', { withCredentials: true });
    const authorizationHeader = response.headers['authorization'];
    
    if (authorizationHeader) {
      // 'Bearer ' 접두사를 제거하여 실제 토큰을 추출
      const token = authorizationHeader.startsWith('Bearer ') ? authorizationHeader.slice(7) : authorizationHeader;
      
      localStorage.setItem('token', token); // Access Token 저장
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Axios 인터셉터에 토큰 설정
      console.log('OAuth 토큰이 저장되었습니다:', token);
      alert('OAuth 로그인 성공');
      this.$router.push('/'); // '/' 로 리디렉트
    } else {
      console.log('Access Token이 응답 헤더에 포함되어 있지 않습니다.');
    }
  } catch (error) {
    console.error('OAuth 토큰 처리 실패:', error);
  }
    }
  },
  mounted() {
    this.checkOAuthToken();
  },
}
</script>

<style lang="scss" scoped>
.log-in-form {
  width: 500px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  margin: 2rem auto;
  box-shadow: rgb(3 0 71 / 9%) 0px 8px 45px;

  @media(max-width: 500px) {
    width: 100%;
  }

  .log-in-form-container {
    padding: 3rem 3.75rem 0px;

    @media(max-width: 500px) {
      padding: 3rem 1rem 0px;
    }
  }
}

.icon-align {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  /* 간격 설정 */
}

.icon-btn {
  border: none;
  /* 테두리 제거 */
  box-shadow: none;
  /* 그림자 제거 */
  background: none;
  /* 배경 제거 */
  padding: 0;
  /* 내부 여백 제거 */
  cursor: pointer;
  /* 마우스 커서를 포인터로 변경 */
}

.icon-btn:hover {
  background: none;
  /* 호버 상태에서도 배경 제거 */
}

.custom-btn {
  width: 50px;
  height: 50px;
}

.icon-img {
  width: 45px;
  height: 45px;
}

#find-idpw {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>