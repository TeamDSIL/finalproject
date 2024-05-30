<template>
    <v-card>
        <div class="px-3 px-md-10 py-8">
            <h3 class="mb-2 text-center">식당 정보 수정</h3>
            <v-divider></v-divider>
            <br>

            <!-- 이메일 표시 -->
            <v-text-field v-model="restaurantInfo.email" class="mb-4" label="이메일[ID]" readonly></v-text-field>

            <!-- 매장명 표시 -->
            <v-text-field v-model="restaurantInfo.name" class="mb-4" label="매장명" readonly></v-text-field>

            <!-- 사업자명 -->
            <v-text-field v-model="restaurantInfo.ownerName" readonly label="사업자명" class="mb-4"></v-text-field>

            <!-- 사업자등록번호 표시 -->
            <v-text-field v-model="restaurantInfo.registerNumber" label="사업자등록번호" class="mb-4" readonly></v-text-field>

            <!-- 연락처 -->
            <v-text-field v-model="restaurantInfo.tel" class="mb-4" label="연락처" :error-messages="telErrors"
                @input="handleTelInput"></v-text-field>

            <!-- 주소 찾기 버튼 -->
            <v-btn @click="sample6_execDaumPostcode" style="margin-bottom: 20px" small color="primary">주소 찾기</v-btn>

            <!-- 기존 주소 표시 -->
            <v-text-field v-if="!addressSelected" v-model="restaurantInfo.address" label="주소" type="text" readonly
                class="mb-4"></v-text-field>

            <!-- 새로운 주소 입력 -->
            <div v-if="addressSelected">
                <v-text-field v-model="restaurantInfo.postcode" label="우편번호" type="text" placeholder="우편번호"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="restaurantInfo.dynamicAddress" label="주소" type="text" placeholder="주소"
                    class="mb-4"></v-text-field>
                <v-text-field v-model="restaurantInfo.detailAddress" label="상세주소" type="text" placeholder="상세주소 입력"
                    ref="detailAddress" class="mb-4"></v-text-field>
                <v-text-field v-model="restaurantInfo.extraAddress" label="참고항목" type="text" placeholder="참고항목"
                    class="mb-4"></v-text-field>
            </div>

            <!-- 수정 확인 버튼 -->
            <div>
                <v-btn id="modify-btn" @click="handleModify" color="rgb(255,84,82)" class="primary">수정</v-btn>
                <v-btn id="delete-btn" @click="handleDelete" color="rgb(255,84,82)" class="primary">해지</v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
import axios from 'axios'; // axios를 import합니다.

export default {
    props: ['restaurantInfo'],
    data() {
        return {
            id: '',
            email: '',
            name: '',
            registerNumber: '',
            ownerName: '',
            tel: '',
            address: '',
            telErrors: [],
            addressSelected: false, // 주소가 선택되었는지 여부
        };
    },
    computed: {
        isFormValid() {
            return (
                this.telErrors.length === 0
            );
        },
    },
    mounted() {
        const script = document.createElement("script");
        script.src =
            "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.head.appendChild(script);

        // 기존 주소를 나눠서 초기화
        if (this.restaurantInfo.address) {
            const addressParts = this.restaurantInfo.address.split(' ');
            this.restaurantInfo.dynamicAddress = addressParts.slice(0, -1).join(' ');
            this.restaurantInfo.detailAddress = addressParts.slice(-1).join(' ');
        }
    },
    methods: {
        handleTelInput() {
            if (this.restaurantInfo.tel === '') {
                this.telErrors = [];
            } else {
                this.validateTel();
            }
        },
        validateTel() {
            this.telErrors = [];
            const telPattern = /^[0-9]{2}-?[0-9]{3}-?[0-9]{4}$/;
            if (!telPattern.test(this.restaurantInfo.tel) || this.restaurantInfo.tel.replace(/[^0-9]/g, '').length !== 9) {
                this.telErrors.push('매장 번호 9자리를 입력해주세요.');
            } else {
                const tel = this.restaurantInfo.tel.replace(/[^0-9]/g, '');
                this.restaurantInfo.tel = tel.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        },
        async handleModify() {
            this.validateTel();

            if (!this.isFormValid) {
                return;
            }

            try {
                // 주소와 관련된 필드가 비어있으면 기존 값을 사용
                const address = this.addressSelected
                    ? `${this.restaurantInfo.dynamicAddress} ${this.restaurantInfo.detailAddress}`
                    : this.restaurantInfo.address;

                const requestData = {
                    id: this.restaurantInfo.id,
                    email: this.restaurantInfo.email,
                    ownerName: this.restaurantInfo.ownerName,
                    name: this.restaurantInfo.name,
                    registerNumber: this.restaurantInfo.registerNumber,
                    tel: this.restaurantInfo.tel,
                    address: address,
                    postcode: this.restaurantInfo.postcode || this.restaurantInfo.oldPostcode,
                };

                console.log(requestData);

                // 토큰을 Vuex 스토어나 로컬 스토리지에서 가져오기
                const token = this.$store.state.token || localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    alert('토큰을 찾을 수 없습니다.');
                    return;
                }

                // API 요청 보내기
                const response = await axios.post(`${process.env.API_URL}/memberManage/adminManageRestaurantPage`, requestData, {
                    headers: {
                        'Authorization': `${token}`
                    },
                    withCredentials: true
                });

                // 응답 처리
                console.log('수정 응답:', response.data);

                // 부모 컴포넌트로 수정된 정보를 전달
                this.$emit('modify-restaurant', requestData);

                // 모달 창을 닫음
                this.$emit('close');

                // 현재 페이지로 리다이렉션 (새로고침)
                this.$router.go(0);

            } catch (error) {
                // API 요청 실패 시 에러 처리
                console.error('수정 요청 실패:', error);
            }
        },
        async handleDelete() {
            try {
                // 토큰을 Vuex 스토어나 로컬 스토리지에서 가져오기
                const token = this.$store.state.token || localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    alert('토큰을 찾을 수 없습니다.');
                    return;
                }

                // 전체 restaurantInfo 객체를 data 속성에 포함
                const response = await axios.delete(`${process.env.API_URL}/memberManage/adminManageRestaurantPage`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    data: this.restaurantInfo,
                    withCredentials: true
                });

                // 삭제 완료 후 모달 창 닫음
                this.$emit('close');

                // 현재 페이지로 리다이렉션 (새로고침)
                this.$router.go(0);

            } catch (error) {
                console.error('삭제 요청 실패:', error);
            }
        },
        sample6_execDaumPostcode() {
            new daum.Postcode({
                oncomplete: (data) => {
                    // 데이터를 Vue 인스턴스의 데이터에 직접 할당
                    this.restaurantInfo.postcode = data.zonecode;
                    this.restaurantInfo.dynamicAddress =
                        data.userSelectedType === "R"
                            ? data.roadAddress
                            : data.jibunAddress;
                    this.restaurantInfo.detailAddress = ""; // 상세 주소는 사용자 입력을 위해 초기화
                    this.restaurantInfo.extraAddress =
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
