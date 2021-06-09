<template>
  <div>
    <q-table title="Отчеты" :columns="columns" :data="reports" :loading="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getReports } from '@/service/Operations';

@Component({
  name: 'Reports',
})
export default class Reports extends Vue {
  loading = false;

  reports = [];

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
      const response = await getReports(this.userLogin);
      console.log(response);
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
