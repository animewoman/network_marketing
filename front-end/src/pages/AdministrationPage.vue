<template>
  <div>
    <div class="q-px-xl row">
      <registration @save-user="saveUser($event)" />
      <user-list class="q-px-xl" :users="users" :loading="loading" />
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
import { showNotification } from '@/service/Notification';

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

  async saveUser(user: User) {
    try {
      this.loading = true;
      const userDuplicate = this.users.find((soughtUser) => soughtUser.login === user.login);

      if (userDuplicate) {
        showNotification(`Пользователь с именем ${userDuplicate.login} уже существует`, 'negative');
        return;
      }

      await saveUser(user);
      await this.getUsers();
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.m-auto {
  margin: 0 auto;
}

.subtitle {
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}

.subtitle.small-text {
  margin-top: 15px;
  font-size: 11px;
}
</style>
