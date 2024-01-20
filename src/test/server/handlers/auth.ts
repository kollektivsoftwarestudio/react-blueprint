import { HttpResponse, delay, http } from "msw";
import { nanoid } from "nanoid";
import { API_URL } from "@/config";
import { db, persistDb } from "../db";
import {
  authenticate,
  delayedResponse,
  errorResponse,
  hash_unsafe,
  requireAuth,
} from "../utils";

type RegisterBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teamId?: string;
  teamName?: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  http.post<never, RegisterBody>(
    `${API_URL}/auth/register`,
    async ({ request }) => {
      try {
        const userObject = await request.json();

        const existingUser = db.user.findFirst({
          where: {
            email: {
              equals: userObject.email,
            },
          },
        });

        if (existingUser) {
          throw new Error("The user already exists");
        }

        let teamId;
        let role;

        if (!userObject.teamId) {
          const team = db.team.create({
            id: nanoid(),
            name: userObject.teamName ?? `${userObject.firstName} Team`,
            createdAt: Date.now(),
          });
          persistDb("team");
          teamId = team.id;
          role = "ADMIN";
        } else {
          const existingTeam = db.team.findFirst({
            where: {
              id: {
                equals: userObject.teamId,
              },
            },
          });

          if (!existingTeam) {
            throw new Error("The team you are trying to join does not exist!");
          }
          teamId = userObject.teamId;
          role = "USER";
        }

        db.user.create({
          ...userObject,
          id: nanoid(),
          createdAt: Date.now(),
          role,
          password: hash_unsafe(userObject.password),
          teamId,
        });

        persistDb("user");

        const result = await authenticate({
          email: userObject.email,
          password: userObject.password,
        });

        return delayedResponse(
          HttpResponse.json(result, {
            status: 200,
          })
        );
      } catch (error) {
        return delayedResponse(errorResponse(error));
      }
    }
  ),

  http.post<never, LoginBody>(`${API_URL}/auth/login`, async ({ request }) => {
    try {
      const credentials = await request.json();
      const result = await authenticate(credentials);
      return new HttpResponse(JSON.stringify(result), {
        status: 200,
        headers: {
          "Set-Cookie": `session=${result.sessionToken}; Path=/;`,
          "Content-Type": "text/json",
        },
      });
    } catch (error) {
      return delayedResponse(errorResponse(error));
    }
  }),

  http.get<never>(`${API_URL}/auth/me`, async ({ request, cookies }) => {
    try {
      const user = await requireAuth(cookies);

      return delayedResponse(
        HttpResponse.json(user, {
          status: 200,
        })
      );
    } catch (error) {
      return delayedResponse(errorResponse(error));
    }
  }),
];
