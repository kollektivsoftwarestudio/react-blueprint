import { useQueryFn } from "@/lib/react-query";
import { conversationsApiClient } from "@/services/conversations-api-client";

type UseGetCommentsOptions = {
  discussionId: string;
};

export const useGetComments = ({ discussionId }: UseGetCommentsOptions) => {
  const query = useQueryFn({
    queryKey: ["discussion", discussionId, "comments"],
    queryFn: () => conversationsApiClient.getComments(discussionId),
  });

  return { comments: query.data, isLoading: query.isLoading };
};
