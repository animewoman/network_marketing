<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <div v-if="!authPage">
      <div v-if="showHeader">
        <q-header class="bg-grey-4">
          <q-toolbar class="row">
            <q-space />

            <p style="margin: 0"><span class="bold-text" style="color: #1d1d1d">Логин: </span></p>
            <q-btn class="q-mx-md" label="Выйти" color="negative" @click="logout" />
          </q-toolbar>
        </q-header>

        <q-drawer show-if-above :width="230" :breakpoint="500" bordered content-class="bg-grey-3">
          <q-scroll-area class="fit">
            <q-list>
              <template v-for="(item, index) in menuList">
                <q-item :key="index" clickable v-ripple @click="changeRoute(item.routeName)">
                  <q-item-section avatar>
                    <q-icon :name="item.icon"></q-icon>
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>

                <q-separator :key="'sep' + index" v-if="item.separator" />
              </template>
            </q-list>
          </q-scroll-area>
        </q-drawer>
      </div>

      <q-header v-else class="bg-grey-4">
        <q-toolbar class="row">
          <q-space />

          <p><span class="bold-text" style="color: #1d1d1d">Логин: </span></p>
          <q-btn class="q-mx-md" label="Выйти" color="negative" @click="logout" />
        </q-toolbar>
      </q-header>
    </div>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Navigation',
})
export default class Navigation extends Vue {
  menuList = [
    {
      icon: 'portrait',
      label: 'Личный Кабинет',
      routeName: '',
      separator: true,
    },
    {
      icon: 'groups',
      label: 'Мои партнеры',
      routeName: 'auth',
    },
    {
      icon: 'sync_alt',
      label: 'Внутренний перевод',
      routeName: 'transfer',
    },
    {
      icon: 'payments',
      label: 'Вывод средств',
      routeName: 'auth',
    },
    {
      icon: 'equalizer',
      label: 'Отчеты',
      routeName: 'auth',
      separator: true,
    },
  ];

  get showHeader(): boolean {
    return this.$route.name !== 'user-control' && this.$route.name !== 'admin';
  }

  get authPage(): boolean {
    return this.$route.name === 'auth';
  }

  logout() {
    this.$router.replace({ name: 'auth' });
  }

  changeRoute(name: string) {
    this.$router.push({ name });
  }
}
</script>

<style scoped></style>
