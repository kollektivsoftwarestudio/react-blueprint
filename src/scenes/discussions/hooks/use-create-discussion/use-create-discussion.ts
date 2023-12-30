import { queryClient, useMutationFn } from "@/lib/react-query";
import { Discussion, conversationsApiClient } from "@/services/conversations-api-client";
import { useNotificationStore } from "@/stores/notifications";

export const useCreateDiscussion = () => {
  const { addNotification } = useNotificationStore();

  const mutation = useMutationFn({
    onMutate: async (newDiscussion) => {
      await queryClient.cancelQueries({ queryKey: ["discussions"] });

      const previousDiscussions = queryClient.getQueryData<Discussion[]>(["discussions"]);

      queryClient.setQueryData(["discussions"], [...(previousDiscussions || []), newDiscussion]);

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
        title: "Discussion Created",
      });
    },
    mutationFn: conversationsApiClient.createDiscussion,
  });

  return {
    createDiscussion: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
