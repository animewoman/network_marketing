import { RouteConfig } from 'vue-router';
import AdministrationPage from '@/pages/AdministrationPage.vue';
import AuthPage from '@/pages/AuthPage.vue';
import UserPage from '@/pages/UserPage.vue';
import UserControl from '@/components/Administration/UserControl.vue';

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
    path: '/:id',
    name: 'user',
    component: UserPage,
  },
];

export default routes;
