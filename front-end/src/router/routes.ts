import { RouteConfig } from 'vue-router';
import AdministrationPage from '@/pages/AdministrationPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import UserPage from '@/pages/UserPage.vue';
import UserControl from '@/components/Administration/UserControl.vue';
import Transfer from '@/components/Operations/Transfer.vue';

const routes: RouteConfig[] = [
  {
    path: '/admin',
    name: 'admin',
    component: AdministrationPage,
  },
  {
    path: '/admin/user',
    name: 'user-control',
    component: UserControl,
  },
  {
    path: '/',
    name: 'auth',
    component: AuthPage,
  },
  {
    path: '/user:login',
    name: 'user',
    component: UserPage,
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Transfer,
  },
];

export default routes;
