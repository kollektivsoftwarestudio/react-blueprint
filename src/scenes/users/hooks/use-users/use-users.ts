import { useQueryFn } from "@/lib/react-query/react-query";
import { apiClient } from "@/services/api-client";

export const useUsers = () => {
  const { data, isLoading } = useQueryFn({
    queryKey: ["users"],
    queryFn: apiClient.users.getUsers,
  });

  return { users: data, isLoading };
};
