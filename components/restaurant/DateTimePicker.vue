<template>
  <v-col cols="4" sm="6" md="4">
    <!-- 예약 날짜, 시간 선택하는 모달창 -->
    <v-dialog ref="dialog" v-model="modal" persistent width="290px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">예약 날짜 및 시간 선택</v-btn>
      </template>
      <v-card>
        <!-- 예약 날짜 선택 -->
        <v-date-picker v-model="date" :min="minDate" scrollable locale="ko"></v-date-picker>
        <p style="margin-left: 10px;">예약 시간을 선택해주세요.</p>
        <!-- 시간 선택 버튼 -->
        <div class="time-buttons-container" @touchmove.prevent="handleTouchMove">
          <v-row class="time-buttons" justify="center">
            <v-btn v-for="(time, index) in timeOptions" :key="index" @click="selectTime(index)"
              :class="['time-button', selectedHour === time.split(':')[0] && selectedMinute === time.split(':')[1] ? 'selected' : '']">
              {{ time }}
            </v-btn>
          </v-row>
        </div>
        <!-- 인원 수 입력 -->
        <v-text-field v-model="numberOfPeople" label="인원 수" type="number" style="margin-left: 10px;"></v-text-field>
        <!-- 예약하기 및 닫기 버튼 -->
        <v-card-actions>
          <v-btn color="primary" text @click="set" :disabled="numberOfPeople <= 0">예약하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="modal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 예약 확인 모달 -->
    <!-- 예약금이 있는 경우 확인 모달 -->
    <v-dialog v-if="depositAmount" v-model="showConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">아래 일정대로 예약하시겠습니까?</p>
          <v-card-text style="text-align: center;">
            <p><strong>예약정보</strong></p>
          </v-card-text>
          <div class="confirmation-content" style="margin-top: -10px;">
            <p>{{ selectedDateTime }} {{ numberOfPeople }}명</p>
            <p>예약금 <span style="margin-left: 88px;">{{ calculateDeposit }}원</span></p>
            <p style="font-size: 0.8rem; opacity: 0.6;">(결제하기 버튼을 7분 이내로 눌러주세요.)</p>
            <p style="font-size: 0.8rem; opacity: 0.6; color:red">(예약 취소 시, 예약금은 환불 정책에 따라 반환됩니다.)</p>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); margin-left:45px; color: white"
            @click="confirmReservation">결제하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="background-color: #E0E0E0; margin-right:45px;" text @click="cancelReservation">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 예약금이 없는 경우 확인 모달 -->
    <v-dialog v-if="!depositAmount" v-model="showConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">아래 일정대로 예약하시겠습니까?</p>
          <v-card-text style="text-align: center;">
            <p><strong>예약정보</strong></p>
          </v-card-text>
          <div class="confirmation-content" style="margin-top: -10px;">
            <p>{{ selectedDateTime }} {{ numberOfPeople }}명</p>
            <p style="font-size: 0.8rem; opacity: 0.6;">(예약하기 버튼을 7분 이내로 눌러주세요.)</p>
            <p style="font-size: 0.8rem; opacity: 0.6;">당일취소 및 노쇼는 다른 사람에게 피해를 줄 수 있으므로<br> 신중하게 예약해주시기 바랍니다.</p>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); margin-left:45px; color: white"
            @click="confirmReservation">예약하기</v-btn>
          <v-spacer></v-spacer>
          <v-btn style="background-color: #E0E0E0; margin-right:45px;" text @click="cancelReservation">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 예약금 있는 확정 모달 -->
    <v-dialog v-if="depositAmount" v-model="showReservationConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">예약이 확정되었습니다!</p>
          <p>결제 금액 : {{ calculateDeposit }}원</p>
          <p>밥알 {{ riceBallPoints }}개 적립완료 (현재 누적 밥알 {{ totalRiceBallPoints }}개)</p>
          <p>(예약금은 식당에서 최종 금액에서 차감됩니다.)</p>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); color: white"
            @click="showReservationConfirmationModal = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- 예약금 없는 예약 확정 모달 -->
    <v-dialog v-if="!depositAmount" v-model="showReservationConfirmationModal" persistent width="333">
      <v-card>
        <v-card-title class="logo-title">
          <img src="@/assets/images/logo.jpg" alt="Logo" class="logo-img">
        </v-card-title>
        <v-card-text style="text-align: center; margin-top: -20px;">
          <p style="font-weight: bold;">예약이 확정되었습니다!</p>
          <p>밥알 {{ riceBallPoints }}개 적립완료 (현재 누적 밥알 {{ totalRiceBallPoints }}개)</p>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="background-color: rgb(210,63,87); color: white"
            @click="showReservationConfirmationModal = false">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 결제 모달 -->
    <v-dialog v-if="showPaymentModal" v-model="showPaymentModal" persistent width="550px">
      <v-card class="custom-card">
        <v-card-title class="title">
          <p> 예약금 결제</p>
        </v-card-title>
        <v-card-title class="restaurant-name" style="margin-bottom: 10px;">
          <div style="margin-top: -20px;">{{ restaurantName }}</div>
        </v-card-title>

        <!-- 타이머 표시 -->
        <v-card-text style="display: inline-block;">
          <div style="background-color: #B0E2FF; padding: 2px; border-radius: 5px; display: inline-block;">
            <span style="color: #1E90FF; font-weight: bold; padding-left: 5px;">{{ timer }}</span>
            <!-- "새로고침" 버튼 추가 -->
            <v-btn icon @click="resetTimer" style="min-width: auto; margin-left: -3px;">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
          <span> 7분간 예약 찜! 시간 내 예약을 완료해주세요.</span>
        </v-card-text>

        <!-- 예약 정보 및 밥알 사용 -->
        <v-card-text style="margin-top: 3px;">
          <div
            style="background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; text-align: center;">
            <div style="text-align: left;">
              <p style="font-weight: bold; margin-bottom: 5px;">예약 정보</p>
              <p class="reservation-details" style="margin-top: 0; margin-bottom: 3px;">{{ selectedDateTime }}시 {{
      numberOfPeople }}명</p>
            </div>
            <!-- 다른 사람이 방문해요 버튼 -->
            <v-btn color="white" style="border-radius: 15px; display: block; margin: 0 auto;"
              @click="openVisitorModal">다른
              사람이 방문해요</v-btn>
            <div style="margin-top: 10px;">
              <!-- 방문자 정보 표시 -->
              <!-- 데이터가 있을 때만 표시하도록 설정합니다. -->
              <p v-if="visitorName">방문자 성함 : {{ visitorName }}</p>
              <p v-if="visitorContact">방문자 연락처 : {{ visitorContact }}</p>
            </div>
          </div>
          <p style="margin-top: 10px; font-weight: bold;margin-bottom: 10px;  margin-left: 6px;">드실 포인트</p>
          <div
            style="background-color: white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-top: 5px;">
            <p style="font-weight: bold;">
              현재 보유 밥알: {{ totalRiceBallPoints }} 밥알<br>
              몇 밥알? : <input type="number" v-model="riceBallInput" @input="handleInputChange"
                placeholder="사용할 밥알을 입력해주세요." pattern="[0-9]*">
            </p>
            <!-- 밥알 사용하기 버튼 -->
            <v-btn color="#FFD700" dark
              style="display: block; margin: 0 auto; min-width: 200px; font-family: 'Garamond', serif; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);"
              @click="updatePaymentAmount">
              <span style="font-weight: bold; color: black; font-family: 'Garamond', serif;">밥알 사용하기</span>
            </v-btn>
            <br>
            <span style="font-weight: bold; color: black;">레스토랑 유의사항</span><br>
            <input type="checkbox" id="reservationPolicy" v-model="reservationPolicyAgreed">
            <label for="reservationPolicy">[필수] 예약금은 식당에서의 최종 결제 금액에서 차감됩니다.</label>
          </div>
        </v-card-text>

        <v-divider></v-divider>
        <div style="background-color:white; padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 91.5%; margin: 20px auto;" >
        <span style="font-weight: bold; color: black; margin-top: 20px;">고객 요청사항</span>
    <v-text-field v-model="customerRequest" placeholder="레스토랑에 요청하실 내용을 입력해주세요" outlined dense clearable></v-text-field>
</div>

        <!-- 예약 정보 및 결제 내역 표시 -->
        <v-card-text class="reservation-info">
          <span>예약정보</span>{{ selectedDateTime }}시 {{ numberOfPeople }}명<br>
          <span>결제 금액: </span>{{ depositAmount * numberOfPeople - riceBallInput }}원<br>
          <span>예약금 총액: </span>{{ depositAmount * numberOfPeople }}원 <br>
          <span>사용 밥알: </span>{{ riceBallInput }}밥알
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 방문자 입력 모달 -->
    <v-dialog v-model="visitorModal" persistent max-width="400px">
      <v-card>
        <v-card-title class="headline">방문자 입력</v-card-title>
        <v-card-text>
          <!-- 방문자 성함 입력 -->
          <v-text-field v-model="visitorName" label="방문자 성함" placeholder="방문하실 분의 성함을 입력해 주세요."
            v-if="showVisitorFields"></v-text-field>
          <!-- 방문자 연락처 입력 -->
          <v-text-field v-model="visitorContact" label="방문자 연락처" placeholder="방문하실 분의 휴대폰 번호를 입력해 주세요." type="tel"
            v-if="showVisitorFields" @blur="formatPhoneNumber" :maxlength="11" pattern="[0-9]*"></v-text-field>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <v-btn style="min-width: 150px; background-color: #D23F57; color: white;" @click="confirmVisitor">확인</v-btn>
          <v-btn text style="min-width: 150px; background-color: #E0E0E0; color: black;"
            @click="cancelVisitor">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- 결제 시간 만료 alert창 -->
    <v-snackbar v-model="alertSnackbar" :timeout="null">
      {{ alertMessage }}
      <v-btn color="red" text @click="dismissAlert">닫기</v-btn>
    </v-snackbar>
  </v-col>
</template>

<script>
export default {
  name: "DateTimePicker",
  data() {
    return {
      timer: '7:00',
      timerInterval: null,
      date: null,
      modal: false,
      selectedDateTime: null,
      selectedHour: '',
      selectedMinute: '',
      riceBallInput: '',
      numberOfPeople: 1,
      timeOptions: [],
      riceBallPoints: 100,
      depositAmount: 30000,
      totalRiceBallPoints: 4200,
      showConfirmationModal: false,
      showPaymentModal: false,
      showReservationConfirmationModal: false,
      restaurantName: 'Dsil 식당',
      alertSnackbar: false,
      alertMessage: "",
      visitorName: '',
      visitorContact: '',
      visitorModal: false,
      showVisitorFields: false,
      paymentAmount: 0,
      customerRequest: '',

    };
  },
  computed: {
    minDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
    calculateDeposit() {
      return this.numberOfPeople * this.depositAmount;
    },
    calculateTotalRiceBallPoints() {
      return this.totalRiceBallPoints + this.riceBallPoints;
    }
  },
  created() {
    this.startTimer();
    this.totalRiceBallPoints = this.calculateTotalRiceBallPoints;
    this.generateTimeOptions();
  },
  destroyed() {
    clearInterval(this.timerInterval);
  },
  methods: {
    formatPhoneNumber() {
      let phoneNumber = this.visitorContact.toString().replace(/\D/g, ''); // 문자열로 변환하고 숫자 이외의 문자 제거
      phoneNumber = phoneNumber.slice(0, 11); // 최대 11자리까지만 허용
      if (phoneNumber.length === 11) {
        this.visitorContact = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 휴대폰 번호 포맷팅
      } else {
        this.visitorContact = phoneNumber; // 11자리가 아니면 그대로 반환
      }
    },

    openVisitorModal() {
      this.showVisitorFields = true;
      this.visitorModal = true;
    },
    confirmVisitor() {
      this.showVisitorFields = false;
      this.visitorModal = false;
    },
    cancelVisitor() {
      this.visitorName = '';
      this.visitorContact = '';
      this.showVisitorFields = false;
      this.visitorModal = false;
    },
    resetTimer() {
      this.timer = '7:00';
      clearInterval(this.timerInterval);
      this.startTimer();
    },
    startTimer() {
      let duration = 420; //시간 7분 설정
      this.timerInterval = setInterval(() => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        this.timer = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        duration--;
        if (duration < 0) {
          clearInterval(this.timerInterval);
          this.timer = '7:00';
          this.showConfirmationModal = false;
          this.alertMessage = "결제 시간이 만료되었습니다.";
          this.alertSnackbar = true;
        }
      }, 1000);
    },
    dismissAlert() {
      this.alertSnackbar = false;
      this.showPaymentModal = false;
      this.$router.push('/restaurant/RestaurantReservePage');
    },
    handleInputChange() {
      if (parseInt(this.riceBallInput) > this.totalRiceBallPoints) {
        this.riceBallInput = this.totalRiceBallPoints;
      }
    },
    generateTimeOptions() {
      for (let hour = 0; hour < 24; hour++) {
        for (let minute of [0, 30]) {
          this.timeOptions.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        }
      }
    },
    selectTime(index) {
      this.selectedButtonIndex = index;
      const time = this.timeOptions[index];
      const [hour, minute] = time.split(":");
      this.selectedHour = hour;
      this.selectedMinute = minute;
    },
    set() {
      if (this.date && this.selectedHour && this.selectedMinute && this.numberOfPeople > 0) {
        const dateTime = new Date(this.date);
        dateTime.setHours(parseInt(this.selectedHour));
        dateTime.setMinutes(parseInt(this.selectedMinute));

        const dateOptions = { month: 'long', day: '2-digit', weekday: 'short' };
        const timeOptions = { hour: '2-digit', minute: '2-digit' };
        this.selectedDateTime = `${dateTime.toLocaleDateString("ko-KR", dateOptions)} ${dateTime.toLocaleTimeString("ko-KR", timeOptions)}`;
        this.showConfirmationModal = true;
      }
      this.modal = false;
    },
    handleTouchMove(event) {
      if (Math.abs(event.touches[0].clientY - event.touches[0].pageY) > 10) {
        event.preventDefault();
      }
    },
    cancelReservation() {
      this.showConfirmationModal = false;
    },
    confirmReservation() {
      if (this.depositAmount) {
        this.showConfirmationModal = false;
        this.showPaymentModal = true;
      } else {
        this.showConfirmationModal = false;
        this.showReservationConfirmationModal = true;
      }
    },
    redirectToReservation() {
      this.modal = true;
      clearInterval(this.timerInterval);
      this.$router.push('/restaurant/RestaurantReservePage');
    }
  },
  updatePaymentAmount() {
    // 밥알 사용하기 버튼을 클릭했을 때만 결제 금액을 업데이트합니다.
    if (this.riceBallInput.trim() !== '') {
      this.paymentAmount = this.depositAmount * this.numberOfPeople - parseInt(this.riceBallInput);
    }
  }
};
</script>

<style scoped>
.custom-card {
  background-color: rgba(251, 251, 251, 0.89);
}


input[type="number"] {
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 5px;
}

.time-buttons-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.time-buttons {
  display: inline-block;
}


.time-button {
  background-color: yellow;
  border-radius: 30px;
  width: 50px;
  height: 40px !important;
  padding: 10px;
  margin-top: 25px;
  margin-left: 15px;
  margin-right: -6px;
  margin-bottom: 15px;
  border: 1px solid #c0c0c0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.time-button:hover {
  background-color: #FFD700;
}


.selected {
  background-color: #007bff !important;
  color: white;
}


/* 로고 관련 설정 */
.logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 130px;
  width: 130px;
}

/* 결제 모달에서 식당 이름 */
.restaurant-name div {
  background-color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  margin-bottom: -10px;
  display: inline-block;
  width: 500px;
}
</style>