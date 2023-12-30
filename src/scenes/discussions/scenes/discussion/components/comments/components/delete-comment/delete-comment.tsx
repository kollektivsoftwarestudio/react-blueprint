import { ConfirmationDialog } from "@/design-system/overlay/confirmation-dialog";
import { useDeleteComment } from "../../hooks/use-delete-comment/use-delete-comment";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/design-system/forms/button";

type DeleteCommentProps = {
  id: string;
  discussionId: string;
};

export const DeleteComment = ({ id, discussionId }: DeleteCommentProps) => {
  const { deleteComment, isPending } = useDeleteComment({ discussionId });

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Comment"
      body="Are you sure you want to delete this comment?"
      triggerButton={
        <Button variant="danger" size="sm" startIcon={<TrashIcon className="h-4 w-4" />}>
          Delete Comment
        </Button>
      }
      confirmButton={
        <Button
          isLoading={isPending}
          type="button"
          className="bg-red-600"
          onClick={async () => await deleteComment(id)}
        >
          Delete Comment
        </Button>
      }
    />
  );
};
