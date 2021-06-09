<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <div v-if="!isAuthPage">
      <div>
        <q-header class="bg-grey-10">
          <q-toolbar class="row">
            <q-space />

            <p style="margin: 0">
              <span class="bold-text">Логин: {{ login }}</span>
            </p>
            <q-btn class="q-mx-md" label="Выйти" color="negative" @click="logout" />
          </q-toolbar>
        </q-header>

        <q-drawer
          v-if="showNavigation"
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
                <q-separator color="white" :key="'sep' + index - 1" v-if="item.separator" />

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
    </div>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { logoutUser } from '@/http';

@Component({
  name: 'Navigation',
})
export default class Navigation extends Vue {
  menuList = [
    {
      icon: 'portrait',
      label: 'Личный Кабинет',
      routeName: 'user',
      separator: true,
      isActive: true,
    },
    {
      icon: 'groups',
      label: 'Мои партнеры',
      routeName: 'test',
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

  login: string | null = '';

  get showNavigation(): boolean {
    return this.$route.name !== 'user-control' && this.$route.name !== 'admin';
  }

  get isAuthPage(): boolean {
    return this.$route.name === 'auth';
  }

  get routeName(): string {
    return this.$route.name!;
  }

  @Watch('routeName', { immediate: true })
  setLogin() {
    this.login = localStorage.getItem('login');
  }

  created() {
    this.setActiveRoute();
  }

  async logout() {
    localStorage.removeItem('login');

    const activeRoute = this.menuList.find((item) => item.isActive);
    activeRoute!.isActive = false;
    this.menuList[0].isActive = true;

    await logoutUser();

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    await this.$router.replace({ name: 'auth' });
  }

  changeRoute(name: string) {
    const oldActive = this.menuList.find((item) => item.isActive);
    const newActive = this.menuList.find((item) => item.routeName === name);

    if (!oldActive || !newActive) {
      return;
    }

    oldActive.isActive = false;
    newActive.isActive = true;

    this.$router.push({ name });
  }

  setActiveRoute() {
    if (this.$route.name === 'auth') {
      return;
    }

    this.menuList.forEach((item) => {
      if (item.routeName === this.$route.name) {
        item.isActive = true;
        return;
      }

      item.isActive = false;
    });
  }
}
</script>

<style scoped>
.border-top {
  border-top: #eeeeee 3px;
}
</style>
