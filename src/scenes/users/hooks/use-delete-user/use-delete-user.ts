import { useNotificationStore } from "@/stores/notifications";
import { useMutationFn } from "@/lib/react-query/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { AuthUser, apiClient } from "@/services/api-client";

export const useDeleteUser = () => {
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  const mutation = useMutationFn({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });

      const previousUsers = queryClient.getQueryData<AuthUser[]>(["users"]);

      queryClient.setQueryData(
        ["users"],
        previousUsers?.filter((user) => user.id !== deletedUser),
      );

      return { previousUsers };
    },
    onError: (_, __, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
      addNotification({
        type: "error",
        title: "Failed deleting user",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      addNotification({
        type: "success",
        title: "User Deleted",
      });
    },
    mutationFn: apiClient.users.deleteUser,
  });

  return { deleteUser: mutation.mutate };
};
