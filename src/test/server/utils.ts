import { HttpResponse, delay } from "msw";
import { DbEntity, db, persistDb } from "./db";

const isTesting = process.env.NODE_ENV === "test";

export const delayedResponse = async <T>(response: T): Promise<T> => {
  await delay(isTesting ? 0 : 1000);
  return response;
};

export const hash_unsafe = (str: string) => {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

function generateSessionToken_unsafe() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 32;

  let sessionToken = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionToken += characters.charAt(randomIndex);
  }

  return sessionToken;
}

export const sanitizeUser = <
  T extends Partial<{ password: string; iat: string }>
>(
  user: T
): Omit<T, "password" | "iat"> => {
  const { password, iat, ...rest } = user;
  return rest;
};

// Note: This is not a production ready authentication solution
export async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash_unsafe(password)) {
    const sessionToken = generateSessionToken_unsafe();
    db.session.create({
      id: sessionToken,
      userId: user.id,
      createdAt: Date.now(),
    });

    persistDb("session");

    return { user: sanitizeUser(user), sessionToken };
  }

  const error = new Error("Invalid username or password");
  throw error;
}

export async function requireAuth(cookies: Record<string, string>) {
  const sessionToken = cookies.session;
  if (!sessionToken) {
    throw new Error("No session token provided!");
  }

  const session = db.session.findFirst({
    where: {
      id: {
        equals: sessionToken,
      },
    },
  });

  if (!session) {
    throw new Error("Invalid session token");
  }

  const user = db.user.findFirst({
    where: {
      id: {
        equals: session.userId,
      },
    },
  });

  if (!user) {
    throw Error("Unauthorized");
  }

  return sanitizeUser(user);
}

export function requireAdmin(
  user: DbEntity<"user"> | ReturnType<typeof sanitizeUser<DbEntity<"user">>>
) {
  if (user.role !== "ADMIN") {
    throw Error("Unauthorized");
  }
}

export const errorResponse = (error: unknown, status = 400) => {
  return HttpResponse.json(
    { message: (error as Error)?.message || "Server Error" },
    {
      status,
    }
  );
};
