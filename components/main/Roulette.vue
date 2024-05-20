<template>
  <div class="roulette-container">
    <div class="menu-selection">
      <v-btn
        v-for="menu in menus"
        :key="menu.name"
        :color="menu.selected ? 'primary' : 'white'"
        @click="toggleMenu(menu)"
        >{{ menu.name }}</v-btn
      >
    </div>
    <div class="selected-menus" v-if="selectedMenus.length">
      <p>선택된 메뉴:</p>
      <ul>
        <li v-for="menu in selectedMenus" :key="menu.name">{{ menu.name }}</li>
      </ul>
    </div>
    <v-btn @click="finalizeSelection">선택완료</v-btn>
    <v-btn @click="startRoulette" v-if="selectedMenus.length"
      >메뉴 고르기 시작!</v-btn
    >
    <div v-if="finalMenu" class="final-menu">최종 메뉴: {{ finalMenu }}</div>

    <v-btn @click="closeModal">닫기</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        { name: "기영이네", selected: false },

        // ... 나머지 메뉴 항목 추가
      ],
      selectedMenus: [],
      finalMenu: "",
      isSpinning: false,
      showFinalResult: false,
    };
  },
  methods: {
    toggleMenu(menu) {
      menu.selected = !menu.selected;
    },
    finalizeSelection() {
      this.selectedMenus = this.menus.filter((menu) => menu.selected);
    },
    startRoulette() {
      if (!this.selectedMenus.length) {
        alert("메뉴를 선택해주세요.");
        return;
      }

      this.isSpinning = true; // 애니메이션 시작 전에 상태를 true로 설정합니다.
      this.showFinalResult = false; // 초기화
      let currentSpinCount = 0;
      const spinCount = 10; // 총 회전 수
      const spinDuration = 100; // 회전 지속 시간(ms)

      const intervalId = setInterval(() => {
        this.finalMenu =
          this.selectedMenus[currentSpinCount % this.selectedMenus.length].name;
        currentSpinCount++;

        if (currentSpinCount >= spinCount) {
          clearInterval(intervalId);
          this.isSpinning = false; // 애니메이션 종료 후에 상태를 false로 설정합니다.
          // 최종 메뉴 선정 로직은 애니메이션 완료 후에 수행합니다.
          this.finalizeRoulette();
        }
      }, spinDuration);
    },
    finalizeRoulette() {
      const randomIndex = Math.floor(Math.random() * this.selectedMenus.length);
      this.finalMenu = this.selectedMenus[randomIndex].name; // 최종 메뉴 선정
      // 3초 후에 최종 결과를 보여줍니다.
      setTimeout(() => {
        this.showFinalResult = true;
      }, 8000);
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.roulette-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.menu-selection .v-btn {
  margin: 0.5rem;
  border-color: #e0e0e0;
  color: red;
}

.menu-selection .v-btn.black--text {
  color: #000;
}

.selected-menus {
  margin-top: 1rem;
}

.selected-menus ul {
  list-style: none;
  padding: 0;
}

.selected-menus li {
  display: inline-block;
  margin: 0.5rem;
}

.final-menu {
  margin-top: 1rem;
  font-weight: bold;
  color: #d32f2f;
}

/* 활성화된 메뉴의 스타일 */
.menu-active {
  color: #000;
  background-color: #fff;
  border: 1px solid black;
}

/* 선택 완료 버튼 스타일 */
.selection-done {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

/* 랜덤 선택 버튼 스타일 */
.start-roulette {
  margin-bottom: 1rem;
}

/* 선택한 메뉴 리스트 스타일 */
.selected-menus {
  margin-top: 1rem;
}

/* 최종 메뉴 스타일 */
.final-menu {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: #d32f2f;
  animation: fadeIn 2s;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinning {
  animation: spin 2s linear infinite;
}

/* 선택된 메뉴가 나타날 때 애니메이션 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
