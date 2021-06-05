<template>
  <q-form style="width: 400px; margin: 0 auto">
    <q-toolbar-title style="text-align: center">Перевод средств</q-toolbar-title>

    <q-input label="Логин" v-model="score" type="number" />
    <q-input label="Сумма" v-model="login" />

    <q-btn class="q-my-sm" label="Отправить" color="positive" @click="transferMoney" />
  </q-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { transferMoney } from '@/service/Operations';

@Component({
  name: 'Transfer',
})
export default class Transfer extends Vue {
  score = 0;
  login = '';

  async transferMoney() {
    const transferData = { score: this.score, login: this.login };

    await transferMoney(transferData);
  }
}
</script>

<style scoped></style>
