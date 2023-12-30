import { ContentLayout } from "@/components/layouts/content-layout";
import { CreateDiscussion } from "./components/create-discussion";
import { DiscussionsList } from "./components/discussions-list";

export const Discussions = () => {
  return (
    <ContentLayout title="Discussions">
      <div className="flex justify-end">
        <CreateDiscussion />
      </div>
      <div className="mt-4">
        <DiscussionsList />
      </div>
    </ContentLayout>
  );
};
