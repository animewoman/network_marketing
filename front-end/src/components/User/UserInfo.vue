<template>
  <div v-if="user" style="width: 500px" class="q-px-xl">
    <q-toolbar-title>{{ user.fullName }}</q-toolbar-title>

    <q-input label="Логин" v-model="user.login" readonly />
    <q-input label="Логин спонсора" v-model="parentName" readonly />
    <q-input label="Регион" v-model="user.region" readonly />
    <q-input label="Телефон" v-model="user.phone" mask="(###)##-##-##" unmasked-value readonly />
    <q-input label="Баланс" v-model="user.score" readonly />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';
import { getUser } from '@/service/Users';

@Component({
  name: 'UserInfo',
})
export default class UserInfo extends Vue {
  user: User | null = null;

  get parentName() {
    return this.user?.parent || 'Нет спонсора';
  }

  created() {
    this.fetchUser();
  }

  async fetchUser() {
    const login = localStorage.getItem('user');

    if (login) {
      this.user = await getUser(login);

      return;
    }

    console.log('invalid route');
  }
}
</script>

<style scoped></style>
