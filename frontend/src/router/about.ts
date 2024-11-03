import { RouteRecordRaw } from 'vue-router';

export default (): RouteRecordRaw[] => [
  {
    path: '/about',
    redirect: { name: 'about' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('pages/AboutPage.vue'),
  },
];
