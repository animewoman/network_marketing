<template>
  <div class="row q-py-md page-header">
    <q-space />

    <p class="login-text"><span class="bold-text">Логин: </span>{{ login }}</p>
    <q-btn class="q-mx-md" label="Выйти" color="negative" @click="logout" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LOGINNED_USER } from '@/service/Users';

@Component({
  name: 'HeaderComponent',
})
export default class HeaderComponent extends Vue {
  get login() {
    if (LOGINNED_USER) {
      return LOGINNED_USER.login;
    }

    return '';
  }

  logout() {
    this.$emit('logout');
  }
}
</script>
<style scoped>
.page-header {
  background-color: rgba(20, 21, 22, 0.13);
}

.login-text {
  font-size: 16px;
}

.bold-text {
  font-weight: bold;
}
</style>