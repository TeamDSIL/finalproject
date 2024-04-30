<template>
  <v-col cols="4" sm="6" md="4">
    <v-dialog ref="dialog" v-model="modal" persistent width="290px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">예약 날짜 및 시간 선택</v-btn>
      </template>
      <v-card>
        <v-date-picker v-model="date" :min="minDate" scrollable locale="ko"></v-date-picker>
        <p style="margin-left: 10px;">예약 시간을 선택해주세요.</p>
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
        <v-text-field v-model="numberOfPeople" label="인원 수" type="number" style="margin-left: 10px;"></v-text-field>
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
      <v-card>
        <v-card-title>
          <span class="headline">예약 정보</span>
        </v-card-title>
        <v-card-text>
          <p>{{ formattedDate }} {{ selectedHour }}시 {{ selectedMinute }}분 {{ numberOfPeople }}명</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="visitAnotherTime">다른 사람이 방문해요</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-col>
</template>

<script>
export default {
  name: "DateTimePicker",
  data() {
    return {
      date: null,
      modal: false,
      selectedDateTime: null,
      selectedHour: '',
      selectedMinute: '',
      numberOfPeople: 1,
      timeOptions: [],
      riceBallPoints: 100,
      //예약금, 전체 밥알은 식당,회원 정보 연동되어야함
      depositAmount: false,
      totalRiceBallPoints: 4200,
      selectedButtonIndex: null,
      showConfirmationModal: false,
      showReservationConfirmationModal: false,
      showPaymentModal: false // 여기에 showPaymentModal 속성 추가
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
    formattedDate() {
      if (!this.date) return '';
      const selectedDate = new Date(this.date);
      const options = { month: 'short', day: '2-digit', weekday: 'short' };
      return selectedDate.toLocaleDateString('ko-KR', options);
    },

    calculateDeposit() {
      return this.numberOfPeople * this.depositAmount;
    },
    calculateTotalRiceBallPoints() {
      return this.totalRiceBallPoints + this.riceBallPoints;
    }
  },
  created() {
    this.totalRiceBallPoints = this.calculateTotalRiceBallPoints
    this.generateTimeOptions();
  },
  methods: {
    generateTimeOptions() {
      for (let hour = 0; hour < 24; hour++) {
        for (let minute of [0, 30]) {
          this.timeOptions.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        }
      }
    },
    selectTime(index) {
      if (this.selectedButtonIndex !== null) {
        const buttons = document.querySelectorAll('.time-button');
        buttons[this.selectedButtonIndex].classList.remove('selected');
      }
      const button = document.querySelectorAll('.time-button')[index];
      button.classList.add('selected');
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
        // 예약금이 있는 경우
        this.showConfirmationModal = false; // 예약 확인 모달 닫기
        this.showPaymentModal = true; // 결제 모달 표시
      } else {
        // 예약금이 없는 경우
        this.showConfirmationModal = false; // 예약 확인 모달 닫기
        this.showReservationConfirmationModal = true; // 바로 예약 확정 모달 표시
      }
    }
  }
};
</script>

<style scoped>
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