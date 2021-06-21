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
            <q-item
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
          <q-btn
            label="Brilliant Life"
            icon="trending_up"
            :color="titleColor"
            flat
            no-caps
            @click="changeRoute('showcase')"
          />
          <q-space />

          <q-btn-dropdown class="glossy" color="secondary" size="sm" :label="login">
            <div class="no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar>
                  <q-icon name="person" color="secondary" size="lg" />
                </q-avatar>

                <div class="text-subtitle1 q-py-md">Асанов Бекназар</div>
                <div class="text-subtitle3 q-pb-sm">Серебрянный директор</div>

                <q-btn label="Выйти" color="negative" push size="sm" v-close-popup @click="logout" />
              </div>
            </div>
          </q-btn-dropdown>
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
          <q-list dark bordered>
            <template v-for="(item, index) in menuList">
              <q-item :active="item.isActive" :key="index" clickable v-ripple @click="changeRoute(item.routeName)">
                <q-item-section avatar>
                  <q-icon :name="item.icon"></q-icon>
                </q-item-section>

                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item>
            </template>
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
import { logoutUser } from '@/http';
import { RouteNames } from '@/router/routes';

@Component({
  name: 'Navigation',
})
export default class Navigation extends Vue {
  drawer = true;

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
  //TODO: Для отображения инфы в менюшке выхода нужны фио и статус юзера
  // login: string | null = '';

  get login(): string {
    const login = localStorage.getItem('login');

    return login ?? '';
  }

  get showNavigation(): boolean {
    return (
      this.routeName !== RouteNames.USER_CONTROL &&
      this.routeName !== RouteNames.ADMIN &&
      this.routeName !== RouteNames.AUTH
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
    if (this.routeName === RouteNames.SHOWCASE) {
      return 'showcase-background';
    }

    return this.routeName === RouteNames.AUTH ? 'auth-background' : '';
  }

  @Watch('routeName', { immediate: true })
  setLogin(routeName: string) {
    if (routeName === RouteNames.SHOWCASE) {
      this.menuList.forEach((item) => {
        item.isActive = false;
      });
    }

    const currentRoute = this.menuList.find((item) => item.routeName === routeName);
    if (currentRoute) {
      currentRoute.isActive = true;
    }
  }

  created() {
    this.setActiveRoute();
  }

  setActiveRoute() {
    if (this.routeName === RouteNames.AUTH || this.routeName === RouteNames.SHOWCASE) {
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
  background-image: url('https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
}

.showcase-background {
  background-image: url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  opacity: 0.9;
}
</style>
