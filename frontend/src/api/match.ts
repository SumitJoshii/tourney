import { api } from "src/boot/axios";
import { useApiHelper } from "src/utils/api";
import { MatchData } from "src/models/tournament";

export default () => {
  const apiHelper = useApiHelper({
    api: api,
    baseUrl: "/api/",
  });
  return {
    makeMatches: () =>
    //   apiHelper.put("matches/") as >,
  };
};
