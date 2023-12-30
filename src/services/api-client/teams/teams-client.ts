import { baseClient } from "../base-client";
import { Team } from "./types";

export const teamsClient = {
  getTeams: async () => baseClient.get<Team[]>("/teams"),
};
