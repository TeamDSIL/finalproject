<template>
  <v-col cols="4" sm="6" md="4">
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
            <v-btn v-for="(time, index) in timeOptions" :key="index" @click="selectTime(index)" :class="[
      'time-button',
      selectedHour === time.split(':')[0] && selectedMinute === time.split(':')[1] ? 'selected' : ''
    ]">
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
          예약금 결제
        </v-card-title>
        <p class="restaurant-name">{{ restaurantName }}</p>
        <v-divider></v-divider>
        <!-- 타이머 표시 -->
        <v-card-text>
          <span>남은 시간:</span>
          <span>{{ timer }}</span>
          <!-- "새로고침" 버튼 추가 -->
          <v-btn icon @click="resetTimer">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-text>
        <!-- 예약 정보 및 밥알 사용 -->
        <v-card-text>
          <p class="reservation-details">{{ selectedDateTime }}시 {{ numberOfPeople }}명</p>
          <p>
            드실 포인트<br>
            현재 보유 밥알: {{ totalRiceBallPoints }} 밥알<br>
            몇 밥알? <input type="number" v-model="riceBallInput" @input="handleInputChange" placeholder="사용할 밥알을 입력해주세요."
              pattern="[0-9]*">
          </p>
        </v-card-text>
        <!-- 밥알 사용하기 버튼 -->
        <v-card-actions>
          <v-btn color="yellow" block @click="payReservationFee">밥알 사용하기</v-btn>
        </v-card-actions>
        <!-- 예약 정보 및 결제 내역 표시 -->
        <v-divider></v-divider>
        <v-card-text class="reservation-info">
          <span>예약정보</span>{{ selectedDateTime }}시 {{ numberOfPeople }}명<br>
          <span>결제금액:</span>{{ depositAmount - riceBallInput }}원<br>
          <span>주문금액</span>{{ depositAmount }}원 <br>
          <span>밥알</span>{{ riceBallInput }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="alertSnackbar">
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
      alertMessage: ""
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
    resetTimer() {
      this.timer = '7:00';
      clearInterval(this.timerInterval);
      this.startTimer();
    },
    startTimer() {
      let duration = 420;
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
  }
};
</script>

<style scoped>
.custom-card {
  background-color: #f9f9f9;
  /* 매우 옅은 회색 배경색 */
}

input[type="number"] {
  /* 네모칸으로 만들기 */
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
  /* 필요에 따라 너비 조정 */
  height: 30px;
  /* 필요에 따라 높이 조정 */
  box-sizing: border-box;
  /* 패딩과 경계 상자 크기를 요소의 실제 크기로 사용 */
  border-radius: 5px;
  /* 둥근 모서리 반경 설정 */
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

.logo-title {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  height: 130px;
  width: 130px;
}
</style>