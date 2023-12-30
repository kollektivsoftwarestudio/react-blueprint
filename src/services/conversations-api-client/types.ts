export type CreateDiscussionDTO = {
  title: string;
  body: string;
};

export type UpdateDiscussionDTO = {
  discussionId: string;
  title: string;
  body: string;
};

export type Discussion = {
  title: string;
  body: string;
  teamId: string;
  id: string;
  createdAt: number;
};

export type Comment = {
  body: string;
  authorId: string;
  discussionId: string;
  id: string;
  createdAt: number;
};

export type CreateCommentDTO = {
  body: string;
  discussionId: string;
};
