<template>
  <div>
    <header-component @logout="logout" />

    <div class="q-px-xl row">
      <registration @save-user="saveUser($event)" />
      <user-list class="q-px-xl" :users="users" :loading="loading" @delete-user="deleteUser($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Registration from '@/components/Administration/Registration.vue';
import UserList from '@/components/Administration/UserList.vue';
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import { getUsers, deleteUser, saveUser } from '@/service/Users';
import { User } from '@/types/user';
import { mapUserList } from '@/service/Formatters/UserFormatter';

@Component({
  name: 'AdministrationPage',
  components: { UserList, Registration, HeaderComponent },
})
export default class AdministrationPage extends Vue {
  users: User[] = [];
  loading = false;

  created() {
    this.getUsers();
  }

  showNotification(message: string, color: string) {
    this.$q.notify({
      message,
      color,
    });
  }

  async getUsers() {
    try {
      this.loading = true;
      const users = await getUsers();
      this.users = mapUserList(users);
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
      const userDuplicate = this.users.find((soughtUser) => soughtUser.login === user.login);

      if (userDuplicate) {
        this.showNotification(`Пользователь с именем ${userDuplicate.login} уже существует`, 'negative');

        return;
      }

      await saveUser(user);
      await this.getUsers();
    } catch (e) {
      throw new Error(e);
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.$router.push({ name: 'auth' });
  }
}
</script>

<style>
.m-auto {
  margin: 0 auto;
}
</style>
