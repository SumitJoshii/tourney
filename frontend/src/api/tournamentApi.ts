import { api } from "src/boot/axios";
import { useApiHelper } from "src/utils/api";
import { TournamentData } from "src/models/tournament";

export default () => {
  const apiHelper = useApiHelper({
    api: api,
    baseUrl: "/api/",
  });
  return {
    getTournaments: () =>
      apiHelper.get("tournaments/") as Promise<TournamentData[]>,
  };
};
