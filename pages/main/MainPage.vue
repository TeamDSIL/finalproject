<template>
  <div>
    <MainForm></MainForm>
    <Roulette></Roulette>
  </div>
    
</template>

<script>
import MainForm from '@/components/main/MainForm.vue';
import Roulette from '@/components/main/Roulette.vue';

export default {
  components: {
      MainForm,
      Roulette,
  },
};
</script>

<style></style>
