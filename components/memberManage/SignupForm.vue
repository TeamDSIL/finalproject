<template>
  
  <v-container>
    <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
      <div class="sign-up-form">
        <div class="sign-up-form-container">

          <div class="text-center mb-10">
            <h3 class="mb-3">회원가입</h3>
            <h5 class="text-sm font-600 grey--text text--darken-4">계속하려면 양식에 맞춰 입력해주세요.</h5>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">이름</p>
            <v-text-field v-model="userInfo.name" placeholder="윤호상" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">이메일(ID)</p>
            <v-text-field v-model="userInfo.email" placeholder="dvbf@naver.com" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">연락처</p>
            <v-text-field v-model="userInfo.tel" placeholder="010-9677-7048" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field v-model="userInfo.password" type="password" placeholder="*********" outlined dense
              hide-details class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">비밀번호 확인</p>
            <v-text-field v-model="confirmPassword" type="password" placeholder="*********" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">주소 입력</p>
            <v-text-field v-model="userInfo.address" placeholder="서울시 동작구" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4">
            <p class="text-14 mb-1">우편번호 입력</p>
            <v-text-field v-model="userInfo.postcode" placeholder="123-412" outlined dense hide-details
              class="mb-4"></v-text-field>
          </div>

          <div class="mb-4" hide-details>
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div>
                  회원가입을 위해,&nbsp;
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a target="_blank" href="/main/MainPage" @click.stop v-on="on">
                        이용약관
                      </a>
                    </template>
                    새 창에서 보기
                  </v-tooltip>
                  에 동의해야 합니다.
                </div>
              </template>
            </v-checkbox>
          </div>

          <!-- 버튼의 disabled 속성에 checkbox 값을 바인딩하여 활성화 여부를 결정 -->
          <div class="mb-4" hide-details>
            <v-btn block color="rgb(255,84,82)" class="primary" :disabled="!checkbox" @click="signUp">
              계정 생성
            </v-btn>
          </div>


          <div class="py-4 bg-grey-light" hide-details>
            <div class="text-center">
              <span class="grey--text text--darken-1">이미 계정이 있으신가요?
                <a @click="gotoLoginPage()" class="ms-2 grey--text text--darken-4 font-600">로그인</a>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  layout: 'session',
  data() {
    return {
      checkbox: false,
      userInfo: {
        name: '',
        email: '',
        tel: '',
        password: '',
        address: '',
        postcode:'',
      },
      confirmPassword: ''
    }
  },
  methods: {
    gotoLoginPage() {
      this.$router.push('/memberManage/LoginPage');
    },
    async signUp() {
      try {
        // API 요청을 보내기 전에 비밀번호가 일치하는지 확인
        if (this.userInfo.password !== this.confirmPassword) {
          // 비밀번호가 일치하지 않으면 에러 메시지를 표시하고 함수 종료
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }

        // API 요청을 보내기 전에 데이터 유효성 검사를 수행할 수 있습니다.

        // API 요청을 보낼 데이터 생성
        const requestData = {
          email: this.userInfo.email,
          password: this.userInfo.password,
          name: this.userInfo.name,
          tel: this.userInfo.tel,
          address: this.userInfo.address,
          postcode: this.userInfo.postcode,
        };

        // API 요청 보내기~
        const response = await axios.post('http://localhost:8000/memberManage/signupPage', requestData);

        // 응답 처리
        console.log('회원 정보 응답:', response.data);
        alert('회원가입이 완료되었습니다.');
        
        this.$router.push('/main/mainPage');
        // 부모 컴포넌트로 수정된 정보를 전달
        this.$emit('modify-user', requestData);

        // 모달 창을 닫음
        this.$emit('close');

        // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.

      } catch (error) {
        // API 요청 실패 시 에러 처리
        console.error('회원가입 요청 실패:', error);
        alert('정보를 다시 입력해주세요.');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up-form {
  width: 500px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 8px;
  margin: 2rem auto;
  box-shadow: rgb(3 0 71 / 9%) 0px 8px 45px;

  @media(max-width: 500px) {
    width: 100%;
  }

  .sign-up-form-container {
    padding: 3rem 3.75rem 0px;

    @media(max-width: 500px) {
      padding: 3rem 1rem 0px;
    }
  }
}
</style>