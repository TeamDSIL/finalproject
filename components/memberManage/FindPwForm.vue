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


                <!-- <p class="text-14 mb-1">Email</p> -->

                <div>
                    <!-- 첫 번째 화면: 이메일 입력 폼 -->
                    <div v-if="step === 1">
                        <label for="email">이메일 입력:</label>
                        <v-text-field type="email" id="email" v-model="email" outlined dense hide-details
                            placeholder="dsil@naver.com" class="mb-4"></v-text-field>
                        <v-btn light text v-bind="attrs" v-on="on"
                            class="primary" @click="sendTemporaryPassword">
                            임시 비밀번호 받기
                        </v-btn>
                    </div>

                    <!-- 두 번째 화면: 임시 비밀번호 인증 폼 -->
                    <div v-if="step === 2">
                        <label for="tempPassword">임시 비밀번호 입력:</label>
                        <v-text-field type="password" id="tempPassword" v-model="tempPassword" outlined dense
                            hide-details placeholder="임시 비밀번호를 입력하세요" class="mb-4"></v-text-field>
                        <v-btn light text v-bind="attrs" v-on="on"
                            class="primary"
                            @click="verifyTemporaryPassword">
                            새 비밀번호 설정
                        </v-btn>
                    </div>

                    <!-- 세 번째 화면: 비밀번호 재설정 폼 -->
                    <div v-if="step === 3">
                        <label for="newPassword">드실 이메일(ID) : </label>
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


                        <v-btn light text v-bind="attrs" v-on="on"
                            class="primary" @click="submitPassword"
                            id="submu-ps">
                            확인
                        </v-btn>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            step: 1, // 초기 단계 설정
            email: '',
            tempPassword: '',
            newPassword: '',
            newPassword2: '',
            dialog: false,
            captchaCompleted: false,
            moved: false
        };
    },
    methods: {
        sendTemporaryPassword() {
            // 임시 비밀번호 전송 로직 처리
            console.log('임시 비밀번호 전송:', this.email);
            alert('입력하신 이메일로 임시 비밀번호가 전송됐습니다.');
            this.step = 2; // 다음 단계로 이동
        },
        verifyTemporaryPassword() {
            // 임시 비밀번호 인증 로직 처리
            console.log('임시 비밀번호 인증:', this.tempPassword);
            alert('인증 되었습니다.');
            alert('인증되지 않았습니다. 다시 시도해주세요.');
            this.step = 3; // 다음 단계로 이동
        },
        submitPassword() {
            // 비밀번호 재설정 로직 처리
            console.log('비밀번호 재설정:', this.newPassword, this.newPassword2);
            alert('비밀번호가 재설정되었습니다!');
            // 다시 초기 단계로 돌아가거나 다른 작업 수행
            this.$router.push('/memberManage/LoginPage');
        },
        handleMouseMove() {
            this.moved = true;
        },
        validateCaptcha() {
            if (this.moved) {
                this.captchaCompleted = true;
                alert('CAPTCHA 확인됨! 양식을 제출할 수 있습니다.');
                // 여기에 폼 제출 또는 다음 단계로 진행하는 로직 추가
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