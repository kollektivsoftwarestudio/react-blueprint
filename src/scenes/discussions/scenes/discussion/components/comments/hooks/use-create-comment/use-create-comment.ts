import { queryClient, useMutationFn } from "@/lib/react-query";
import { conversationsApiClient } from "@/services/conversations-api-client";
import { useNotificationStore } from "@/stores/notifications";

type UseCreateCommentOptions = {
  discussionId: string;
};

export const useCreateComment = ({ discussionId }: UseCreateCommentOptions) => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutationFn({
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ["discussion", discussionId, "comments"],
      });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        discussionId,
      ]);

      queryClient.setQueryData(
        ["discussion", discussionId, "comments"],
        [...(previousComments || []), newComment]
      );

      return { previousComments };
    },
    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["discussion", discussionId, "comments"],
          context.previousComments
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["discussion", discussionId, "comments"],
      });
      addNotification({
        type: "success",
        title: "Comment Created",
      });
    },
    mutationFn: conversationsApiClient.createComment,
  });

  return { createComment: mutation.mutateAsync, isPending: mutation.isPending };
};
