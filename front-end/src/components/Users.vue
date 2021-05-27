<template>
  <div class="q-pt-xl q-px-lg">
    <q-table style="max-width: 1200px; margin: 0 auto" :data="users" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';
import { getUsers } from '@/service/Users';

@Component({
  name: 'Users',
})
export default class Users extends Vue {
  users: User[] = [];

  created() {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.users = await getUsers();
    } catch (e) {
      console.log(e.message);
    }
  }
}
</script>

<style scoped></style>
