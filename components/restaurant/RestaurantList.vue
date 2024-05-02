<template>
  <div>
      <v-container>
        <v-breadcrumbs class="ps-0" :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
        <!-- <div class="d-flex justify-space-between flex-wrap flex-sm-nowrap mb-3">
          <v-tabs class="mb-3">
            <v-tab class="text-capitalize">Delivery</v-tab>
            <v-tab class="text-capitalize">Dining Out</v-tab>
            <v-tab class="text-capitalize">Nightlife</v-tab>
          </v-tabs>
          <v-btn color="primary" class="mb-3">Filter</v-btn>
        </div> -->
        

        <v-row>
            <v-col cols="12" xl="12">
                <Box>
                    <div slot="boxSidebar">
                        <div class="">
                            <div class="mb-6">
                                <h6 class="">Categories</h6>
                                <v-checkbox
                                    v-for="(clusterarea, index) in clusterareas"
                                    :key="index"
                                    class="mt-2"
                                    :label="clusterarea"
                                    color="secondary"
                                    hide-details=""
                                ></v-checkbox>
                            </div>
                            <div class="mb-6">
                                <h6 class="">Categories</h6>
                                <v-checkbox
                                    v-for="(foodType, index) in foodTypes"
                                    :key="index"
                                    class="mt-2"
                                    :label="foodType"
                                    color="secondary"
                                    hide-details=""
                                ></v-checkbox>
                            </div>
                            <div class="mb-6">
                                <h6 class="mt-6">Sort By</h6>
                                <v-radio-group v-model="radioGroup">
                                    <v-radio
                                    v-for="(sortType, n) in sortTypes"
                                        :key="n"
                                        :label="sortType"
                                        color="secondary"
                                    ></v-radio>
                                </v-radio-group>
                            </div>
                            <div class="mb-6">
                                <h6 class="mt-6 mb-12">Cost per person</h6>
                                <v-range-slider
                                    v-model="value"
                                    step="10"
                                    thumb-label="always"
                                ></v-range-slider>
                            </div>
                        </div>
<div><v-btn color="primary" class="mb-3">적용</v-btn></div>
                    </div>
                    <div slot="boxContent">
                        <div class="px-8">
                            <v-row>
                                <v-col cols="12">
                                    <h5 class="text-18 test-color">16 개의 매장이 검색됨</h5>
                                </v-col>
                                <v-col 
                                    cols="12" xl="4" lg="4" md="4" sm="6"
                                    v-for="(item, index) in CardList.slice(0, 16)"
                                    :key="index"
                                >
                                    <Card :cardSection="item" />
                                </v-col>
                                
                            </v-row>
                        </div>
                    </div>
                </Box>
            </v-col>
        </v-row>
      </v-container>
      <Location />
      <Footer />
    
  </div>
</template>
<script>
  import { CardSection } from '@/assets/database/data.js';
  export default {
    head: {
        title: 'Resturant Column'
    },
    data: () => ({
      foodTypes: ['한식', '중식', '일식', '양식'],
      clusterareas: ['여의도-마포','용산(Y밸리)','양재','수서','홍릉','마곡','가산디지털단지(G밸리1)','구로디지털단지(G밸리2)'],
      sortTypes:['가격낮은순','가까운순','리뷰 높은순','추천 많은순'],
      CardList:CardSection,
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'New York',
          disabled: false,
          href: '/',
        },
        {
          text: 'Resturants',
          disabled: true,
          href: '/',
        },
      ],
      checkbox: true,
      radioGroup: 1,
       value: [20, 40],
    }),
  }
</script>
