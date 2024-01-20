import { useQueryFn } from "@/lib/react-query";
import { conversationsApiClient } from "@/services/conversations-api-client";

type UseGetDiscussionOptions = {
  discussionId: string;
};

export const useGetDiscussion = ({ discussionId }: UseGetDiscussionOptions) => {
  const query = useQueryFn({
    queryKey: ["discussion", discussionId],
    queryFn: () => conversationsApiClient.getDiscussion(discussionId),
  });

  return {
    discussion: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
