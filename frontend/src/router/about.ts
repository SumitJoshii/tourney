import { RouteRecordRaw } from 'vue-router';

export default (): RouteRecordRaw[] => [
  {
    path: '',
    redirect: { name: 'about' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('pages/AboutPage.vue'),
  },
];
