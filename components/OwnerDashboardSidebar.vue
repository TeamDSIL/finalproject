<template>
    <div>
        <div class="border border br-10">
            <h1 class="grey--text text-12 pa-5 text-uppercase font-weight-regular">목록</h1>
            <div v-for="item in SidebarOne" :key="item.id">
                <nuxt-link :to="item.link" class="dashboard-sidebar-link">
                    <div class=" px-4 d-flex justify-space-between align-center">
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
                    icon: 'mdi-account-search-outline',
                    title: '마이 페이지',
                    link: '/memberManage/OwnerMyPage'

                },
                {
                    id: 2,
                    icon: 'mdi-lock-check-outline',
                    title: '비밀번호 변경',
                    link: '/restaurant/RestaurantListPage'

                },
                {
                    id: 3,
                    icon: 'mdi-store',
                    title: '식당 관리 페이지',
                    link: '/restaurant/RestaurantManagePage'

                },
                
            ],
            
        }
    }
}
</script>

<style lang="scss">
.dashboard-box {
    .box-sidebar {
        border-right: none !important;
    }

    .dashboard-sidebar-link {
        color: #2B3445 !important;
        text-decoration: none;
        border-left: 3px solid #fff;
        display: block;
        margin-bottom: 16px;

        &:hover {
            color: #D23F57 !important;
            border-left: 3px solid #D23F57;
        }
    }

}
</style>