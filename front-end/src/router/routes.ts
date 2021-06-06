import { RouteConfig } from 'vue-router';
import AdministrationPage from '@/pages/AdministrationPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import UserControl from '@/components/Administration/UserControl.vue';
import Transfer from '@/components/User/Transfer.vue';
import UserInfo from '@/components/User/UserInfo.vue';
import TestComponent from '@/components/TestComponent.vue';

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
    path: '/user',
    name: 'user',
    component: UserInfo,
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Transfer,
  },
  {
    path: '/test',
    name: 'test',
    component: TestComponent,
  },
];

export default routes;
