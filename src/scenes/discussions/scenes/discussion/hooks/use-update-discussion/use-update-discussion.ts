import { queryClient, useMutationFn } from "@/lib/react-query";
import { Discussion, conversationsApiClient } from "@/services/conversations-api-client";
import { UpdateDiscussionDTO } from "@/services/conversations-api-client/types";
import { useNotificationStore } from "@/stores/notifications";

export const useUpdateDiscussion = () => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutationFn({
    onMutate: async ({ discussionId, ...body }) => {
      await queryClient.cancelQueries({
        queryKey: ["discussion", discussionId],
      });

      const previousDiscussion = queryClient.getQueryData<Discussion>(["discussion", discussionId]);

      queryClient.setQueryData(["discussion", discussionId], {
        ...previousDiscussion,
        ...body,
        id: discussionId,
      });

      return { previousDiscussion };
    },
    onError: (_, __, context) => {
      if (context?.previousDiscussion) {
        queryClient.setQueryData(
          ["discussion", context.previousDiscussion.id],
          context.previousDiscussion,
        );
      }
    },
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({ queryKey: ["discussion", variables.discussionId] });
      addNotification({
        type: "success",
        title: "Discussion Updated",
      });
    },
    mutationFn: (data: UpdateDiscussionDTO) =>
      conversationsApiClient.updateDiscussion(data.discussionId, {
        title: data.title,
        body: data.body,
      }),
  });

  return { updateDiscussion: mutation.mutateAsync, isPending: mutation.isPending };
};
