import { useMutationFn } from "@/lib/react-query/react-query";
import { useAuth } from "@/providers/auth-provider";
import { usersClient } from "@/services/api-client/users/users-client";
import { useNotificationStore } from "@/stores/notifications";

export const useUpdateProfile = () => {
  const { addNotification } = useNotificationStore();
  const { reloadUser } = useAuth();

  const mutation = useMutationFn({
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "User Updated",
      });
      reloadUser();
    },
    mutationFn: usersClient.updateProfile,
  });

  return { updateProfile: mutation.mutate, isPending: mutation.isPending };
};
