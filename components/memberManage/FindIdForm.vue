<template>
    <div class="find-id-form">
        <div class="find-id-form-container">
            <div class="px-3 px-md-10 py-8 ">

                <div id="logo-image">
                    <v-avatar class="me-4" tile width="200" height="100">
                        <img src="~/assets/images/dsilLogoCut.jpg" alt="">
                    </v-avatar>
                </div>

                <br>
                <h3 class="mb-2 text-center">아이디 찾기</h3>
                <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">가입 시 입력했던 연락처를 입력해주세요.</h5>

                <v-divider></v-divider>

                <v-text-field outlined dense hide-details placeholder="010-1234-5678" v-model="tel" class="mb-4"
                    :error-messages="telErrors" @input="formatTel" maxlength="13"></v-text-field>

                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn block color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="primary" @click="findEmail">
                            <span class="d-none d-sm-block">아이디(이메일) 찾기</span>
                        </v-btn>
                    </template>

                    <FindIdResultForm :email="email" />
                </v-dialog>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import FindIdResultForm from '@/components/memberManage/FindIdResultForm.vue';

export default {
    data() {
        return {
            dialog: false,  // dialog 속성 추가
            tel: '',  // 연락처를 저장할 변수 추가
            email: '',
            telErrors: []  // 전화번호 유효성 검사 오류 메시지
        };
    },
    components: {
        FindIdResultForm,
    },
    methods: {
        formatTel() {
            // 숫자 이외의 문자를 제거
            let cleaned = ('' + this.tel).replace(/\D/g, '');

            // 유효하지 않은 문자가 있음을 나타내기 위해 초기 telErrors 설정
            this.telErrors = cleaned.length !== this.tel.length ? ['숫자만 입력해주세요'] : [];

            // 최대 길이 제한
            if (cleaned.length > 11) {
                cleaned = cleaned.slice(0, 11);
            }

            // 포맷팅
            let match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
            if (match) {
                this.tel = `${match[1]}-${match[2]}-${match[3]}`;
                this.telErrors = [];
            } else if (cleaned.length === 11) {
                this.tel = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
                this.telErrors = [];
            } else if (cleaned.length < this.tel.length) {
                this.telErrors = ['숫자만 입력해주세요'];
            }
        },
        async findEmail() {
            console.log('Sending tel:', this.tel);  // 추가 로그
            axios.post('http://localhost:8000/memberManage/findEmail', { tel: this.tel })
                .then((response) => {
                    if (response.status === 200) {
                        this.email = response.data;
                        console.log('Email Info:', this.email);
                        this.dialog = true;
                    } else {
                        console.error('Failed to find Email:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error finding Email:', error);
                });
        }
    }
}
</script>

<style>
.find-id-form {
    width: 500px;
    height: 600px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    margin: 2rem auto;
    box-shadow: rgb(3 0 71 / 9%) 0px 8px 45px;

    @media(max-width: 500px) {
        width: 100%;
    }
}

.find-id-form-container {
    padding: 3rem 3.75rem 0px;

    @media(max-width: 500px) {
        padding: 3rem 1rem 0px;
    }
}

#logo-image {
    display: flex;
    justify-content: center;
    margin-left: 10px;
}
</style>