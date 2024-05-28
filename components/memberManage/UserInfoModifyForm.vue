<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <v-text-field v-model="userInfo.name" label="이름" class="mb-4" :error-messages="nameErrors"
                @input="handleNameInput"></v-text-field>

            <v-text-field class="mb-4" readonly label="이메일[ID]" v-model="userInfo.email" :error-messages="emailErrors"
                @input="handleEmailInput"></v-text-field>

            <v-text-field v-model="userInfo.tel" label="연락처" class="mb-4" :error-messages="telErrors"
                @input="handleTelInput"></v-text-field>

            <v-text-field v-model="modifiedPassword" label="비밀번호" type="password" class="mb-4"
                :error-messages="passwordErrors" @input="handlePasswordInput"></v-text-field>

            <v-text-field v-model="confirmPassword" type="password" label="비밀번호 확인" class="mb-4"
                :error-messages="confirmPasswordErrors" @input="handleConfirmPasswordInput"></v-text-field>

            <v-btn @click="sample6_execDaumPostcode" style="margin-bottom: 20px" small color="primary">주소 찾기</v-btn>

            <div v-if="addressSelected">
                <v-text-field v-model="userInfo.postcode" label="우편번호" type="text" placeholder="우편번호"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="userInfo.dynamicAddress" label="주소" type="text" placeholder="주소"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="userInfo.detailAddress" label="상세주소" type="text" placeholder="상세주소 입력"
                    ref="detailAddress" class="mb-4"></v-text-field>
                <v-text-field v-model="userInfo.extraAddress" label="참고항목" type="text" placeholder="참고항목"
                    class="mb-4"></v-text-field>
            </div>

            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정</v-btn>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';

export default ({
    props: {
        userInfo: Object,
        dialogModify: Boolean
    },
    data() {
        return {
            modifiedPassword: '',           // 비밀번호
            confirmPassword: '',    // 비밀번호 확인
            nameErrors: [],
            emailErrors: [],
            telErrors: [],
            passwordErrors: [],
            confirmPasswordErrors: [],
            addressSelected: false, // 주소가 선택되었는지 여부
        };
    },
    computed: {
        isFormValid() {
            return (
                this.nameErrors.length === 0 &&
                this.emailErrors.length === 0 &&
                this.telErrors.length === 0 &&
                this.passwordErrors.length === 0 &&
                this.confirmPasswordErrors.length === 0 &&
                this.userInfo.name &&
                this.userInfo.email &&
                this.userInfo.tel &&
                this.modifiedPassword &&
                this.confirmPassword
            );
        },
    },
    mounted() {
        const script = document.createElement("script");
        script.src =
            "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);
    },
    methods: {
        handleNameInput() {
            if (this.userInfo.name === '') {
                this.nameErrors = [];
            } else {
                this.validateName();
            }
        },
        handleEmailInput() {
            if (this.userInfo.email === '') {
                this.emailErrors = [];
            } else {
                this.validateEmail();
            }
        },
        handleTelInput() {
            if (this.userInfo.tel === '') {
                this.telErrors = [];
            } else {
                this.validateTel();
            }
        },
        handlePasswordInput() {
            if (this.modifiedPassword === '') {
                this.passwordErrors = [];
            } else {
                this.validatePassword();
            }
        },
        handleConfirmPasswordInput() {
            if (this.confirmPassword === '') {
                this.confirmPasswordErrors = [];
            } else {
                this.validateConfirmPassword();
            }
        },
        validateName() {
            this.nameErrors = [];
            const namePattern = /^[가-힣a-zA-Z\s]+$/;
            if (!namePattern.test(this.userInfo.name)) {
                this.nameErrors.push('이름은 문자만 입력 가능합니다');
            } else if (this.userInfo.name === '') {
                this.nameErrors.push('이름은 필수로 입력해야합니다');
            }
        },
        validateEmail() {
            this.emailErrors = [];
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.userInfo.email)) {
                this.emailErrors.push('이메일 형식이 아닙니다');
            }
        },
        validateTel() {
            this.telErrors = [];
            const telPattern = /^[0-9]{3}-?[0-9]{4}-?[0-9]{4}$/;
            if (!telPattern.test(this.userInfo.tel) || this.userInfo.tel.replace(/[^0-9]/g, '').length !== 11) {
                this.telErrors.push('휴대전화 번호 11자리를 입력해주세요.');
            } else {
                const tel = this.userInfo.tel.replace(/[^0-9]/g, '');
                this.userInfo.tel = tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        },
        validatePassword() {
            this.passwordErrors = [];
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{10,15}$/;
            if (!passwordPattern.test(this.modifiedPassword)) {
                this.passwordErrors.push('문자와 숫자, 특수문자(!, @, #, $, %, *, ?, &, ~) 합하여 10~15자를 입력해주세요');
            }
        },
        validateConfirmPassword() {
            this.confirmPasswordErrors = [];
            if (this.modifiedPassword !== this.confirmPassword) {
                this.confirmPasswordErrors.push('비밀번호가 일치하지 않습니다');
            }
        },
        async submitForm() {
            this.validateName();
            this.validateEmail();
            this.validateTel();
            this.validatePassword();
            this.validateConfirmPassword();

            if (!this.isFormValid) {
                return;
            }

            try {
                // 주소 필드가 비어 있으면 기존 주소 값 사용
                const address = this.userInfo.dynamicAddress && this.userInfo.detailAddress
                    ? `${this.userInfo.dynamicAddress} ${this.userInfo.detailAddress}`
                    : this.userInfo.address;

                // API 요청을 보낼 데이터 생성
                const requestData = {
                    email: this.userInfo.email,
                    password: this.modifiedPassword,
                    name: this.userInfo.name,
                    tel: this.userInfo.tel,
                    address: address,
                    postcode: this.userInfo.postcode,
                    point: {
                        id: this.userInfo.point.id,
                        accumulatePoint: this.userInfo.point.accumulatePoint,
                        currentPoint: this.userInfo.point.currentPoint,
                    }
                };

                // API 요청 보내기
                const response = await axios.post(`${process.env.API_URL}/memberManage/userMyPage`, requestData);

                // 응답 처리
                console.log('수정 응답:', response.data);
                alert('회원 정보가 수정되었습니다.');

                // 부모 컴포넌트로 수정된 정보를 전달하고 모달 창을 닫음
                this.$emit('modify-user', requestData);
                this.$emit('close');

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
                alert('회원 정보 수정 실패했습니다.');
            }
        },
        sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: (data) => {
                    // 데이터를 Vue 인스턴스의 데이터에 직접 할당
                    this.userInfo.postcode = data.zonecode;
                    this.userInfo.dynamicAddress =
                        data.userSelectedType === "R"
                            ? data.roadAddress
                            : data.jibunAddress;
                    this.userInfo.detailAddress = ""; // 상세 주소는 사용자 입력을 위해 초기화
                    this.userInfo.extraAddress =
                        data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : "";

                    this.addressSelected = true; // 주소가 선택되었음을 표시

                    // 포커스를 상세 주소 필드로 이동
                    this.$nextTick(() => {
                        this.$refs.detailAddress.focus();
                    });
                },
            }).open();
        }
    }
})
</script>

<style scoped>
.px-3 {
    padding-left: 1rem;
    padding-right: 1rem;
}

.px-md-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
}

.py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.mb-2 {
    margin-bottom: 0.5rem;
}
</style>
