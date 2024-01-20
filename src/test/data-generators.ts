import { faker } from "@faker-js/faker";

export const userGenerator = (overrides?: Record<string, any>) => ({
  id: faker.string.uuid(),
  firstName: faker.internet.userName(),
  lastName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  teamId: faker.string.uuid(),
  teamName: faker.company.name(),
  role: "ADMIN",
  bio: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const teamGenerator = (overrides?: Record<string, any>) => ({
  id: faker.string.uuid(),
  name: faker.company.name(),
  description: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const discussionGenerator = (overrides?: Record<string, any>) => ({
  id: faker.string.uuid(),
  title: faker.company.catchPhrase(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});

export const commentGenerator = (overrides?: Record<string, any>) => ({
  id: faker.string.uuid(),
  body: faker.lorem.sentence(),
  createdAt: Date.now(),
  ...overrides,
});
