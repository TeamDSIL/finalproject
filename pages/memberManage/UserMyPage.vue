<template>
  <div> <!-- 모든 요소를 감싸는 하나의 루트 div -->
    <UserMyForm></UserMyForm>
  </div>
</template>

<script>
import UserMyForm from '@/components/memberManage/UserMyForm.vue';

export default {
  components: {
    UserMyForm,
  },
};
</script>

<style>
/* .btn {
  color: white;
} */
</style>
