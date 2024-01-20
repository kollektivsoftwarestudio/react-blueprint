import { HttpResponse, http } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { db, persistDb } from "../db";
import {
  requireAuth,
  requireAdmin,
  delayedResponse,
  errorResponse,
} from "../utils";

type DiscussionBody = {
  title: string;
  body: string;
};

export const discussionsHandlers = [
  http.get<never>(`${API_URL}/discussions`, async ({ cookies }) => {
    try {
      const user = await requireAuth(cookies);
      const result = db.discussion.findMany({
        where: {
          teamId: {
            equals: user.teamId,
          },
        },
      });
      return delayedResponse(HttpResponse.json(result));
    } catch (error) {
      return delayedResponse(errorResponse(error));
    }
  }),

  http.get<{ discussionId: string }>(
    `${API_URL}/discussions/:discussionId`,
    async ({ cookies, params }) => {
      try {
        console.log("cookies", cookies);
        const user = await requireAuth(cookies);
        const { discussionId } = params;
        const result = db.discussion.findFirst({
          where: {
            id: {
              equals: discussionId,
            },
            teamId: {
              equals: user.teamId,
            },
          },
        });
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),

  http.post<never, DiscussionBody>(
    `${API_URL}/discussions`,
    async ({ request, cookies }) => {
      try {
        const user = await requireAuth(cookies);
        const data = await request.json();
        requireAdmin(user);
        const result = db.discussion.create({
          teamId: user.teamId,
          id: nanoid(),
          createdAt: Date.now(),
          ...data,
        });
        persistDb("discussion");
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),

  http.patch<{ discussionId: string }, DiscussionBody>(
    `${API_URL}/discussions/:discussionId`,
    async ({ request, cookies, params }) => {
      try {
        const user = await requireAuth(cookies);
        const data = await request.json();
        const { discussionId } = params;
        requireAdmin(user);
        const result = db.discussion.update({
          where: {
            teamId: {
              equals: user.teamId,
            },
            id: {
              equals: discussionId,
            },
          },
          data,
        });
        persistDb("discussion");
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),

  http.delete<{ discussionId: string }>(
    `${API_URL}/discussions/:discussionId`,
    async ({ request, cookies, params }) => {
      try {
        const user = await requireAuth(cookies);
        const { discussionId } = params;
        requireAdmin(user);
        const result = db.discussion.delete({
          where: {
            id: {
              equals: discussionId,
            },
          },
        });
        persistDb("discussion");
        return delayedResponse(HttpResponse.json(result));
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),
];
