<template>
  <q-card class="q-pa-lg m-auto" style="width: 400px">
    <q-form>
      <q-toolbar-title style="text-align: center">Перевод средств</q-toolbar-title>

      <q-input label="Логин получателя" v-model="transferInfo.login" />
      <q-input label="Сумма" v-model="transferInfo.score" type="number" />

      <div class="row">
        <q-btn class="q-my-md" label="Отправить" color="positive" @click="transferMoney" />

        <q-space />
        <p v-if="user" class="subtitle q-px-md" style="padding-top: 40px">
          <q-icon name="payments" color="positive" /> Ваш балланс:<span style="font-weight: bold">
            {{ userScore }}
          </span>
        </p>
      </div>

      <div v-if="user"></div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { transferMoney } from '@/service/Operations';
import { TransferData } from '@/types/operation';
import { User } from '@/types/user';
import { getUser } from '@/service/Users';

@Component({
  name: 'Transfer',
})
export default class Transfer extends Vue {
  user: User | null = null;
  transferInfo: TransferData = {
    score: null,
    login: '',
  };

  get userScore() {
    return this.user?.score || '0';
  }

  get userLogin(): string {
    const login = localStorage.getItem('login');
    return login!;
  }

  created() {
    this.fetchUser();
  }

  async transferMoney() {
    await transferMoney(this.transferInfo);
    await this.fetchUser();
  }

  async fetchUser() {
    try {
      this.user = await getUser(this.userLogin);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped></style>
