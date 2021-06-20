<template>
  <div class="background">
    <q-card
      class="m-auto q-pa-lg"
      style="max-width: 500px; margin-top: 100px; background-color: rgba(238, 238, 238, 0.68)"
    >
      <q-form @reset="clearFields" @submit="authorize">
        <q-toolbar-title class="q-py-md"> Авторизация</q-toolbar-title>

        <q-input label="Логин" v-model="user.login" />
        <q-input label="Пароль" v-model="user.password" type="password" />

        <q-btn label="Войти" class="q-my-md" color="primary" type="submit" />
      </q-form>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthUser } from '@/types/user';
import { loginUser } from '@/http';
import { showNotification } from '@/service/Notifications';

@Component({
  name: 'AuthPage',
})
export default class AuthPage extends Vue {
  user: AuthUser = {
    login: '',
    password: '',
    isAdmin: false,
  };

  async authorize() {
    const response = await loginUser(this.user);

    if (response.status && response.status === 200) {
      this.toUserPage(response.data.data);
      return;
    }

    this.stayHere(response as string);
  }

  toUserPage(user: AuthUser) {
    localStorage.setItem('login', `${user.login}`);

    if (user.isAdmin) {
      this.$router.push({ name: 'admin' });
      return;
    }

    this.$router.push({ name: 'showcase' });
  }

  //TODO: заменить уведомление на обычный текст у инпута?
  stayHere(message: string) {
    this.clearFields();
    showNotification(message, 'negative');
  }

  clearFields() {
    this.user.login = '';
    this.user.password = '';
  }
}
</script>

<style scoped></style>
