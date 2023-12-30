import { Authorization } from "@/components/authorization";
import { Button } from "@/design-system/forms/button";
import { ConfirmationDialog } from "@/design-system/overlay/confirmation-dialog";
import { ROLES } from "@/lib/authz/authz";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useDeleteDiscussion } from "../../hooks/use-delete-discussion";

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const { deleteDiscussion, isPending } = useDeleteDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Discussion
          </Button>
        }
        confirmButton={
          <Button
            isLoading={isPending}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteDiscussion(id)}
          >
            Delete Discussion
          </Button>
        }
      />
    </Authorization>
  );
};
