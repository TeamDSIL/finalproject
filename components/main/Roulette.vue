<template>
  <div class="roulette-container">
    <div class="input-group">
      <input
        type="text"
        v-model="newMenu"
        placeholder="새 메뉴 입력"
        @keyup.enter="addMenu"
        style="border: 1px solid #ccc; padding: 8px; border-radius: 4px; width: 200px;"
      />
      <v-btn @click="addMenu" style="background-color: rgb(255,207,2);">메뉴 추가</v-btn>
      <v-btn @click="selectAll">전체 선택/해제</v-btn>
    </div>

    <div class="menu-selection">
      <div class="menu-row" v-for="(chunk, index) in chunkedMenus" :key="index">
        <v-btn
          style="box-shadow: 0,0,0,0;"
          v-for="menu in chunk"
          :key="menu.name"
          :class="{
            'menu-selected': menu.selected,
            'menu-unselected': !menu.selected,
          }"
          @click="toggleMenu(menu)"
        >
          {{ menu.name }}
        </v-btn>
      </div>
    </div>
    <v-btn @click="startRoulette" v-if="menus.some((menu) => menu.selected)" style="background-color: rgb(255,207,2); margin-top: 10px;">
      메뉴 고르기 시작!
    </v-btn>
    <div v-if="alertVisible" class="alert-message">메뉴를 선택해주세요.</div>
    <div v-if="finalMenu" :class="['final-menu', { 'animate-fade-in': showCelebration }]">
      최종 메뉴: {{ finalMenu }}
    </div>
    <!-- 축하 이미지 요소 -->
    <div>
      <img v-if="showCelebration" src="~/assets/images/clikCategory/celebration.gif" alt="축하" class="celebration-image" />
    </div>
    <v-btn @click="closeModal" style="margin-top: 10px;">닫기</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMenu: "",
      menus: [
        { name: "짜장면", selected: false },
        { name: "김치찌개", selected: false },
        { name: "불고기", selected: false },
        { name: "비빔밥", selected: false },
        { name: "계란말이", selected: false },
        { name: "제육볶음", selected: false },
        { name: "국밥", selected: false },
        { name: "칼국수", selected: false },
        { name: "햄버거", selected: false },
        { name: "텐동", selected: false },
        { name: "우동", selected: false },
        { name: "떡볶이", selected: false },
        { name: "스테이크", selected: false },
        { name: "치킨", selected: false },
        { name: "닭볶음탕", selected: false },
        { name: "초밥", selected: false },
        { name: "샐러드", selected: false },
        { name: "라자냐", selected: false },
        { name: "삼겹살", selected: false },
        { name: "전", selected: false },
        { name: "냉면", selected: false },
        { name: "쌀국수", selected: false },
        { name: "라멘", selected: false },
      ],
      finalMenu: "",
      isSpinning: false,
      alertVisible: false,
      showCelebration: false, // 축하 이미지 표시 여부
    };
  },
  computed: {
    chunkedMenus() {
      const chunkSize = 5;
      const result = [];
      for (let i = 0; i < this.menus.length; i += chunkSize) {
        result.push(this.menus.slice(i, i + chunkSize));
      }
      return result;
    },
  },
  methods: {
    toggleMenu(menu) {
      menu.selected = !menu.selected;
    },
    addMenu() {
      if (this.newMenu.trim() !== "") {
        this.menus.push({ name: this.newMenu, selected: false });
        this.newMenu = "";
      }
    },
    selectAll() {
      const areAllSelected = this.menus.every((menu) => menu.selected);
      this.menus.forEach((menu) => (menu.selected = !areAllSelected));
    },
    startRoulette() {
      const selectedMenus = this.menus.filter((menu) => menu.selected);

      if (!selectedMenus.length) {
        this.showAlert();
        return;
      }

      this.isSpinning = true;
      let currentSpinCount = 0;
      const spinCount = 10;
      const spinDuration = 100;

      const intervalId = setInterval(() => {
        this.finalMenu =
          selectedMenus[currentSpinCount % selectedMenus.length].name;
        currentSpinCount++;

        if (currentSpinCount >= spinCount) {
          clearInterval(intervalId);
          this.isSpinning = false;
          this.finalizeRoulette(selectedMenus);
        }
      }, spinDuration);
    },
    finalizeRoulette(selectedMenus) {
      const randomIndex = Math.floor(Math.random() * selectedMenus.length);
      this.finalMenu = selectedMenus[randomIndex].name;
      this.showCelebrationImage();
    },
    showAlert() {
      this.alertVisible = true;
      setTimeout(() => {
        this.alertVisible = false;
      }, 5000);
    },
    closeModal() {
      this.$emit("close");
    },
    showCelebrationImage() {
      this.showCelebration = true;
      setTimeout(() => {
        this.showCelebration = false;
      }, 3000); // 3초 후에 축하 이미지 숨기기
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.menu-selected {
  color: white !important;
  background-color: rgb(210, 63, 87) !important;
  border-color: rgb(210, 63, 87) !important;
}

.menu-unselected {
  color: gray !important;
  background-color: white !important;
  border-color: gray !important;
}

.roulette-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  text-align: center;
}

.input-group {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

input {
  flex: 2;
  height: 40px;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

.v-btn {
  height: 40px; /* 입력창과 버튼의 높이를 동일하게 설정 */
}

.input-group .v-btn {
  margin-right: 0.5rem; /* 버튼 사이에 공간 추가 */
}

.input-group .v-btn:last-child {
  margin-right: 0; /* 마지막 버튼의 오른쪽 마진 제거 */
}

.menu-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-row {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.5rem;
}

.menu-row .v-btn {
  flex: 1;
  margin: 0.2rem;
  border: 1px solid #e0e0e0;
  max-width: calc(20% - 0.4rem); /* 5개의 버튼이 한 줄에 들어가도록 설정 */
}

.final-menu {
  margin-top: 1rem;
  font-weight: bold;
  color: #d32f2f;
  animation: fade-in 1s ease-in-out;
}

.alert-message {
  margin-top: 1rem;
  color: rgb(210, 63, 87);
  font-weight: bold;
}

/* 축하 이미지 스타일 */
.celebration-image {
  margin-top: 1rem;
  width: 100px; /* 원하는 크기로 조정하세요 */
  height: auto;
}
</style>
