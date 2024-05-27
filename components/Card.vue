<template>
  <v-card elevation="0" outlined class="br-10 o-hidden">
    <div class="position-relative">
      <v-img width="100%" height="180px" class="btr-10" :src="cardSection.restaurant_img"></v-img>
      <div v-if="cardSection.chip == true">
        <v-chip
          label
          flat
          class="p-absolute top-0 rounded-r-xl rounded-l-0 mt-3"
          color="primary"
          >Flat 15% Off</v-chip
        >
      </div>
      <div v-else></div>
    </div>

    <div class="cardTitle">
      <span
        class="d-inline-block text-truncate me-3 f-600 text-18 card-title"
        >{{ cardSection.restaurant_name }}</span
      >
      <div class="d-flex align-center card-rating">
        <img src="../assets/images/babscore.png" width="16" height="16" />
        <div class="">
          <span class="font-weight-bold text-14"> 4.5</span>
          <span class="grey--text text--darken-1 text-14">/5</span>
        </div>
      </div>
    </div>
   
      <div class="crowdClass">
                              <span v-if="cardSection.restaurant_crowd === 'BUSY'" class="busy1">　혼잡　</span>
                              <span v-else-if="cardSection.restaurant_crowd === 'NORMAL' "class="normal1">　보통　</span>
                              <span v-else-if="cardSection.restaurant_crowd === 'AVAILABLE'" class="available1">　여유　</span>
                          </div>
                         
                           　<v-icon left small color="grey" style="margin-left:15px; margin-right: 5px;">mdi-map-marker</v-icon>{{ cardSection.restaurant_address }}<br>
                          　식당 예약금(1인) : {{ cardSection.restaurant_deposit }}원<br>
       <span class="primary--text f-400 me-1">　{{ formatCategories(cardSection.categoryNames) }}</span>
    
  </v-card>
</template>

<script>
const categoryMappings = {
"KOREAN": "한식",
"CHINESE": "중식",
"JAPANESE": "일식",
"WESTERN": "양식",
"VIETNAMESE": "베트남",
"AMERICAN": "아메리칸",
"INDIAN": "인도",
"OTHERGLOBALFOOD": "기타세계",
"BEEF": "소고기",
"PORK": "돼지고기",
"STEAK": "스테이크",
"TRIPE": "곱창/막창",
"SEAFOOD_STEW": "해물(탕/찜/볶음)",
"SASHIMI": "회/사시미",
"SUSHI": "초밥",
"SHELLFISH": "굴/조개",
"BEER": "맥주/호프",
"TRADITIONAL_ALCOHOL": "전통주",
"IZAKAYA": "이자카야",
"WINE_COCKTAIL": "와인/칵테일",
"SOLO": "혼밥",
"WITH_FRIENDS": "친구",
"GROUP_GATHERING": "단체모임",
"DATE": "데이트",
"FAMILY": "가족",
"COST_EFFECTIVE": "가성비",
"YEOUIDO_MAPO": "여의도-마포",
"YONGSAN_VALLEY": "용산(Y-밸리)",
"YANGJAE": "양재",
"SUSEO": "수서",
"HONGNEUNG": "홍릉",
"MAGOK": "마곡",
"GASAN_DIGITAL_VALLEY": "가산디지털단지",
"GURO_DIGITAL_VALLEY": "구로디지털단지",
};
export default {
props: ["cardSection"],
data: () => ({
 
}),
methods: {
formatCategories(categories) {
    if (!categories) {
      return ''; // categories가 null 또는 undefined이면 빈 문자열 반환
    }
    return categories.map(category => `#${categoryMappings[category] || category}`).join(" ");
  },

}
}
</script>

<style lang="scss">
.card-title {
flex: 1 1 auto;
max-width: 100%;
}
.card-rating {
flex: 0 0 auto;
}
.b-none {
border: none !important;
}
btr-10 {
border-top-left-radius: 10px !important;
border-top-right-radius: 10px !important;
}

.available1 {
  width: 50px;
  border-radius: 50px;
  background-color: #1DDB16;
  text-align: center;
  color: #eee;
  margin-left: 180px;
}

.normal1 {
  width: 80px;
  margin-right: 20px;
  border-radius: 50px;
  background-color: #ffee01;
  text-align: center;
  color: #000000;
  margin-left: 180px;
}

.busy1 {
  width: 200px;
  margin: 100px;
  border-radius: 50px;
  background-color: #db1616;
  text-align: center;
  color: #eee;
  margin-left: 180px;
}
.cardTitle{
display: flex;
padding: 16px;
padding-bottom: 5px;
}
.crowdClass{
padding-bottom: 10px;
}
</style>