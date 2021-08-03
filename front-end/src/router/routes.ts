import { RouteConfig } from 'vue-router';
import AdministrationPage from '@/pages/AdministrationPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import UserControl from '@/components/Administration/UserControl.vue';
import Transfer from '@/components/User/Transfer.vue';
import UserInfo from '@/components/User/UserInfo.vue';
import Reports from '@/components/User/Reports.vue';
import Showcase from '@/pages/ShowcasePage.vue';
import Partners from '@/components/User/Partners.vue';
export enum RouteNames {
  AUTH = 'auth',
  ADMIN = 'admin',
  USER_CONTROL = 'user-control',
  USER = 'user',
  TRANSFER = 'transfer',
  PARTNERS = 'partners',
  REPORTS = 'reports',
  SHOWCASE = 'showcase',
}

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
    path: '/auth',
    name: 'auth',
    component: AuthPage,
  },
  {
    path: '/user',
    name: 'user',
    component: UserInfo,
  },
  {
    path: '/user/transfer',
    name: 'transfer',
    component: Transfer,
  },
  {
    path: '/user/partners',
    name: 'partners',
    component: Partners,
  },
  {
    path: '/user/reports',
    name: 'reports',
    component: Reports,
  },
  {
    path: '/',
    name: 'showcase',
    component: Showcase,
  },
];

export default routes;
