import { invariant } from "@/lib/invariant-error";
import { Discussion } from "@/scenes/discussions";
import { useParams } from "react-router-dom";

export const DiscussionPage = () => {
  const { discussionId } = useParams<{ discussionId: string }>();

  invariant(discussionId, "Discussion ID is required");

  return <Discussion discussionId={discussionId} />;
};
