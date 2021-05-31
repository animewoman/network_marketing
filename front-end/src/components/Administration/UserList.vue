<template>
  <div class="q-pt-xl q-px-lg">
    <q-table
      style="max-width: 800px"
      row-key="name"
      :data="users"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      :loading="loading"
      @row-click="userToDelete"
    >
      <template #top>
        <q-input v-model="filter" dense color="primary" style="margin: 0 auto" label="Поиск">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Удалить пользователя?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Нет" color="primary" v-close-popup />
          <q-btn label="Удалить" color="negative" v-close-popup @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { User } from '@/types/user';

@Component({
  name: 'UserList',
})
export default class UserList extends Vue {
  @Prop({ type: Array, default: [] }) readonly users!: User[];
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean;

  confirm = false;

  userForDelete: User | null = null;

  filter = '';

  columns = [
    {
      name: 'login',
      label: 'Логин',
      field: 'login',
      align: 'left',
      sortable: true,
    },
    {
      name: 'email',
      label: 'Почта',
      field: 'email',
      sortable: true,
    },
    {
      name: 'phone',
      label: 'Телефон',
      field: 'phone',
      sortable: true,
    },
    {
      name: 'parent',
      label: 'Спонсор',
      field: 'parent',
      sortable: true,
    },
  ];

  pagination = {
    rowsPerPage: 10,
  };

  userToDelete(event: never, user: User) {
    this.$router.push({ name: 'user-control', query: user.login });
    this.userForDelete = user;
    this.confirm = true;
  }

  deleteUser() {
    this.$emit('delete-user', this.userForDelete);
  }
}
</script>

<style scoped></style>
