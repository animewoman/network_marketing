<template>
  <div class="m-auto q-pt-xl" style="width: 600px">
    <q-btn
      label="На таблицу пользователей"
      icon="arrow_back_ios"
      class="back-btn q-my-lg"
      flat
      no-caps
      @click="toAdminPage"
    />

    <q-space />

    <q-toolbar-title style="text-align: center">Пользователь {{ user.login }}</q-toolbar-title>
    <q-form greedy>
      <q-input label="ФИО пользователя" v-model="user.login" readonly />
      <q-input label="Регион" v-model="user.region" readonly />
      <q-input label="Телфеон" v-model="user.phone" readonly />
      <q-input label="Почта" v-model="user.email" readonly />
      <q-input label="Спонсор" v-model="user.parent" readonly />
      <q-input label="Баллы" v-model="user.score" />

      <q-btn
        label="Сохранить изменения"
        class="q-my-lg q-pa-sm"
        color="primary"
        icon="save"
        dense
        no-caps
        @click="updateUser"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';
import { getUser, updateUser } from '@/service/Users';

@Component({
  name: 'UserControl',
})
export default class UserControl extends Vue {
  user: User = {
    login: '',
    phone: '',
    email: '',
    score: 0,
    region: '',
    //не используются здесь
    _id: '',
    password: '',
    parent: '',
  };

  created() {
    this.fetchUser();
  }

  async fetchUser() {
    try {
      const id = String(this.$route.query);

      if (id) {
        this.user = await getUser(id);
      }
    } catch (e) {
      throw new Error();
    }
  }

  async updateUser() {
    try {
      const response = await updateUser(this.user);
      console.log(response);

      this.toAdminPage();
    } catch (e) {
      throw new Error(e);
    }
  }

  toAdminPage() {
    this.$router.push({ name: 'admin' });
  }
}
</script>

<style scoped>
.back-btn {
  background-color: rgba(177, 176, 186, 0.37);
}
</style>
