import { useGetDiscussion } from "./hooks/use-get-discussion";
import { LoadingIndicator } from "@/design-system/loading-indicator";
import { Head } from "@/components/layouts/head";
import { ContentLayout } from "@/components/layouts/content-layout";
import { formatDate } from "@/design-system/formatters/format-date";
import { UpdateDiscussion } from "./components/update-discussion";
import { MDPreview } from "@/design-system/data-display/md-preview";
import { Comments } from "./components/comments";

type DiscussionProps = {
  discussionId: string;
};

export const Discussion = ({ discussionId }: DiscussionProps) => {
  const { discussion, isLoading } = useGetDiscussion({ discussionId });

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!discussion) {
    return <div>No Discussion found :(</div>;
  }

  return (
    <>
      <Head title={discussion?.title} />
      <ContentLayout title={discussion?.title}>
        <span className="text-xs font-bold">{formatDate(discussion?.createdAt)}</span>
        <div className="mt-6 flex flex-col space-y-16">
          <div className="flex justify-end">
            <UpdateDiscussion discussionId={discussionId} />
          </div>
          <div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <div className="mt-1 max-w-2xl text-sm text-gray-500">
                  <MDPreview value={discussion?.body} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Comments discussionId={discussionId} />
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
