<template>
  <div class="q-pt-xl q-px-lg">
    <q-table
      style="width: 800px; max-height: 700px"
      row-key="name"
      virtual-scroll
      :data="users"
      :columns="columns"
      :filter="filter"
      :pagination.sync="pagination"
      :loading="loading"
      @row-click="toUser"
    >
      <template #top>
        <q-toolbar-title class="table-title">Таблица пользователей</q-toolbar-title>
        <q-space />

        <q-input v-model="filter" dense color="primary" style="margin: 0 auto" label="Поиск">
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #header-cell="props">
        <q-th :props="props">
          <span class="bold-header">
            {{ props.col.label }}
          </span>
        </q-th>
      </template>
    </q-table>
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
      name: 'score',
      label: 'Баллы',
      field: 'score',
      sortable: true,
    },
    {
      name: 'parent',
      label: 'Спонсор',
      field: 'parent',
      sortable: true,
    },
    {
      name: 'phone',
      label: 'Телефон',
      field: 'phone',
      sortable: true,
    },
  ];

  pagination = {
    rowsPerPage: 50,
  };

  toUser(event: never, user: User) {
    const id = user._id;

    if (id) {
      this.$router.push({ name: 'user-control', query: id });
    }
  }
}
</script>

<style scoped>
.bold-header {
  font-weight: bold;
}
</style>
