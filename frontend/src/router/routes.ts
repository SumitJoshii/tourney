import { RouteRecordRaw } from 'vue-router';
import useTournamentRouters from './tournament';
import useAboutRouters from './about';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/tournament/',
    component: () => import('layouts/MainLayout.vue'),
    children: useTournamentRouters(),
  },
  {
    path: '/about/',
    component: () => import('layouts/MainLayout.vue'),
    children: useAboutRouters(),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
