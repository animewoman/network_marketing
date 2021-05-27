import { RouteConfig } from 'vue-router';
import Home from '@/pages/Home.vue';
import Administration from '@/components/Administration.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Administration,
  },
];

export default routes;
