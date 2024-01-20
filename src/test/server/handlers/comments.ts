import { HttpResponse, http } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { db, persistDb } from "../db";
import { requireAuth, delayedResponse, errorResponse } from "../utils";

type CreateCommentBody = {
  body: string;
  discussionId: string;
};

export const commentsHandlers = [
  http.get<never>(`${API_URL}/comments`, async ({ request, cookies }) => {
    try {
      await requireAuth(cookies);
      const url = new URL(request.url);
      const discussionId = url.searchParams.get("discussionId") || "";
      const result = db.comment.findMany({
        where: {
          discussionId: {
            equals: discussionId,
          },
        },
      });
      return delayedResponse(HttpResponse.json(result));
    } catch (error) {
      return delayedResponse(errorResponse(error));
    }
  }),

  http.post<never, CreateCommentBody>(
    `${API_URL}/comments`,
    async ({ request, cookies }) => {
      try {
        const user = await requireAuth(cookies);
        const data = await request.json();
        const result = db.comment.create({
          authorId: user.id,
          id: nanoid(),
          createdAt: Date.now(),
          ...data,
        });
        persistDb("comment");
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),

  http.delete<{ commentId: string }>(
    `${API_URL}/comments/:commentId`,
    async ({ request, params, cookies }) => {
      try {
        const user = await requireAuth(cookies);
        const { commentId } = params;
        const result = db.comment.delete({
          where: {
            id: {
              equals: commentId,
            },
            ...(user.role === "USER" && {
              authorId: {
                equals: user.id,
              },
            }),
          },
        });
        persistDb("comment");
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),
];
