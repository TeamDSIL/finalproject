<!-- <template>
  <div>
    <h1>DSIL 식당 예약</h1>
    <div id="chatbot"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = "https://example.com/clova-chatbot-widget.js"; // 실제 클로바 챗봇 위젯 URL로 변경
    script.onload = () => {
      ClovaChatbot.init({
        botName: 'DSILReservationBot',
        placeholder: '메시지를 입력하세요...',
        apiEndpoint: 'http://localhost:8000/api/chatbot/checkReservation'
      });
    };
    document.head.appendChild(script);
  }
};
</script>
import axios from 'axios';

export default {
  methods: {
    async checkReservation(date, time, people) {
      try {
        const response = await axios.post('http://localhost:8000/api/chatbot/checkReservation', {
          date,
          time,
          people
        });
        console.log(response.data);
      } catch (error) {
        console.error("There was an error checking the reservation!", error);
      }
    }
  }
}; -->
