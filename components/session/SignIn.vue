<template>
    <v-card>
        <div class="px-3 px-md-10 py-8 ">
            <h3 class="mb-2 text-center">드실에 오신 걸 환영합니다.</h3>
            <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">Log in with email & password</h5>
            <p class="text-14 mb-1">이메일</p>
            <v-text-field outlined dense hide-details placeholder="example@mail" class="mb-4"></v-text-field>
            <p class="text-14 mb-1">비밀번호</p>
            <v-text-field outlined dense type="password" hide-details placeholder="********"
                class="mb-4"></v-text-field>
            <v-btn block color="rgb(255,84,82)" class="text-capitalize font-600">로그인</v-btn>
            <v-col cols="10" lg="8" class="mx-auto">
                <div class="d-flex align-center my-1">
                    <v-divider></v-divider>
                    <span class="mx-4">또는</span>
                    <v-divider></v-divider>
                </div>
            </v-col>
            <v-btn block dark color="rgb(3,199,90)" class="text-capitalize font-600 mb-4">

                <v-icon left class="me-3">mdi-facebook</v-icon>
                네이버로 로그인

            </v-btn>
            <v-btn block dark color="#FEE500" class="text-capitalize font-600 mb-4">

                <!-- <v-icon left class="me-3">mdi-google</v-icon> -->
                <v-img img=assets/images/kakao_login_medium_wide.png></v-img>
                카카오로 로그인

            </v-btn>
            <div class="text-14 text-center my-3">계정이 없으신가요? <nuxt-link to="/SignUp"
                    class=" grey--text text--darken-4 font-600">회원가입</nuxt-link></div>
        </div>
        <div class="py-4 bg-grey-light">
            <div class="text-center">
                <span class="grey--text text--darken-1">아이디 찾기 <nuxt-link to="/"
                        class="ms-2 grey--text text--darken-4 font-600">아이디 찾기</nuxt-link> </span>
            </div>
            <div class="text-center">
                <span class="grey--text text--darken-1">비밀번호 찾기 <nuxt-link to="/"
                        class="ms-2 grey--text text--darken-4 font-600">비밀번호 찾기</nuxt-link> </span>
            </div>
        </div>
    </v-card>
</template>