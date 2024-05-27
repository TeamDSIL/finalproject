<template>
  <div class="log-in-form">
    <div class="log-in-form-container">
      <div class="px-3 px-md-10 py-8 ">
        <h3 class="mb-2 text-center">드실에 오신 걸 환영합니다.</h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">이메일과 비밀번호를 입력해주세요.</h5>
        <v-text-field label="이메일" class="mb-4" v-model="email" :error-messages="emailErrors" @input="handleEmailInput"
          @keyup.enter="loginButton"></v-text-field>
        <v-text-field label="비밀번호" type="password" class="mb-4" v-model="password" @input="handlePasswordInput"
          @keyup.enter="loginButton"></v-text-field>
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
      emailErrors: []
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
      // 비밀번호 입력 중 에러 메시지를 처리하는 로직을 추가할 수 있습니다.
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

      if (!this.isFormValid) {
        return;
      }

      try {
        const loginDTO = { email: this.email, password: this.password };
        console.log(loginDTO);
        const response = await axios.post('http://localhost:8000/memberManage/loginPage', loginDTO, { withCredentials: true });
        console.log('post 요청');

        if (response.status === 200) {
          const token = response.headers['authorization'];
          localStorage.setItem('token', token); // 액세스 토큰 저장
          axios.defaults.headers.common['Authorization'] = token; // Axios 인터셉터에 토큰 설정
          console.log('토큰이 찍혔는지');
          console.log('Response Headers:', response.headers);
          console.log('Extracted Token:', token);
          try {
            if (!token) {
              throw new Error('No token found');
            }

            // 토큰을 Authorization 헤더에 포함하여 요청 보내기
            const response = await axios.get('http://localhost:8000/userInfo/me', {
              headers: {
                'Authorization': `${token}`
              },
              withCredentials: true
            });

            if (response.status === 200) {
              const userInfo = response.data;
              console.log('User Info:', userInfo);
              // 사용자 정보를 상태나 컴포넌트 데이터에 저장
              this.user = userInfo;
              console.log(this.user);
              console.log(this.user.id);
              console.log(this.user.permission.permission);

              // 로그인 성공 시 이벤트 버스에서 이벤트를 트리거합니다.
              EventBus.$emit('user-logged-in');

              if (this.user.permission.id === 1) {
                this.$router.push('/'); // '/' 로 리디렉트
              } else if (this.user.permission.id === 2) {
                this.$router.push('/restaurant/RestaurantManagePage'); // '/' 로 리디렉트
              } else {
                this.$router.push('/memberManage/adminManageUserPage'); // '/' 로 리디렉트
              }
            } else {
              console.error('Failed to fetch user info:', response);
            }
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        } else {
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
    async useRefreshToken() {
      try {
        const refreshToken = Cookies.get('refreshToken');
        console.log(refreshToken);
        if (!refreshToken) {
          console.log('Refresh Token이 없습니다.');
          return;
        }

        const response = await axios.post(`${process.env.API_URL}/userInfo/refresh`, { refreshToken });

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
