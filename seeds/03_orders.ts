import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("order_items").del();
  await knex("orders").del();

  // Inserts seed entries
  await knex("orders").insert([
    {
      id: "d01a627d-b147-43ef-b006-19bd49c9cce6",
      user_id: "3de13af5-a068-4f58-b7a8-76ae07282d54",
    },
  ]);
  await knex("order_items").insert([
    {
      order_id: "d01a627d-b147-43ef-b006-19bd49c9cce6",
      book_id: "f2c9e812-47d9-4a02-9122-0213761a03b2",
    },
    {
      order_id: "d01a627d-b147-43ef-b006-19bd49c9cce6",
      book_id: "30b8aa34-7bb8-45bf-a3ad-e8a1353d416c",
    },
  ]);
}
