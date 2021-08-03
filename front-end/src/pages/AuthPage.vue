<template>
  <div class="col justify-center q-pt-xl">
    <div class="row justify-center">
      <img :src="require('@/assets/logo.png')" style="width: 100px" alt="Brilliant Life" />
    </div>

    <q-card class="m-auto q-pa-lg bg-white" style="max-width: 500px">
      <q-form @reset="clearFields" @submit="authorize">
        <q-toolbar-title class="text-grey">ЛОГИН</q-toolbar-title>
        <q-input label="Логин" v-model="user.login" />

        <q-toolbar-title class="text-grey q-px-none q-pt-lg">ПАРОЛЬ</q-toolbar-title>
        <q-input label="Пароль" v-model="user.password" type="password" />

        <q-btn label="Войти" class="q-my-md" color="negative" type="submit" style="width: 100%" />
        <p class="text-grey text-center">
          Нет аккаунта?
          <span>
            <router-link class="text-red" no-c to="registration" style="text-decoration: none">
              Зарегистрируйся
            </router-link>
          </span>
        </p>
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

    this.$router.push({ name: 'user' });
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
