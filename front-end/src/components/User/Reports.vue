<template>
  <div>
    <q-table
      title="Отчеты"
      class="m-auto q-mt-xl"
      style="max-height: 500px; max-width: 900px"
      :columns="columns"
      :data="reports"
      :filter="filter"
      :pagination="pagination"
      :loading="loading"
    >
      <template #top>
        <q-toolbar-title class="table-title">История кошелька</q-toolbar-title>
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

      <template #body-cell-type="props">
        <q-td :props="props">
          <q-chip dense text-color="white" :color="props.row.status.color">
            {{ props.row.status.title }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getReports } from '@/service/Operations';
import { Report } from '@/types/operation';

@Component({
  name: 'Reports',
})
export default class Reports extends Vue {
  loading = false;
  filter = '';

  reports: Report[] = [];

  columns = [
    {
      name: 'type',
      label: 'Тип транзакции',
      field: 'type',
      align: 'left',
      sortable: true,
    },
    {
      name: 'score',
      label: 'Баллы',
      field: 'score',
      align: 'left',
      sortable: true,
    },
    {
      name: 'from',
      label: 'Отправитель/Получатель',
      field: 'from',
      align: 'right',
      sortable: true,
    },
  ];

  pagination = {
    rowsPerPage: 50,
  };

  get userLogin(): string {
    const login = localStorage.getItem('login');
    return login!;
  }

  created() {
    this.fetchReports();
  }

  async fetchReports() {
    try {
      this.loading = true;
      this.reports = await getReports(this.userLogin);
    } catch (e) {
      console.log(e.message);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style scoped></style>
