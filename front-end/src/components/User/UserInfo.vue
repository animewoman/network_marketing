<template>
  <div v-if="user">
    <q-input label="Логин" v-model="user.login" readonly />
    <q-input label="Логин спонсора" v-model="user.parent" readonly />
    <q-input label="Регион" v-model="user.region" readonly />
    <q-input label="Балланс" v-model="user.score" readonly />
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
