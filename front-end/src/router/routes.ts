import { RouteConfig } from 'vue-router';
import Administration from '@/components/Administration.vue';

const routes: RouteConfig[] = [
  {
    path: '/admin',
    name: 'Admin',
    component: Administration,
  },
];

export default routes;
