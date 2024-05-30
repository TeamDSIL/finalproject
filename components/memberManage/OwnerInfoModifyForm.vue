<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">회원 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <v-text-field v-model="localUserInfo.ownerName" label="사업자명" class="mb-4" readonly></v-text-field>

            <v-text-field label="이메일[ID]" class="mb-4" readonly v-model="localUserInfo.email"></v-text-field>

            <v-text-field v-model="localUserInfo.registerNumber" label="사업자등록번호" class="mb-4" readonly></v-text-field>

            <v-text-field v-model="localUserInfo.name" label="매장명" class="mb-4" readonly></v-text-field>

            <v-text-field v-model="localUserInfo.tel" label="연락처" class="mb-4" :error-messages="telErrors"
                @input="handleTelInput"></v-text-field>

            <v-text-field v-model="modifiedPassword" label="비밀번호" type="password" class="mb-4"
                :error-messages="passwordErrors" @input="handlePasswordInput"></v-text-field>

            <v-text-field v-model="confirmPassword" label="비밀번호 확인" type="password" class="mb-4"
                :error-messages="confirmPasswordErrors" @input="handleConfirmPasswordInput"></v-text-field>

            <v-btn @click="sample6_execDaumPostcode" style="margin-bottom: 20px" small color="primary">주소 찾기</v-btn>

            <div v-if="addressSelected">
                <v-text-field v-model="localUserInfo.postcode" label="우편번호" type="text" placeholder="우편번호"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="localUserInfo.dynamicAddress" label="주소" type="text" placeholder="주소"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="localUserInfo.detailAddress" label="상세주소" type="text" placeholder="상세주소 입력"
                    ref="detailAddress" class="mb-4"></v-text-field>
                <v-text-field v-model="localUserInfo.extraAddress" label="참고항목" type="text" placeholder="참고항목"
                    class="mb-4"></v-text-field>
            </div>

            <v-btn @click="submitForm" block color="rgb(255,84,82)" class="primary">수정</v-btn>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        selectedOwnerInfo: {
            type: Object,
            default: () => ({
                ownerName: '',
                email: '',
                registerNumber: '',
                name: '',
                tel: '',
                address: '',
                postcode: '',
                dynamicAddress: '',
                detailAddress: '',
                extraAddress: '',
            }),
        },
        dialogModify: Boolean
    },
    data() {
        return {
            localUserInfo: { ...this.selectedOwnerInfo },
            modifiedPassword: '',
            confirmPassword: '',
            nameErrors: [],
            emailErrors: [],
            telErrors: [],
            passwordErrors: [],
            confirmPasswordErrors: [],
            addressSelected: false,
        };
    },
    watch: {
        dialogModify(newVal) {
            if (newVal) {
                this.resetForm();
            }
        }
    },
    computed: {
        isFormValid() {
            return (
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
        resetForm() {
            this.localUserInfo = { ...this.selectedOwnerInfo };
            this.modifiedPassword = '';
            this.confirmPassword = '';
            this.addressSelected = false;
        },
        handleTelInput() {
            if (this.localUserInfo.tel === '') {
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
        validateTel() {
            this.telErrors = [];
            const telPattern = /^[0-9]{2}-?[0-9]{3}-?[0-9]{4}$/;
            if (!telPattern.test(this.localUserInfo.tel) || this.localUserInfo.tel.replace(/[^0-9]/g, '').length !== 9) {
                this.telErrors.push('매장 번호 9자리를 입력해야 합니다');
            } else {
                const tel = this.localUserInfo.tel.replace(/[^0-9]/g, '');
                this.localUserInfo.tel = tel.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
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
            this.validateTel();
            this.validatePassword();
            this.validateConfirmPassword();

            if (!this.isFormValid) {
                return;
            }

            try {
                const address = this.addressSelected
                    ? `${this.localUserInfo.dynamicAddress} ${this.localUserInfo.detailAddress}`
                    : this.localUserInfo.address;

                const modifiedData = {
                    password: this.modifiedPassword,
                    tel: this.localUserInfo.tel,
                    address: address,
                    registerNumber: this.localUserInfo.registerNumber,
                    email: this.localUserInfo.email,
                    ownerName: this.localUserInfo.ownerName,
                    name: this.localUserInfo.name
                };

                const response = await axios.post(`${process.env.API_URL}/memberManage/ownerMyPage`, modifiedData);

                console.log('수정 응답:', response.data);
                alert('회원 정보가 수정되었습니다.');

                this.$emit('modify-user', modifiedData);
                this.$emit('close');

            } catch (error) {
                console.error('수정 요청 실패:', error);
                alert('회원 정보 수정 실패했습니다.');
            }
        },
        sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: (data) => {
                    this.localUserInfo.postcode = data.zonecode;
                    this.localUserInfo.dynamicAddress =
                        data.userSelectedType === "R"
                            ? data.roadAddress
                            : data.jibunAddress;
                    this.localUserInfo.detailAddress = "";
                    this.localUserInfo.extraAddress =
                        data.bname && /[동|로|가]$/g.test(data.bname) ? data.bname : "";

                    this.addressSelected = true;

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
