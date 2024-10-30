import { RouteRecordRaw } from "vue-router";

export default (): RouteRecordRaw[] => [
  {
    path: "matches/",
    redirect: { name: "tournament/matches" },
  },
  {
    path: "player-matches",
    name: "tournament/matches",
    component: () => import("pages/MatchPage.vue"),
  },
];
