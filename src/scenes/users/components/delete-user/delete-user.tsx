import { Button } from "@/design-system/forms/button";
import { useDeleteUser } from "../../hooks/use-delete-user";
import { ConfirmationDialog } from "@/design-system/overlay/confirmation-dialog";

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const { deleteUser } = useDeleteUser();

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={<Button variant="danger">Delete</Button>}
      confirmButton={
        <Button type="button" className="bg-red-600" onClick={() => deleteUser(id)}>
          Delete User
        </Button>
      }
    />
  );
};
