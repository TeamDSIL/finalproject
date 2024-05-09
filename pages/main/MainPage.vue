<template>
  <div>
    <MainForm></MainForm>
    <Roulette></Roulette>
  </div>
</template>
<!-- 이미지 -->
<!-- 이미지를 전체 페이지에 랜덤 위치에 고정 -->
<!-- <v-img
      src="@/assets/images/yahoImage.png"
      :style="yahoStyle"
      contain
      height="100px"
      @click="navigateTo('main-InformationPage')"
      class="random-image"
    ></v-img> -->

<script>
import MainForm from "@/components/main/MainForm.vue";
import Roulette from "@/components/main/Roulette.vue";

export default {
  components: {
    MainForm,
    Roulette,
  },
};
</script>

<style></style>
