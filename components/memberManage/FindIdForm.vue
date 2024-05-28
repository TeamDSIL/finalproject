<template>
    <div class="find-id-form">
        <div class="find-id-form-container">
            <div class="px-3 px-md-10 py-8 ">

                <div id="logo-image">
                    <v-avatar class="me-4" tile width="200" height="100">
                        <img src="~/assets/images/DSILnewLOGO.png" alt="">
                    </v-avatar>
                </div>

                <br>
                <h3 class="mb-2 text-center">아이디 찾기</h3>
                <h5 class="font-600 grey--text text--darken-3 text-sm mb-9 text-center">가입 시 입력했던 연락처를 입력해주세요.</h5>

                <v-text-field placeholder="- 없이 입력해주세요." v-model="tel" class="mb-4" label="연락처"
                    :error-messages="telErrors" @input="formatTel" maxlength="13" @keyup.enter="handleFindEmail"></v-text-field>

                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="button-container">
                            <v-btn color="rgb(255,84,82)" v-bind="attrs" v-on="on" class="primary"
                                :disabled="!isTelValid" @click="handleFindEmail">
                                <span class="d-none d-sm-block">아이디(이메일) 찾기</span>
                            </v-btn>
                        </div>
                    </template>

                    <FindIdResultForm :email="email" />
                </v-dialog>

                <div v-if="showError" class="error-message">유효하지 않은 전화번호입니다. 11자리를 입력해주세요.</div>
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
            dialog: false,
            tel: '',
            email: '',
            telErrors: [],
            showError: false
        };
    },
    computed: {
        isTelValid() {
            return this.tel.replace(/\D/g, '').length === 11;
        }
    },
    components: {
        FindIdResultForm,
    },
    methods: {
        formatTel() {
            let cleaned = ('' + this.tel).replace(/\D/g, '');

            this.telErrors = cleaned.length !== this.tel.length ? ['숫자만 입력해주세요'] : [];

            if (cleaned.length > 11) {
                cleaned = cleaned.slice(0, 11);
            }

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
        async handleFindEmail() {
            if (!this.isTelValid) {
                this.showError = true;
                return;
            }
            this.showError = false;

            try {
                const response = await axios.post(`${process.env.API_URL}/memberManage/findEmail`, { tel: this.tel });
                if (response.status === 200) {
                    this.email = response.data;
                } else {
                    this.email = '';
                    console.error('아이디 찾기에 실패했습니다:', response);
                }
            } catch (error) {
                this.email = '';
                console.error('아이디 찾기 오류:', error);
            }
            this.dialog = true;
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
}

.find-id-form-container {
    padding: 3rem 3.75rem 0px;
}

#logo-image {
    display: flex;
    justify-content: center;
    margin-left: 10px;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 1rem;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}
</style>
