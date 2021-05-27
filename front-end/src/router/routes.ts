import { RouteConfig } from 'vue-router';
import AdministrationPage from '@/pages/AdministrationPage.vue';

const routes: RouteConfig[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdministrationPage,
  },
];

export default routes;
