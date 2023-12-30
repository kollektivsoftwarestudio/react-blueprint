import { Authorization } from "@/components/authorization";
import { LoadingIndicator } from "@/design-system/loading-indicator";
import { POLICIES } from "@/lib/authz/authz";
import { useAuthenticatedUser } from "@/providers/authenticated-user-provider";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useGetComments } from "../../hooks/use-get-comments";
import { formatDate } from "@/design-system/formatters/format-date";
import { MDPreview } from "@/design-system/data-display/md-preview";
import { DeleteComment } from "../delete-comment";

type CommentsListProps = {
  discussionId: string;
};

export const CommentsList = ({ discussionId }: CommentsListProps) => {
  const { user } = useAuthenticatedUser();
  const { comments, isLoading } = useGetComments({ discussionId });

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!comments || comments.length === 0)
    return (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <ArchiveBoxIcon className="h-10 w-10" />
        <h4>No Comments Found</h4>
      </div>
    );

  return (
    <ul aria-label="comments" className="flex flex-col space-y-3">
      {comments.map((comment, index) => (
        <li
          aria-label={`comment-${comment.body}-${index}`}
          key={comment.id || index}
          className="w-full bg-white shadow-sm p-4"
        >
          <Authorization
            policyCheck={POLICIES["comment:delete"](user.role, user.id, comment.authorId)}
          >
            <div className="flex justify-between">
              <span className="text-xs font-semibold">{formatDate(comment.createdAt)}</span>
              <DeleteComment discussionId={discussionId} id={comment.id} />
            </div>
          </Authorization>

          <MDPreview value={comment.body} />
        </li>
      ))}
    </ul>
  );
};
