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
                <h3 class="mb-2 text-center">비밀번호 찾기</h3>

                <div>
                    <!-- 첫 번째 화면: 이메일 입력 폼 -->
                    <div v-if="step === 1">
                        <label for="email">이메일 입력:</label>
                        <v-text-field v-model="email" outlined dense hide-details
                            placeholder="가입 시 입력했던 Email을 입력해주세요. dsil@dsil.com" class="mb-4"></v-text-field>
                        <v-btn light text class="primary" @click="sendTemporaryCode">
                            임시 코드 발송
                        </v-btn>
                        <p v-if="emailError" class="error-message">{{ emailError }}</p>
                    </div>

                    <!-- 두 번째 화면: 임시 비밀번호 인증 폼 -->
                    <div v-if="step === 2">
                        <label for="tempCode">인증 코드 입력:</label>
                        <v-text-field v-model="tempCode" outlined dense hide-details placeholder="이메일로 전송된 인증코드를 입력하세요"
                            class="mb-4"></v-text-field>
                        <v-btn light text class="primary" @click="verifyTempCode">
                            새 비밀번호 설정
                        </v-btn>
                        <p v-if="codeError" class="error-message">{{ codeError }}</p>
                    </div>

                    <!-- 세 번째 화면: 비밀번호 재설정 폼 -->
                    <div v-if="step === 3">
                        <label for="newPassword">새로운 비밀번호:</label>
                        <v-text-field type="password" id="newPassword" v-model="newPassword" outlined dense hide-details
                            placeholder="새로운 비밀번호" class="mb-4"></v-text-field>
                        <v-text-field type="password" id="newPassword2" v-model="newPassword2" outlined dense
                            hide-details placeholder="새로운 비밀번호 확인" class="mb-4"></v-text-field>

                        <v-divider></v-divider>

                        <div id="app">
                            <div id="captcha-box" @mousemove="handleMouseMove">
                                <p v-if="!captchaCompleted">마우스를 여기에 움직여주세요.</p>
                                <p v-else>CAPTCHA 확인됨! 양식을 제출할 수 있습니다.</p>
                            </div>
                            <button @click="validateCaptcha" :disabled="captchaCompleted">제출</button>
                        </div>

                        <v-btn light text class="primary" @click="submitPassword" id="submit-ps">
                            확인
                        </v-btn>
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
            dialog: false,
            captchaCompleted: false,
            moved: false,
            emailError: '',  // 이메일 형식 오류 메시지
            codeError: ''    // 인증 코드 오류 메시지
        };
    },
    methods: {
        validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
            return re.test(String(email).toLowerCase());
        },
        async sendTemporaryCode() {
            if (!this.validateEmail(this.email)) {
                this.emailError = '이메일 형식으로 입력해주세요';
                return;
            }
            this.emailError = '';
            try {
                console.log(this.email);
                const response = await axios.post('http://localhost:8000/memberManage/sendCode', { email: this.email });
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
                const response = await axios.post('http://localhost:8000/memberManage/verifyCode', { email: this.email, code: this.tempCode });
                console.log('인증 코드 확인:', this.tempCode);
                alert('인증 되었습니다.');
                this.step = 3; // 다음 단계로 이동
            } catch (error) {
                console.error('Error verifying code:', error);
                this.codeError = '인증 코드가 틀렸습니다. 다시 시도해주세요.';
            }
        },
        async submitPassword() {
            if (this.newPassword !== this.newPassword2) {
                alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
            try {
                const response = await axios.post('http://localhost:8000/memberManage/resetPassword', {
                    email: this.email,
                    newPassword: this.newPassword
                });
                console.log('비밀번호 재설정:', this.newPassword, this.newPassword2);
                
                this.$router.push('/memberManage/LoginPage');
            } catch (error) {
                console.error('Error resetting password:', error);
                alert('비밀번호 재설정 중 오류가 발생했습니다.');
            }
        },
        handleMouseMove() {
            this.moved = true;
        },
        validateCaptcha() {
            if (this.moved) {
                this.captchaCompleted = true;
                alert('CAPTCHA 확인됨! 양식을 제출할 수 있습니다.');
            } else {
                alert('CAPTCHA를 완료해주세요. 마우스를 움직여야 합니다.');
            }
        },
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

#captcha-box {
    width: 300px;
    height: 100px;
    border: 2px solid #ccc;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>
