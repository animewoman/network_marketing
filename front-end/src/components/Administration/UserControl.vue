<template>
  <div class="m-auto q-pt-xl" style="width: 600px">
    <div class="row q-my-lg">
      <q-btn
        label="На таблицу пользователей"
        icon="arrow_back_ios"
        class="back-btn"
        flat
        no-caps
        @click="toAdminPage"
      />

      <q-space />
      <q-btn
        label="Удалить пользователя"
        class="q-px-sm delete-btn"
        color="negative"
        icon="delete"
        dense
        flat
        no-caps
        @click="confirm = true"
      />
    </div>

    <q-toolbar-title class="parent-link q-px-md q-mb-md" @click="toParent">
      <span class="small-title">Спонсор:</span>
      {{ user.parent }}
    </q-toolbar-title>

    <q-form greedy>
      <q-input label="Логин" v-model="user.login" readonly />
      <q-input label="Регион" v-model="user.region" readonly />
      <q-input label="Телефон" v-model="user.phone" readonly />
      <q-input label="Почта" v-model="user.email" readonly />
      <q-input label="Баллы" v-model="user.score" />

      <div class="row">
        <q-btn
          label="Сохранить изменения"
          class="q-my-lg q-pa-sm"
          color="primary"
          icon="save"
          dense
          no-caps
          @click="updateUser"
        />
        <q-space />
      </div>
    </q-form>

    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section>
          <q-toolbar-title>Вы уверены что хотите удалить пользователя?</q-toolbar-title>
        </q-card-section>

        <q-card-action class="row">
          <q-space />
          <q-btn class="q-pa-sm" dense flat label="Удалить" color="negative" v-close-popup @click="deleteUser" />
        </q-card-action>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';
import { getUser, updateUser, deleteUser } from '@/service/Users';

@Component({
  name: 'UserControl',
})
export default class UserControl extends Vue {
  confirm = false;

  parentId = '';

  user: User = {
    login: '',
    phone: '',
    email: '',
    score: 0,
    region: '',
    //не используются здесь но нужно для ts
    _id: '',
    password: '',
    parent: '',
    fullName: '',
  };

  get userId() {
    return String(this.$route.query);
  }

  created() {
    this.fetchUser();
  }

  toParent() {
    if (this.parentId && this.parentId !== '-') {
      this.fetchUser();
      this.$router.replace({ name: 'user-control', query: this.parentId });
    }
  }

  async fetchUser() {
    try {
      if (this.userId) {
        const user = await getUser(this.userId);

        if (user.parent && user.parent !== '-') {
          this.parentId = user.parent;
          const userParent = await getUser(user.parent);
          this.user = { ...user, parent: userParent.login };

          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser() {
    try {
      this.user = await updateUser(this.user);
      this.toAdminPage();
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteUser() {
    try {
      const response = await deleteUser(this.user._id);

      if (response === 'OK') {
        this.toAdminPage();
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  toAdminPage() {
    this.$router.push({ name: 'admin' });
  }
}
</script>

<style scoped>
.back-btn {
  background-color: rgba(177, 176, 186, 0.37);
}

.delete-btn {
  max-height: 3em;
  background-color: rgba(177, 176, 186, 0.37);
}

.small-title {
  font-size: medium;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.64);
}

.parent-link {
  cursor: pointer;
  background-color: rgba(133, 133, 137, 0.54);
  border-radius: 15px;
}
</style>
