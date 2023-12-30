import { queryClient, useMutationFn } from "@/lib/react-query";
import {
  Discussion,
  conversationsApiClient,
} from "@/services/conversations-api-client";
import { useNotificationStore } from "@/stores/notifications";

export const useDeleteDiscussion = () => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutationFn({
    onMutate: async (deletedDiscussionId) => {
      await queryClient.cancelQueries({ queryKey: ["discussions"] });

      const previousDiscussions = queryClient.getQueryData<Discussion[]>([
        "discussions",
      ]);

      queryClient.setQueryData(
        ["discussions"],
        previousDiscussions?.filter(
          (discussion) => discussion.id !== deletedDiscussionId
        )
      );

      return { previousDiscussions };
    },
    onError: (_, __, context) => {
      if (context?.previousDiscussions) {
        queryClient.setQueryData(["discussions"], context.previousDiscussions);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discussions"] });
      addNotification({
        type: "success",
        title: "Discussion Deleted",
      });
    },
    mutationFn: conversationsApiClient.deleteDiscussion,
  });

  return {
    deleteDiscussion: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
