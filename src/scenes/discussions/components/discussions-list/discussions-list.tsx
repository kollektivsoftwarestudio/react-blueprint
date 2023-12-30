import { Table } from "@/design-system/data-display/table";
import { formatDate } from "@/design-system/formatters/format-date";
import { Link } from "@/design-system/navigation/link";
import { LoadingIndicator } from "@/design-system/loading-indicator";
import { routes } from "@/routes/routes";
import { Discussion } from "@/services/conversations-api-client";
import { DeleteDiscussion } from "../../scenes/discussion/components/delete-discussion";
import { useGetDiscussions } from "../../hooks/use-get-discussions";

export const DiscussionsList = () => {
  const { discussions, isLoading } = useGetDiscussions();

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  return (
    <Table
      data={discussions}
      columns={[
        {
          title: "Title",
          field: "title",
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
            return (
              <div className="flex gap-4 items-center justify-end">
                <Link href={routes.app.discussions.details(id)}>View</Link>
                <DeleteDiscussion id={id} />
              </div>
            );
          },
        },
      ]}
    />
  );
};
