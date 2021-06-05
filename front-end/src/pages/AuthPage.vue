<template>
  <div class="m-auto q-pt-xl" style="max-width: 600px">
    <q-from>
      <q-toolbar-title> Авторизация</q-toolbar-title>
      <q-input label="Логин" v-model="user.login" />
      <q-input label="Пароль" v-model="user.password" type="password" />

      <q-btn label="Войти" class="q-my-md" color="primary" @click="authrorize" />
    </q-from>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthUser } from '@/types/user';
import { loginUser } from '@/service/Users';

@Component({
  name: 'AuthPage',
})
export default class AuthPage extends Vue {
  user: AuthUser = {
    login: '',
    password: '',
  };

  async authrorize() {
    const response = await loginUser(this.user);
    response === 200 ? this.toAdminPage() : this.stayHere();
  }

  toAdminPage() {
    this.$router.push({ name: 'admin' });
  }

  stayHere() {
    this.clearFields();
    this.showNotification('Логин или пароль введены неверно!', 'negative');
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