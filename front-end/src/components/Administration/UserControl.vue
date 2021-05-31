<template>
  <div class="m-auto q-pt-xl" style="width: 600px">
    <q-toolbar-title style="text-align: center">Пользователь {{ user.login }}</q-toolbar-title>
    <q-form greedy>
      <q-input label="ФИО пользователя" v-model="user.login" />
      <q-input label="Почта" v-model="user.email" />
      <q-input label="Телфеон" v-model="user.phone" />
      <q-input label="Спонсор" v-model="user.parent" />
      <q-input label="Баллы" v-model="user.money" />
    </q-form>

    <q-btn label="На таблицу пользователей" color="primary" no-caps class="q-my-lg" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';

@Component({
  name: 'UserControl',
})
export default class UserControl extends Vue {
  user: User = {
    login: '',
    phone: '',
    email: '',
    money: 0,
  };
}
</script>

<style scoped></style>
