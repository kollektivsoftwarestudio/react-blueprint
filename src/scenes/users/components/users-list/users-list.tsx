import { formatDate } from "@/design-system/formatters/format-date";
import { useUsers } from "../../hooks/use-users";
import { LoadingIndicator } from "@/design-system/loading-indicator";
import { Table } from "@/design-system/data-display/table";
import { AuthUser } from "@/services/api-client";
import { DeleteUser } from "../delete-user";

export const UsersList = () => {
  const { isLoading, users } = useUsers();

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  return (
    <Table
      data={users}
      columns={[
        {
          title: "First Name",
          field: "firstName",
        },
        {
          title: "Last Name",
          field: "lastName",
        },
        {
          title: "Email",
          field: "email",
        },
        {
          title: "Role",
          field: "role",
        },
        {
          title: "Created At",
          field: "createdAt",
          renderCell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: "",
          field: "id",
          renderCell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
