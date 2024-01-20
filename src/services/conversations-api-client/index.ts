import { baseClient } from "./base-client";
import {
  CreateDiscussionDTO,
  Discussion,
  Comment,
  CreateCommentDTO,
} from "./types";

export const conversationsApiClient = {
  createDiscussion: (data: CreateDiscussionDTO) =>
    baseClient.post<Discussion>("/discussions", data),
  deleteDiscussion: (id: string) => baseClient.delete(`/discussions/${id}`),
  getDiscussions: () => baseClient.get<Discussion[]>("/discussions"),
  getDiscussion: (id: string) => 
    baseClient.get<Discussion>(`/discussions/${id}`),
  updateDiscussion: (id: string, data: Partial<Discussion>) =>
    baseClient.patch(`/discussions/${id}`, data),
  getComments: (discussionId: string) =>
    baseClient.get<Comment[]>(`/comments?discussionId=${discussionId}`),
  deleteComment: (commentId: string) =>
    baseClient.delete(`/comments/${commentId}`),
  createComment: (data: CreateCommentDTO) =>
    baseClient.post<Comment>("/comments", data),
};

export type { CreateDiscussionDTO, Discussion, Comment };
