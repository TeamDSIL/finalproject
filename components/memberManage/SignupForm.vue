<template>
  <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
    <div class="sign-up-form">
      <div class="sign-up-form-container">
        <div class="text-center mb-10">
          <h3 class="mb-3">DSIL</h3>
          <h5 class="text-sm font-600 grey--text text--darken-4">Please fill all forms to continued</h5>
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
          <p class="text-14 mb-1">우편번호 입력</p>
          <v-text-field type="password" placeholder="123-412" outlined dense hide-details=""
            class="mb-4"></v-text-field>

        </div>

        <div class="mb-4">
          <v-checkbox v-model="checkbox">
            <template v-slot:label>
              <div>
                By signing up, you agree to

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a target="_blank" href="#" @click.stop v-on="on">
                      Terms & Condtion
                    </a>
                  </template>
                  Opens in new window
                </v-tooltip>

              </div>
            </template>
          </v-checkbox>
        </div>

        <div class="mb-4">
          <v-btn block color="rgb(255,84,82)" class="text-capitalize font-600">
            계정 생성
          </v-btn>
        </div>
        <div class="d-flex align-center justify-center w-200 mx-auto mb-4">
          <v-divider></v-divider>
          <p class="mx-3 mb-1">또는</p>
          <v-divider></v-divider>

        </div>

        <div class="mb-4">
          <v-btn color="rgb(3,199,90)" class="text-capitalize font-600 white--text mb-4 py-5" block>
            <v-icon left>mdi-facebook</v-icon>
            네이버로 계속하기
          </v-btn>
        </div>

        <div class="mb-4">
          <v-btn color="#FEE500" class="text-capitalize font-600 white--text mb-0 py-5" block>
            <v-icon left>mdi-google</v-icon>
            카카오로 계속하기
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
    gotoLoginPage(){
      this.$router.push('/memberManage/LoginPage');
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