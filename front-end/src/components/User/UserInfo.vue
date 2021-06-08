<template>
  <div v-if="user" style="width: 800px" class="q-px-xl">
    <div class="row card-title q-py-lg">
      <div class="col-sm-4">
        <p class="subtitle">Добро пожаловать:</p>
        <q-toolbar-title style="padding: 0">{{ user.fullName }}</q-toolbar-title>
      </div>

      <div class="row col-sm-4 login-text q-pt-md">
        <p class="subtitle small-text">Ваш логин:</p>
        <q-toolbar-title>{{ user.login }}</q-toolbar-title>
      </div>

      <q-btn
        label="Редактировать профиль"
        icon="edit"
        size="sm"
        color="grey"
        class="q-mt-md"
        align="right"
        style="height: 30px"
      />
    </div>

    <div class="q-pt-sm" style="width: 500px; margin: 0 auto">
      <q-input label="Логин спонсора" :value="parentName" readonly />
      <q-input label="Регион" :value="user.region" readonly />
      <q-input label="Телефон" :value="user.phone" mask="(###)##-##-##" unmasked-value readonly />
      <q-input label="Электронная почта" :value="userMail" readonly />
      <q-input label="Баланс" :value="user.score" readonly />
    </div>
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

  get userMail() {
    return this.user?.email || 'Не указана';
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

<style scoped>
.subtitle {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}

.subtitle.small-text {
  margin-top: 15px;
  font-size: 11px;
}

.login-text {
  justify-content: center;
}

.card-title {
  font-size: 20px;
}
</style>
