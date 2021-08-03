<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <div v-if="isAdminPage">
      <q-header class="row row bg-grey-10">
        <q-space />
        <q-btn label="Выйти" class="q-ma-xs" size="sm" color="negative" @click="logout" />
      </q-header>
    </div>

    <div v-if="showMobileVersion && showNavigation">
      <q-header class="row row bg-grey-10">
        <q-space />
        <q-btn label="Выйти" class="q-ma-xs" size="sm" color="negative" @click="logout" />
      </q-header>

      <q-footer class="row bg-grey-10" style="position: fixed">
        <q-toolbar>
          <template v-for="(item, index) in menuList">
            <q-item v-if="item.routeName === 'partners'" class="q-pa-none" :active="item.isActive" :key="index">
              <q-expansion-item v-model="showMobileExpansion" class="q-ma-none" expand-separator :icon="item.icon">
                <PartnerStages @stage-selected="showMobileExpansion = false" />
              </q-expansion-item>
            </q-item>

            <q-item
              v-else
              class="mobile-menu-items"
              clickable
              v-ripple
              :active="item.isActive"
              :key="index"
              @click="changeRoute(item.routeName)"
            >
              <q-item-section class="q-pl-md" avatar>
                <q-icon style="padding: 0" :name="item.icon"></q-icon>
              </q-item-section>
            </q-item>
          </template>
        </q-toolbar>
      </q-footer>
    </div>

    <div v-if="showNavigation">
      <q-header class="bg-grey-10">
        <q-toolbar class="row">
          <q-btn v-if="!showMobileVersion" flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer
        v-if="!showMobileVersion && showNavigation"
        v-model="drawer"
        show-if-above
        bordered
        content-class="bg-grey-10"
        class="border-top"
        :width="230"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <div class="row justify-center">
            <img :src="require('@/assets/logo.png')" style="width: 100px" alt="Brilliant Life" />
          </div>
          <q-list dark bordered>
            <template v-for="(item, index) in menuList">
              <q-item v-if="item.routeName === 'partners'" class="q-pa-none" :active="item.isActive" :key="index">
                <q-expansion-item class="q-ma-none" expand-separator :icon="item.icon" :label="item.label">
                  <PartnerStages />
                </q-expansion-item>
              </q-item>

              <q-item
                v-else
                :active="item.isActive"
                :key="index"
                clickable
                v-ripple
                @click="changeRoute(item.routeName)"
              >
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>

                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </template>

            <q-separator color="white" />

            <q-item clickable v-ripple @click="showEditUser = true">
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>

              <q-item-section> Редактировать профиль </q-item-section>
            </q-item>

            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>

              <q-item-section> Выйти </q-item-section>
            </q-item>

            <q-dialog v-if="user" v-model="showEditUser">
              <UserEdit :user="user" />
            </q-dialog>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </div>

    <q-page-container :class="backgroundAuthImage">
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PartnerStages from '@/components/Header/PartnerStages.vue';
import { getUser } from '@/service/Users';
import { User } from '@/types/user';
import { logoutUser } from '@/http';
import { RouteNames } from '@/router/routes';
import UserEdit from '@/components/User/UserEdit.vue';

@Component({
  name: 'Navigation',
  components: { UserEdit, PartnerStages },
})
export default class Navigation extends Vue {
  drawer = true;
  showEditUser = false;

  showMobileExpansion = false;

  user: User | null = null;

  menuList = [
    {
      icon: 'portrait',
      label: 'Личный Кабинет',
      routeName: 'user',
      isActive: false,
    },
    {
      icon: 'groups',
      label: 'Мои партнеры',
      routeName: 'partners',
      isActive: false,
    },
    {
      icon: 'sync_alt',
      label: 'Внутренний перевод',
      routeName: 'transfer',
      isActive: false,
    },
    {
      icon: 'equalizer',
      label: 'Отчеты',
      routeName: 'reports',
      isActive: false,
    },
  ];

  get login(): string | null {
    const login = localStorage.getItem('login');

    return login ?? null;
  }

  get showNavigation(): boolean {
    return (
      this.routeName !== RouteNames.USER_CONTROL &&
      this.routeName !== RouteNames.ADMIN &&
      this.routeName !== RouteNames.AUTH &&
      this.routeName !== RouteNames.SHOWCASE
    );
  }

  get routeName(): string {
    return this.$route.name!;
  }

  get isAdminPage() {
    return this.routeName === RouteNames.ADMIN;
  }

  get showMobileVersion(): boolean {
    return screen.width < 500;
  }

  get titleColor() {
    if (this.routeName === RouteNames.SHOWCASE) {
      return 'primary';
    }

    return 'white';
  }

  get backgroundAuthImage() {
    return this.routeName === RouteNames.AUTH ? 'auth-background' : '';
  }

  @Watch('$route.name', { immediate: true })
  setLogin(routeName: string) {
    if (routeName === RouteNames.SHOWCASE || routeName === RouteNames.PARTNERS) {
      this.menuList.forEach((item) => {
        item.isActive = false;
      });

      return;
    }

    const currentRoute = this.menuList.find((item) => item.routeName === routeName);
    if (currentRoute) {
      currentRoute.isActive = true;
    }
  }

  async created() {
    const login = this.login;
    if (login) {
      this.user = await getUser(login);
    }

    this.setActiveRoute();
  }

  setActiveRoute() {
    if (
      this.routeName === RouteNames.AUTH ||
      this.routeName === RouteNames.SHOWCASE ||
      this.routeName === RouteNames.PARTNERS
    ) {
      return;
    }

    this.menuList.forEach((item) => {
      if (item.routeName === this.routeName) {
        item.isActive = true;
        return;
      }

      item.isActive = false;
    });
  }

  async logout() {
    localStorage.removeItem('login');

    const activeRoute = this.menuList.find((item) => item.isActive);
    if (activeRoute) {
      activeRoute.isActive = false;
    }

    await logoutUser();

    await this.$router.replace({ name: 'auth' });
  }

  changeRoute(name: string) {
    const oldActive = this.menuList.find((item) => item.isActive);
    const newActive = this.menuList.find((item) => item.routeName === name);

    if (!oldActive || !newActive) {
      return this.$router.replace({ name: name });
    }

    oldActive.isActive = false;
    newActive.isActive = true;

    this.$router.replace({ name: name });
  }
}
</script>

<style scoped>
.border-top {
  border-top: #eeeeee 3px;
}

.mobile-menu-items {
  margin: 0 auto;
  padding: 5px;
}

.auth-background {
  background-color: #000;
}
</style>
