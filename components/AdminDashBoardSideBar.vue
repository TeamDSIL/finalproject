<template>
  <div>
    <div class="border border br-10">
      <h1 class="grey--text text-12 pa-5 text-uppercase font-weight-regular">
        목록
      </h1>
      <div v-for="item in SidebarOne" :key="item.id">
        <nuxt-link :to="item.link" class="dashboard-sidebar-link">
          <div class="px-4 d-flex justify-space-between align-center">
            <div class="d-flex">
              <v-icon size="18" class="me-2">{{ item.icon }}</v-icon>
              <p class="mb-0">{{ item.title }}</p>
            </div>
            <p class="mb-0">{{ item.notify }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SidebarOne: [
        {
          id: 1,
          icon: "mdi-account-search-outline",
          title: "회원 정보 관리",
          link: "/memberManage/AdminManageUserpage",
        },
        {
          id: 2,
          icon: "mdi-silverware",
          title: "식당 정보 관리",
          link: "/memberManage/AdminManageRestaurantPage",
        },
        {
          id: 3,
          icon: "mdi-clipboard-check-outline",
          title: "식당 등록",
          link: "/memberManage/AdminRegisterRestaurantPage",
        },
        {
          id: 4,
          icon: "mdi-message-text-outline",
          title: "리뷰 및 댓글 삭제 관리",
          link: "/memberManage/AdminManageReviewPage",
        },
        // mdi-bookmark-outline
        {
          id: 5,
          icon: "mdi-bulletin-board",
          title: "공지사항 관리",
          link: "/memberManage/AdminManageInFormPage",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.dashboard-box {
  .box-sidebar {
    border-right: none !important;
  }

  .dashboard-sidebar-link {
    color: #2b3445 !important;
    text-decoration: none;
    border-left: 3px solid #fff;
    display: block;
    margin-bottom: 16px;

    &:hover {
      color: #d23f57 !important;
      border-left: 3px solid #d23f57;
    }
  }
}
</style>
