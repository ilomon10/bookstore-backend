import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { UserSchema } from "../src/modules/user/user.entity";

const createFakeUsers = () => ({
  email: faker.internet.email(),
  name: faker.person.fullName(),
  point: parseInt(faker.finance.amount({
    min: 250,
    max: 500000,
  })),
});

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  const users: Omit<UserSchema, "id" | "point">[] = [];

  for (let i = 0; i < 100; i++) {
    users.push(createFakeUsers());
  }

  // Inserts seed entries
  await knex("users").insert([
    {
      id: "3de13af5-a068-4f58-b7a8-76ae07282d54",
      name: faker.person.fullName(),
      email: "user1@site.com",
    },
    {
      id: "6af86b31-dc24-47bf-8f20-758d9f31c0cf",
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    {
      id: "08582f06-bf96-459e-8b2e-e01e1b68d500",
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    ...users,
  ]);
}
