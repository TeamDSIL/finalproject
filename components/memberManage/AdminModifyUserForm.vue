<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 이메일 표시 -->
            <v-text-field v-model="userInfo.email" label="이메일[ID]" class="mb-4" readonly></v-text-field>

            <!-- 이름 -->
            <v-text-field v-model="userInfo.name" label="이름" class="mb-4" :error-messages="nameErrors"
                @input="handleNameInput"></v-text-field>

            <!-- 포인트 -->
            <v-text-field v-model="userInfo.point.currentPoint" label="포인트" class="mb-4"></v-text-field>

            <!-- 연락처 -->
            <v-text-field v-model="userInfo.tel" label="연락처" class="mb-4" :error-messages="telErrors"
                @input="handleTelInput"></v-text-field>

            <!-- 비밀번호 -->
            <v-text-field v-model="modifiedPassword" label="비밀번호" type="password" class="mb-4"
                :error-messages="passwordErrors" @input="handlePasswordInput"></v-text-field>

            <!-- 비밀번호 재입력 -->
            <v-text-field v-model="confirmPassword" label="비밀번호 확인" type="password" class="mb-4"
                :error-messages="confirmPasswordErrors" @input="handleConfirmPasswordInput"></v-text-field>

            <!-- 주소 찾기 버튼 -->
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

            <!-- 수정 확인 버튼 -->
            <div id="modify-delete-btn">
                <v-btn id="modify-btn" @click="handleModify" color="rgb(255,84,82)" class="primary">수정</v-btn>
                <v-btn id="delete-btn" @click="handleDelete" color="rgb(255,84,82)" class="primary">삭제</v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'; // axios를 import합니다.

export default {
    props: ['userInfo'], // userInfo prop 추가
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
                this.telErrors.length === 0 &&
                this.passwordErrors.length === 0 &&
                this.confirmPasswordErrors.length === 0 &&
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
        validateTel() {
            this.telErrors = [];
            const telPattern = /^[0-9]{3}-?[0-9]{4}-?[0-9]{4}$/;
            if (!telPattern.test(this.userInfo.tel) || this.userInfo.tel.replace(/[^0-9]/g, '').length !== 11) {
                this.telErrors.push('유효한 전화번호를 입력해주세요');
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
        async handleModify() {
            this.validateName();
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
                    password: this.modifiedPassword,
                    name: this.userInfo.name,
                    tel: this.userInfo.tel,
                    address: `${this.userInfo.dynamicAddress} ${this.userInfo.detailAddress}`,
                    postcode: this.userInfo.postcode,
                    point: {
                        id: this.userInfo.point.id,
                        accmulatePoint: this.userInfo.point.accmulatePoint,
                        currentPoint: this.userInfo.point.currentPoint,
                    }
                };

                // API 요청 보내기
                const response = await axios.post(`${process.env.API_URL}/memberManage/adminManageUserPage`, requestData);

                // 응답 처리
                console.log('수정 응답:', response.data);

                // 부모 컴포넌트로 수정된 정보를 전달
                this.$emit('modify-user', requestData);

                // 모달 창을 닫음
                this.$emit('close');

                // 수정이 완료되면 이전 페이지로 이동하거나 필요한 작업을 수행할 수 있습니다.
                this.$router.push('/memberManage/AdminManageUserPage');

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
            }
        },
        async handleDelete() {
            try {
                const response = await axios.delete(`${process.env.API_URL}/memberManage/adminManageUserPage?email=${this.userInfo.email}`);

                // 삭제 완료 후 모달 창 닫음
                this.$emit('close');

                // 페이지 리다이렉션
                this.$router.push('/memberManage/AdminManageUserPage');

            } catch (error) {
                console.error('삭제 요청 실패:', error);
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
