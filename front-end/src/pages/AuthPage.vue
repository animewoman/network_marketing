<template>
  <div class="m-auto q-pt-xl" style="max-width: 600px">
    <q-form>
      <q-toolbar-title> Авторизация</q-toolbar-title>
      <q-input label="Логин" v-model="user.login" />
      <q-input label="Пароль" v-model="user.password" type="password" />

      <q-btn label="Войти" class="q-my-md" color="primary" @click="authorize" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthUser } from '@/types/user';
import { loginUser } from '@/http';

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
    const user = response.data.user;
    response.status === 200 ? this.toUserPage(user) : this.stayHere(response as string);
  }

  toUserPage(user: AuthUser) {
    if (user.isAdmin) {
      this.$router.push({ name: 'admin' });
      return;
    }

    this.$router.push({ path: `/user:${user.login}` });
  }

  stayHere(message: string) {
    this.clearFields();
    this.showNotification(message, 'negative');
  }

  clearFields() {
    this.user.login = '';
    this.user.password = '';
  }

  showNotification(message: string, color: string) {
    this.$q.notify({
      message,
      color,
    });
  }
}
</script>
