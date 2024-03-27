import { faker } from "@faker-js/faker";
import { Knex } from "knex";
import { BookSchema } from "../src/modules/book/book.entity";

const createFakeBooks = () => ({
  title: faker.commerce.productName(),
  author: faker.person.fullName(),
  price: parseInt(
    faker.finance.amount({
      min: 10000,
      max: 100000,
    })
  ),
});

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("book_tag_associations").del();
  await knex("book_tags").del();
  await knex("books").del();

  const books: Omit<BookSchema, "id" | "price" | "cover_url">[] = [];

  for (let i = 0; i < 100; i++) {
    books.push(createFakeBooks());
  }

  // Inserts seed entries
  await knex("books").insert([
    {
      id: "f2c9e812-47d9-4a02-9122-0213761a03b2",
      ...createFakeBooks(),
    },
    {
      id: "30b8aa34-7bb8-45bf-a3ad-e8a1353d416c",
      ...createFakeBooks(),
    },
    {
      id: "d1b1c440-2bde-4c71-a87f-50397145a85d",
      ...createFakeBooks(),
    },
    ...books,
  ]);
  await knex("book_tags").insert([
    { id: "c9150f1d-60c3-467c-bccf-2ec99e5b6e41", name: "fiction" },
    { id: "ebb5949b-addb-4658-9b3c-d0f6a24f1b6f", name: "non-fiction" },
    { id: "06d1c8c0-a446-45b7-b3a2-429aeefcca0c", name: "science" },
    { id: "1e7ec4f7-d2f1-46ce-97a4-e2751522853f", name: "essay" },
  ]);
  await knex("book_tag_associations").insert([
    {
      book_id: "f2c9e812-47d9-4a02-9122-0213761a03b2",
      tag_id: "c9150f1d-60c3-467c-bccf-2ec99e5b6e41",
    },
    {
      book_id: "f2c9e812-47d9-4a02-9122-0213761a03b2",
      tag_id: "ebb5949b-addb-4658-9b3c-d0f6a24f1b6f",
    },
    {
      book_id: "30b8aa34-7bb8-45bf-a3ad-e8a1353d416c",
      tag_id: "c9150f1d-60c3-467c-bccf-2ec99e5b6e41",
    },
  ]);
}
