<template>
  <v-app>
    <div class="hero-section">
      <Header :class="toggleNavClass()" />
      <div id="navbar-hero">
        <v-container>
          <div class="d-flex align-center mt-6 mb-10 navbar-container">
            <nuxt-link to="/">
              <!-- <v-avatar tile>
                <img src="~/assets/images/DSIL!3.png" alt="" />
              </v-avatar> -->
              <div class="write-review-logo" style="margin-bottom: 20px">
                <v-img
                  :src="require('~/assets/images/DSILnewLOGO.png')"
                  class="review-logo"
                  width="150px"
                ></v-img>
              </div>
            </nuxt-link>
            <v-spacer></v-spacer>
            <!-- 햄버거 버튼 요기부터 -->
            <v-app-bar-nav-icon
              class="rounded"
              tile
              color="primary"
              @click="drawer = true"
            ></v-app-bar-nav-icon>
            <v-navigation-drawer width="320" v-model="drawer" fixed temporary>
              <NavbarList>
                <template v-slot:userDrawerCloseButton>
                  <v-btn icon color @click.stop="drawer = !drawer">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
              </NavbarList>
            </v-navigation-drawer>
          </div>
        </v-container>
      </div>
    </div>
    <Nuxt class="content" />
    <GoToBtn />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    toggleNavClass() {
      return this.drawer ? "sticky-nav" : "nav";
    },
  },
  mounted() {
    window.document.onscroll = () => {
      if (window.scrollY > 400) {
        this.active = true;
      } else {
        this.active = false;
      }
    };
  },
};
</script>
<style lang="scss">
.hero-section {
  background-image: url("@/assets/images/dsil-header-bg.png");
  background-size: cover;
  .nav {
    display: none;
  }
}
.button-grid .v-btn {
  margin: 4px;
}
</style>
