<!-- pages/chat.vue -->
<template>
    <v-container>
      <!-- Chatbot 컴포넌트를 추가합니다. -->
      <Chatbot />
    </v-container>
  </template>
  
  <script>
  import Chatbot from '~/components/Chatbot.vue'; // Chatbot 컴포넌트를 가져옵니다.
  
  export default {
    components: {
      Chatbot // Chatbot 컴포넌트를 등록합니다.
    }
  };
  </script>
  