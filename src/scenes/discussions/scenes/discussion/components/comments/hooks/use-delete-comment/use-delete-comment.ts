import { queryClient, useMutationFn } from "@/lib/react-query";
import {
  Comment,
  conversationsApiClient,
} from "@/services/conversations-api-client";
import { useNotificationStore } from "@/stores/notifications";

type UseDeleteCommentOptions = {
  discussionId: string;
};

export const useDeleteComment = ({ discussionId }: UseDeleteCommentOptions) => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutationFn({
    onMutate: async (deletedCommentId) => {
      await queryClient.cancelQueries({
        queryKey: ["discussion", discussionId, "comments"],
      });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "discussion",
        discussionId,
        "comments",
      ]);

      queryClient.setQueryData(
        ["discussion", discussionId, "comments"],
        previousComments?.filter((comment) => comment.id !== deletedCommentId)
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
        title: "Comment Deleted",
      });
    },
    mutationFn: conversationsApiClient.deleteComment,
  });

  return { deleteComment: mutation.mutateAsync, isPending: mutation.isPending };
};
