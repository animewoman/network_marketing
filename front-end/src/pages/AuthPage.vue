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
  };

  async authorize() {
    const response = await loginUser(this.user);
    response.status === 200 ? this.toUserPage(this.user.login) : this.stayHere(response as string);
  }

  toUserPage(name: string) {
    this.$router.push({ path: `/user:${name}` });
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
