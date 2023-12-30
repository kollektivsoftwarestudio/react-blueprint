import { useQueryFn } from "@/lib/react-query";
import { conversationsApiClient } from "@/services/conversations-api-client";

export const useGetDiscussions = () => {
  const query = useQueryFn({
    queryKey: ["discussions"],
    queryFn: conversationsApiClient.getDiscussions,
  });

  return { discussions: query.data, isLoading: query.isLoading };
};
