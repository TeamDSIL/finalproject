<template>
  <div class="log-in-form">
    <div class="log-in-form-container">
      <div class="px-3 px-md-10 py-8">
        <h3 class="mb-2 text-center">드실에 오신 걸 환영합니다.</h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">이메일과 비밀번호를 입력해주세요.</h5>
        <v-text-field label="이메일" class="mb-4" v-model="email" :error-messages="emailErrors" @input="handleEmailInput"
          @keyup.enter="loginButton"></v-text-field>
        <v-text-field label="비밀번호" type="password" class="mb-4" v-model="password" :error-messages="passwordErrors"
          @input="handlePasswordInput" @keyup.enter="loginButton"></v-text-field>
        <transition name="fade">
          <v-alert v-if="errorMessage" type="error" dismissible>{{ errorMessage }}</v-alert>
        </transition>
        <v-btn block color="rgb(255,84,82)" class="primary" @click="loginButton" :disabled="!isFormValid">
          로그인
        </v-btn>
        <v-col cols="10" lg="8" class="mx-auto">
          <div class="d-flex align-center my-1">
            <v-divider></v-divider>
            <span class="mx-4">또는</span>
            <v-divider></v-divider>
          </div>
        </v-col>
        <div class="icon-align">
          <a :href="`${apiUrl}/oauth2/authorization/naver`">
            <img class="custom-btn icon-btn" src="~/assets/images/login/naverIcon.png" alt="네이버 아이콘">
          </a>
          <a :href="`${apiUrl}/oauth2/authorization/kakao`">
            <img class="custom-btn icon-btn" src="~/assets/images/login/kakaoIcon.png" alt="카카오 아이콘">
          </a>
          <a :href="`${apiUrl}/oauth2/authorization/google`">
            <img class="icon-img icon-btn" src="~/assets/images/login/googleIcon.png" alt="구글 아이콘">
          </a>
        </div>
        <div class="text-14 text-center my-3">아직 드실 회원이 아니신가요?
          <nuxt-link to="/memberManage/SignupPage" class="grey--text text--darken-4 font-600">회원가입</nuxt-link>
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
import Cookies from 'js-cookie';
import { EventBus } from '~/plugins/event-bus.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      emailErrors: [],
      passwordErrors: [],
      errorMessage: ''
    };
  },
  computed: {
    isFormValid() {
      return this.email !== '' && this.password !== '' && this.emailErrors.length === 0;
    },
    apiUrl() {
      return process.env.API_URL;
    },
  },
  methods: {
    handleEmailInput() {
      if (this.email === '') {
        this.emailErrors = [];
      } else {
        this.validateEmail();
      }
    },
    handlePasswordInput() {
      if (this.password === '') {
        this.passwordErrors = [];
      }
    },
    validateEmail() {
      this.emailErrors = [];
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailErrors.push('이메일 형식이 아닙니다');
      }
    },
    async loginButton() {
      this.validateEmail();
      this.passwordErrors = [];
      this.errorMessage = '';

      if (!this.isFormValid) {
        return;
      }

      try {
        const loginDTO = { email: this.email, password: this.password };
        const response = await axios.post(`${this.apiUrl}/memberManage/loginPage`, loginDTO, { withCredentials: true });

        if (response.status === 200) {
          const token = response.headers['authorization'];
          localStorage.setItem('token', token); // 액세스 토큰 저장
          axios.defaults.headers.common['Authorization'] = token; // Axios 인터셉터에 토큰 설정

          const userInfoResponse = await axios.get(`${this.apiUrl}/userInfo/me`, {
            headers: {
              'Authorization': `${token}`
            },
            withCredentials: true
          });

          if (userInfoResponse.status === 200) {
            const userInfo = userInfoResponse.data;
            this.user = userInfo;
            EventBus.$emit('user-logged-in');

            if (this.user.permission.id === 1) {
              this.$router.push('/');
            } else if (this.user.permission.id === 2) {
              this.$router.push('/restaurant/RestaurantManagePage');
            } else {
              this.$router.push('/memberManage/adminManageUserPage');
            }
          } else {
            console.error('Failed to fetch user info:', userInfoResponse);
          }
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        console.log('Error response:', error.response); // 에러 응답 객체 출력

        if (error.response && error.response.data && error.response.data.error) {
          this.errorMessage = error.response.data.error;
        } else {
          this.errorMessage = '로그인 실패: 서버에 문제가 있습니다.';
        }

        // 에러 메시지를 2초 후에 사라지게 설정
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    },
    async useRefreshToken() {
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          console.log('Refresh Token이 없습니다.');
          return;
        }

        const response = await axios.post(`${this.apiUrl}/userInfo/refresh`, { refreshToken });

        if (response.status === 200) {
          const token = response.headers['authorization'];
          localStorage.setItem('token', token); // Access Token 저장
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Axios 인터셉터에 토큰 설정
          alert('Access 토큰이 갱신되었습니다.');
        } else {
          console.log('Access Token을 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('Refresh 토큰 처리 실패:', error);
      }
    }
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

.v-text-field input {
  border-radius: 4px !important;
  border: 1px solid #ced4da !important;
  padding: 0.5rem 1rem !important;
  font-size: 1rem !important;
  background-color: #f8f9fa !important;
}

.v-btn.primary {
  background-color: #D23F57 !important;
  color: #fff !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  padding: 0.75rem 1.5rem !important;
  border-radius: 4px !important;
  transition: background-color 0.2s !important;
}

.v-btn.primary:hover {
  background-color: #e03e3e !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.v-alert {
  background-color: #D23F57 !important;
  color: white !important;
  border: 1px solid #D23F57 !important;
  border-radius: 4px !important;
  margin-top: 1rem !important;
  padding: 0.75rem 1.25rem !important;
  font-size: 0.875rem !important;
}

.icon-align {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
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
  transition: transform 0.2s, box-shadow 0.2s, border-radius 0.2s;
  border-radius: 50%;
}

.icon-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.icon-btn:active {
  transform: scale(1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.icon-img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
}

#find-idpw {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>