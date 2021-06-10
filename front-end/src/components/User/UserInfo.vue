<template>
  <div v-if="user" style="max-width: 800px" class="q-px-xl">
    <q-card class="row card-title q-my-md q-px-lg q-py-sm">
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
        style="max-height: 30px"
      />
    </q-card>

    <q-card class="q-pa-lg m-auto" style="max-width: 500px">
      <q-input label="Логин спонсора" :value="parentName" readonly>
        <template #prepend>
          <q-icon name="school" />
        </template>
      </q-input>

      <q-input label="Регион" :value="user.region" readonly>
        <template #prepend>
          <q-icon name="location_on" />
        </template>
      </q-input>

      <q-input label="Телефон" :value="user.phone" mask="(###)##-##-##" unmasked-value readonly>
        <template #prepend>
          <q-icon name="call" />
        </template>
      </q-input>

      <q-input label="Электронная почта" :value="userMail" readonly>
        <template #prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input label="Баланс" :value="user.score" readonly borderless>
        <template #prepend>
          <q-icon name="payments" color="positive" />
        </template>
      </q-input>
    </q-card>
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
    const login = localStorage.getItem('login');

    if (login) {
      this.user = await getUser(login);

      return;
    }

    console.log('invalid route');
  }
}
</script>

<style scoped>
.login-text {
  justify-content: center;
}

.card-title {
  font-size: 20px;
}
</style>
