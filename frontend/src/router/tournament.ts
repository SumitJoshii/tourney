import { RouteRecordRaw } from 'vue-router';

export default (): RouteRecordRaw[] => [
  {
    path: '',
    redirect: { name: 'tournament/TournamentDetails' },
  },
  {
    path: ':id',
    name: 'tournament/TournamentDetails',
    component: () => import('pages/TournamentDetails.vue'),
  },
];
