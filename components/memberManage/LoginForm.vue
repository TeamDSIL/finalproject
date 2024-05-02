<template>
  <div class="log-in-form">
    <div class="log-in-form-container">
      <div class="px-3 px-md-10 py-8 ">
        <h3 class="mb-2 text-center">드실에 오신 걸 환영합니다.</h3>
        <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">이메일과 비밀번호를 입력해주세요.</h5>
        <p class="text-14 mb-1">이메일</p>
        <v-text-field outlined dense hide-details placeholder="이메일을 입력" class="mb-4"></v-text-field>
        <p class="text-14 mb-1">비밀번호</p>
        <v-text-field outlined dense type="password" hide-details placeholder="비밀번호 입력" class="mb-4"></v-text-field>
        <v-btn block color="rgb(255,84,82)" class="primary" href="/main/MainPage">로그인</v-btn>
        <v-col cols="10" lg="8" class="mx-auto">
          <div class="d-flex align-center my-1">
            <v-divider></v-divider>
            <span class="mx-4">또는</span>
            <v-divider></v-divider>
          </div>
        </v-col>
        <v-btn block dark color="rgb(3,199,90)" class="text-capitalize font-600 mb-4">

          <img src="~/assets/images/naver-icon.png" alt="네이버 아이콘" style="width: 24px; height: 24px; margin-right: 8px;">
          네이버로 로그인

        </v-btn>

        <v-btn block dark color="#FEE500" class="text-capitalize font-600 mb-4">
          <img src="~/assets/images/kakao-icon.png" alt="카카오 아이콘" style="width: 24px; height: 24px; margin-right: 8px;">
          카카오로 로그인
        </v-btn>

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

#find-idpw {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>