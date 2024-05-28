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
                <h3 class="mb-2 text-center">비밀번호 찾기</h3>

                <div>
                    <!-- 첫 번째 화면: 이메일 입력 폼 -->
                    <div v-if="step === 1">
                        <v-text-field v-model="email" label="이메일을 입력해주세요" @keyup.enter="sendTemporaryCode" class="mb-4"></v-text-field>
                        <div class="button-container">
                            <v-btn :class="['primary', { 'disabled-btn': !isEmailValid }]" :disabled="!isEmailValid" @click="sendTemporaryCode">
                                인증 코드 발송
                            </v-btn>
                        </div>
                        <p v-if="emailError" class="error-message">{{ emailError }}</p>
                    </div>

                    <!-- 두 번째 화면: 인증 코드 인증 폼 -->
                    <div v-if="step === 2">
                        <v-text-field v-model="tempCode" placeholder="이메일로 전송된 인증코드를 입력하세요" @keyup.enter="verifyTempCode" class="mb-4"></v-text-field>
                        <div class="button-container">
                            <v-btn :class="['primary', { 'disabled-btn': tempCode.length === 0 }]" :disabled="tempCode.length === 0" @click="verifyTempCode">
                                새 비밀번호 설정
                            </v-btn>
                        </div>
                        <p v-if="codeError" class="error-message">{{ codeError }}</p>
                    </div>

                    <!-- 세 번째 화면: 비밀번호 재설정 폼 -->
                    <div v-if="step === 3">
                        <v-text-field type="password" id="newPassword" v-model="newPassword" placeholder="새로운 비밀번호" class="mb-4"
                                      :error-messages="passwordErrors" @input="validatePassword" @keyup.enter="submitPassword"></v-text-field>
                        <v-text-field type="password" id="newPassword2" v-model="newPassword2" placeholder="새로운 비밀번호 확인" class="mb-4"
                                      :error-messages="confirmPasswordErrors" @input="validateConfirmPassword" @keyup.enter="submitPassword"></v-text-field>
                        <div class="button-container">
                            <v-btn :class="['primary', { 'disabled-btn': !isPasswordValid }]" :disabled="!isPasswordValid" @click="submitPassword" id="submit-ps">
                                확인
                            </v-btn>
                        </div>
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
            step: 1, // 초기 단계 설정
            email: '',
            tempCode: '',
            newPassword: '',
            newPassword2: '',
            emailError: '',  // 이메일 형식 오류 메시지
            codeError: '',    // 인증 코드 오류 메시지
            passwordErrors: [],
            confirmPasswordErrors: [],
        };
    },
    computed: {
        isEmailValid() {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
            return re.test(String(this.email).toLowerCase());
        },
        isPasswordValid() {
            return this.newPassword !== '' && this.newPassword === this.newPassword2 && this.passwordErrors.length === 0 && this.confirmPasswordErrors.length === 0;
        }
    },
    methods: {
        async sendTemporaryCode() {
            if (!this.isEmailValid) {
                this.emailError = '이메일 형식으로 입력해주세요';
                return;
            }
            this.emailError = '';
            try {
                console.log(this.email);
                const response = await axios.post(`${process.env.API_URL}/memberManage/sendCode`, { email: this.email });
                console.log('인증 코드가 전송된 이메일:', this.email);
                alert('입력하신 이메일로 인증 코드가 전송됐습니다.');
                this.step = 2; // 다음 단계로 이동
            } catch (error) {
                console.error('Error sending temporary code:', error);
                this.emailError = '인증 코드를 전송하는 중 오류가 발생했습니다.';
            }
        },
        async verifyTempCode() {
            try {
                const response = await axios.post(`${process.env.API_URL}/memberManage/verifyCode`, { email: this.email, code: this.tempCode });
                console.log('인증 코드 확인:', this.tempCode);
                alert('인증 되었습니다.');
                this.step = 3; // 다음 단계로 이동
            } catch (error) {
                console.error('Error verifying code:', error);
                this.codeError = '인증 코드가 틀렸습니다. 다시 시도해주세요.';
            }
        },
        validatePassword() {
            this.passwordErrors = [];
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{10,15}$/;
            if (!passwordPattern.test(this.newPassword)) {
                this.passwordErrors.push('문자와 숫자, 특수문자(!, @, #, $, %, *, ?, &, ~) 합하여 10~15자를 입력해주세요');
            }
        },
        validateConfirmPassword() {
            this.confirmPasswordErrors = [];
            if (this.newPassword !== this.newPassword2) {
                this.confirmPasswordErrors.push('비밀번호가 일치하지 않습니다');
            }
        },
        async submitPassword() {
            this.validatePassword();
            this.validateConfirmPassword();

            if (!this.isPasswordValid) {
                return;
            }

            try {
                const response = await axios.post(`${process.env.API_URL}/memberManage/resetPassword`, {
                    email: this.email,
                    newPassword: this.newPassword
                });
                console.log('비밀번호 재설정:', this.newPassword, this.newPassword2);
                alert('비밀번호가 재설정 됐습니다.');

                this.$router.push('/memberManage/LoginPage');
            } catch (error) {
                console.error('Error resetting password:', error);
                alert('비밀번호 재설정 중 오류가 발생했습니다.');
            }
        }
    }
}
</script>

<style scoped>
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

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.primary {
    background-color: rgb(255,84,82);
    color: white;
}

.disabled-btn {
    background-color: grey;
    color: white;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 1rem;
}

.mb-4 {
    margin-bottom: 1.5rem;
}
</style>
