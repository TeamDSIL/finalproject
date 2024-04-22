<!-- <template>
    <v-col cols="4" sm="6" md="4">
      <v-dialog
        ref="dialog"
        v-model="modal"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">예약 날짜 및 시간 선택</v-btn>
        </template>
        <v-card>
          <v-date-picker v-model="date" :min="minDate" scrollable locale="ko"></v-date-picker>
          <div class="time-buttons-container" @touchstart.prevent @touchmove.prevent>
            <v-row class="time-buttons" justify="center">
              <v-btn 
                v-for="(time, index) in timeOptions"
                :key="index"
                @click="selectTime(index)"
                :class="[
                  'time-button',
                  selectedHour === time.split(':')[0] && selectedMinute === time.split(':')[1] ? 'selected' : ''
                ]"
              >
                {{ time }}
              </v-btn>
            </v-row>
          </div>
          <v-text-field v-model="numberOfPeople" label="인원 수" type="number"></v-text-field>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="set" :disabled="numberOfPeople <= 0">예약하기</v-btn>
            <v-btn color="primary" text @click="modal = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div v-if="selectedDateTime">
        <p>선택한 날짜 및 시간: {{ selectedDateTime }}</p>
        <p>선택한 인원 수: {{ numberOfPeople }}인</p>
      </div>
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
        numberOfPeople: 1, // default value for number of people
        timeOptions: [], // stores the available time options
        selectedButtonIndex: null, // index of the selected button
      };
    },
    computed: {
      minDate() {
        // Get today's date
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      },
    },
    created() {
      this.generateTimeOptions();
    },
    methods: {
      generateTimeOptions() {
        // Generate time buttons at 30-minute intervals
        for (let hour = 0; hour < 24; hour++) {
          for (let minute of [0, 30]) {
            this.timeOptions.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
          }
        }
      },
      selectTime(index) {
        // Restore color of previously selected button
        if (this.selectedButtonIndex !== null) {
          const buttons = document.querySelectorAll('.time-button');
          buttons[this.selectedButtonIndex].classList.remove('selected');
        }
        // Change color of currently selected button
        const button = document.querySelectorAll('.time-button')[index];
        button.classList.add('selected');
        // Save index of selected button
        this.selectedButtonIndex = index;
        // Save selected time
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
  
          // Display selected date and time in Korean
          const dateOptions = {
            month: 'long',
            day: '2-digit',
            weekday: 'short',
          };
  
          const timeOptions = {
            hour: '2-digit',
            minute: '2-digit'
          };
  
          this.selectedDateTime = `${dateTime.toLocaleDateString("ko-KR", dateOptions)} ${dateTime.toLocaleTimeString("ko-KR", timeOptions)}`;
  
          this.$emit("datetime-selected", {
            dateTime: dateTime,
            numberOfPeople: this.numberOfPeople
          });
        }
        this.modal = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .time-buttons-container {
    overflow-x: auto; /* 가로 스크롤 가능하도록 설정 */
    white-space: nowrap; /* 버튼들이 한 줄로 나열되도록 설정 */
  }
  
  .time-buttons {
    display: inline-block; /* 인라인 블록으로 설정하여 한 줄에 버튼들을 나열 */
  }
  
  .time-button {
    background-color: yellow; /* Button background color */
    border-radius: 30px; /* Rounded buttons */
    width: 100px; /* Adjusted button width */
    height: 80px; /* Adjusted button height */
    padding: 10px; /* Adjust button padding */
    margin-right: 10px; /* Adjust the gap between time buttons */
  }
  
  .time-button:hover {
    background-color: #FFD700; /* Color change on hover */
  }
  
  .selected {
    background-color: #007bff !important; /* Selected button color: 파란색 */
    color: white; /* Text color on selected button */
  }
  </style> -->
  <template>
  <v-col cols="4" sm="6" md="4">
    <v-dialog
      ref="dialog"
      v-model="modal"
      persistent
      lazy
      full-width
      width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">예약 날짜 및 시간 선택</v-btn>
      </template>
      <v-card>
        <v-date-picker v-model="date" :min="minDate" scrollable locale="ko"></v-date-picker>
        <p>예약 시간을 선택해주세요.</p>
        <div class="time-buttons-container" @touchmove.prevent="handleTouchMove">
          <v-row class="time-buttons" justify="center">
            <v-btn 
              v-for="(time, index) in timeOptions"
              :key="index"
              @click="selectTime(index)"
              :class="[
                'time-button',
                selectedHour === time.split(':')[0] && selectedMinute === time.split(':')[1] ? 'selected' : ''
              ]"
            >
              {{ time }}
            </v-btn>
          </v-row>
        </div>
        <v-text-field v-model="numberOfPeople" label="인원 수" type="number"></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="set" :disabled="numberOfPeople <= 0">예약하기</v-btn>
          <v-btn color="primary" text @click="modal = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="selectedDateTime">
      <p>선택한 날짜 및 시간: {{ selectedDateTime }}</p>
      <p>선택한 인원 수: {{ numberOfPeople }}인</p>
    </div>
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
      numberOfPeople: 1, // default value for number of people
      timeOptions: [], // stores the available time options
      selectedButtonIndex: null, // index of the selected button
    };
  },
  computed: {
    minDate() {
      // Get today's date
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    },
  },
  created() {
    this.generateTimeOptions();
  },
  methods: {
    generateTimeOptions() {
      // Generate time buttons at 30-minute intervals
      for (let hour = 0; hour < 24; hour++) {
        for (let minute of [0, 30]) {
          this.timeOptions.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        }
      }
    },
    selectTime(index) {
      // Restore color of previously selected button
      if (this.selectedButtonIndex !== null) {
        const buttons = document.querySelectorAll('.time-button');
        buttons[this.selectedButtonIndex].classList.remove('selected');
      }
      // Change color of currently selected button
      const button = document.querySelectorAll('.time-button')[index];
      button.classList.add('selected');
      // Save index of selected button
      this.selectedButtonIndex = index;
      // Save selected time
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

        // Display selected date and time in Korean
        const dateOptions = {
          month: 'long',
          day: '2-digit',
          weekday: 'short',
        };

        const timeOptions = {
          hour: '2-digit',
          minute: '2-digit'
        };

        this.selectedDateTime = `${dateTime.toLocaleDateString("ko-KR", dateOptions)} ${dateTime.toLocaleTimeString("ko-KR", timeOptions)}`;

        this.$emit("datetime-selected", {
          dateTime: dateTime,
          numberOfPeople: this.numberOfPeople
        });
      }
      this.modal = false;
    },
    handleTouchMove(event) {
      // Prevent vertical scrolling while swiping horizontally
      if (Math.abs(event.touches[0].clientY - event.touches[0].pageY) > 10) {
        event.preventDefault();
      }
    },
  },
};
</script>

<style scoped>
.time-buttons-container {
  overflow-x: auto; /* 가로 스크롤 가능하도록 설정 */
  overflow-y: hidden; /* 세로 스크롤을 숨깁니다 */
  white-space: nowrap; /* 버튼들이 한 줄로 나열되도록 설정 */
}

.time-buttons {
  display: inline-block; /* 인라인 블록으로 설정하여 한 줄에 버튼들을 나열 */
}

.time-button {
  background-color: yellow; /* Button background color */
  border-radius: 30px; /* Rounded buttons */
  width: 50px; /* Adjusted button width */
  height: 40px !important; /* Adjusted button height */
  padding: 10px; /* Adjust button padding */
  margin-top:25px;
  margin-left: 15px;
    margin-right: -6px; /* Adjust the gap between time buttons */
    margin-bottom: 15px; /* Adjust the gap between time buttons */
    border: 1px solid #c0c0c0; /* Border */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s; 
}

.time-button:hover {
  background-color: #FFD700; /* Color change on hover */
}

.selected {
  background-color: #007bff !important; /* Selected button color: 파란색 */
  color: white; /* Text color on selected button */
}
</style>
  
 