import { useQueryFn } from "@/lib/react-query/react-query";
import { apiClient } from "@/services/api-client";

export const useTeams = () => {
  const { data, isLoading } = useQueryFn({
    queryKey: ["teams"],
    queryFn: () => apiClient.teams.getTeams(),
  });

  return { teams: data, isLoading };
};
