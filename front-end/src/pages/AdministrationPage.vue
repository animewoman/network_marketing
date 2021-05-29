<template>
  <div class="row container">
    <registration @save-user="saveUser($event)" />
    <users :users="users" :loading="loading" @delete-user="deleteUser($event)" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Registration from '@/components/Registration.vue';
import Users from '@/components/Users.vue';
import { getUsers, deleteUser, saveUser } from '@/service/Users';
import { User } from '@/types/user';

@Component({
  name: 'AdministrationPage',
  components: { Users, Registration },
})
export default class AdministrationPage extends Vue {
  users: User[] = [];
  loading = false;

  created() {
    this.getUsers();
  }

  async getUsers() {
    try {
      this.loading = true;
      this.users = await getUsers();
    } catch (e) {
      throw new Error(e);
    } finally {
      this.loading = false;
    }
  }

  async deleteUser(user: User) {
    try {
      if (!user._id) {
        return;
      }

      this.loading = true;
      await deleteUser(user._id);
      await this.getUsers();
    } catch (e) {
      throw new Error(e);
    } finally {
      this.loading = false;
    }
  }

  async saveUser(user: User) {
    try {
      this.loading = true;
      await saveUser(user);
      await this.getUsers();
    } catch (e) {
      throw new Error(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped>
.container {
  justify-content: center;
}
</style>
