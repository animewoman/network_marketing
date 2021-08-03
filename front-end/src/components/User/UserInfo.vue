<template>
  <div v-if="user" class="row justify-between">
    <div class="col-8" style="max-width: 500px">
      <q-card class="card-title">
        <div class="row bg-green-5 q-px-lg q-pb-sm">
          <p class="subtitle q-mt-xs">
            Добро пожаловать!
            <q-toolbar-title style="padding: 0; color: #000">{{ user.fullName }}</q-toolbar-title>
          </p>
        </div>
        <q-space />

        <div class="q-px-lg bg-red-7">
          <q-input label="Ваш Логин" :value="user.login" readonly>
            <template #prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input label="Дата регистрации" :value="user.date" readonly borderless>
            <template #prepend>
              <q-icon name="done" />
            </template>
          </q-input>

          <q-input label="Статус" :value="user.status" readonly>
            <template #prepend>
              <q-icon name="emoji_events" />
            </template>
          </q-input>

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

          <q-input label="Баланс $" :value="user.score" readonly borderless>
            <template #prepend>
              <q-icon name="payments" color="positive" />
            </template>
          </q-input>
        </div>
      </q-card>
    </div>

    <div class="col-3 q-ml-md">
      <div class="bg-black" style="height: 250px; width: 220px">
        <div class="row justify-center q-pt-lg">
          <q-btn v-for="(stage, index) in stages" :key="index" class="q-ma-xs" color="green" no-caps>
            {{ stage.value }}
          </q-btn>
        </div>
      </div>

      <div class="row justify-center bg-green q-mt-md q-py-md" style="height: 100px; width: 220px">
        <img :src="require('@/assets/dollar.png')" style="width: 50px; height: 50px" class="q-mr-md" />

        <div>
          <div>Кошелек</div>
          <div>{{ user.score }}</div>
        </div>
      </div>
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

  stages = [
    {
      value: 'Этап 1',
    },
    {
      value: 'Этап 2',
    },
    {
      value: 'Этап 3',
    },
    {
      value: 'Этап 4',
    },
    {
      value: 'Этап 5',
    },
    {
      value: 'Этап 6',
    },
    {
      value: 'Этап 7',
    },
    {
      value: 'Этап 8',
    },
  ];

  get parentName() {
    return this.user?.parent || '-';
  }

  get userMail() {
    return this.user?.email || '-';
  }

  created() {
    this.fetchUser();
  }

  async fetchUser() {
    const login = localStorage.getItem('login');

    if (login) {
      this.user = await getUser(login);
    }
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
