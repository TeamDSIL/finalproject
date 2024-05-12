<template>
  <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
    <div class="sign-up-form">
      <div class="sign-up-form-container">
        <div class="text-center mb-10">
          <h3 class="mb-3">회원가입</h3>
          <h5 class="text-sm font-600 grey--text text--darken-4">계속하려면 양식에 맞춰 입력해주세요.</h5>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">이름</p>
          <v-text-field placeholder="윤호상" outlined dense hide-details="" class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">이메일(ID)</p>
          <v-text-field placeholder="dvbf@naver.com" outlined dense hide-details="" class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">연락처</p>
          <v-text-field placeholder="010-9677-7048" outlined dense hide-details="" class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">비밀번호</p>
          <v-text-field type="password" placeholder="*********" outlined dense hide-details=""
            class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">비밀번호 확인</p>
          <v-text-field type="password" placeholder="*********" outlined dense hide-details=""
            class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">주소 입력</p>
          <v-text-field type="" placeholder="서울시 동작구" outlined dense hide-details=""
            class="mb-4"></v-text-field>
        </div>
        <div class="mb-4">
          <p class="text-14 mb-1">우편번호 입력</p>
          <v-text-field type="" placeholder="123-412" outlined dense hide-details=""
            class="mb-4"></v-text-field>
        </div>

        <div class="mb-4">
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              <div>
                회원가입을 위해,&nbsp;
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }" >
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
        <div class="mb-4">
          <v-btn block color="rgb(255,84,82)" class="primary" :disabled="!checkbox" @click="showAlert">
            계정 생성
          </v-btn>
        </div>
        

      </div>
      <div class="py-4 bg-grey-light">
        <div class="text-center">
          <span class="grey--text text--darken-1">이미 계정이 있으신가요?
            <a @click="gotoLoginPage()" class="ms-2 grey--text text--darken-4 font-600">로그인</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'session',
  data() {
    return {
      checkbox: false,
    }
  },
  methods: {
    gotoLoginPage() {
      this.$router.push('/memberManage/LoginPage');
    },
    showAlert() {
      alert('회원가입이 완료되었습니다.');
      alert('정보를 다시 입력해주세요.');
      this.$router.push('/main/MainPage');
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