import * as jose from "jose";
import { JWT_SECRET } from "@/config";
import { DbEntity, db } from "./db";
import { DefaultBodyType, HttpResponse, StrictRequest, delay } from "msw";

const isTesting = process.env.NODE_ENV === "test";

export const delayedResponse = async <T>(response: T): Promise<T> => {
  await delay(isTesting ? 0 : 1000);
  return response;
};

export const hash = (str: string) => {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

export const sanitizeUser = <T extends Partial<{ password: string; iat: string }>>(
  user: T,
): Omit<T, "password" | "iat"> => {
  const { password, iat, ...rest } = user;
  return rest;
};

export async function authenticate({ email, password }: { email: string; password: string }) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = await new jose.SignJWT({ "urn:example:claim": true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .setSubject(user.id)
      .sign(JWT_SECRET);

    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error("Invalid username or password");
  throw error;
}

export async function requireAuth(request: StrictRequest<DefaultBodyType>) {
  const authToken = request.headers.get("authorization")?.split(" ")[1];
  if (!authToken) {
    throw new Error("No authorization token provided!");
  }
  const { payload } = await jose.jwtVerify(authToken, JWT_SECRET, {
    issuer: "urn:example:issuer",
    audience: "urn:example:audience",
  });

  const user = db.user.findFirst({
    where: {
      id: {
        equals: payload.sub,
      },
    },
  });

  if (!user) {
    throw Error("Unauthorized");
  }

  return sanitizeUser(user);
}

export function requireAdmin(
  user: DbEntity<"user"> | ReturnType<typeof sanitizeUser<DbEntity<"user">>>,
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
    },
  );
};
