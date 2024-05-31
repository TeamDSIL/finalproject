<template>
  <v-container>
    <div class="bg-body d-flex flex-column justify-center align-center min-vh-100">
      <div class="sign-up-form">
        <div class="sign-up-form-container">
          <div class="text-center mb-10">
            <h3 class="mb-3">회원가입</h3>
            <h5 class="text-sm font-600 grey--text text--darken-4">계속하려면 양식에 맞춰 입력해주세요.</h5>
          </div>

          <v-text-field v-model="userInfo.name" label="이름" type="text" class="mb-4" :error-messages="nameErrors"
            @input="handleNameInput"></v-text-field>

          <div class="d-flex align-center mb-4">
            <v-text-field v-model="userInfo.email" label="이메일" type="email"
              :error-messages="emailErrors.concat(emailCheckMessage)" @input="handleEmailInput"
              class="flex-grow-1 mr-2"></v-text-field>
            <v-btn @click="checkEmailAvailability" color="primary">중복 검사</v-btn>
          </div>

          <v-text-field v-model="userInfo.tel" label="연락처" type="tel" class="mb-4" :error-messages="telErrors"
            @input="handleTelInput"></v-text-field>

          <v-text-field v-model="userInfo.password" type="password" label="비밀번호" class="mb-4"
            :error-messages="passwordErrors" @input="handlePasswordInput"></v-text-field>

          <v-text-field v-model="confirmPassword" type="password" label="비밀번호 재입력" class="mb-4"
            :error-messages="confirmPasswordErrors" @input="handleConfirmPasswordInput"></v-text-field>

          <v-btn @click="sample6_execDaumPostcode" style="margin-bottom: 20px" small color="primary">주소 찾기</v-btn>

          <div v-if="addressSelected">
            <v-text-field v-model="userInfo.postcode" label="우편번호" type="text" placeholder="우편번호"></v-text-field>
            <v-text-field v-model="userInfo.dynamicAddress" label="주소" type="text" placeholder="주소"></v-text-field>
            <v-text-field v-model="userInfo.detailAddress" label="상세주소" type="text" placeholder="상세주소 입력"
              ref="detailAddress"></v-text-field>
            <v-text-field v-model="userInfo.extraAddress" label="참고항목" type="text" placeholder="참고항목"></v-text-field>
          </div>

          <div class="mb-4" hide-details>
            <v-checkbox v-model="checkbox">
              <template v-slot:label>
                <div>
                  회원가입을 위해,&nbsp;
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <a @click.stop="openTermsModal" v-on="on">이용약관</a>
                    </template>
                    새 창에서 보기
                  </v-tooltip>
                  에 동의해야 합니다.
                </div>
                <UsingTerms ref="termsModal" />
              </template>
            </v-checkbox>
          </div>

          <div class="text-center mb-4">
            <span class="grey--text text--darken-1">이미 계정이 있으신가요?
              <a @click="gotoLoginPage()" class="ms-2 grey--text text--darken-4 font-600 underline-link">로그인</a>
            </span>
          </div>

          <div class="mb-4 text-center" hide-details>
            <v-btn block color="rgb(255,84,82)" class="primary" :disabled="!isFormValid" @click="signUp">
              계정 생성
            </v-btn>
          </div>

        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import UsingTerms from '@/components/memberManage/UsingTerms.vue';

export default {
  components: {
    UsingTerms,
  },
  layout: 'session',
  data() {
    return {
      checkbox: false,
      userInfo: {
        name: '',
        email: '',
        tel: '',
        password: '',
        dynamicAddress: '',
        detailAddress: '',
        extraAddress: '',
        postcode: '',
      },
      confirmPassword: '',
      nameErrors: [],
      emailErrors: [],
      telErrors: [],
      passwordErrors: [],
      confirmPasswordErrors: [],
      addressSelected: false, // 주소가 선택되었는지 여부
      emailCheckMessage: '', // 이메일 중복 확인 메시지
      emailAvailable: false, // 이메일 사용 가능 여부
    };
  },
  computed: {
    isFormValid() {
      return (
        this.checkbox &&
        this.nameErrors.length === 0 &&
        this.emailErrors.length === 0 &&
        this.telErrors.length === 0 &&
        this.passwordErrors.length === 0 &&
        this.confirmPasswordErrors.length === 0 &&
        this.userInfo.name &&
        this.userInfo.email &&
        this.userInfo.tel &&
        this.userInfo.password &&
        this.confirmPassword &&
        this.emailAvailable // 이메일이 사용 가능해야 회원가입 가능
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
    openTermsModal() {
      this.$refs.termsModal.openModal();
    },
    gotoLoginPage() {
      this.$router.push('/memberManage/LoginPage');
    },
    handleNameInput() {
      if (this.userInfo.name === '') {
        this.nameErrors = [];
      } else {
        this.validateName();
      }
    },
    handleEmailInput() {
      this.emailCheckMessage = ''; // 이메일 입력 시 중복 확인 메시지 초기화
      this.emailAvailable = false; // 이메일 사용 가능 여부 초기화
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
      if (this.userInfo.password === '') {
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
      if (!telPattern.test(this.userInfo.tel)) {
        this.telErrors.push('숫자만 입력해야 합니다');
      } else {
        // 전화번호 형식을 010-1234-5678 형식으로 변환
        const tel = this.userInfo.tel.replace(/[^0-9]/g, '');
        this.userInfo.tel = tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
      }
    },
    validatePassword() {
      this.passwordErrors = [];
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{10,15}$/;
      if (!passwordPattern.test(this.userInfo.password)) {
        this.passwordErrors.push('문자와 숫자, 특수문자(!, @, #, $, %, *, ?, &, ~) 합하여 10~15자를 입력해주세요');
      }
    },
    validateConfirmPassword() {
      this.confirmPasswordErrors = [];
      if (this.userInfo.password !== this.confirmPassword) {
        this.confirmPasswordErrors.push('비밀번호가 일치하지 않습니다');
      }
    },
    async checkEmailAvailability() {
      this.emailErrors = [];
      this.emailCheckMessage = '';

      // 이메일 형식 확인
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.userInfo.email)) {
        this.emailErrors.push('이메일 형식이 아닙니다');
        this.emailCheckMessage = '이메일 형식이 아닙니다';
        this.emailAvailable = false;
        return;
      }

      try {
        const response = await axios.post(`${process.env.API_URL}/memberManage/checkEmail`, { email: this.userInfo.email });
        if (response.data.exists) {
          this.emailErrors.push('이미 존재하는 이메일입니다');
          this.emailCheckMessage = '이미 존재하는 이메일입니다';
          this.emailAvailable = false;
        } else {
          this.emailCheckMessage = '사용 가능한 이메일입니다';
          this.emailAvailable = true;
        }
      } catch (error) {
        console.error('이메일 중복 확인 중 오류가 발생했습니다:', error);
        this.emailErrors.push('이메일 중복 확인 중 오류가 발생했습니다');
      }
    },

    async signUp() {
      this.validateName();
      this.validateEmail();
      this.validateTel();
      this.validatePassword();
      this.validateConfirmPassword();

      if (!this.isFormValid) {
        return;
      }

      try {
        // API 요청을 보내기 전에 데이터 유효성 검사를 수행할 수 있습니다.

        // API 요청을 보낼 데이터 생성
        const requestData = {
          email: this.userInfo.email,
          password: this.userInfo.password,
          name: this.userInfo.name,
          tel: this.userInfo.tel,
          address: `${this.userInfo.dynamicAddress} ${this.userInfo.detailAddress}`,
          postcode: this.userInfo.postcode,
        };

        // API 요청 보내기~
        const response = await axios.post(`${process.env.API_URL}/memberManage/signupPage`, requestData);

        // 응답 처리
        console.log('회원 정보 응답:', response.data);
        alert('회원가입이 완료되었습니다.');

        this.$router.push('/');
        // 부모 컴포넌트로 수정된 정보를 전달
        this.$emit('modify-user', requestData);

        // 모달 창을 닫음
        this.$emit('close');

        // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.

      } catch (error) {
        // API 요청 실패 시 에러 처리
        console.error('회원가입 요청 실패:', error);
        alert('정보를 다시 입력해주세요.');
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

  .underline-link {
    text-decoration: underline;
  }

  .text-center {
    text-align: center;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }

  .mb-10 {
    margin-bottom: 3rem;
  }

  .text-success {
    color: green;
  }

  .text-error {
    color: red;
  }
}
</style>
